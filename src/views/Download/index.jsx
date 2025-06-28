"use client";
import { useWill } from "@/appState/WillState";
import Mustache from "mustache";
import { useEffect, useRef, useState } from "react";
import { Button, LinkButton } from "@/components";
import DownloadIcon from "@/components/ui/Icons/Controls/Buttons/download.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import {
  useAssetsWithBeneficiaries,
  useChildrenWithGuardians,
  usePetsWithCaretakers,
} from "@/utils/hooks";

const PDF_OPTIONS = {
  margin: 0, // No margin, handle via CSS
  image: { type: "jpeg", quality: 1 },
  html2canvas: { scale: 2, useCORS: true },
  jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
};

const DownloadView = () => {
  const { will } = useWill();
  const [childrenWithGuardians] = useChildrenWithGuardians();
  const [petsWithCaretakers] = usePetsWithCaretakers();
  const [assetsWithBeneficiaries] = useAssetsWithBeneficiaries();
  const [rendered, setRendered] = useState(undefined);
  const html2pdfRef = useRef(null);

  useEffect(() => {
    import("html2pdf.js").then((mod) => {
      html2pdfRef.current = mod.default ? mod.default() : mod();
      html2pdfRef.current.set(PDF_OPTIONS);
    });
  }, []);

  useEffect(() => {
    const generate = async () => {
      // Fetch and render cover
      const coverRes = await fetch("/Willcover.html");
      const coverHtml = await coverRes.text();
      // Fetch and render main will
      const willRes = await fetch("/willTemplateV3.html");
      const willHtml = await willRes.text();

      const formattedWill = {
        ...will,
        children: childrenWithGuardians,
        pets: petsWithCaretakers,
        assets: assetsWithBeneficiaries,
        date: new Date().toLocaleDateString(),
      };

      const absoluteUrl =
        typeof window !== "undefined"
          ? window.location.origin + "/images/image1.png"
          : "/images/image1.png";
      const coverHtmlWithAbsoluteImg = coverHtml.replace(
        /src="\/images\/image1\.png"/g,
        `src="${absoluteUrl}"`
      );
      // Render both templates
      const renderedCover = Mustache.render(
        coverHtmlWithAbsoluteImg,
        formattedWill
      );
      const renderedWill = Mustache.render(willHtml, formattedWill);

      // Combine with a page break
      const combined = `
        <div>
          <div style="page-break-after: always; margin: 0;">${renderedCover}</div>
          <div style="padding: 0;">${renderedWill}</div>
        </div>
      `;
      setRendered(combined);
    };
    generate();
    return () => {
      if (html2pdfRef.current) html2pdfRef.current.from = undefined;
    };
  }, [
    will,
    childrenWithGuardians,
    petsWithCaretakers,
    assetsWithBeneficiaries,
  ]);

  const downloadWill = () => {
    if (!rendered || !html2pdfRef.current) {
      console.error("Couldn't generate pdf");
      return;
    }
    html2pdfRef.current.from(rendered).save("filled-template.pdf");
  };

  return (
    <div>
      <div className="flex mt-14 gap-4">
        <LinkButton
          variant="outlined"
          className="self-start"
          leftIcon={<ArrowLeftIcon />}
          id="dashboard-back-to-people"
          href="/journey/dashboard/people"
        >
          Back to editing
        </LinkButton>
        <Button
          variant="filled"
          className="self-start"
          rightIcon={<DownloadIcon />}
          id="dashboard-download-will-button"
          onClick={downloadWill}
        >
          Download will
        </Button>
      </div>
    </div>
  );
};

export default DownloadView;

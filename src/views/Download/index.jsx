"use client";
import { useWill } from "@/appState/WillState";
import Mustache from "mustache";
import { useEffect, useRef, useState } from "react";
// import html2pdf from "html2pdf.js";
import { Button, LinkButton, Typography } from "@/components";
import DownloadIcon from "@/components/ui/Icons/Controls/Buttons/download.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";

const PDF_OPTIONS = {
  margin: 1,
  image: { type: "jpeg", quality: 1 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
};

const DownloadView = () => {
  const { will } = useWill();
  const [rendered, setRendered] = useState(undefined);

  const html2pdfRef = useRef(null);

  // Dynamically import html2pdf.js on client
  useEffect(() => {
    import("html2pdf.js").then((mod) => {
      html2pdfRef.current = mod.default ? mod.default() : mod();
      html2pdfRef.current.set(PDF_OPTIONS);
    });
  }, []);

  const downloadWill = () => {
    console.log("downLoadWill", Boolean(rendered));
    if (!rendered || !worker) {
      console.error("Couldn't generate pdf");
      return;
    }
    html2pdfRef.current.from(rendered).save("filled-template.pdf");
  };

  useEffect(() => {
    const generate = async () => {
      const response = await fetch("/willTemplateV3.html");
      const templateHtml = await response.text();

      setRendered(Mustache.render(templateHtml, will));
      // await worker.from(rendered).save("filled-template.pdf");
    };
    generate();
    return () => {
      if (html2pdfRef.current) html2pdfRef.current.from = undefined;
    };
  }, [will]);

  return (
    <div>
      <Typography>Something here</Typography>
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
          onClick={() => downloadWill()}
        >
          Download will
        </Button>
      </div>
    </div>
  );
};

export default DownloadView;

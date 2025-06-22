"use client";

import { useWill } from "@/appState/WillState";
import Mustache from "mustache";
import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
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
  const worker = html2pdf().set(PDF_OPTIONS);
  const [rendered, setRendered] = useState(undefined);

  const downloadWill = () => {
    console.log("downLoadWill", Boolean(rendered));
    if (!rendered || !worker) {
      console.error("Couldn't generate pdf");
      return;
    }
    worker.from(rendered).save("filled-template.pdf");
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
      worker.from = undefined;
    };
  }, []);

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

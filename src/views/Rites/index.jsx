"use client";
import { SkipStepButton } from "@/components/NextStepButton";

const RitesView = ({ slug }) => {
  console.log("RITES VIEW");
  return (
    <div>
      Rites View
      <SkipStepButton slug={slug} />
    </div>
  );
};
export default RitesView;

import Link from "next/link";
import { Button } from "@/components";
import { STEPS, getNextStepIndex } from "@/appState/stepData";

const NextStepButton = ({ slug, label }) => {
  const nextStepIndex = getNextStepIndex(slug);
  console.log({ nextStepIndex, data: STEPS[nextStepIndex] });

  if (!nextStepIndex || !STEPS[nextStepIndex]) return null;
  return (
    <Button variant="outlined">
      <Link href={`/journey/${STEPS[nextStepIndex].slug}`}>
        {label || "Skip for now"}
      </Link>
    </Button>
  );
};

export default NextStepButton;

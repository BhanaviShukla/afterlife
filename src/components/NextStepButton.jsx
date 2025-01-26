import Link from "next/link";
import { Button } from "@/components";
import { STEPS, getNextStepIndex } from "@/appState/stepData";

const NextStepButton = ({
  slug,
  label = "Skip for now",
  variant = "filled",
}) => {
  const nextStepIndex = getNextStepIndex(slug);
  console.log({ nextStepIndex, data: STEPS[nextStepIndex] });

  if (!nextStepIndex || !STEPS[nextStepIndex]) return null;
  return (
    <Button variant={variant}>
      <Link href={`/journey/${STEPS[nextStepIndex].slug}`}>{label}</Link>
    </Button>
  );
};

export default NextStepButton;

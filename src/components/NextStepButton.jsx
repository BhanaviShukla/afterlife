import Link from "next/link";
import { Button } from "@/components";
import { FINALIZE_WILL_STEP_INDEX, STEPS } from "@/appState/stepData";
import { useSteps } from "@/appState/StepsState";
import { getCurrentSlugIndex } from "@/utils/step";

export const SkipStepButton = ({ slug }) => {
  const { getNextStepIndex, selectedSteps } = useSteps();
  const currentStepIndex = getCurrentSlugIndex(slug);
  const nextStepIndex = getNextStepIndex(slug);

  // if current step is the last step
  // or if user went to an unselected step that occurs after all the selected steps
  // don't show skip
  if (currentStepIndex >= selectedSteps[selectedSteps.length - 1]) return null;

  // if next step couldn't be determined, or no data exists for it
  // don't show skip
  if (!nextStepIndex || !STEPS[nextStepIndex]) return null;

  return (
    <Button variant="outlined">
      <Link href={`/journey/${STEPS[nextStepIndex].slug}`}>Skip for now</Link>
    </Button>
  );
};

const NextStepButton = ({ slug }) => {
  const { getNextStepIndex } = useSteps();
  const nextStepIndex = getNextStepIndex(slug);
  console.log({ nextStepIndex, data: STEPS[nextStepIndex] });

  if (nextStepIndex === FINALIZE_WILL_STEP_INDEX)
    return <div>Finalize will journey here</div>;

  if (!nextStepIndex || !STEPS[nextStepIndex]) return null;

  return (
    <Button variant="filled">
      <Link href={`/journey/${STEPS[nextStepIndex].slug}`}>
        Continue to {STEPS[nextStepIndex].label}
      </Link>
    </Button>
  );
};

export default NextStepButton;

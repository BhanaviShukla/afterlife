"use client";
import { useSteps } from "@/appState/StepsState";
import { Button, Card } from "@/components";
import styles from "./homeViewStyles.module.css";
import { useEffect } from "react";
import { STEPS } from "@/appState/stepData";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";
import { useWill } from "@/appState/WillState";

const JourneySelectionView = ({ data }) => {
  const { selectedSteps, toggleSelectedSteps } = useSteps();
  const { will } = useWill();
  const router = useRouter();

  const nextSlug = STEPS[selectedSteps[0] || 0].slug || "";

  // useEffect(() => {
  //   clearSelectedSteps();
  // }, [clearSelectedSteps]);

  const handleCardClick = (id) => {
    toggleSelectedSteps(id);
  };
  return (
    <>
      <div className={styles.carouselWrapper}>
        {STEPS.map((step) => {
          if (step.id > 4) return <></>;
          return (
            <Card.SelectItem
              key={step.id}
              id={step.id}
              backgroundColor={step.backgroundColor || "--colour-n50"}
              imageName={step.imageName}
              isSelected={selectedSteps.includes(step.id)}
              handleSelect={() => handleCardClick(step.id)}
              subLabel={step.subLabel}
              label={step.label}
              isCompleted={will.completed[step.slug]}
            >
              {step.label}
            </Card.SelectItem>
          );
        })}
      </div>
      <div className={styles.ctaWrapper}>
        <Button
          variant="outlined"
          className="self-start"
          leftIcon={<ArrowLeftIcon />}
          onClick={() => router.back()}
        >
          {data.secondaryCta}
        </Button>
        <Button
          variant="filled"
          className="self-start"
          rightIcon={<ArrowRightIcon />}
          disabled={!selectedSteps.length}
          onClick={() => router.push(`/journey/will/step/${nextSlug}`)}
        >
          {data.primaryCta}
        </Button>
      </div>
    </>
  );
};
export default JourneySelectionView;

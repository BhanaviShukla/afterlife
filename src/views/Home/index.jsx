"use client";
import { useSteps } from "@/appState/StepsState";
import { Button, Card } from "@/components";
import styles from "./homeViewStyles.module.css";
import { useEffect } from "react";
import { STEPS } from "@/appState/stepData";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";

const DISCLAIMER_MODAL = "disclaimer-modal";

const JourneySelectionView = ({ data }) => {
  const { selectedSteps, toggleSelectedSteps, clearSelectedSteps } = useSteps();
  const router = useRouter();

  useEffect(() => {
    clearSelectedSteps();
  }, [clearSelectedSteps]);

  const handleCardClick = (id) => {
    toggleSelectedSteps(id);
  };
  return (
    <>
      <div className={styles.carouselWrapper}>
        {STEPS.map((step) => {
          if (step.id === 0 || step.id > 4) return <></>;
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
          // onClick={() => setOpenModal(DISCLAIMER_MODAL)}
        >
          {data.primaryCta}
        </Button>
      </div>
    </>
  );
};
export default JourneySelectionView;

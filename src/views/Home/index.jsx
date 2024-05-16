"use client";
import { useSteps } from "@/appState/StepsState";
import { Button, Card } from "@/components";
import styles from "./homeViewStyles.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { STEPS } from "@/appState/stepData";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";

const JourneySelectionView = ({ data }) => {
  const { selectedSteps, toggleSelectedSteps, clearSelectedSteps } = useSteps();

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
          console.log("STEPS >>>", step.videoName);
          return (
            <Card.SelectItem
              key={step.id}
              backgroundColor={step.backgroundColor || "--colour-n50"}
              imageName={step.imageName}
              videoName={step.videoName}
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
        {selectedSteps.length ? (
          <Button
            variant="filled"
            className="self-start"
            rightIcon={<ArrowRightIcon />}
          >
            <Link href={`/journey/${STEPS[selectedSteps[0]].slug}`}>
              {data.primaryCta}
            </Link>
          </Button>
        ) : null}
        <Button variant="text" italic className="self-start">
          {data.secondaryCta}
        </Button>
        {data.secondaryCta2 && (
          <Button variant="text" italic className="self-start">
            {data.secondaryCta2}
          </Button>
        )}
      </div>
    </>
  );
};
export default JourneySelectionView;

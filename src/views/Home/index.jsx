"use client";
import { Button, Card } from "@/components";
import styles from "./homeViewStyles.module.css";
import { STEPS } from "@/appState/stepData";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";
import { useWill } from "@/appState/WillState";
import { Fragment } from "react";

const JourneySelectionView = ({ data }) => {
  const { will } = useWill();
  const router = useRouter();

  const handleCardClick = (slug) => {
    console.log("handleCardClick", slug);
    router.push(`/journey/will/step/${slug}`);
  };

  const isAnyStepCompleted = Object.values(will.completed).some(
    (value) => value === true
  );

  return (
    <>
      <div className={styles.cardWrapper}>
        {STEPS.map((step) => {
          if (step.id > 3) return <Fragment key={step.id} />;
          return (
            <Card.SelectItem
              key={step.id}
              id={step.id}
              backgroundColor={step.backgroundColor || "--colour-n50"}
              imageName={step.imageName}
              isCompleted={will.completed[step.slug]}
              handleClick={() => handleCardClick(step.slug)}
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
          disabled={!isAnyStepCompleted}
          onClick={() => router.push(`/journey/executor`)}
        >
          {data.primaryCta}
        </Button>
      </div>
    </>
  );
};
export default JourneySelectionView;

"use client";
import { Button, Card } from "@/components";
import styles from "./homeViewStyles.module.css";
import { STEPS } from "@/appState/stepData";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";
import { useWill } from "@/appState/WillState";

const JourneySelectionView = ({ data }) => {
  const { will } = useWill();
  const router = useRouter();

  const handleCardClick = (slug) => {
    console.log("handleCardClick", slug);
    router.push(`/journey/will/step/${slug}`);
  };
  return (
    <>
      <div className={styles.carouselWrapper}>
        {STEPS.map((step) => {
          if (step.id > 3) return <></>;
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
          // disabled={!selectedSteps.length}
          // Add finalize will here
          // onClick={() => router.push(`/journey/will/step/${nextSlug}`)}
        >
          {data.primaryCta}
        </Button>
      </div>
    </>
  );
};
export default JourneySelectionView;

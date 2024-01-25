"use client";
import { useReducer } from "react";
import { initialStepsState, stepsReducer, STEPS } from "@/appState/StepsState";
import { Card } from "@/components";
import styles from "./stepCarouselStyles.module.css";

const StepSelectionCarousel = () => {
  const [state, dispatch] = useReducer(stepsReducer, initialStepsState);
  console.log({ state, STEPS });

  const handleCardClick = (id) => {
    dispatch({
      type: "toggle_selection",
      id,
    });
  };
  return (
    <div className={styles.carouselWrapper}>
      {STEPS.map((step) => {
        return (
          <Card.SelectItem
            key={step.id}
            backgroundColor={step.backgroundColor || "--colour-n50"}
            imageName={step.imageName}
            isSelected={state.includes(step.id)}
            handleSelect={() => handleCardClick(step.id)}
            subLabel={step.subLabel}
            label={step.label}
          >
            {step.label}
          </Card.SelectItem>
        );
      })}
    </div>
  );
};
export default StepSelectionCarousel;

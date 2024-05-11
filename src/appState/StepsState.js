import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import { FINALIZE_WILL_STEP_INDEX, STEPS } from "./stepData";
import { getCurrentSlugIndex } from "@/utils/step";

export const initialStepsState = [];

export const StepContext = createContext({ selectedSteps: initialStepsState });

export function StepProvider({ children }) {
  const [selectedSteps, setSelectedSteps] = useState(() =>
    getLocalStorage("selectedSteps", initialStepsState)
  );

  useEffect(() => {
    setLocalStorage("selectedSteps", selectedSteps);
  }, [selectedSteps]);

  const toggleSelectedSteps = useCallback(
    (id) => {
      if (selectedSteps.includes(id)) {
        setSelectedSteps(selectedSteps.filter((value) => value !== id));
        return;
      }
      const newSteps = new Set([...selectedSteps, id]);
      setSelectedSteps([...newSteps].sort());
    },
    [selectedSteps, setSelectedSteps]
  );

  const clearSelectedSteps = useCallback(() => {
    setSelectedSteps(initialStepsState);
  }, [setSelectedSteps]);

  const getNextStepIndex = useCallback(
    (currentSlug) => {
      const indexOfCurrentSlug = getCurrentSlugIndex(currentSlug);
      if (indexOfCurrentSlug < 0) {
        console.error("Couldn't locate step data");
        return -1;
      }

      const nextIndex = selectedSteps.find((step) => step > indexOfCurrentSlug);
      if (
        indexOfCurrentSlug === STEPS.length - 1 ||
        typeof nextIndex === "undefined"
      ) {
        console.log("No more steps available");
        return FINALIZE_WILL_STEP_INDEX;
      }
      return nextIndex;
    },
    [selectedSteps]
  );

  console.log("PROVIDER", { selectedSteps });

  const memoizedStepContextProviderValue = useMemo(
    () => ({
      selectedSteps,
      toggleSelectedSteps,
      clearSelectedSteps,
      getNextStepIndex,
    }),
    [selectedSteps, toggleSelectedSteps, clearSelectedSteps, getNextStepIndex]
  );
  return (
    <StepContext.Provider value={memoizedStepContextProviderValue}>
      {children}
    </StepContext.Provider>
  );
}

export function useSteps() {
  return useContext(StepContext);
}

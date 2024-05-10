import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";

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
      } else {
        const newSteps = new Set([...selectedSteps, id]);
        setSelectedSteps([...newSteps].sort());
      }
    },
    [selectedSteps, setSelectedSteps]
  );

  const clearSelectedSteps = useCallback(() => {
    setSelectedSteps(initialStepsState);
  }, [setSelectedSteps]);

  console.log("PROVIDER", { selectedSteps });

  const memoizedStepContextProviderValue = useMemo(
    () => ({ selectedSteps, toggleSelectedSteps, clearSelectedSteps }),
    [selectedSteps, toggleSelectedSteps, clearSelectedSteps]
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

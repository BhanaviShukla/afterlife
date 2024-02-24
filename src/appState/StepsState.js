import { createContext, useContext, useEffect, useState } from "react";
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

  const toggleSelectedSteps = (id) => {
    if (selectedSteps.includes(id)) {
      setSelectedSteps(selectedSteps.filter((value) => value !== id));
    }
    const newSteps = new Set([...selectedSteps, id]);
    setSelectedSteps([...newSteps].sort());
  };

  const clearSelectedSteps = () => {
    setSelectedSteps(initialStepsState);
  };
  console.log("PROVIDER", { selectedSteps });
  return (
    <StepContext.Provider
      value={{
        selectedSteps,
        toggleSelectedSteps,
        clearSelectedSteps,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}

export function useSteps() {
  return useContext(StepContext);
}

import { createContext } from "react";

export const STEPS = [
  {
    id: 0,
    label: "Children",
    subLabel: "Guardianship for",
    imageName: "backpack",
    backgroundColor: "--colour-n50",
  },
  { id: 1, label: "Pets", subLabel: "Caretaker for", imageName: "pet_bowl" },
  { id: 2, label: "Assets & Belongings", subLabel: "", imageName: "pot" },
  { id: 3, label: "Rites", subLabel: "Specify", imageName: "candle" },
];

export const StepContext = createContext(null);
3;

export const initialStepsState = [];

export function stepsReducer(state, action) {
  switch (action.type) {
    case "toggle_selection": {
      console.log({ state });
      if (state.includes(action.id)) {
        return state.filter((value) => value !== action.id);
      }
      const newState = new Set([...state, action.id]);
      return [...newState].sort();
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

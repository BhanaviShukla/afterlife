import { STEPS } from "@/appState/stepData";

export const getImageFromSlug = (slug) => {
  const step = STEPS.find((s) => s.slug === slug) || {};
  return step.imageName;
};

export const STEPS = [
  {
    id: 0,
    label: "Children",
    subLabel: "Guardianship for",
    imageName: "backpack",
    backgroundColor: "--colour-n50",
    slug: "children",
  },
  {
    id: 1,
    label: "Pets",
    subLabel: "Caretaker for",
    imageName: "pet_bowl",
    slug: "pets",
  },
  {
    id: 2,
    label: "Assets & Belongings",
    subLabel: "Distribute",
    imageName: "pot",
    slug: "assets",
  },
  {
    id: 3,
    label: "Rites",
    subLabel: "Specify",
    imageName: "candle",
    slug: "rites",
  },
  {
    id: 4,
    label: "Executor",
    subLabel: "",
    imageName: "frame",
    slug: "executor",
  },
  {
    id: 5,
    label: "Dashboard",
    subLabel: "",
    imageName: "candle",
    slug: "dashboard",
  },
];

// @TODO: move this to stepState context
export const getNextStepIndex = (currentSlug) => {
  const indexOfCurrentSlug = STEPS.findIndex(
    (step) => step.slug === currentSlug
  );
  if (indexOfCurrentSlug < 0) {
    console.error("Couldn't locate step data");
    return -1;
  }
  if (indexOfCurrentSlug === STEPS.length - 1) {
    console.error("No more steps available");
    return -2;
  }
  return indexOfCurrentSlug + 1;
};

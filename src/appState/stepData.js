export const STEPS = [
  {
    id: 0,
    label: "About",
    subLabel: "",
    imageName: "pot",
    backgroundColor: "--colour-n50",
    slug: "about-you",
  },
  {
    id: 1,
    label: "Children",
    subLabel: "Guardianship for",
    imageName: "backpack",
    backgroundColor: "--colour-n50",
    slug: "children",
  },
  {
    id: 2,
    label: "Pets",
    subLabel: "Caretaker for",
    imageName: "pet_bowl",
    slug: "pets",
  },
  {
    id: 3,
    label: "Assets & Belongings",
    subLabel: "Distribute",
    imageName: "pot",
    slug: "assets",
  },
  {
    id: 4,
    label: "Rites",
    subLabel: "Specify",
    imageName: "frame",
    slug: "rites",
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
    return -1;
  }
  return indexOfCurrentSlug + 1;
};

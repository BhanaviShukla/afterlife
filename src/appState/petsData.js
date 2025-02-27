export const TODAY = new Date().toISOString().split("T")[0];
export const petsNestedViews = {
  COUNT: "count",
  DETAILS: "details",
  CARETAKER: "caretaker",
  CONFIRM: "confirm",
};

export const petsCountData = {
  title: "",
  description: "",
  [petsNestedViews.COUNT]: {
    title: "How many pets do you have?",
    description: "",
    formData: {
      count: {
        required: true,
        type: "select",
        id: "count",
        max: 100,
      },
      sentence: "I have {{count}} {{pet}}",
    },
    nextLink: `/journey/will/step/pets/${petsNestedViews.DETAILS}?count=`, // insert count here
    backLink: `/journey/will`, // insert userId here
    primaryCta: "Next",
    secondaryCta: "",
  },
  [petsNestedViews.DETAILS]: {
    title: "About your pets",
    description: "",
    formData: {
      petName: {
        type: "text",
        name: "petName",
        required: true,
        placeholder: "Name of pet",
      },
      microchip: {
        type: "text",
        name: "microchip",
        required: true,
        placeholder: "Microchip/Registration number (if any)",
      },
      instructions: {
        type: "multiline",
        name: "instructions",
        required: false,
        placeholder: "Additional instructions (if any)",
      },
    },
    nextLink: `/journey/will/step/pets/${petsNestedViews.CARETAKER}`,
    backLink: `/journey/will/step/pets/${petsNestedViews.COUNT}?count=`, // insert count here
    primaryCta: "Next",
    secondaryCta: "",
  },
  [petsNestedViews.CARETAKER]: {
    title: "Appoint a caretaker",
    description:
      "A caretaker should be someone you trust who would be responsible for taking care of your children if both you and your spouse pass.",
    formData: {},
    nextLink: `/journey/will/step/pets/${petsNestedViews.CONFIRM}`,
    backLink: `/journey/will/step/pets/${petsNestedViews.DETAILS}?count=`, // insert count here
    primaryCta: "Next",
    secondaryCta: "",
  },
  [petsNestedViews.CONFIRM]: {
    title: "Confirm your details",
    description:
      "You will still be able to review and edit your information later.",
    formData: {},
    nextLink: `/journey/will`,
    backLink: `/journey/will/step/pets/${petsNestedViews.CARETAKER}`,
    primaryCta: "Next",
    secondaryCta: "",
  },
};
export const petsData = {
  title: "Assign care for your furry companions.",
  description:
    "By designating a responsible caretaker and setting aside funds for their upkeep, you guarantee that your beloved companions will be looked after and cherished as part of your family, as well as knowing they will receive the love and attention they deserve even in your absence.",
  addPetView: {
    primaryCta: "Add a pet",
    secondaryCta: "Skip for now",
  },
  petsListView: {
    primaryCta: "Continue to Assets",
    itemCard: {
      subLabel: "Your companion",
    },
    addAnotherCard: {
      imageName: "pet_bowl",
      label: "Add another",
      subLabel: "Have more pets",
    },
  },
};

export const petFormData = {
  petForm: {
    id: "add-pet",
    title: "Tell us about your pet",
    textInputs: [
      {
        id: "pet-name",
        placeholder: "Your pet's pet name",
        type: "text",
        required: true,
      },
      {
        id: "microchip",
        placeholder: "Microchip number (if any)",
        type: "text",
      },
    ],
    primaryCta: "Save",
    secondaryCta: "Cancel",
  },
  caretakerForm: {
    id: "add-caretaker",
    title: "Assign a caretaker for",
    infoText:
      "Make sure to inform the person you are appointing so that they are aware and accept the potential responsibilities.",
  },
};

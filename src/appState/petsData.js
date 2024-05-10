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

export const petsData = {
  title: "Assign care for your furry companions.",
  description:
    "By designating a responsible caretaker and setting aside funds for their upkeep, you guarantee that your beloved companions will be looked after and cherished as part of your family, as well as knowing they will receive the love and attention they deserve even in your absence.",
  addPetView: {
    primaryCta: "Add a pet",
    secondaryCta: "Skip for now",
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
};

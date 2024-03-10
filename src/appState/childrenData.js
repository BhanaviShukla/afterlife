export const TODAY = new Date().toISOString().split("T")[0];
export const childrenData = {
  title: "About your children",
  description:
    "By naming someone you trust to care for your children (below 21), you ensure that they continue to be raised in a loving and nurturing environment in the event you are no longer around. It may be difficult to consider these possibilities, but these arrangements will guide and shelter them through any unfortunate circumstances that may happen.",
  addChildView: {
    primaryCta: "Add a child",
    secondaryCta: "Skip for now",
  },
  childrenListView: {
    primaryCta: "Continue to Pets",
    addAnotherCard: {
      imageName: "frame",
      label: "Add another child",
      subLabel: "Have more kids",
    },
  },
};
export const chldrenFormData = {
  childForm: {
    id: "add-child",
    title: "Tell us about your child",
    textInputs: [
      {
        id: "child-name",
        placeholder: "Full name of child (as per passport)",
        type: "text",
        required: true,
      },
      {
        id: "child-dob",
        placeholder: "Birthday",
        // placeholderDay: "Day",
        // placeholderMonth: "Month",
        // placeholderYear: "Year",
        type: "date",
        max: TODAY,
        required: true,
      },
    ],
    primaryCta: "Save",
    secondaryCta: "Cancel",
  },
  guardianForm: {
    id: "add-guardian",
    title: "Assign a guardian for",
    subtitle:
      "A guardian should be someone you trust who would be responsible for taking care of your children if both you and your spouse passes.",
    infoText:
      "Make sure to inform the person you are appointing so that they are aware and accept the potential responsibilities.",
    textInputs: [
      {
        id: "person-name",
        placeholder: "Full name of person (as per passport)",
        type: "text",
        required: true,
      },
      {
        id: "person-dob",
        placeholder: "Birthday",
        // placeholderDay: "Day",
        // placeholderMonth: "Month",
        // placeholderYear: "Year",
        type: "date",
        max: TODAY,
        required: true,
      },
    ],
    selectInput: {
      id: "person-relationship-child",
      placeholder: "Relationship",
      options: [
        { label: "GodMother", value: "god-mother" },
        { label: "GodFather", value: "god-father" },
      ],
    },
    primaryCta: "Save",
    secondaryCta: "Back",
  },
};

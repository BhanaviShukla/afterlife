export const ritesNestedViews = {
  RELIGION: "religion",
  DETAILS: "details",
  CONFIRM: "confirm",
};

export const ritesData = {
  title: "",
  description: "",
  [ritesNestedViews.RELIGION]: {
    title: "What are your religions beliefs?",
    description:
      "Your funeral rites will be carried out according to your selection here.",
    formData: {
      religion: {
        required: true,
        type: "select",
        id: "religion",
        options: [
          { label: "Non-religious", value: "none" },
          { label: "Buddhist", value: "buddhism" },
          { label: "Christian", value: "christianity" },
          { label: "Hindu", value: "hinduism" },
          { label: "Others (specify in instructions)", value: "other" },
        ],
      },
      sentence: "I am {{religion}}",
    },
    nextLink: `/journey/will/step/rites/${ritesNestedViews.DETAILS}?religion=`, // insert count here
    backLink: `/journey/will`, // insert userId here
    primaryCta: "Next",
    secondaryCta: "",
  },
  [ritesNestedViews.DETAILS]: {
    title: "How would you like to be remembered?",
    description: "",
    formData: {
      arrangements: {
        type: "select",
        name: "arrangements",
        required: true,
        placeholder: "Arrangements",
        options: [
          { label: "Cremated", value: "cremated" },
          { label: "Buried", value: "buried" },
        ],
      },
      instructions: {
        type: "multiline",
        name: "instructions",
        required: false,
        placeholder: "Additional instructions for rites (if any)",
      },
    },
    tooltip: {
      description:
        "When writing your requests, it is important to be realistic about what your loved ones are able to achieve in your absence.",
    },
    nextLink: `/journey/will/step/rites/${ritesNestedViews.CONFIRM}`,
    backLink: `/journey/will/step/rites/${ritesNestedViews.RELIGION}?religion=`, // insert count here
    primaryCta: "Next",
    secondaryCta: "",
  },
  [ritesNestedViews.CONFIRM]: {
    title: "Confirm your details",
    description:
      "You will still be able to review and edit your information later.",
    formData: {},
    nextLink: `/journey/will`,
    backLink: `/journey/will/step/rites/${ritesNestedViews.DETAILS}`,
    primaryCta: "Next",
    secondaryCta: "",
  },
};

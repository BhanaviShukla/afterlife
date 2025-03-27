export const assetsNestedViews = {
  DISTRIBUTION: "distribution",
  CONFIRM: "confirm",
};

export const assetsData = {
  title: "",
  description: "",
  [assetsNestedViews.DISTRIBUTION]: {
    title: "How would you like to distribute your assets?",
    description:
      "After your gifts and debts have been sorted out, your residuary estate (any unspecified assets) will be distributed according to your designation here.",
    formData: {}, // form is inline
    tooltip: {
      description:
        "If any beneficiaries is unable to receive their share, it will be split among other beneficiaries proportionately according to their share. ",
    },
    nextLink: `/journey/will/step/assets/${assetsNestedViews.CONFIRM}`,
    backLink: `/journey/will`,
    primaryCta: "Next",
    secondaryCta: "",
  },
  [assetsNestedViews.CONFIRM]: {
    title: "Confirm your details",
    description:
      "You will still be able to review and edit your information later.",
    formData: {},
    nextLink: `/journey/will`,
    backLink: `/journey/will/step/assets/${assetsNestedViews.DISTRIBUTION}`,
    primaryCta: "Looks Good",
    secondaryCta: "Edit",
  },
};

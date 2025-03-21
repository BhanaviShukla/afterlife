export const assetsNestedView = {
    DETAILS: "details",
    CONFIRM: "confirm",
    SELECTION: 'selection',
    PROPERTY: 'property',
    VEHICLE: 'vehicle',
    CASH: 'cash',
    GIFT: 'gift'
  };
  
  export const assetsData = {
    title: "",
    description: "",
    [assetsNestedView.SELECTION]: {
      title: "Which assets would you like to add in your will?",
      description: "",
      buttons: [
        {
            label: "Add Property",
            icon: "home",
            nextLink: `/journey/will/step/assets/property`,
        },
        {
            label: "Add Vehicle",
            icon: "car",
            nextLink: `/journey/will/step/assets/vehicle`,
        },
        {
            label: "Add Cash",
            icon: "cash",
            nextLink: `/journey/will/step/assets/cash`,
        },
        {
            label: "Add gift",
            icon: "gift",
            nextLink: `/journey/will/step/assets/gift`,
        }
      ],
      tooltip: {
        description:
          "When writing your requests, it is important to be realistic about what your loved ones are able to achieve in your absence.",
      },
      backLink: `/journey/will/`,
      primaryCta: "Skip",
      secondaryCta: "",
    },
    [assetsNestedView.PROPERTY]: {
        title: "Tell us about your property",
        description: "",
        formData: {
            country: {
              required: true,
              type: "select",
              id: "country",
              label: "Country"
            },
            fullAddress: {
                required: true,
                type: "input",
                id: "fullAddress",
                label: "Full address"
            },
            zipCode: {
                required: true,
                type: "input",
                id: "zipCode",
                label: "Zip code"
            },
            sentence: "You may only plan for property that isn’t under a joint tenancy. Joint tenancy properties automatically go to the joint tenant at the time of your passing.",
        },
        nextLink: `/journey/will/step/assets/property/beneficiary`,
        backLink: `/journey/will/step/assets/selection`,
        primaryCta: "Select beneficiaries",
        secondaryCta: "",
    },
  };
  
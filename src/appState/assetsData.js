
export const FORM_TYPE = {
    INPUT : 'input',
    SELECT: 'select'
}

export const assetsNestedView = {
    DETAILS: 'details',
    CONFIRM: 'confirm',
    SELECTION: 'selection',
    PROPERTY: 'property',
    VEHICLE: 'vehicle',
    CASH: 'cash',
    GIFT: 'gift',
    BENEFICIARY: 'beneficiary'
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
              type: FORM_TYPE.SELECT,
              id: "country",
              label: "Country",
              options: []
            },
            fullAddress: {
                required: true,
                type: FORM_TYPE.INPUT,
                id: "fullAddress",
                label: "Full address"
            },
            zipCode: {
                required: true,
                type: FORM_TYPE.INPUT,
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
    [assetsNestedView.VEHICLE]: {
        title: "Tell us about your vehicle",
        description: "",
        formData: {
            licencePlateNumber: {
                required: true,
                type: FORM_TYPE.INPUT,
                id: "licencePlateNumber",
                label: "License plate number"
            },
            vehicleModel: {
                required: true,
                type: FORM_TYPE.INPUT,
                id: "vehicleModel",
                label: "Vehicle Model"
            },
            vehicleYear: {
                required: true,
                type: FORM_TYPE.SELECT,
                id: "year",
                label: "Vehicle year",
                options: []
            },
            beneficiaryInstruction: {
                required: false,
                type: FORM_TYPE.INPUT,
                id: "beneficiaryInstruction",
                label: "Instructions for beneficiaries (optional)",
            },
        },
        nextLink: `/journey/will/step/assets/property/beneficiary`,
        backLink: `/journey/will/step/assets/selection`,
        primaryCta: "Select beneficiaries",
        secondaryCta: "",
    },
    [assetsNestedView.CASH]: {
        title: "About your cash",
        description: "",
        formData: {
            descAndLocation: {
                required: true,
                type: FORM_TYPE.INPUT,
                id: "descAndLocation",
                label: "Description and location of item (if any)"
            },
            beneficiaryInstructions: {
                required: true,
                type: FORM_TYPE.INPUT,
                id: "beneficiaryInstructions",
                label: "Instructions for beneficiaries (if any)"
            },
        },
        nextLink: `/journey/will/step/assets/cash/beneficiary`,
        backLink: `/journey/will/step/assets/selection`,
        primaryCta: "Select beneficiaries",
        secondaryCta: "",
    },
    [assetsNestedView.GIFT]: {
            title: "What item would you like to gift today?",
            description: "Your belongings, also called gifts, are items that you may want to specifically name a beneficiary for. These could be jewellery, artwork, or any item you own. ",
            formData: {
                itemName: {
                    required: true,
                    type: FORM_TYPE.INPUT,
                    id: "itemName",
                    label: "Item name"
                },
                itemLocation: {
                    required: true,
                    type: FORM_TYPE.INPUT,
                    id: "itemLocation",
                    label: "Description and location of item (if any)"
                },
                beneficiaryInstructions: {
                    required: true,
                    type: FORM_TYPE.INPUT,
                    id: "beneficiaryInstructions",
                    label: "Instructions for beneficiaries (if any)"
                },
                sentence: "You may only plan for property that isn’t under a joint tenancy. Joint tenancy properties automatically go to the joint tenant at the time of your passing.",
            },
            nextLink: `/journey/will/step/assets/cash/beneficiary`,
            backLink: `/journey/will/step/assets/selection`,
            primaryCta: "Select beneficiaries",
            secondaryCta: "",
        },    
    [assetsNestedView.BENEFICIARY]: {
        assets: {
            title: "Who would you like to pass this {{asset}} to?",
            primaryCta: "Save",
            secondaryCta: "",
        },
        primaryCta: "Save",
        secondaryCta: "",
        nextLink: `/journey/will/step/assets/{{asset}}/beneficiary/confirm`, // {{asset}} will be replace with : car, cash, gift and vehicle,
        backLink: `/journey/will/step/assets/{{asset}}`,
    },
  };
  
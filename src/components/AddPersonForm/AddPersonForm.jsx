import { useWill } from "@/appState/WillState";
import { Button, SelectInput, TextInput, Typography } from "..";
import InfoIcon from "../ui/Icons/Informational/info-empty.svg";
import { TODAY } from "@/appState/childrenData";

const AddPersonForm = ({ onPersonSave, onBack, infoText }) => {
  const { addToWill } = useWill();
  const { textInputs, selectInput, primaryCta, secondaryCta } = data;

  const onNewPersonSubmit = async (formData) => {
    console.log("onNewPersonSubmit");
    const person = {
      name: formData.get("person-name"),
      dob: formData.get("person-dob"),
      relationship: formData.get("person-relationship-user"),
    };
    console.log("PERSON -> TO WILL", person);
    const personId = addToWill("people", person);
    onPersonSave(personId);
  };
  return (
    <form id="add-new-person" action={onNewPersonSubmit}>
      {textInputs?.length &&
        textInputs?.map((input) => <TextInput key={input.id} {...input} />)}
      <SelectInput {...selectInput} />
      {infoText && (
        <div className="flex align-middle gap-2 mt-8">
          <InfoIcon width={40} />
          <Typography variant="caption">{infoText}</Typography>
        </div>
      )}
      <div className="flex gap-4 mt-8">
        <Button
          type="submit"
          value="submit"
          id={`add-new-person-submit-button`}
        >
          {primaryCta}
        </Button>
        <Button variant="outlined" onClick={onBack}>
          {secondaryCta}
        </Button>
      </div>
    </form>
  );
};

const data = {
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

      type: "date",
      max: TODAY,
      required: true,
    },
  ],
  selectInput: {
    id: "person-relationship-user",
    placeholder: "Relationship to you",
    options: [
      { label: "Parent", value: "parent" },
      { label: "Sibling", value: "sibling" },
      { label: "Relative", value: "relative" },
      { label: "Friend", value: "friend" },
    ],
  },
  primaryCta: "Save",
  secondaryCta: "Back",
};
export default AddPersonForm;

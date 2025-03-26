import { useWill } from "@/appState/WillState";
import { Button, SelectInput, TextInput, Typography } from "..";
import InfoIcon from "../ui/Icons/Informational/info-empty.svg";
import { TODAY } from "@/appState/childrenData";
import { useEffect, useState } from "react";

const AddPersonForm = ({
  onPersonSave,
  onBack,
  infoText,
  personId = undefined,
}) => {
  const { addToWill, getWillEntry, patchWillEntry } = useWill();
  const { textInputs, selectInput, primaryCta, secondaryCta } = data;

  const [person, setPerson] = useState();

  useEffect(() => {
    if (!personId) return;
    const personWillEntry = getWillEntry("people", personId);
    if (!personWillEntry) {
      console.error("Couldn't find person in the will");
      return;
    }
    setPerson(personWillEntry);
  }, [personId, getWillEntry]);

  const onNewPersonSubmit = async (formData) => {
    console.log("onNewPersonSubmit");
    const person = {
      name: formData.get("person-name"),
      dob: formData.get("person-dob"),
      relationship: formData.get("person-relationship-user"),
    };
    const personId = addToWill("people", person);
    console.log("PERSON -> TO WILL", person, personId);
    onPersonSave(personId);
  };

  const onEditPersonSubmit = async (formData) => {
    console.log("onEditPersonSubmit");
    if (!person) {
      console.error("Couldn't find person in the will");
      return;
    }
    const newPerson = {
      ...person,
      name: formData.get("person-name"),
      dob: formData.get("person-dob"),
      relationship: formData.get("person-relationship-user"),
    };
    console.log("PERSON -> TO WILL", newPerson);
    await patchWillEntry("people", personId, newPerson);
    onPersonSave(personId);
  };

  return (
    <form
      id={personId ? `edit-${personId}` : "add-new-person"}
      action={personId ? onEditPersonSubmit : onNewPersonSubmit}
    >
      {textInputs?.map((input) => (
        <TextInput
          key={input.id}
          {...input}
          defaultValue={person ? person[input.stateKey] : undefined}
        />
      ))}
      <SelectInput
        {...selectInput}
        defaultValue={person ? person[selectInput.stateKey] : undefined}
      />
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
      stateKey: "name",
    },
    {
      id: "person-dob",
      placeholder: "Birthday",

      type: "date",
      max: TODAY,
      required: true,
      stateKey: "dob",
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
    stateKey: "relationship",
  },
  primaryCta: "Save",
  secondaryCta: "Back",
};
export default AddPersonForm;

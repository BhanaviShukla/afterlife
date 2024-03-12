import { useWill } from "@/appState/WillState";
import { Button, SelectInput, TextInput, Typography } from "@/components";
import InfoIcon from "@/components/ui/Icons/Informational/info-empty.svg";
import { useEffect, useState } from "react";

const ADD_PERSON_FORM_VIEW = "add-person-form-view";
const SELECT_PERSON_FORM_VIEW = "select-person-form-view";

const ADD_ANOTHER_GUARDIAN_OPTION = "Add Another Guardian";

const PersonModalView = ({
  form: { id, title, subtitle, infoText },
  titleFragment,
  onNewGuardianSave,
  onSelectGuardianSave,
  onBack,
}) => {
  const {
    will: { people },
  } = useWill();
  const isPersonSelectable = people.length;
  const { addPersonForm, selectPersonForm } = data;

  const [formView, setFormView] = useState(
    isPersonSelectable ? SELECT_PERSON_FORM_VIEW : ADD_PERSON_FORM_VIEW
  );

  const handleAddNewGuardian = (e) => {
    // e.preventDefault();
    const {
      target: { value },
    } = e;
    console.log("handleAddNewGuardian", { e }, e.target.value);
    if (value === ADD_ANOTHER_GUARDIAN_OPTION)
      setFormView(ADD_PERSON_FORM_VIEW);
  };

  return (
    <>
      <Typography variant="title-small">
        {title} {titleFragment}
      </Typography>
      {subtitle && <Typography>{subtitle}</Typography>}
      {formView === SELECT_PERSON_FORM_VIEW ? (
        <form id={`${id}-select-person`} action={onSelectGuardianSave}>
          <SelectInput
            id={`select-person`}
            options={[
              ...people.map((person) => ({
                label: person.name,
                value: person.id,
              })),
              {
                label: "Add another guardian",
                value: ADD_ANOTHER_GUARDIAN_OPTION,
              },
            ]}
            onChange={handleAddNewGuardian}
          />
          <div className="flex gap-4 mt-8">
            <Button type="submit" value="submit" id={`${id}-submit-button`}>
              {selectPersonForm.primaryCta}
            </Button>
            <Button variant="outlined" onClick={onBack}>
              {selectPersonForm.secondaryCta}
            </Button>
          </div>
        </form>
      ) : (
        <form id={`${id}-add-person`} action={onNewGuardianSave}>
          {addPersonForm.textInputs.length &&
            addPersonForm.textInputs.map((input) => (
              <TextInput key={input.id} {...input} />
            ))}
          <SelectInput {...addPersonForm.selectInput} />
          {infoText && (
            <div className="flex align-middle gap-2 mt-8">
              <InfoIcon width={40} />
              <Typography variant="caption">{infoText}</Typography>
            </div>
          )}
          <div className="flex  gap-4 mt-8">
            <Button type="submit" value="submit" id={`${id}-submit-button`}>
              {addPersonForm.primaryCta}
            </Button>
            <Button variant="outlined" onClick={onBack}>
              {addPersonForm.secondaryCta}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};
export default PersonModalView;

const TODAY = new Date().toISOString().split("T")[0];
const data = {
  selectPersonForm: {
    selectInput: {
      id: "person-select-guardian",
      placeholder: "Guardian",
    },
    primaryCta: "Save",
    secondaryCta: "Back",
  },
  addPersonForm: {
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

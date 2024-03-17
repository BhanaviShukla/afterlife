import { useWill } from "@/appState/WillState";
import { Button, SelectInput, TextInput, Typography } from "@/components";
import AddPersonForm from "@/components/AddPersonForm/AddPersonForm";
import InfoIcon from "@/components/ui/Icons/Informational/info-empty.svg";
import { useEffect, useState } from "react";

const ADD_PERSON_FORM_VIEW = "add-person-form-view";
const SELECT_PERSON_FORM_VIEW = "select-person-form-view";

const ADD_ANOTHER_GUARDIAN_OPTION = "Add Another Guardian";

const GuardianModalView = ({
  form: { id, title, subtitle, infoText },
  titleFragment,
  // onNewPersonSave,
  onGuardianSave,
  onBack,
}) => {
  const {
    will: { people },
  } = useWill();
  const isPersonSelectable = people.length;
  const { selectPersonForm } = data;

  const [formView, setFormView] = useState(
    isPersonSelectable ? SELECT_PERSON_FORM_VIEW : ADD_PERSON_FORM_VIEW
  );
  const [selectedPerson, setSelectedPerson] = useState();
  const [guardianType, setGuardianType] = useState("main"); // main | alternative

  const handleAddNewGuardian = (e) => {
    // e.preventDefault();
    const {
      target: { value },
    } = e;
    console.log("handleAddNewGuardian", { e }, e.target.value);
    if (value === ADD_ANOTHER_GUARDIAN_OPTION) {
      // the new person added will be selected as the person
      setSelectedPerson();
      setFormView(ADD_PERSON_FORM_VIEW);
    } else setSelectedPerson(value);
  };

  const handleNewPersonSave = (personId) => {
    setSelectedPerson(personId);
    setFormView(SELECT_PERSON_FORM_VIEW);
  };

  return (
    <>
      <Typography variant="title-small">
        {title} {titleFragment}
      </Typography>
      {subtitle && <Typography>{subtitle}</Typography>}
      {formView === SELECT_PERSON_FORM_VIEW ? (
        <form
          id={`${id}-select-${guardianType}-guardian`}
          action={onGuardianSave}
        >
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
            value={selectedPerson}
            onChange={handleAddNewGuardian}
            placeholder={`main ${selectPersonForm.placeholder}`}
          />
          <input
            id={`guardian-type`}
            value={guardianType}
            hidden
            disabled
            type="hidden"
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
        <AddPersonForm
          onPersonSave={handleNewPersonSave}
          onBack={() =>
            // isPersonSelectable = true => the user came here from the selectView
            // isPersonSelectable = false => the user came here directly from addChild modal
            isPersonSelectable ? setFormView(SELECT_PERSON_FORM_VIEW) : onBack()
          }
          infoText={infoText}
        />
      )}
    </>
  );
};
export default GuardianModalView;

const data = {
  selectPersonForm: {
    selectInput: {
      id: "person-select-guardian",
      placeholder: "Guardian",
    },
    primaryCta: "Save",
    secondaryCta: "Back",
  },
};

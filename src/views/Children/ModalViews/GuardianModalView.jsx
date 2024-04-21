import { useWill } from "@/appState/WillState";
import {
  Button,
  EditableSelectInput,
  SelectInput,
  TextInput,
  Typography,
} from "@/components";
import AddPersonForm from "@/components/AddPersonForm/AddPersonForm";
import EditPersonModal from "@/components/EditPersonModal/EditPersonModal";
import InfoIcon from "@/components/ui/Icons/Informational/info-empty.svg";
import { useEffect, useState } from "react";

const ADD_PERSON_FORM_VIEW = "add-person-form-view";
const SELECT_PERSON_FORM_VIEW = "select-person-form-view";

const ADD_ANOTHER_GUARDIAN_OPTION = "Add Another Guardian";

const EDIT_GUARDIAN_MODAL = "edit-guardian-details-modal";
const ADD_GUARDIAN_MODAL = "add-another-guardian-modal";

const GuardianModalView = ({
  form: { id, title, subtitle, infoText },
  titleFragment,
  // onNewPersonSave,
  onGuardianSave,
  onBack,
  mainGuardian = undefined,
  altGuardian = undefined,
}) => {
  const {
    will: { people },
  } = useWill();
  const isPersonSelectable = people.length;
  const { selectPersonForm } = data;

  const [formView, setFormView] = useState(
    isPersonSelectable ? SELECT_PERSON_FORM_VIEW : ADD_PERSON_FORM_VIEW
  );
  const [selectedPerson, setSelectedPerson] = useState({
    "main-guardian": mainGuardian || undefined,
    "alternative-guardian": altGuardian || undefined,
  });
  const [editGuardianOpen, setEditGuardianOpen] = useState(undefined);
  const [addGuardianOpen, setAddGuardianOpen] = useState(undefined);

  const handleAddNewGuardian = (name, value) => {
    console.log("handleAddNewGuardian", value === ADD_ANOTHER_GUARDIAN_OPTION);
    if (value === ADD_ANOTHER_GUARDIAN_OPTION) {
      console.log("YESY");
      // the new person added will be selected as the person
      setSelectedPerson((prevState) => ({
        ...prevState,
        [name]: undefined,
      }));
      setAddGuardianOpen(name);
    } else
      setSelectedPerson((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };

  const handleNewPersonSave = (name, personId) => {
    setSelectedPerson((prevState) => ({
      ...prevState,
      [name]: personId,
    }));
  };

  const handleFirstPersonSave = (personId) => {
    // on first save this will always be main guardian
    handleNewPersonSave("main-guardian", personId);
    setFormView(SELECT_PERSON_FORM_VIEW);
  };
  console.log({ selectedPerson });

  return (
    <>
      <Typography variant="title-small">
        {title} {titleFragment}
      </Typography>
      {subtitle && <Typography>{subtitle}</Typography>}
      {formView === SELECT_PERSON_FORM_VIEW ? (
        <form id={`${id}-select-guardian`} action={onGuardianSave}>
          <EditableSelectInput
            id={`main-guardian`}
            options={[
              ...people
                .filter(
                  (person) =>
                    person.id !== selectedPerson[`alternative-guardian`]
                )
                .map((person) => ({
                  label: person.name,
                  value: person.id,
                })),
              {
                label: "Add another guardian",
                value: ADD_ANOTHER_GUARDIAN_OPTION,
              },
            ]}
            value={selectedPerson[`main-guardian`]}
            onChange={handleAddNewGuardian}
            placeholder={`Main Guardian`}
            isEditable
            onEdit={() => setEditGuardianOpen("main-guardian")}
          />
          <EditableSelectInput
            id={`alternative-guardian`}
            options={[
              ...people
                .filter(
                  (person) => person.id !== selectedPerson[`main-guardian`]
                )
                .map((person) => ({
                  label: person.name,
                  value: person.id,
                })),
              {
                label: "Add another guardian",
                value: ADD_ANOTHER_GUARDIAN_OPTION,
              },
            ]}
            value={selectedPerson[`alternative-guardian`]}
            onChange={handleAddNewGuardian}
            placeholder={`Alternative Guardian`}
            isEditable
            onEdit={() => setEditGuardianOpen("alternative-guardian")}
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
          onPersonSave={handleFirstPersonSave}
          onBack={() =>
            // isPersonSelectable = true => the user came here from the selectView
            // isPersonSelectable = false => the user came here directly from addChild modal
            isPersonSelectable ? setFormView(SELECT_PERSON_FORM_VIEW) : onBack()
          }
          infoText={infoText}
        />
      )}
      <EditPersonModal
        id={EDIT_GUARDIAN_MODAL}
        isOpen={Boolean(editGuardianOpen)}
        handleClose={() => setEditGuardianOpen(undefined)}
        title={"Guardian Details"}
        personId={selectedPerson[editGuardianOpen]}
      />
      <EditPersonModal
        id={ADD_GUARDIAN_MODAL}
        isOpen={Boolean(addGuardianOpen)}
        onPersonSave={(personId) =>
          handleNewPersonSave(addGuardianOpen, personId)
        }
        handleClose={() => setAddGuardianOpen(undefined)}
        title={`${title} ${titleFragment}`}
      />
    </>
  );
};
export default GuardianModalView;

const data = {
  selectPersonForm: {
    selectInputs: [
      {
        id: "main-guardian",
        placeholder: "Main Guardian",
      },
      {
        id: "alternative-guardian",
        placeholder: "Alternative Guardian",
      },
    ],
    primaryCta: "Save",
    secondaryCta: "Back",
  },
};

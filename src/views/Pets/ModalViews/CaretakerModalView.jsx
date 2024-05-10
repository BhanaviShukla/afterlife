import { useWill } from "@/appState/WillState";
import { Button, EditableSelectInput, Typography } from "@/components";
import AddPersonForm from "@/components/AddPersonForm/AddPersonForm";
import EditPersonModal from "@/components/EditPersonModal/EditPersonModal";
import { useState } from "react";

const ADD_PERSON_FORM_VIEW = "add-person-form-view";
const SELECT_PERSON_FORM_VIEW = "select-person-form-view";

const ADD_ANOTHER_CARETAKER_OPTION = "Add Another Caretaker";

const EDIT_CARETAKER_MODAL = "edit-caretaker-details-modal";
const ADD_CARETAKER_MODAL = "add-another-caretaker-modal";

const CaretakerModalView = ({
  form: { id, title, subtitle, infoText },
  titleFragment,
  onCaretakerSave,
  onBack,
  caretaker = undefined,
}) => {
  const {
    will: { people },
  } = useWill();
  const isPersonSelectable = people.length;
  const { selectPersonForm } = data;

  const [formView, setFormView] = useState(
    isPersonSelectable ? SELECT_PERSON_FORM_VIEW : ADD_PERSON_FORM_VIEW
  );

  const [selectedPerson, setSelectedPerson] = useState(caretaker || undefined);

  const [isEditCaretakerOpen, setEditCaretakerOpen] = useState(false);
  const [isAddCaretakerOpen, setAddCaretakerOpen] = useState(false);

  const handleAddNewCaretaker = (value) => {
    console.log(
      "handleAddNewCaretaker",
      value === ADD_ANOTHER_CARETAKER_OPTION,
      value
    );
    if (value === ADD_ANOTHER_CARETAKER_OPTION) {
      // the new person added will be selected as the person
      setSelectedPerson(undefined);
      setAddCaretakerOpen(true);
    } else setSelectedPerson(value);
  };

  const handleNewPersonSave = (personId) => {
    setSelectedPerson(personId);
  };

  const handleFirstPersonSave = (personId) => {
    // on first save this will always be main guardian
    handleNewPersonSave(personId);
    setFormView(SELECT_PERSON_FORM_VIEW);
  };

  return (
    <>
      <Typography variant="title-small">
        {title} {titleFragment}
      </Typography>
      {subtitle && <Typography>{subtitle}</Typography>}
      {formView === SELECT_PERSON_FORM_VIEW ? (
        <form id={`${id}-select-caretaker`} action={onCaretakerSave}>
          <EditableSelectInput
            id={selectPersonForm.selectInput.id}
            options={[
              ...people.map((person) => ({
                label: person.name,
                value: person.id,
              })),
              {
                label: ADD_ANOTHER_CARETAKER_OPTION,
                value: ADD_ANOTHER_CARETAKER_OPTION,
              },
            ]}
            value={selectedPerson}
            onChange={(_, value) => handleAddNewCaretaker(value)}
            placeholder={selectPersonForm.selectInput.placeholder}
            isEditable
            onEdit={() => setEditCaretakerOpen(true)}
          />
          <div className="flex gap-4 mt-8">
            <Button
              type="submit"
              value="submit"
              id={`${id}-submit-button`}
              disabled={!selectedPerson}
            >
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
        id={EDIT_CARETAKER_MODAL}
        isOpen={isEditCaretakerOpen}
        handleClose={() => setEditCaretakerOpen(false)}
        title={"Guardian Details"}
        personId={selectedPerson}
      />
      <EditPersonModal
        id={ADD_CARETAKER_MODAL}
        isOpen={isAddCaretakerOpen}
        onPersonSave={(personId) => handleNewPersonSave(personId)}
        handleClose={() => setAddCaretakerOpen(false)}
        title={`${title} ${titleFragment}`}
      />
    </>
  );
};

export default CaretakerModalView;

const data = {
  selectPersonForm: {
    selectInput: {
      id: "caretaker",
      placeholder: "Select caretaker",
    },
    primaryCta: "Save",
    secondaryCta: "Back",
  },
};

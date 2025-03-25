import { useState } from "react";
import { EditableSelectInput } from "@/components";
import EditPersonModal from "../EditPersonModal/EditPersonModal";


const EDIT_PERSON = "edit-person";
const Add_PERSON = "add-person";

export const PersonSelector = ({
  id,
  people,
  placeholder,
  isEditable,
  addAnotherLabel,
  editTitle,
  addTitle,
  onFormSave,
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false)    
  const [selectedPerson, setSelectedPerson] = useState(null); 

  const handleChange = (name, value) => {
    if (value === addAnotherLabel) {
      setIsAddingNew(true);
    } else {
      setSelectedPerson(value)
    }
  };

  return (
    <form id={`${id}-select-person`} action={onFormSave}>
        <EditableSelectInput
            id={id}
            options={[
                ...people.map((person) => ({
                label: person.name,
                value: person.id,
                })),
                { label: addAnotherLabel, value: addAnotherLabel },
            ]}
            value={selectedPerson}
            onChange={handleChange}
            placeholder={placeholder}
            isEditable={isEditable}
            onEdit={()=> setIsEditing(true)}
            required
        />
        <EditPersonModal
            id={EDIT_PERSON}
            isOpen={isEditing}
            handleClose={() => setIsEditing(false)}
            title={editTitle}
            personId={selectedPerson}
        />
        <EditPersonModal
            id={Add_PERSON}
            isOpen={isAddingNew}
            handleClose={() => setIsAddingNew(false)}
            title={addTitle}
            onPersonSave={setSelectedPerson}
        />
    </form>
  );
};

export default PersonSelector;

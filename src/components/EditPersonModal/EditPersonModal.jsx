"use client";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Modal, Typography } from "..";
import AddPersonForm from "../AddPersonForm/AddPersonForm";

const EditPersonModal = ({
  id,
  isOpen,
  title,
  subtitle = "",
  personId,
  onPersonSave,
  handleClose,
}) => {
  console.log({ personId });
  return (
    <Modal id={id} isOpen={isOpen} handleClose={handleClose}>
      {title && <Typography variant="title-small">{title}</Typography>}
      {subtitle && <Typography>{subtitle}</Typography>}
      <ErrorBoundary fallback={<>...</>}>
        <AddPersonForm
          onPersonSave={(personId) => {
            onPersonSave && onPersonSave(personId);
            handleClose();
          }}
          onBack={handleClose}
          // if no personId, then the form adds a new person.
          personId={personId}
        />
      </ErrorBoundary>
    </Modal>
  );
};
export default EditPersonModal;

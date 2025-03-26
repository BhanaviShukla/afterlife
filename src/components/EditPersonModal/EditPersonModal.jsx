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
  return (
    <Modal
      id={`${id}-${personId || "new"}`}
      isOpen={Boolean(isOpen)}
      handleClose={handleClose}
    >
      {title && <Typography variant="title-small">{title}</Typography>}
      {subtitle && <Typography>{subtitle}</Typography>}
      <ErrorBoundary fallback={<>...</>}>
        <AddPersonForm
          onPersonSave={(personIdFromForm) => {
            onPersonSave && onPersonSave(personIdFromForm);
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

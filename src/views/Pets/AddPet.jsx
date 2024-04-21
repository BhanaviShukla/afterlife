"use client";
import { petFormData } from "@/appState/petsData";
import { CarouselIndicator, Modal } from "@/components";
import PetModalView from "@/components/FormModalView";
import { useState } from "react";

const PET_MODAL_VIEW = "pet-modal-view";
const CARETAKER_MODAL_VIEW = "caretaker-modal-view";

const AddPetModal = ({ id, isOpen, setOpen }) => {
  const { petForm, caretakerForm } = petFormData;
  const [modalView, setModalView] = useState(PET_MODAL_VIEW);

  const handleCloseModal = () => {
    setOpen(undefined);
  };

  const [pet, setPet] = useState(null);

  const onPetSubmit = (formData) => {
    const newPet = {
      ...Object.fromEntries(formData),
    };
    console.log("Pet -> on Save", newPet);
    // @TODO: add duplication check util for pet
    setPet(newPet);
    setModalView(CARETAKER_MODAL_VIEW);
  };

  return (
    <Modal id={id} isOpen={isOpen} handleClose={handleCloseModal}>
      {modalView === PET_MODAL_VIEW ? (
        <PetModalView
          form={petForm}
          dataObject={pet}
          onSave={onPetSubmit}
          onCancel={handleCloseModal}
        />
      ) : (
        <>Caretaker modal view</>
      )}
      <CarouselIndicator
        activeItemIndex={modalView === PET_MODAL_VIEW ? 0 : 1}
        itemCount={2}
      />
    </Modal>
  );
};

export default AddPetModal;

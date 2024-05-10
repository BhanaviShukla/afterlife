"use client";
import { petFormData } from "@/appState/petsData";
import { CarouselIndicator, Modal } from "@/components";
import PetModalView from "@/components/FormModalView";
import { useState } from "react";
import CaretakerModalView from "./ModalViews/CaretakerModalView";
import { useWill } from "@/appState/WillState";

const PET_MODAL_VIEW = "pet-modal-view";
const CARETAKER_MODAL_VIEW = "caretaker-modal-view";

const AddPetModal = ({ id, isOpen, setOpen }) => {
  const { addToWill, getWillEntry, patchWillEntry } = useWill();

  const { petForm, caretakerForm } = petFormData;
  const [modalView, setModalView] = useState(PET_MODAL_VIEW);

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

  const onCloseModal = () => {
    setPet(null);
    setOpen(undefined);
  };

  const attachCaretakerToPet = async (caretaker) => {
    console.log(">>>>attachCaretakerToPet", { caretaker });
    const newPet = {
      ...pet,
      caretaker,
    };
    console.log("PET -> TO WILL", newPet);
    setPet(newPet);
    return addToWill("pets", newPet);
  };

  const attachPetToCaretaker = async (person, petId) => {
    if (!person) return;
    console.log(">>>>attachPetToCaretaker", petId, { person });
    if (!person.caretakerOf) person.caretakerOf = [];
    person.caretakerOf.push({
      id: petId,
      "pet-name": pet["pet-name"],
    });

    patchWillEntry("people", person.id, person);
  };

  const onCaretakerSave = async (formData) => {
    const caretakerId = Number(formData.get("caretaker")) || null;
    console.log({ caretakerId });

    if (!caretakerId) {
      console.error("PersonID wasn't parsed");
      return;
    }

    console.log(">>>>fetching details for person", caretakerId);
    const caretaker = getWillEntry("people", caretakerId);
    const petId = await attachCaretakerToPet(caretaker);
    console.log({ petId });
    await attachPetToCaretaker(caretaker, petId);
    onCloseModal();
  };

  return (
    <Modal id={id} isOpen={isOpen} handleClose={onCloseModal}>
      {modalView === PET_MODAL_VIEW ? (
        <PetModalView
          form={petForm}
          dataObject={pet}
          onSave={onPetSubmit}
          onCancel={onCloseModal}
        />
      ) : (
        <CaretakerModalView
          form={caretakerForm}
          titleFragment={pet && pet["pet-name"]}
          onCaretakerSave={onCaretakerSave}
          onBack={() => setModalView(PET_MODAL_VIEW)}
        />
      )}
      <CarouselIndicator
        activeItemIndex={modalView === PET_MODAL_VIEW ? 0 : 1}
        itemCount={2}
      />
    </Modal>
  );
};

export default AddPetModal;

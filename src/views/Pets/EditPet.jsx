"use client";
import { useWill } from "@/appState/WillState";
import { CarouselIndicator, Modal } from "@/components";
import PetModalView from "../../components/FormModalView";
import { useEffect, useState } from "react";
import { areObjectsEqual } from "@/utils/object";
import { petFormData } from "@/appState/petsData";
import CaretakerModalView from "./ModalViews/CaretakerModalView";

const PET_FORM = "pet-form";
const CARETAKER_FORM = "caretaker-form";

const EditPetModal = ({ petId, isOpen, handleClose }) => {
  const {
    will: { people },
    getWillEntry,
    patchWillEntry,
  } = useWill();

  const [pet, setPet] = useState(undefined);
  const [modalView, setModalView] = useState(PET_FORM);

  const { petForm, caretakerForm } = petFormData;

  useEffect(() => {
    setModalView(PET_FORM);
  }, [isOpen]);

  useEffect(() => {
    if (!petId) {
      setPet(undefined);
      return;
    }
    const petWillEntry = getWillEntry("pets", petId);
    if (!petWillEntry) {
      console.error("pet doesn't exist in will", petId);
      return;
    }
    setPet(petWillEntry);
  }, [petId, getWillEntry]);

  useEffect(() => {
    if (!pet) return;
    const updatePetInWill = async () => {
      const petWillEntry = getWillEntry("pets", pet.id);
      if (!petWillEntry) {
        console.error("pet doesn't exist in will", pet.id);
        return;
      }
      if (areObjectsEqual(petWillEntry, pet)) return;
      await patchWillEntry("pets", pet.id, pet);
    };
    updatePetInWill();
  }, [pet, getWillEntry, patchWillEntry]);

  const onPetSave = async (formData) => {
    setPet((prevPet) => ({
      ...prevPet,
      ...Object.fromEntries(formData),
    }));
    setModalView(CARETAKER_FORM);
  };

  console.log("EDIT Pet MODAL", { pet });

  if (!pet) return null;

  const onCaretakerSave = async (formData) => {
    const caretakerId = Number(formData.get("caretaker")) || null;

    if (!caretakerId) {
      console.error("PersonID wasn't parsed");
      return;
    }
    console.log(">>>>fetching details for person", caretakerId);
    const caretaker = getWillEntry("people", caretakerId);

    const oldCaretaker = people.find(
      (person) => person.id === pet.caretaker?.id
    );
    console.log({ oldCaretaker, caretaker });
    const newCaretakerOf = {
      id: Number(petId),
      "pet-name": pet["pet-name"],
    };
    //   if old caretaker is the same as new caretaker, only pet change is required
    if (oldCaretaker && oldCaretaker.id === caretaker.id) {
      console.log(
        oldCaretaker.caretakerOf.filter((id) => id === Number(petId))
      );
      patchWillEntry("people", oldCaretaker.id, {
        ...oldCaretaker,
        caretakerOf: [
          ...oldCaretaker.caretakerOf.filter((id) => id === Number(petId)),
          { ...newCaretakerOf }, // overriding old details
        ],
      });
    } else {
      console.log("OLD not the same as new");

      //   patch old guardians if any
      oldCaretaker?.id &&
        patchWillEntry("people", oldCaretaker.id, {
          ...oldCaretaker,
          caretakerOf: [
            ...oldCaretaker.caretakerOf.filter((id) => id === Number(petId)),
          ],
        });

      //   add pet details to new caretaker
      if (!caretaker.caretakerOf) caretaker.caretakerOf = [];
      caretaker.caretakerOf.push(newCaretakerOf);
      patchWillEntry("people", caretaker.id, caretaker);
    }

    //   add new caretaker details to pet
    setPet((prevPet) => ({
      ...prevPet,
      caretaker,
    }));
    handleClose();
  };

  return (
    <Modal
      id={`edit-pet-modal-${pet.id}`}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {modalView === PET_FORM ? (
        <PetModalView
          form={petForm}
          dataObject={pet}
          onSave={onPetSave}
          onCancel={handleClose}
        />
      ) : (
        <CaretakerModalView
          form={caretakerForm}
          titleFragment={pet?.["pet-name"] || ""}
          onCaretakerSave={onCaretakerSave}
          onBack={() => setModalView(PET_FORM)}
          caretaker={pet.caretaker?.id}
        />
      )}
      <CarouselIndicator
        activeItemIndex={modalView === PET_FORM ? 0 : 1}
        itemCount={2}
      />
    </Modal>
  );
};

export default EditPetModal;

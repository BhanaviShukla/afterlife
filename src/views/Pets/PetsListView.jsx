"use client";
import { ManagedUI } from "@/appState/UIState";
import { useWill } from "@/appState/WillState";
import { Card } from "@/components";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { petsData } from "@/appState/petsData";
import NextStepButton from "@/components/NextStepButton";
import EditPetModal from "./EditPet";
import AddPetModal from "./AddPet";

const ADD_ANOTHER_PET_MODAL = "add-another-pet-modal";
const EDIT_PET_MODAL = "edit-pet-modal";

const PetsListView = ({ slug }) => {
  const {
    will: { pets },
    removeFromWill,
    getWillEntry,
    patchWillEntry,
  } = useWill();
  const {
    petsListView: { addAnotherCard, itemCard, primaryCta },
  } = petsData;

  const router = useRouter();
  const pathname = usePathname();

  const { isOpenModal, setOpenModal } = useContext(ManagedUI);
  const [selectedPet, setSelectedPet] = useState(undefined);

  useEffect(() => {
    if (pets && !pets.length)
      router.replace(`${pathname.replace("/modify", "")}`);
  }, [pets, pathname, router]);

  const handleRemovePet = async (pet) => {
    const personId = Number(pet.caretaker?.id);
    if (personId) {
      const person = getWillEntry("people", personId);
      const newCaretakerOf = (person.caretakerOf || []).filter(
        (p) => p.id !== pet.id
      );
      console.log({ newCaretakerOf });
      await patchWillEntry("people", personId, {
        ...person,
        caretakerOf: newCaretakerOf,
      });
    }

    console.log("removing pet >>>>", pet.id);
    await removeFromWill("pets", pet.id);
  };

  const handlePressEdit = (pet) => {
    console.log("handlePressEdit", pet);
    setSelectedPet(pet.id);
    setOpenModal(EDIT_PET_MODAL);
  };

  const handleCloseEditModal = () => {
    setOpenModal(undefined);
    setSelectedPet(undefined);
  };

  return (
    <>
      <div id="pets-list-view" className="carouselWrapper">
        {pets.map((pet) => (
          <Card.EditItem
            key={pet.id}
            imageName={"pet"}
            badgeText={pet.caretaker?.name || ""}
            onPressCross={() => handleRemovePet(pet)}
            label={pet["pet-name"]}
            subLabel={itemCard.subLabel}
            onPressEdit={() => handlePressEdit(pet)}
          />
        ))}
        <Card.SelectItem
          key="add-another-pet"
          {...addAnotherCard}
          backgroundColor={"--colour-n50"}
          handleSelect={() => setOpenModal(ADD_ANOTHER_PET_MODAL)}
        />
      </div>
      <AddPetModal
        id={ADD_ANOTHER_PET_MODAL}
        isOpen={isOpenModal(ADD_ANOTHER_PET_MODAL)}
        setOpen={setOpenModal}
      />
      <EditPetModal
        petId={selectedPet}
        isOpen={isOpenModal(EDIT_PET_MODAL) && selectedPet}
        handleClose={handleCloseEditModal}
      />
      <div>
        <NextStepButton slug={slug} label={primaryCta} variant="filled" />
      </div>
    </>
  );
};
export default PetsListView;

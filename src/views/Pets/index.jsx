"use client";
import { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useWill } from "@/appState/WillState";
import { Button } from "@/components";
import PlusIcon from "@/components/ui/Icons/Controls/Buttons/plus-button-white.svg";
import { ManagedUI } from "@/appState/UIState";
import { petsData } from "@/appState/petsData";
import AddPetModal from "./AddPet";
import NextStepButton from "@/components/NextStepButton";

const ADD_PET_MODAL = "add_pet_modal";

const PetsView = ({ slug }) => {
  const {
    will: { pets },
  } = useWill();

  const router = useRouter();
  const pathname = usePathname();

  const { addPetView: data } = petsData;

  useEffect(() => {
    if (pets && pets.length) router.replace(`${pathname}/modify`);
  }, [pets, pathname, router]);

  const { isOpenModal, setOpenModal } = useContext(ManagedUI);

  return (
    <div className="flex gap-6">
      <AddPetModal
        id={ADD_PET_MODAL}
        isOpen={isOpenModal(ADD_PET_MODAL)}
        setOpen={setOpenModal}
      />
      <Button
        onClick={() => setOpenModal(ADD_PET_MODAL)}
        rightIcon={<PlusIcon />}
      >
        {data.primaryCta}
      </Button>
      <NextStepButton slug={slug} />
    </div>
  );
};
export default PetsView;

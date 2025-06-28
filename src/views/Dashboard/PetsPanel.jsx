"use client";
import { Typography } from "@/components";
import { PetProfileWithCaretaker } from "@/components/UserProfile";
import { usePetsWithCaretakers } from "@/utils/hooks";
import Image from "next/image";

const PetsPanel = () => {
  const [pets] = usePetsWithCaretakers();
  if (!pets || !pets.length) return null;
  return (
    <div className="bg-slate-100 rounded-lg lg:p-14 p-6">
      <Typography variant="subtitle">Pets</Typography>
      {pets.map((pet, index) => (
        <div
          key={pet?.id}
          className="flex items-center gap-3 lg:mt-10 mt-6 lg:max-w-2xl"
        >
          <Image
            src={`/images/backpack.png`}
            alt={`pet ${pet.petName} backpack`}
            width={100}
            height={100}
            quality={90}
            className={`filter hue-rotate-${index * 15}`}
          />
          <PetProfileWithCaretaker
            name={pet.petName}
            caretaker={pet.caretaker}
            key={pet.id}
            microchip={pet.microchip}
          />
        </div>
      ))}
    </div>
  );
};

export default PetsPanel;

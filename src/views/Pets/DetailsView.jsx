import { Button, TextInput, Typography } from "@/components";
import { useEffect } from "react";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import CrossIcon from "@/components/ui/Icons/Controls/cancel.svg";
import AddChildIcon from "@/components/ui/Icons/Controls/add-user.svg";
import { useRouter } from "next/navigation";
import { useWill } from "@/appState/WillState";
import Image from "next/image";
import {
  useCategoryList,
  useCountFromWillOrSearchParams,
  useDebouncedCallback,
} from "@/utils/hooks";

const DetailsView = ({
  searchParams,
  // pathname,
  title,
  description,
  formData,
  nextLink,
  backLink,
  primaryCta,
  secondaryCta,
}) => {
  const router = useRouter();

  const { will, UNSAFE_replaceWillCategoryByValue, removeFromWill } = useWill();

  const [count, setCount] = useCountFromWillOrSearchParams(
    searchParams,
    "pets"
  );
  const [pets, setPets] = useCategoryList(count, "pets");

  useEffect(() => {
    setCount(Number(searchParams.get("count")) || 1);
  }, [searchParams]);

  const handleNext = () => {
    UNSAFE_replaceWillCategoryByValue("pets", [...pets]);
    router.push(`${nextLink}`);
  };
  const handleBack = () => {
    router.replace(`${backLink}${count}`);
  };

  const onAddAPet = () => {
    setCount((prevCount) => prevCount + 1);
    setPets((prevPets) => [
      ...prevPets,
      {
        id: Date.now() + pets.length,
        dob: "",
        petName: "",
      },
    ]);
  };

  const onRemoveAPet = (id) => {
    setCount((prevCount) => prevCount - 1);
    setPets((prevPets) => [...prevPets.filter((pet) => pet.id !== id)]);

    if (will.pets.find((pet) => pet.id === id)) {
      console.warn("Removing from will", id);
      removeFromWill("pets", id);
    }
  };
  const onChangeInput = (id, name, value) => {
    const editedChild = pets.find((pet) => pet.id === id);

    setPets((prevPets) => [
      // unrelated pets remain as i
      ...prevPets.map((pet) => {
        if (pet.id !== id) return pet;
        else
          return {
            ...editedChild,
            [name]: value,
          };
      }),
    ]);
  };
  const debouncedOnChange = useDebouncedCallback(onChangeInput, 500);

  return (
    <div className="w-full">
      <Typography variant="title-small">{title}</Typography>
      <Typography className="my-10 leading-8">{description}</Typography>
      <form id="pets-details-form" action={handleNext}>
        {pets.map((pet, index) => (
          <div key={pet?.id} className="flex items-center gap-3">
            <Image
              src={`/images/backpack.png`}
              alt={`pet ${pet.petName} backpack`}
              width={100}
              height={100}
              quality={90}
              className={`filter hue-rotate-${index * 15} -scale-x-100`}
            />
            <div className="w-full max-w-[480px]">
              <TextInput
                id={`${pet.id}-${formData.petName.name}`}
                {...formData.petName}
                defaultValue={pet ? pet.petName : undefined}
                onChange={(e) =>
                  debouncedOnChange(
                    pet.id,
                    formData.petName.name,
                    e.target.value
                  )
                }
              />
              {/* microchip */}
              <TextInput
                id={`${pet.id}-${formData.microchip.name}`}
                {...formData.microchip}
                defaultValue={pet ? pet.microchip : undefined}
                onChange={(e) =>
                  debouncedOnChange(
                    pet.id,
                    formData.microchip.name,
                    e.target.value
                  )
                }
              />
              {/* instructions */}
              <TextInput
                id={`${pet.id}-${formData.instructions.name}`}
                {...formData.instructions}
                defaultValue={pet ? pet.instructions : undefined}
                onChange={(e) =>
                  debouncedOnChange(
                    pet.id,
                    formData.instructions.name,
                    e.target.value
                  )
                }
              />
            </div>
            <Button
              variant="text"
              onClick={() => {
                onRemoveAPet(pet.id);
              }}
              className="min-w-0 text-center align-middle ml-12 p-2 hover:bg-slate-100 rounded-lg"
            >
              <CrossIcon width={16} height={17} />
            </Button>
          </div>
        ))}

        <Button
          variant="text"
          leftIcon={<AddChildIcon />}
          className="mt-12"
          onClick={onAddAPet}
        >
          Add another pet
        </Button>

        <div className="flex mt-14 gap-4">
          <Button
            variant="outlined"
            className="self-start"
            leftIcon={<ArrowLeftIcon />}
            onClick={handleBack}
            title={`${backLink}${count}`}
          >
            {secondaryCta}
          </Button>
          <Button
            variant="filled"
            className="self-start"
            rightIcon={<ArrowRightIcon />}
            type="submit"
            value="submit"
            id={`pets-details-submit-button`}
            title={`${nextLink}`}
          >
            {primaryCta}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DetailsView;

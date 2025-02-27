import {
  Button,
  Checkbox,
  EditableSelectInput,
  UserProfileVariants,
} from "@/components";
import CrossIcon from "@/components/ui/Icons/Controls/cancel.svg";
import { useWill } from "@/appState/WillState";
import { memo, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import EditPersonModal from "@/components/EditPersonModal/EditPersonModal";
import { useDebouncedCallback } from "@/utils/hooks";
import { areObjectsEqual } from "@/utils/object";

const ADD_ANOTHER_CARETAKER_OPTION = "Add Another Caretaker";

const EDIT_CARETAKER_MODAL = "edit-caretaker-details-modal";
const ADD_CARETAKER_MODAL = "add-another-caretaker-modal";

export const CaretakerForPet = memo(
  ({ petId, index, onChangeCaretaker, onRemoveAPet, isFirst }) => {
    const debouncedOnChangeCaretaker = useDebouncedCallback(
      onChangeCaretaker,
      500
    );

    const { getWillEntry, getWillCategory } = useWill();
    const pet = useMemo(
      () => getWillEntry("pets", petId),
      [petId, getWillEntry]
    );
    const people = useMemo(() => getWillCategory("people"), [getWillCategory]);
    const allPets = getWillCategory("pets").sort((a, b) => a.id - b.id);
    const firstCaretakers = allPets[0].caretaker;

    const defaultCaretakers = {
      main: pet.caretaker?.main || undefined,
      alternative: pet.caretaker?.alternative || undefined,
    };
    const [selectedCaretaker, setSelectedCaretaker] = useState({
      ...defaultCaretakers,
    });
    const [isCaretakerSameAsFirst, setIsCaretakerSameAsFirst] = useState(
      !isFirst && areObjectsEqual(selectedCaretaker, firstCaretakers)
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      if (!areObjectsEqual(selectedCaretaker, pet.caretaker))
        debouncedOnChangeCaretaker(petId, selectedCaretaker);
      setIsLoading(false);
    }, [selectedCaretaker, petId, debouncedOnChangeCaretaker, pet.caretaker]);

    const [editCaretakerOpen, setEditCaretakerOpen] = useState(undefined);
    const [addCaretakerOpen, setAddCaretakerOpen] = useState(undefined);

    const handleAddNewCaretaker = (name, value) => {
      if (value === ADD_ANOTHER_CARETAKER_OPTION) {
        // the new person added will be selected as the person
        setSelectedCaretaker((prevState) => ({
          ...prevState,
          [name]: undefined,
        }));
        setAddCaretakerOpen(name);
      } else
        setSelectedCaretaker((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    const handleNewPersonSave = (name, personId) => {
      setIsLoading(true);
      setSelectedCaretaker((prevState) => ({
        ...prevState,
        [name]: personId,
      }));
    };

    const options = [
      ...people.map((person) => ({
        label: person.name,
        value: person.id,
      })),
      {
        label: "Add another caretaker",
        value: ADD_ANOTHER_CARETAKER_OPTION,
      },
    ];

    console.log({ isCaretakerSameAsFirst, isFirst });

    return (
      <div key={petId} className="flex items-center gap-3">
        <Image
          src={`/images/backpack.png`}
          alt={`pet ${pet.petName} backpack`}
          width={100}
          height={100}
          quality={90}
          className={`filter hue-rotate-${index * 15} -scale-x-100`}
        />
        <div
          className="w-full max-w-[480px]"
          id={`caretaker-form-wrapper-${petId}`}
        >
          <UserProfileVariants.PetProfileWithMicrochip
            name={pet.petName}
            microchip={pet.microchip}
          />
          {!isLoading && (isFirst || !isCaretakerSameAsFirst) && (
            <>
              <EditableSelectInput
                id={`${petId}-main`}
                options={options}
                defaultValue={selectedCaretaker[`main`]}
                filterOption={(option) =>
                  option.value !== selectedCaretaker[`alternative`]
                }
                onChange={(_, value) => handleAddNewCaretaker("main", value)}
                placeholder={`Add caretaker`}
                isEditable
                onEdit={() => {
                  setEditCaretakerOpen("main");
                  setIsLoading(true);
                }}
                required
              />
              <EditableSelectInput
                id={`${petId}-alternative`}
                options={options}
                filterOption={(option, _) =>
                  option.value !== selectedCaretaker[`main`]
                }
                defaultValue={selectedCaretaker[`alternative`]}
                onChange={(_, value) =>
                  handleAddNewCaretaker("alternative", value)
                }
                placeholder={`Add alternatve caretaker (optional)`}
                isEditable
                onEdit={() => setEditCaretakerOpen("alternative")}
              />
            </>
          )}
          {!isFirst ? (
            <Checkbox
              checked={isCaretakerSameAsFirst}
              label={"Appoint the same as first pet"}
              onChange={(event) => {
                const newValue = event.target.checked;
                setIsCaretakerSameAsFirst(newValue);
                if (newValue)
                  setSelectedCaretaker({
                    main: firstCaretakers.main,
                    alternative: firstCaretakers.alternative,
                  });
                else
                  setSelectedCaretaker({
                    main: undefined,
                    alternative: undefined,
                  });
              }}
            />
          ) : (
            <></>
          )}
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
        <EditPersonModal
          key={`${EDIT_CARETAKER_MODAL}-${petId}`}
          id={`${EDIT_CARETAKER_MODAL}-${petId}`}
          isOpen={Boolean(editCaretakerOpen)}
          handleClose={() => setEditCaretakerOpen(undefined)}
          title={"Caretaker Details"}
          personId={selectedCaretaker[editCaretakerOpen]}
        />
        <EditPersonModal
          key={`${ADD_CARETAKER_MODAL}-${petId}`}
          id={`${ADD_CARETAKER_MODAL}-${petId}`}
          isOpen={Boolean(addCaretakerOpen)}
          onPersonSave={(personId) =>
            handleNewPersonSave(addCaretakerOpen, personId)
          }
          handleClose={() => setAddCaretakerOpen(undefined)}
          title={`Add a new person`}
        />
      </div>
    );
  }
);

CaretakerForPet.displayName = "CaretakerForPet";

import {
  Button,
  Checkbox,
  EditableSelectInput,
  UserProfileVariants,
} from "@/components";
import CrossIcon from "@/components/ui/Icons/Controls/cancel.svg";
import { useWill } from "@/appState/WillState";
import { memo, useEffect, useMemo, useState } from "react";
import { sortObjectByDob } from "../useCountHook";
import Image from "next/image";
import EditPersonModal from "@/components/EditPersonModal/EditPersonModal";
import { useDebouncedCallback } from "@/utils/hooks";
import { areObjectsEqual } from "@/utils/object";

const ADD_ANOTHER_GUARDIAN_OPTION = "Add Another Guardian";

const EDIT_GUARDIAN_MODAL = "edit-guardian-details-modal";
const ADD_GUARDIAN_MODAL = "add-another-guardian-modal";

export const GuardianForChild = memo(
  ({ childId, index, onChangeGuardian, onRemoveAChild, isEldest }) => {
    const debouncedOnChangeGuardian = useDebouncedCallback(
      onChangeGuardian,
      500
    );

    const { getWillEntry, getWillCategory } = useWill();
    const child = useMemo(
      () => getWillEntry("children", childId),
      [childId, getWillEntry]
    );
    const people = useMemo(() => getWillCategory("people"), [getWillCategory]);
    const allChildren = getWillCategory("children").sort(sortObjectByDob);
    const eldestGuardians = allChildren[0].guardian;

    const defaultGuardians = {
      main: child.guardian?.main || undefined,
      alternative: child.guardian?.alternative || undefined,
    };
    const [selectedGuardian, setSelectedGuardian] = useState({
      ...defaultGuardians,
    });
    const [isGuardianSameAsEldest, setIsGuardianSameAsEldest] = useState(
      !isEldest && areObjectsEqual(selectedGuardian, eldestGuardians)
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      console.log("updating will");
      setIsLoading(true);
      if (!areObjectsEqual(selectedGuardian, child.guardian))
        debouncedOnChangeGuardian(childId, selectedGuardian);
      setIsLoading(false);
    }, [selectedGuardian, childId, debouncedOnChangeGuardian, child.guardian]);

    const [editGuardianOpen, setEditGuardianOpen] = useState(undefined);
    const [addGuardianOpen, setAddGuardianOpen] = useState(undefined);

    const handleAddNewGuardian = (name, value) => {
      if (value === ADD_ANOTHER_GUARDIAN_OPTION) {
        // the new person added will be selected as the person
        setSelectedGuardian((prevState) => ({
          ...prevState,
          [name]: undefined,
        }));
        setAddGuardianOpen(name);
      } else
        setSelectedGuardian((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    const handleNewPersonSave = (name, personId) => {
      setIsLoading(true);
      setSelectedGuardian((prevState) => ({
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
        label: "Add another guardian",
        value: ADD_ANOTHER_GUARDIAN_OPTION,
      },
    ];

    console.log({ isGuardianSameAsEldest, isEldest });

    return (
      <div key={childId} className="flex items-center gap-3">
        <Image
          src={`/images/backpack.png`}
          alt={`child ${child.childName} backpack`}
          width={100}
          height={100}
          quality={90}
          className={`filter hue-rotate-${index * 15} -scale-x-100`}
        />
        <div
          className="w-full max-w-[480px]"
          id={`guardian-form-wrapper-${childId}`}
        >
          <UserProfileVariants.UserProfileWithDob
            name={child.childName}
            dob={child.dob}
          />
          {!isLoading && (isEldest || !isGuardianSameAsEldest) && (
            <>
              <EditableSelectInput
                id={`${childId}-main`}
                options={options}
                defaultValue={selectedGuardian[`main`]}
                filterOption={(option) =>
                  option.value !== selectedGuardian[`alternative`]
                }
                onChange={(_, value) => handleAddNewGuardian("main", value)}
                placeholder={`Main Guardian`}
                isEditable
                onEdit={() => {
                  setEditGuardianOpen("main");
                  setIsLoading(true);
                }}
                required
              />
              <EditableSelectInput
                id={`${childId}-alternative`}
                options={options}
                filterOption={(option, _) =>
                  option.value !== selectedGuardian[`main`]
                }
                defaultValue={selectedGuardian[`alternative`]}
                onChange={(_, value) =>
                  handleAddNewGuardian("alternative", value)
                }
                placeholder={`Alternative Guardian`}
                isEditable
                onEdit={() => setEditGuardianOpen("alternative")}
              />
            </>
          )}
          {!isEldest ? (
            <Checkbox
              checked={isGuardianSameAsEldest}
              label={"Appoint the same as first child"}
              onChange={(event) => {
                const newValue = event.target.checked;
                setIsGuardianSameAsEldest(newValue);
                if (newValue)
                  setSelectedGuardian({
                    main: eldestGuardians.main,
                    alternative: eldestGuardians.alternative,
                  });
                else
                  setSelectedGuardian({
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
            onRemoveAChild(child.id);
          }}
          className="min-w-0 text-center align-middle ml-12 p-2 hover:bg-slate-100 rounded-lg"
        >
          <CrossIcon width={16} height={17} />
        </Button>
        <EditPersonModal
          key={`${EDIT_GUARDIAN_MODAL}-${childId}`}
          id={`${EDIT_GUARDIAN_MODAL}-${childId}`}
          isOpen={Boolean(editGuardianOpen)}
          handleClose={() => setEditGuardianOpen(undefined)}
          title={"Guardian Details"}
          personId={selectedGuardian[editGuardianOpen]}
        />
        <EditPersonModal
          key={`${ADD_GUARDIAN_MODAL}-${childId}`}
          id={`${ADD_GUARDIAN_MODAL}-${childId}`}
          isOpen={Boolean(addGuardianOpen)}
          onPersonSave={(personId) =>
            handleNewPersonSave(addGuardianOpen, personId)
          }
          handleClose={() => setAddGuardianOpen(undefined)}
          title={`Add a new person`}
        />
      </div>
    );
  }
);

GuardianForChild.displayName = "GuardianForChild";

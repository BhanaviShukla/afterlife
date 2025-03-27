import {
  Button,
  EditableSelectInput,
  PercentageInput,
  Typography,
} from "@/components";
import CrossIcon from "@/components/ui/Icons/Controls/cancel.svg";
import EditPersonModal from "@/components/EditPersonModal/EditPersonModal";
import { useDebouncedCallback } from "@/utils/hooks";
import { areObjectsEqual } from "@/utils/object";
import { memo, useEffect, useState } from "react";

const ADD_NEW_BENEFICIARY_OPTION = "Add a new beneficiary";

const EDIT_BENEFICIARY_MODAL = "edit-beneficiary-details-modal";
const ADD_BENEFICIARY_MODAL = "add-another-beneficiary-modal";

const DistributionForm = memo(
  ({
    totalAssetPercentage,
    availableBeneficiaries,
    onChangeDistribution,
    onRemoveDistribution,
    id = "empty",
    distribution = undefined,
  }) => {
    console.log({ distribution });
    const [currentDistribution, setCurrentDistribution] = useState(
      distribution ?? {
        beneficiary: undefined,
        allocationPercentage: 100 - totalAssetPercentage ?? 0,
      }
    );

    const [openModal, setOpenModal] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const options = [
      ...availableBeneficiaries?.map((person) => ({
        label: person.name,
        value: person.id,
      })),
      {
        label: "Add a new beneficiary",
        value: ADD_NEW_BENEFICIARY_OPTION,
      },
    ];

    const handleOptionSelection = (value) => {
      if (value === ADD_NEW_BENEFICIARY_OPTION) {
        // the new person added will be selected as the person
        setCurrentDistribution((prevValue) => ({
          ...prevValue,
          beneficiary: undefined,
        }));
        setAddBeneficiaryOpen(name);
      } else
        setCurrentDistribution((prevValue) => ({
          ...prevValue,
          beneficiary: value,
        }));
    };

    const handleNewPersonSave = (personId) => {
      setIsLoading(true);
      setCurrentDistribution((prevValue) => ({
        ...prevValue,
        beneficiary: personId,
      }));
    };

    const debouncedOnChange = useDebouncedCallback(onChangeDistribution, 500);

    useEffect(() => {
      setIsLoading(true);
      if (!areObjectsEqual(distribution, currentDistribution)) {
        console.log("debounced on change called");
        debouncedOnChange(id, currentDistribution);
      }
      setIsLoading(false);
    }, [distribution, id, debouncedOnChange, currentDistribution]);

    const handleAllocationChange = (value) => {
      setCurrentDistribution((prevValue) => ({
        ...prevValue,
        allocationPercentage: value,
      }));
    };

    return (
      <>
        <div className="flex" id={id}>
          {!isLoading && options.length ? (
            <div className="flex flex-wrap items-end gap-x-2">
              <EditableSelectInput
                id={`${id}-beneficiary`}
                options={options}
                defaultValue={currentDistribution.beneficiary}
                onChange={(_, value) => handleOptionSelection(value)}
                placeholder={`Add Beneficiary`}
                isEditable
                onEdit={() => {
                  setOpenModal(EDIT_BENEFICIARY_MODAL);
                  setIsLoading(true);
                }}
                required
                loading={isLoading}
                wrapperClassName={"flex-1 min-w-56"}
              />
              <PercentageInput
                value={currentDistribution.allocationPercentage}
                onChange={handleAllocationChange}
              />
            </div>
          ) : (
            <></>
          )}

          <Button
            id={`${id}-button-to-remove`}
            variant="text"
            onClick={() => {
              onRemoveDistribution(id);
            }}
            className="min-w-0 text-center align-middle ml-12 p-2 hover:bg-slate-100 rounded-lg"
          >
            <CrossIcon width={16} height={17} />
          </Button>
        </div>
        {/* Edit Beneficiary */}

        <EditPersonModal
          key={`${EDIT_BENEFICIARY_MODAL}-${id}`}
          id={`${EDIT_BENEFICIARY_MODAL}-${id}`}
          isOpen={openModal === EDIT_BENEFICIARY_MODAL}
          handleClose={() => setOpenModal(undefined)}
          title={"Beneficiary Details"}
          personId={currentDistribution.beneficiary}
        />
        {/* Add a new person */}
        <EditPersonModal
          key={`${ADD_BENEFICIARY_MODAL}-${id}`}
          id={`${ADD_BENEFICIARY_MODAL}-${id}`}
          isOpen={openModal === ADD_BENEFICIARY_MODAL}
          onPersonSave={(personId) => handleNewPersonSave(personId)}
          handleClose={() => setOpenModal(undefined)}
          title={`Add a new person`}
        />
      </>
    );
  }
);
DistributionForm.displayName = "DistributionForm";

export default DistributionForm;

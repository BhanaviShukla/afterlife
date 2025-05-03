"use client";
import {
  Button,
  EditableSelectInput,
  ErrorMessage,
  PercentageInput,
  Typography,
} from "@/components";
import CrossIcon from "@/components/ui/Icons/Controls/cancel.svg";
import EditPersonModal from "@/components/EditPersonModal/EditPersonModal";
import { useDebouncedCallback } from "@/utils/hooks";
import { areObjectsEqual } from "@/utils/object";
import { memo, useEffect, useState } from "react";
import { beneficiaryIdsFromOtherAssets } from "./useAssetsHook";

const ADD_NEW_BENEFICIARY_OPTION = "Add a new beneficiary";

const EDIT_BENEFICIARY_MODAL = "edit-beneficiary-details-modal";
const ADD_BENEFICIARY_MODAL = "add-another-beneficiary-modal";

const FormSkeleton = () => {
  return (
    <div role="status" className="flex flex-wrap items-end gap-x-2">
      <div className="flex items-center justify-between form__group ">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

const DistributionForm = memo(
  ({
    isLast,
    totalAssetPercentage,
    availableBeneficiaries,
    optionFilter,
    onChangeDistribution,
    onRemoveDistribution,
    id = "empty",
    distribution = undefined,
  }) => {
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
      setIsLoading(true);
      if (value === ADD_NEW_BENEFICIARY_OPTION) {
        // the new person added will be selected as the person
        setCurrentDistribution((prevValue) => ({
          ...prevValue,
          beneficiary: undefined,
        }));

        setOpenModal(ADD_BENEFICIARY_MODAL);
      } else
        setCurrentDistribution((prevValue) => ({
          ...prevValue,
          beneficiary: value,
        }));
    };

    const handleNewPersonSave = (personId) => {
      console.log("new person save");
      setIsLoading(true);
      setCurrentDistribution((prevValue) => ({
        ...prevValue,
        beneficiary: personId,
      }));
    };

    const debouncedOnChange = useDebouncedCallback(onChangeDistribution, 500);

    useEffect(() => {
      if (!areObjectsEqual(distribution, currentDistribution)) {
        debouncedOnChange(id, currentDistribution);
      }
      isLoading && setIsLoading(false);
    }, [distribution, id, debouncedOnChange, currentDistribution]);

    const handleAllocationChange = (value) => {
      setCurrentDistribution((prevValue) => ({
        ...prevValue,
        allocationPercentage: value,
      }));
    };
    const hasError = totalAssetPercentage > 100;

    return (
      <>
        <div className="flex" id={id}>
          {!isLoading ? (
            <div className="flex flex-wrap items-end gap-x-2">
              <EditableSelectInput
                id={`${id}-beneficiary`}
                options={options}
                filterOption={(option) => optionFilter(option, id)}
                value={currentDistribution.beneficiary}
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
                error={hasError}
                errorMessage={isLast ? "Over 100%" : undefined}
              />
              {}
            </div>
          ) : (
            <FormSkeleton />
          )}

          <Button
            id={`${id}-button-to-remove`}
            variant="text"
            onClick={() => {
              setIsLoading(true);
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

"use client";
import { EditableSelectInput, TextInput } from "@/components";
import EditPersonModal from "@/components/EditPersonModal/EditPersonModal";
import { useDebouncedCallback } from "@/utils/hooks";
import { memo, useState } from "react";

const ADD_NEW_EXECUTOR_OPTION = "Add a new executor";

const EDIT_EXECUTOR_MODAL = "edit-executor-details-modal";
const ADD_EXECUTOR_MODAL = "add-another-executor-modal";

const ExecutorForm = memo(
  ({
    id = "executor-form",
    executor = {},
    availableExecutors = [],
    onChangeExecutor,
    optionFilter,
    isLoading,
    setIsLoading,
  }) => {
    const debouncedOnChange = useDebouncedCallback(onChangeExecutor, 500);
    const [openModal, setOpenModal] = useState(undefined);

    const options = [
      ...availableExecutors.map((person) => ({
        label: person.name,
        value: person.id,
      })),
      {
        label: ADD_NEW_EXECUTOR_OPTION,
        value: ADD_NEW_EXECUTOR_OPTION,
      },
    ];

    console.log({ options });

    const handleExecutorChange = (personId) => {
      if (personId === executor.personId) return;
      debouncedOnChange(executor.id, { ...executor, personId });
    };
    const handleIdentityNumberChange = (idNumber) => {
      if (idNumber === executor.idNumber) return;
      debouncedOnChange(executor.id, { ...executor, idNumber });
    };

    const handleOptionSelection = (value) => {
      if (value === ADD_NEW_EXECUTOR_OPTION) {
        handleExecutorChange(undefined);
        setOpenModal(ADD_EXECUTOR_MODAL);
      } else {
        handleExecutorChange(value);
      }
    };

    const handleNewExecutorUpdate = (newPersonId) =>
      handleExecutorChange(newPersonId);

    return (
      <>
        <div className="flex max-w-[520px]" id={id}>
          <div className="flex-col flex-1 items-end">
            <EditableSelectInput
              id={`${id}-executor`}
              options={options}
              filterOption={(option) => optionFilter(option, executor.id)}
              value={executor.personId}
              onChange={(_, value) => handleOptionSelection(value)}
              placeholder="Add executor"
              isEditable
              onEdit={() => {
                setOpenModal(EDIT_EXECUTOR_MODAL);
                setIsLoading(true);
              }}
              required
              loading={isLoading}
              wrapperClassName="flex-1 min-w-56"
            />
            <TextInput
              id={`${id}-identity`}
              placeholder="NRIC or Passport number"
              defaultValue={executor.idNumber}
              onChange={(e) => handleIdentityNumberChange(e.target.value)}
              required
              // className="flex flex-1"
            />
          </div>
        </div>

        {/* Edit Executor */}

        <EditPersonModal
          key={`${EDIT_EXECUTOR_MODAL}-${id}`}
          id={`${EDIT_EXECUTOR_MODAL}-${id}`}
          isOpen={openModal === EDIT_EXECUTOR_MODAL}
          handleClose={() => setOpenModal(undefined)}
          title="Executor Details"
          personId={executor.id}
        />
        {/* Add a new person */}
        <EditPersonModal
          key={`${ADD_EXECUTOR_MODAL}-${id}`}
          id={`${ADD_EXECUTOR_MODAL}-${id}`}
          isOpen={openModal === ADD_EXECUTOR_MODAL}
          onPersonSave={handleNewExecutorUpdate}
          handleClose={() => setOpenModal(undefined)}
          title="Add a new person"
        />
      </>
    );
  }
);

ExecutorForm.displayName = "ExecutorForm";
export default ExecutorForm;

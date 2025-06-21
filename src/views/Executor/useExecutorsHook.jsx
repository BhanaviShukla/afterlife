import { useWill } from "@/appState/WillState";
import { areObjectsEqual } from "@/utils/object";
import { useCallback, useEffect, useState } from "react";

/*
executors: [
  {
    personId: <personId>
    indentityNumber: NRIC id number
  }
]
*/
const DEFAULT_EMPTY_EXECUTOR = {
  personId: "",
  idNumber: "",
};
export const canShowAddSecondExecutorCta = (executors) => {
  executors.length === 1 && Boolean(executors[0].id);
};

export const useExecutors = () => {
  const { will, addToWill, getWillCategory, patchWillEntry } = useWill();

  const getExecutors = useCallback(
    () => getWillCategory("executors"),
    [getWillCategory]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [executors, setExecutors] = useState([...getExecutors()]);
  const [availableExecutors, setAvailableExecutors] = useState([
    ...will.people,
  ]);

  const onAddEmptyExecutor = useCallback(() => {
    console.log("ADDING EMPTY");
    console.log({ isLoading }, executors.length);
    if (isLoading || executors.length === 2) {
      console.warn("LOADING or limit reached");
      return;
    }

    setIsLoading(true);
    console.log("ADDING EMPTY");
    const id = addToWill("executors", {
      ...DEFAULT_EMPTY_EXECUTOR,
    });
    if (!id) {
      console.error("something went wrong while adding executor");
    }
  }, [addToWill, executors.length, isLoading]);

  const onChangeExecutor = (id, newExecutor, shouldSetLoading = true) => {
    if (isLoading) {
      console.warn("LOADING");
      return;
    }
    if (shouldSetLoading) setIsLoading(true);

    const isUpdated = patchWillEntry("executors", id, { ...newExecutor });
    if (!isUpdated) {
      console.error("Couldn't update executor for some reason");
    }
  };

  const setJointExecutors = (isJoint) => {
    if (isLoading) {
      console.warn("LOADING");
      return;
    }

    executors.forEach((executor, index) => {
      onChangeExecutor(
        executor.id,
        {
          ...executor,
          isJoint,
        },
        index === 0 // set isLoading to true only the first time
      );
    });
  };

  // provides a filter for options so that already selected primary executor isn't an option for secondary executor and vice-versa
  const executorIdsFromOtherExecutors = (currentOptionExecutorId = "") =>
    executors
      .filter((a) => a.id !== currentOptionExecutorId)
      .map((executor) => executor.personId);

  const optionsFilterForAvailableExecutors = (
    option = {
      label: "",
      value: "",
    },
    currentOptionExecutorId
  ) =>
    !executorIdsFromOtherExecutors(option, currentOptionExecutorId).includes(
      option.value
    );

  useEffect(() => {
    const newWillExectors = [...getExecutors()];
    console.log({ newWillExectors, willExecutors: will.executors });
    console.log({ newWillExectors });
    if (areObjectsEqual(executors, newWillExectors)) {
      // do nothin
      console.log("Objects are equal");
      setIsLoading(false);
      return;
    }
    setExecutors(newWillExectors);
    setAvailableExecutors([...getWillCategory("people")]);
    setIsLoading(false);
  }, [executors, getWillCategory, getExecutors, will.executors]);

  return {
    executors,
    availableExecutors,

    onAddEmptyExecutor,
    onChangeExecutor,
    setJointExecutors,

    isLoading,
    setIsLoading,

    optionsFilterForAvailableExecutors,
  };
};

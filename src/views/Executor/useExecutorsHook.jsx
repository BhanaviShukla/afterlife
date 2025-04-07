import { areObjectsEqual } from "@/utils/object";

const { useWill } = require("@/appState/WillState");
const { useState, useEffect } = require("react");

export const useExecutors = () => {
  const { will, addToWill, patchWillEntry, getWillCategory } = useWill();
  const getExecutors = () => getWillCategory("executors");
  const [executors, setExecutors] = useState([
    { executorId: "", identityDocumentNumber: "" },
  ]);

  console.log(getExecutors());

  const onChangeExecutor = (
    id = "",
    executorInfo = {
      executorId: "",
      identityDocumentNumber: "",
    }
  ) => {
    if (!id) {
      console.log("Adding new executor to will");
      if (!executorInfo.executorId) {
        console.warn("didn't fine required information, noop");
        return;
      }
      const idFromWill = addToWill("executors", { ...executorInfo });
      console.log(`added ENTRY ${idFromWill} to the will`);
      return;
    }
    const isUpdated = patchWillEntry("executors", id, { ...executorInfo });
    if (isUpdated) console.log(`updated ENTRY ${idFromWill} to the will`);
    else console.error(`couldn't update ENTRY ${idFromWill} for some reason`);
  };

  useEffect(() => {
    if (areObjectsEqual(executors, will.executors) || !will.executors.length) {
      // do nothin
      return;
    }
    setExecutors([...getExecutors()]);
  }, [executors, will.executors]);

  return [executors, onChangeExecutor];
};

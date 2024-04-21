import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";

export const initialWillState = {
  children: [],
  pets: [],
  assets: [],
  rites: [],
  people: [],
};

export const WillContext = createContext({
  will: initialWillState,
});

export function WillProvider({ children }) {
  const [will, setWill] = useState(() =>
    getLocalStorage("will", initialWillState)
  );

  useEffect(() => {
    setLocalStorage("will", will);
  }, [will]);

  const addToWill = useCallback(
    (category, value) => {
      const id = Date.now();
      setWill((prevWillData) => ({
        ...prevWillData,
        [category]: [
          ...prevWillData[category],
          {
            id,
            ...value,
          },
        ],
      }));
      return id;
    },
    [setWill]
  );

  const removeFromWill = useCallback(
    (category, id) => {
      setWill((prevWillData) => ({
        ...prevWillData,
        [category]: prevWillData[category].filter((item) => item.id != id),
      }));
    },
    [setWill]
  );

  const getWillEntry = useCallback(
    (category, id) => {
      return { ...will[category].find((item) => item.id === id) };
    },
    [will]
  );

  const patchWillEntry = useCallback(
    (category, id, modifiedEntry) => {
      setWill((prevWillData) => ({
        ...prevWillData,
        [category]: [
          ...prevWillData[category].filter((item) => item.id != id),
          { id, ...modifiedEntry },
        ],
      }));
    },
    [setWill]
  );
  console.log("WILL PROVIDER", { will });

  const memoizedWillProviderValue = useMemo(
    () => ({
      will,
      addToWill,
      removeFromWill,
      getWillEntry,
      patchWillEntry,
    }),
    [will, addToWill, removeFromWill, getWillEntry, patchWillEntry]
  );
  return (
    <WillContext.Provider value={memoizedWillProviderValue}>
      {children}
    </WillContext.Provider>
  );
}

export function useWill() {
  return useContext(WillContext);
}

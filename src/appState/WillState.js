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
  user: [],
  children: [],
  pets: [],
  assets: [],
  rites: [],
  executor: [],
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
        [category]: prevWillData[category].filter((item) => item.id !== id),
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

  const getWillCategory = useCallback(
    (category) => {
      if (will.hasOwnProperty(category)) return will[category];
      else return undefined;
    },
    [will]
  );

  const UNSAFE_replaceWillCategoryByValue = useCallback(
    (category, value) => {
      if (will.hasOwnProperty(category))
        setWill((prevWillData) => ({
          ...prevWillData,
          [category]: value,
        }));
      else return undefined;
    },
    [will]
  );

  const patchWillEntry = useCallback(
    (category, id, modifiedEntry) => {
      if (will.hasOwnProperty(category)) {
        const valueForId = will[category].find((item) => item.id === id);
        if (valueForId) {
          setWill((prevWillData) => ({
            ...prevWillData,
            [category]: [
              ...prevWillData[category].filter((item) => item.id != id),
              { id, ...valueForId, ...modifiedEntry },
            ],
          }));
          return true;
        }
      }
      return false;
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
      getWillCategory,
      UNSAFE_replaceWillCategoryByValue,
      patchWillEntry,
    }),
    [
      will,
      addToWill,
      removeFromWill,
      getWillCategory,
      getWillEntry,
      UNSAFE_replaceWillCategoryByValue,
      patchWillEntry,
    ]
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

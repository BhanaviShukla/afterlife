import { createContext, useContext, useEffect, useState } from "react";
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

  const addToWill = (category, value) => {
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
  };

  const removeFromWill = (category, id) => {
    setWill((prevWillData) => ({
      ...prevWillData,
      [category]: prevWillData[category].filter((item) => item.id != id),
    }));
  };

  const getWillEntry = (category, id) => {
    return { ...will[category].find((item) => item.id === id) };
  };

  const patchWillEntry = (category, id, modifiedEntry) => {
    setWill((prevWillData) => ({
      ...prevWillData,
      [category]: [
        ...prevWillData[category].filter((item) => item.id != id),
        { id, ...modifiedEntry },
      ],
    }));
  };
  console.log("WILL PROVIDER", { will });
  return (
    <WillContext.Provider
      value={{
        will,
        addToWill,
        removeFromWill,
        getWillEntry,
        patchWillEntry,
      }}
    >
      {children}
    </WillContext.Provider>
  );
}

export function useWill() {
  return useContext(WillContext);
}

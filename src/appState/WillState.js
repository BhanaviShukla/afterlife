import { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";

export const initialWillState = {
  children: [],
  pets: [],
  assets: [],
  rites: [],
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

  const addToWill = (id, value) => {
    const newWillObject = {
      ...will,
      [id]: {
        ...will[id],
        value,
      },
    };
    console.log("ADD TO WILL", newWillObject);
    setWill(newWillObject);
  };

  const removeFromWill = (id, subId) => {
    const newWillObject = {
      ...will,
      [id]: will[id].filter((items) => items.id != subId),
    };
    setWill(newWillObject);
  };
  console.log("WILL PROVIDER", { will });
  return (
    <WillContext.Provider
      value={{
        will,
        addToWill,
        removeFromWill,
      }}
    >
      {children}
    </WillContext.Provider>
  );
}

export function useWill() {
  return useContext(WillContext);
}

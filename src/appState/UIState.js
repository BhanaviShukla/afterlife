import { createContext, useState } from "react";

//Defining context
export const ManagedUI = createContext(undefined);

//Context Wrapper
export function ManagedUIProvider({ children }) {
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <ManagedUI.Provider
      value={{
        isOpenModal,
        setOpenModal,
      }}
    >
      {children}
    </ManagedUI.Provider>
  );
}

import { createContext, useState } from "react";

//Defining context
export const ManagedUI = createContext(undefined);

//Context Wrapper
export function ManagedUIProvider({ children }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ManagedUI.Provider
      value={{
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </ManagedUI.Provider>
  );
}

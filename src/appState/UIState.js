import { createContext, useState } from "react";

//Defining context
export const ManagedUI = createContext(undefined);

//Context Wrapper
export function ManagedUIProvider({ children }) {
  const [openModal, setOpenModal] = useState();

  const isOpenModal = (id) => openModal === id;

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

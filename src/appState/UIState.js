import { createContext, useCallback, useMemo, useState } from "react";

//Defining context
export const ManagedUI = createContext(undefined);

//Context Wrapper
export function ManagedUIProvider({ children }) {
  const [openModal, setOpenModal] = useState();

  const isOpenModal = useCallback((id) => openModal === id, [openModal]);

  const memoizedModalProviderValue = useMemo(
    () => ({ isOpenModal, setOpenModal }),
    [isOpenModal, setOpenModal]
  );

  return (
    <ManagedUI.Provider value={memoizedModalProviderValue}>
      {children}
    </ManagedUI.Provider>
  );
}

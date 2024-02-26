"use client";
import React, { useRef, useContext } from "react";
import { createPortal } from "react-dom";
import styles from "./modalStyles.module.css";

//context
import { ManagedUI } from "@/appState/UIState";

function Modal({ id, children }) {
  const { setOpenModal } = useContext(ManagedUI);
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setOpenModal(false);
    }
  };
  return createPortal(
    <div
      className={styles.modalBackground}
      onClick={(e) => closeModal(e)}
      ref={modalRef}
      id={id || "modal"}
    >
      <div className={styles.modalCard}>{children}</div>
    </div>,
    document.body
  );
}

export default Modal;

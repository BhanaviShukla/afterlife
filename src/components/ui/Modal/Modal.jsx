"use client";
import React, { useEffect } from "react";
import styles from "./modalStyles.module.css";

import ReactPortal from "@/components/ReactPortal";

function Modal({ id, isOpen, children, handleClose }) {
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);
  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId={id || "modal-container"}>
      <dialog
        id="modal-wrapper"
        className={styles.modalBackground}
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className={styles.modalCard}>{children}</div>
      </dialog>
    </ReactPortal>
  );
}

export default Modal;

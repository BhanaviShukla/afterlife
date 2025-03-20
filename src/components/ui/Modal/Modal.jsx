"use client";
import React, { useEffect, useCallback } from "react";
import styles from "./modalStyles.module.css";
import { useRouter } from "next/navigation";
import ReactPortal from "@/components/ReactPortal";
import { Button } from "@/components";

function Modal({
  id,
  children,
  handleClose,
  closeLabel = "Back",
  secondaryCta,
  currentPath = undefined,
  isOpen = undefined,
}) {
  const router = useRouter();

  const handleCloseModal = useCallback(() => {
    if (handleClose) {
      handleClose();
    }
    // Wrap router.back() in a setTimeout to avoid state updates during render
    setTimeout(() => {
      router.back();
    }, 0);
  }, [handleClose, router]);

  useEffect(() => {
    const closeOnEscapeKey = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleCloseModal]);

  if (typeof isOpen !== "undefined" && isOpen === false) {
    return null;
  }

  return (
    <ReactPortal wrapperId={id || "modal-container"}>
      <dialog
        id="modal-wrapper"
        className={styles.modalBackground}
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onClick={(e) => {
          if (e.target.id === "modal-wrapper") {
            handleCloseModal();
          }
        }}
      >
        <div className={[styles.modalCard, "gap-16"].join(" ")}>
          {children}
          <div className="flex gap-4">
            <Button
              variant={"outlined"}
              id={"close-modal"}
              onClick={handleCloseModal}
            >
              {closeLabel}
            </Button>
            {secondaryCta}
          </div>
        </div>
      </dialog>
    </ReactPortal>
  );
}

export default Modal;
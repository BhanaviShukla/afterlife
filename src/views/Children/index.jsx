"use client";
import { Button, Modal, TextInput, Typography } from "@/components";
import { ManagedUI } from "@/appState/UIState";
import { useContext, useEffect, useState } from "react";
import { useWill } from "@/appState/WillState";
import ChildModaView from "./ModalViews/ChildModalView";
import PersonModalView from "./ModalViews/PersonModalView";

const ADD_CHILD_MODAL = "add-child-modal";

const CHILD_FORM = "child-form";
const GUARDIAN_FORM = "guardian-form";

const ChildrenView = ({ data }) => {
  const { isOpenModal, setOpenModal } = useContext(ManagedUI);
  const { will, addToWill, removeFromWill } = useWill();

  const [child, setChild] = useState(null);
  const [modalView, setModalView] = useState(CHILD_FORM);

  console.log("CHILDRENVIEW");
  const { childForm, guardianForm } = data;

  const onChildSubmit = (formData) => {
    const child = {
      id: Date.now(),
      ...Object.fromEntries(formData),
    };
    console.log("CHILD -> ON CLICK SAVE", child);
    // @TODO: add duplication check util for child
    // addToWill("children", child);
    setChild(child);
    setModalView(GUARDIAN_FORM);
  };

  const onCloseModal = () => {
    setChild(null);
    setOpenModal(undefined);
  };

  const onGuardianSubmit = (formData) => {
    console.log("onGuardianSubmit");
    const person = {
      id: Date.now(),
      ...Object.fromEntries(formData),
      guardianOf: {
        id: child.id,
        "child-name": child["child-name"],
      },
    };
    console.log("PERSON -> TO WILL", person);
    addToWill("people", person);
    const newChild = {
      ...child,
      guardian: {
        id: person.id,
        "person-name": person["person-name"],
      },
    };
    console.log("CHILD -> TO WILL", newChild);
    addToWill("children", newChild);
    onCloseModal();
  };

  return (
    <div>
      <Modal
        id={ADD_CHILD_MODAL}
        isOpen={isOpenModal(ADD_CHILD_MODAL)}
        handleClose={() => setOpenModal(undefined)}
      >
        {modalView === CHILD_FORM ? (
          <ChildModaView
            form={childForm}
            child={child}
            onSave={onChildSubmit}
            onCancel={onCloseModal}
          />
        ) : (
          <PersonModalView
            form={guardianForm}
            titleFragment={(child && child["child-name"]) || ""}
            onSave={onGuardianSubmit}
            onBack={() => setModalView(CHILD_FORM)}
          />
        )}
      </Modal>
      <Button onClick={() => setOpenModal(ADD_CHILD_MODAL)}>Add a child</Button>
    </div>
  );
};
export default ChildrenView;

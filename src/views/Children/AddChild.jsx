"use client";
import { Modal } from "@/components";
import { useState } from "react";
import { useWill } from "@/appState/WillState";
import ChildModaView from "./ModalViews/ChildModalView";
import PersonModalView from "./ModalViews/PersonModalView";
import { chldrenFormData } from "@/appState/childrenData";

const ADD_CHILD_MODAL = "add-child-modal";

const CHILD_FORM = "child-form";
const GUARDIAN_FORM = "guardian-form";

const AddChildModal = ({ id, isOpen, setOpen }) => {
  const { addToWill } = useWill();

  const [child, setChild] = useState(null);
  const [modalView, setModalView] = useState(CHILD_FORM);

  const { childForm, guardianForm } = chldrenFormData;

  const onChildSubmit = (formData) => {
    const child = {
      id: Date.now(),
      ...Object.fromEntries(formData),
    };
    console.log("CHILD -> ON CLICK SAVE", child);
    // @TODO: add duplication check util for child
    setChild(child);
    setModalView(GUARDIAN_FORM);
  };

  const onCloseModal = () => {
    setChild(null);
    setOpen(undefined);
  };

  const onGuardianSubmit = (formData) => {
    console.log("onGuardianSubmit");
    const person = {
      id: Date.now(),
      name: formData.get("person-name"),
      dob: formData.get("person-dob"),
      guardianOf: [
        {
          id: child.id,
          "child-name": child["child-name"],
          relationship: formData.get("person-relationship-child"),
        },
      ],
    };
    console.log("PERSON -> TO WILL", person);
    // @TODO: Investigate and fix raise condition
    addToWill("people", person);
    const newChild = {
      ...child,
      guardian: {
        id: person.id,
        name: person.name,
      },
    };
    console.log("CHILD -> TO WILL", newChild);
    addToWill("children", newChild);
    onCloseModal();
  };

  return (
    <Modal id={id} isOpen={isOpen} handleClose={onCloseModal}>
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
  );
};
export default AddChildModal;

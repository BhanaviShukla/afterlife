"use client";
import { Modal } from "@/components";
import { useState } from "react";
import { useWill } from "@/appState/WillState";
import ChildModaView from "./ModalViews/ChildModalView";
import GuardianModalView from "./ModalViews/GuardianModalView";
import { chldrenFormData } from "@/appState/childrenData";

const CHILD_FORM = "child-form";
const GUARDIAN_FORM = "guardian-form";

const AddChildModal = ({ id, isOpen, setOpen }) => {
  const { will, addToWill, getWillEntry, patchWillEntry } = useWill();

  const [child, setChild] = useState(null);
  const [modalView, setModalView] = useState(CHILD_FORM);

  const { childForm, guardianForm } = chldrenFormData;

  const onChildSubmit = (formData) => {
    const child = {
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

  const attachGuardianToChild = async (person) => {
    console.log(">>>>attachGuardianToChild", { person });
    const newChild = {
      ...child,
      guardian: {
        id: person.id,
        name: person.name,
      },
    };
    console.log("CHILD -> TO WILL", newChild);
    return addToWill("children", newChild);
  };

  const attachChildToGuardian = async (person, childId, type) => {
    console.log(">>>>attachChildToGuardian", childId, { person });
    if (!person.guardianOf) person.guardianOf = [];
    person.guardianOf.push({
      id: childId,
      "child-name": child["child-name"],
      type,
    });

    patchWillEntry("people", person.id, person);
  };

  const onGuardianSave = async (formData) => {
    console.log("onGuardianSave", Object.fromEntries(formData));

    const personId = Number(formData.get("select-person")) || null;
    if (!personId) {
      console.error("PersonID wasn't parsed");
    }
    console.log(">>>>fetching details for person", personId);
    const person = getWillEntry("people", personId);

    const childId = await attachGuardianToChild(person);
    await attachChildToGuardian(person, childId, formData.get("guardian-type"));

    onCloseModal();
  };

  return (
    <Modal id={id} isOpen={isOpen} handleClose={onCloseModal}>
      {modalView === CHILD_FORM ? (
        <>
          <ChildModaView
            form={childForm}
            child={child}
            onSave={onChildSubmit}
            onCancel={onCloseModal}
          />
          step 1
        </>
      ) : (
        <>
          <GuardianModalView
            form={guardianForm}
            titleFragment={(child && child["child-name"]) || ""}
            onGuardianSave={onGuardianSave}
            onBack={() => setModalView(CHILD_FORM)}
          />
          step 2
        </>
      )}
    </Modal>
  );
};
export default AddChildModal;

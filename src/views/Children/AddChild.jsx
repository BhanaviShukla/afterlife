"use client";
import { CarouselIndicator, Modal } from "@/components";
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

  const attachGuardianToChild = async (guardianObject) => {
    console.log(">>>>attachGuardianToChild", { guardianObject });
    const newChild = {
      ...child,
      ...Object.keys(guardianObject).reduce(
        (prevValue, guardianType) => ({
          ...prevValue,
          [guardianType]: {
            id: guardianObject[guardianType].id,
            name: guardianObject[guardianType].name,
          },
        }),
        {}
      ),
    };
    console.log("CHILD -> TO WILL", newChild);
    return addToWill("children", newChild);
  };

  const attachChildToGuardian = async (person, childId, type) => {
    if (!person) return;
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
    const formEntries = Object.fromEntries(formData);
    console.log("onGuardianSave", Object.fromEntries(formData));

    const guardianObject = ["main-guardian", "alternative-guardian"].reduce(
      (prevValue, guardianType) => {
        console.log(">>>>>>FORMDATA", formEntries[guardianType]);
        const guardianId = Number(formEntries[guardianType]) || null;
        if (!guardianId) {
          console.error(
            "PersonID wasn't parsed",
            guardianType,
            formEntries[guardianType]
          );
          return { ...prevValue };
        }
        console.log(
          ">>>>fetching details for person",
          guardianType,
          guardianId
        );
        const guardian = getWillEntry("people", guardianId);
        /* 
        {
          main-guardian: {...},
          alternative-guardian: {...}
        }
        */
        setChild((prevChild) => ({
          ...prevChild,
          [guardianType]: guardian,
        }));
        return { ...prevValue, [guardianType]: guardian };
      },
      {}
    );
    console.log({ guardianObject });
    const childId = await attachGuardianToChild(guardianObject);
    ["main-guardian", "alternative-guardian"].forEach(
      async (guardianType) =>
        await attachChildToGuardian(
          guardianObject[guardianType],
          childId,
          guardianType
        )
    );
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
        <GuardianModalView
          form={guardianForm}
          titleFragment={(child && child["child-name"]) || ""}
          onGuardianSave={onGuardianSave}
          onBack={() => setModalView(CHILD_FORM)}
        />
      )}
      <CarouselIndicator
        activeItemIndex={modalView === CHILD_FORM ? 0 : 1}
        itemCount={2}
      />
    </Modal>
  );
};
export default AddChildModal;

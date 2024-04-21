"use client";
import { useWill } from "@/appState/WillState";
import { CarouselIndicator, Modal } from "@/components";
import ChildModaView from "../../components/FormModalView";
import GuardianModalView from "./ModalViews/GuardianModalView";
import { useEffect, useState } from "react";
import { chldrenFormData } from "@/appState/childrenData";
import { areObjectsEqual } from "@/utils/object";

const CHILD_FORM = "child-form";
const GUARDIAN_FORM = "guardian-form";

const EditChildModal = ({ childId, isOpen, handleClose }) => {
  const {
    will: { people },
    getWillEntry,
    patchWillEntry,
  } = useWill();

  const [child, setChild] = useState(undefined);
  const [modalView, setModalView] = useState(CHILD_FORM);

  const { childForm, guardianForm } = chldrenFormData;

  useEffect(() => {
    setModalView(CHILD_FORM);
  }, [isOpen]);

  useEffect(() => {
    if (!childId) {
      setChild(undefined);
      return;
    }
    const childWillEntry = getWillEntry("children", childId);
    if (!childWillEntry) {
      console.error("Child doesn't exist in will", childId);
      return;
    }
    setChild(childWillEntry);
  }, [childId, getWillEntry]);

  useEffect(() => {
    if (!child) return;
    const updateChildInWill = async () => {
      const childWillEntry = getWillEntry("children", child.id);
      if (!childWillEntry) {
        console.error("Child doesn't exist in will", child.id);
        return;
      }
      if (areObjectsEqual(childWillEntry, child)) return;
      await patchWillEntry("children", child.id, child);
    };
    updateChildInWill();
  }, [child, getWillEntry, patchWillEntry]);

  const onChildSave = async (formData) => {
    setChild((prevChild) => ({
      ...prevChild,
      ...Object.fromEntries(formData),
    }));
    setModalView(GUARDIAN_FORM);
  };

  console.log("EDIT CHILD MODAL", { child });

  if (!child) return null;

  const onGuardianSave = async (formData) => {
    const formEntries = Object.fromEntries(formData);
    console.log("onEditGuardianSave", formEntries);

    for (const guardianType in formEntries) {
      const guardianId = Number(formEntries[guardianType]) || null;
      if (!guardianId) {
        console.error("PersonID wasn't parsed");
        return;
      }
      console.log(">>>>fetching details for person", guardianType, guardianId);
      const guardian = getWillEntry("people", guardianId);

      const oldGuardian = people.find(
        (person) => person.id === child[guardianType]?.id
      );
      console.log({ oldGuardian, guardian });
      const newGuardianOf = {
        id: Number(childId),
        "child-name": child["child-name"],
        type: guardianType,
      };
      //   if old guardian is the same as new guardian, only child change is required
      if (oldGuardian && oldGuardian.id === guardian.id) {
        console.log(
          oldGuardian.guardianOf.filter((id) => id === Number(childId))
        );
        patchWillEntry("people", oldGuardian.id, {
          ...oldGuardian,
          guardianOf: [
            ...oldGuardian.guardianOf.filter((id) => id === Number(childId)),
            { ...newGuardianOf },
          ],
        });
        continue;
      }

      console.log("OLD not the same as new");

      //   patch old guardians if any
      oldGuardian?.id &&
        patchWillEntry("people", oldGuardian.id, {
          ...oldGuardian,
          guardianOf: [
            ...oldGuardian.guardianOf.filter((id) => id === Number(childId)),
          ],
        });

      //   add child details to new guardian
      if (!guardian.guardianOf) guardian.guardianOf = [];
      guardian.guardianOf.push(newGuardianOf);
      patchWillEntry("people", guardian.id, guardian);

      //   add new guardian details to child
      setChild((prevChild) => ({
        ...prevChild,
        [guardianType]: {
          id: guardian.id,
          name: guardian.name,
        },
      }));
    }
    handleClose();
  };

  return (
    <Modal
      id={`edit-child-modal-${child.id}`}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {modalView === CHILD_FORM ? (
        <ChildModaView
          form={childForm}
          dataObject={child}
          onSave={onChildSave}
          onCancel={handleClose}
        />
      ) : (
        <GuardianModalView
          form={guardianForm}
          titleFragment={(child && child["child-name"]) || ""}
          onGuardianSave={onGuardianSave}
          onBack={() => setModalView(CHILD_FORM)}
          mainGuardian={child["main-guardian"]?.id}
          altGuardian={child["alternative-guardian"]?.id}
        />
      )}
      <CarouselIndicator
        activeItemIndex={modalView === CHILD_FORM ? 0 : 1}
        itemCount={2}
      />
    </Modal>
  );
};

export default EditChildModal;

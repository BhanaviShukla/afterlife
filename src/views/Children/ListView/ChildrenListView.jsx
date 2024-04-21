"use client";
import { ManagedUI } from "@/appState/UIState";
import { useWill } from "@/appState/WillState";
import { Card } from "@/components";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AddChildModal from "../AddChild";
import { childrenData } from "@/appState/childrenData";
import EditPersonModal from "@/components/EditPersonModal/EditPersonModal";
import EditChildModal from "../EditChild";

const ADD_ANOTHER_CHILD_MODAL = "add-another-child-modal";
const EDIT_CHILD_MODAL = "edit-child-modal";

const ChildrenListView = () => {
  const {
    will: { children },
    removeFromWill,
    getWillEntry,
    patchWillEntry,
  } = useWill();
  const {
    childrenListView: { addAnotherCard },
  } = childrenData;

  const router = useRouter();
  const pathname = usePathname();

  const { isOpenModal, setOpenModal } = useContext(ManagedUI);
  const [selectedChild, setSelectedChild] = useState(undefined);

  useEffect(() => {
    if (children && !children.length)
      router.replace(`${pathname.replace("/modify", "")}`);
  }, [children, pathname, router]);

  const handleRemoveChild = async (child) => {
    for (const guardianType of ["main-guardian", "alternative-guardian"]) {
      const personId = Number(child[guardianType]?.id);
      if (!personId) return;
      const person = getWillEntry("people", personId);
      const newGuardianOf = (person.guardianOf || []).filter(
        (c) => c.id !== child.id
      );
      console.log({ newGuardianOf });
      await patchWillEntry("people", personId, {
        ...person,
        guardianOf: newGuardianOf,
      });
    }

    await removeFromWill("children", child.id);
  };

  const handlePressEdit = (child) => {
    console.log("handlePressEdit", child);
    setSelectedChild(child.id);
    setOpenModal(EDIT_CHILD_MODAL);
  };

  const handleCloseEditModal = () => {
    setOpenModal(undefined);
    setSelectedChild(undefined);
  };

  return (
    <>
      <div id="children-list-view" className="carouselWrapper">
        {children.map((child) => (
          <Card.EditItem
            key={child.id}
            imageName={"backpack"}
            badgeText={
              child["main-guardian"]?.name ||
              child["alternative-guardian"]?.name ||
              ""
            }
            onPressCross={() => handleRemoveChild(child)}
            label={child["child-name"]}
            subLabel={"Your child"}
            onPressEdit={() => handlePressEdit(child)}
          />
        ))}
        <Card.SelectItem
          key="add-another-child"
          {...addAnotherCard}
          backgroundColor={"--colour-n50"}
          handleSelect={() => setOpenModal(ADD_ANOTHER_CHILD_MODAL)}
        />
      </div>
      <AddChildModal
        id={ADD_ANOTHER_CHILD_MODAL}
        isOpen={isOpenModal(ADD_ANOTHER_CHILD_MODAL)}
        setOpen={setOpenModal}
      />
      <EditChildModal
        childId={selectedChild}
        isOpen={isOpenModal(EDIT_CHILD_MODAL) && selectedChild}
        handleClose={handleCloseEditModal}
      />
    </>
  );
};
export default ChildrenListView;

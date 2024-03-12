"use client";
import { ManagedUI } from "@/appState/UIState";
import { useWill } from "@/appState/WillState";
import { Card } from "@/components";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import AddChildModal from "../AddChild";
import { childrenData } from "@/appState/childrenData";

const ADD_ANOTHER_CHILD_MODAL = "add-another-child-modal";

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

  useEffect(() => {
    if (children && !children.length)
      router.replace(`${pathname.replace("/modify", "")}`);
  }, [children, pathname, router]);

  const handleRemoveChild = async (child) => {
    const personId = Number(child.guardian.id);
    const person = getWillEntry("people", personId);
    const newGuardianOf = person.guardianOf.filter((c) => c.id !== child.id);
    patchWillEntry("people", personId, {
      ...person,
      guardianOf: newGuardianOf,
    });
    removeFromWill("children", child.id);
  };

  return (
    <>
      <div id="children-list-view" className="carouselWrapper">
        {children.map((child) => (
          <Card.EditItem
            key={child.id}
            imageName={"backpack"}
            badgeText={child.guardian.name}
            onPressCross={() => handleRemoveChild(child)}
            label={child["child-name"]}
            subLabel={"Your child"}
            onPressEdit={() => {
              alert("You pressed Edit");
            }}
          />
        ))}
        <Card.SelectItem
          key="add-another-child"
          {...addAnotherCard}
          backgroundColor={"--colour-n50"}
          handleSelect={() => setOpenModal(ADD_ANOTHER_CHILD_MODAL)}
        />
        <AddChildModal
          id={ADD_ANOTHER_CHILD_MODAL}
          isOpen={isOpenModal(ADD_ANOTHER_CHILD_MODAL)}
          setOpen={setOpenModal}
        />
      </div>
    </>
  );
};
export default ChildrenListView;

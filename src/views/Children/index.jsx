"use client";
import { Button } from "@/components";
import { ManagedUI } from "@/appState/UIState";
import { useContext, useEffect } from "react";
import { useWill } from "@/appState/WillState";

import { usePathname, useRouter } from "next/navigation";
import AddChildModal from "./AddChild";
import { childrenData } from "@/appState/childrenData";
import PlusIcon from "@/components/ui/Icons/Controls/Buttons/plus-button-white.svg";
import { SkipStepButton } from "@/components/NextStepButton";

const ADD_CHILD_MODAL = "add-child-modal";

const ChildrenView = ({ slug }) => {
  const { isOpenModal, setOpenModal } = useContext(ManagedUI);
  const {
    will: { children },
  } = useWill();
  const router = useRouter();
  const pathname = usePathname();

  const { addChildView: data } = childrenData;

  useEffect(() => {
    if (children && children.length) router.replace(`${pathname}/modify`);
  }, [children, pathname, router]);

  return (
    <div className="flex gap-6">
      <AddChildModal
        id={ADD_CHILD_MODAL}
        isOpen={isOpenModal(ADD_CHILD_MODAL)}
        setOpen={setOpenModal}
      />
      <Button
        onClick={() => setOpenModal(ADD_CHILD_MODAL)}
        rightIcon={<PlusIcon />}
      >
        {data.primaryCta}
      </Button>
      <SkipStepButton slug={slug} />
    </div>
  );
};
export default ChildrenView;

"use client";
import { Button, Modal, TextInput, Typography } from "@/components";
import { ManagedUI } from "@/appState/UIState";
import { useContext, useEffect, useState } from "react";
import { useWill } from "@/appState/WillState";

const ChildrenView = ({ data, handleSave }) => {
  const { isOpenModal, setOpenModal } = useContext(ManagedUI);
  const { will, addToWill, removeFromWill } = useWill();
  const [_document, set_document] = useState(null);

  useEffect(() => {
    set_document(document);
  }, []);
  console.log("CHILDRENVIEW");
  const { form } = data;

  const save = (formData) => {
    console.log("ON CLICK SAVE", formData);
    const child = {
      id: Date.now(),
      ...Object.fromEntries(formData),
    };
    // @TODO: add duplication check util for child
    addToWill("children", child);
  };
  return (
    <div>
      <Modal
        id="add-child"
        isOpen={isOpenModal}
        handleClose={() => setOpenModal(false)}
        // secondaryCta always closes the modal, can not be overridden
      >
        {form.id && (
          <>
            <Typography variant="title-small">{form.title}</Typography>
            <form id={form.id} action={save}>
              {form.textInputs.length &&
                form.textInputs.map((input) => (
                  <TextInput key={input.id} {...input} />
                ))}
              <div className="flex gap-4 mb-8">
                <Button type="submit">{form.primaryCta || "Save"}</Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  {"Cancel"}
                </Button>
              </div>
            </form>
          </>
        )}
      </Modal>
      <Button onClick={() => setOpenModal(true)}>Add a child</Button>
    </div>
  );
};
export default ChildrenView;

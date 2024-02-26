"use client";
import { Button, Modal, TextInput, Typography } from "@/components";
import { ManagedUI } from "@/appState/UIState";
import { useContext } from "react";

const ChildrenView = ({ data }) => {
  const { openModal, setOpenModal } = useContext(ManagedUI);
  console.log("CHILDRENVIEW");
  const { form } = data;
  return (
    <div>
      {openModal && (
        <Modal id="add-child">
          {form.id && (
            <>
              <Typography variant="title-small">{form.title}</Typography>
              <form id={form.id}>
                {form.textInputs.length &&
                  form.textInputs.map((input) => (
                    <TextInput key={input.id} {...input} />
                  ))}
              </form>
            </>
          )}
        </Modal>
      )}
      <Button onClick={() => setOpenModal(true)}>Add a child</Button>
    </div>
  );
};
export default ChildrenView;

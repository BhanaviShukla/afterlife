"use client";

const { Modal, Button, Typography } = require("@/components");

import Link from "next/link";

const DisclaimerModal = ({ id, isOpen, handleClose, nextLink }) => {
  const { title, description, primaryCta, secondaryCta } = data;
  return (
    <Modal id={id} isOpen={isOpen} handleClose={handleClose}>
      <Typography variant="title-small">{title}</Typography>
      <Typography variant="body">{description}</Typography>
    </Modal>
  );
};
const data = {
  title: "Disclaimer",
  description: "something here",
  primaryCta: "Continue",
  secondaryCta: "Cancel",
};

export default DisclaimerModal;

"use client";

const { Modal, Button, Typography } = require("@/components");
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";

import Link from "next/link";

const DisclaimerModal = ({ id, isOpen, handleClose, nextLink }) => {
  const { title, description, primaryCta, secondaryCta } = data;
  return (
    <Modal id={id} isOpen={isOpen} handleClose={handleClose}>
      <Typography variant="title-small">{title}</Typography>
      <Typography variant="body">{description}</Typography>
      <div className="flex">
        <Button
          variant="outlined"
          className="self-start"
          leftIcon={<ArrowLeftIcon />}
        >
          <Link href={`/disclaimer`}>{secondaryCta}</Link>
        </Button>
        <Button
          variant="filled"
          className="self-start"
          rightIcon={<ArrowRightIcon />}
        >
          <Link href={nextLink}>{primaryCta}</Link>
        </Button>
      </div>
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

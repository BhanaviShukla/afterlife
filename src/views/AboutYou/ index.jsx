"use client";
import { Button, TextInput } from "@/components";
import { useState } from "react";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import Link from "next/link";
import { STEPS } from "@/appState/stepData";
import { useRouter } from "next/router";
import { useSteps } from "@/appState/StepsState";
import { useWill } from "@/appState/WillState";

const AboutYouForm = ({ ...props }) => {
  console.log({ props });
  const { fields, primaryCta, secondaryCta } = formData;
  const { userName } = fields;
  const router = useRouter;

  const [userDetails, setUserDetails] = useState();

  const { selectedSteps } = useSteps();
  const { addToWill, getWillEntry, patchWillEntry } = useWill();
  console.log({ selectedSteps });

  const handleOnSubmit = async (formData) => {
    const nextLink = `/journey/${STEPS[selectedSteps[0]].slug}`;
  };

  return (
    <form id="about-you-form" action={handleOnSubmit}>
      {/* userName */}
      <TextInput
        key={userName.id}
        {...userName}
        defaultValue={userDetails ? userDetails[stateKey] : undefined}
      />
      <div className="flex">
        <Button
          variant="outlined"
          className="self-start"
          leftIcon={<ArrowLeftIcon />}
          onClick={() => router.back()}
        >
          {secondaryCta}
        </Button>
        <Button
          variant="filled"
          className="self-start"
          rightIcon={<ArrowRightIcon />}
          onClick={handleOnSubmit}
          type="submit"
          value="submit"
        />
      </div>
    </form>
  );
};

const formData = {
  title: "First, tell us about yourself",
  description: "",
  primaryCta: "Next",
  secondaryCta: "",
  imageName: "pot",

  fields: {
    userName: {
      id: "userNme",
      placeholder: "Your full name (as per passport)",
      type: "text",
      required: true,
      stateKey: "name",
    },
  },
};

export default AboutYouForm;

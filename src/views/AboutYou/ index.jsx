"use client";
import { Button, TextInput } from "@/components";
import { useState } from "react";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import Link from "next/link";
import { STEPS } from "@/appState/stepData";
import { useRouter } from "next/router";
import { useSteps } from "@/appState/StepsState";

const AboutYouForm = () => {
  const { fields, primaryCta, secondaryCta } = formData;
  const router = useRouter;

  const [userDetails, setUserDetails] = useState();

  const { selectedSteps } = useSteps();
  console.log({ selectedSteps });
  return (
    <form id="about-you-form">
      {fields?.length &&
        fields.map(({ component, stateKey, ...props }) => (
          <TextInput
            key={props.id}
            {...props}
            defaultValue={userDetails ? userDetails[stateKey] : undefined}
          />
        ))}
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
        >
          <Link href={`/journey/${STEPS[selectedSteps[0]].slug}`}>
            {primaryCta}
          </Link>
        </Button>
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

  fields: [
    {
      id: "user-name",
      placeholder: "Your full name (as per passport)",
      component: TextInput,
      type: "text",
      required: true,
      stateKey: "name",
    },
  ],
};

export default AboutYouForm;

"use client";
import { Button, TextInput } from "@/components";
import { useState } from "react";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import Link from "next/link";
import { useRouter } from "next/router";

const AboutYouForm = ({ primaryCta, secondaryCta }) => {
  const { fields } = formData;
  const router = useRouter;

  const [userDetails, setUserDetails] = useState();
  return (
    <form id="about-you-form" action={"something"}>
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
          <Link href={`/`}>{primaryCta}</Link>
        </Button>
      </div>
    </form>
  );
};

const formData = {
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

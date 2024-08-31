"use client";
import { Button, EditableSelectInput, TextInput } from "@/components";
import { useEffect, useMemo, useState } from "react";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { STEPS } from "@/appState/stepData";
import { useRouter, useSearchParams } from "next/navigation";
import { useSteps } from "@/appState/StepsState";
import { useWill } from "@/appState/WillState";
import { TODAY } from "@/appState/childrenData";
import countryList from "react-select-country-list";

// developer notes:
// use: ?userId=<userId> for EDIT VIEW

const AboutYouForm = ({ ...props }) => {
  console.log({ props });
  const { fields, primaryCta, secondaryCta } = formData;
  const { userName, email, dob, citizenship, idNumber } = fields;
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const countryOptions = useMemo(() => countryList().getData(), []);

  const [user, setUser] = useState();

  const { selectedSteps } = useSteps();
  const { addToWill, getWillEntry, patchWillEntry } = useWill();

  const handleOnSubmit = async (formData) => {
    console.log(formData);
    const nextLink = `/journey/${STEPS[selectedSteps[0]].slug}`;
    console.log({ nextLink });

    const newUser = formData.keys().reduce((prevValue, userKey) => {
      return {
        ...prevValue,
        [userKey]: formData.get(userKey),
      };
    }, {});
    console.log("USER -> TO WILL", newUser);
    const newUserId = addToWill("user", newUser);
    if (newUserId) {
      console.log("New user added!", newUserId);
      router.push(nextLink);
    }
  };

  useEffect(() => {
    console.log({ userId });
    if (!userId) return;
    const userWillEntry = getWillEntry("user", userId);
    if (!userId) {
      console.error("Couldn't find person in the will");
      return;
    }
    setUser(userWillEntry);
  }, [userId, getWillEntry]);

  return (
    <form id="about-you-form" action={handleOnSubmit}>
      {/* userName */}
      <TextInput
        key={userName.id}
        {...userName}
        defaultValue={user ? user[userName.stateKey] : undefined}
      />
      {/* email */}
      <TextInput
        key={email.id}
        {...email}
        defaultValue={user ? user[email.stateKey] : undefined}
      />
      {/* date-of-birth */}
      <TextInput
        key={dob.id}
        {...dob}
        defaultValue={user ? user[dob.stateKey] : undefined}
      />
      {/* Citizenship */}
      <EditableSelectInput
        key={citizenship.id}
        {...citizenship}
        options={countryOptions}
        defaultValue={user ? user[citizenship.stateKey] : undefined}
      />
      {/* identification */}
      <TextInput
        key={idNumber.id}
        {...idNumber}
        defaultValue={user ? user[idNumber.stateKey] : undefined}
      />
      <div className="flex mt-14 gap-4">
        <Button
          variant="outlined"
          className="self-start"
          leftIcon={<ArrowLeftIcon />}
          onClick={() => {
            console.log("back clicked");
            router.back();
          }}
        >
          {secondaryCta}
        </Button>
        <Button
          variant="filled"
          className="self-start"
          rightIcon={<ArrowRightIcon />}
          type="submit"
          value="submit"
          id={`about-user-submit-button`}
        >
          {primaryCta}
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

  fields: {
    userName: {
      id: "userName",
      placeholder: "Your full name (as per passport)",
      type: "text",
      required: true,
      stateKey: "name",
    },
    email: {
      id: "email",
      placeholder: "Your email address",
      type: "email",
      required: true,
      stateKey: "email",
    },
    dob: {
      id: "dob",
      placeholder: "Birthday",
      type: "date",
      required: true,
      stateKey: "dob",
      max: TODAY,
    },
    citizenship: {
      id: "citizenship",
      placeholder: "Citizenship",
      type: "select",
      stateKey: "citizenship",
      isSearchable: true,
      required: true,
    },
    idNumber: {
      id: "idNumber",
      placeholder: "NRIC or Passport number",
      type: "text",
      required: true,
      maxLength: 32,
    },
  },
};

export default AboutYouForm;

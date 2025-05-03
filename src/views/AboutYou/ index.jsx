"use client";
import {
  Button,
  EditableSelectInput,
  TextInput,
  Typography,
} from "@/components";
import { useEffect, useMemo, useState } from "react";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import InfoIcon from "@/components/ui/Icons/Informational/info-empty.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { useWill } from "@/appState/WillState";
import { TODAY } from "@/appState/childrenData";
import countryList from "react-select-country-list";

// developer notes:
// use: ?userId=<userId> for EDIT VIEW

const AboutYouForm = ({ ...props }) => {
  console.log({ props });
  const { fields, primaryCta, secondaryCta, emailAddressCaption } = formData;
  const { userName, email, dob, citizenship, idNumber } = fields;
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const countryOptions = useMemo(() => countryList().getData(), []);

  const { addToWill, getWillEntry, getWillCategory, patchWillEntry } =
    useWill();

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const nextLink = `/journey/will`;

  const handleOnSubmit = async (formData) => {
    console.log(formData);
    console.log({ nextLink });

    const computedUserId = userId || user?.id;

    console.log({ computedUserId });

    if (computedUserId) {
      const userFromWill = getWillEntry("user", computedUserId);
      const newUser = formData.keys().reduce((prevValue, userKey) => {
        return {
          ...prevValue,
          [userKey]: formData.get(userKey),
        };
      }, userFromWill);
      await patchWillEntry("user", computedUserId, newUser);
    } else {
      const newUser = formData.keys().reduce((prevValue, userKey) => {
        return {
          ...prevValue,
          [userKey]: formData.get(userKey),
        };
      }, {});
      console.log("USER -> TO WILL", newUser);
      const newUserId = addToWill("user", newUser);
      console.log("New user added!", newUserId);
    }

    router.push(nextLink);
  };

  useEffect(() => {
    let tempUserId = userId;
    console.log({ userId });
    if (!userId) {
      console.warn("No user ID was provided, checking will");
      // no user ID, so check if a user exists
      const userCategory = getWillCategory("user");
      if (userCategory && userCategory.length === 1) {
        setUser(userCategory[0]);
      } else {
        console.warn("No user in the will");
      }
      setLoading(false);
      return;
    }
    const userWillEntry = getWillEntry("user", tempUserId);
    if (!userWillEntry) {
      console.error("Couldn't find person in the will");
      return;
    }
    setLoading(false);
    setUser(userWillEntry);
  }, [userId, getWillEntry, getWillCategory]);

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
      {loading ? (
        "Loading"
      ) : (
        <EditableSelectInput
          key={citizenship.id}
          {...citizenship}
          options={countryOptions}
          defaultValue={user ? user[citizenship.stateKey] : undefined}
        />
      )}

      {/* identification */}
      <TextInput
        key={idNumber.id}
        {...idNumber}
        defaultValue={user ? user[idNumber.stateKey] : undefined}
      />
      {/* Disclaimer */}
      <div className="flex items-center mt-8">
        <InfoIcon width={24} height={25} className="mr-1 min-w-8" />
        <Typography variant="caption">{emailAddressCaption}</Typography>
      </div>
      <div className="flex mt-14 gap-4">
        <Button
          isRound
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
          title={nextLink}
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
  emailAddressCaption:
    "By sharing with us your email address, you consent to receiving the occasional email and product updates that could be beneficial to your estate planning. You can unsubscribe any time.",
  fields: {
    userName: {
      id: "userName",
      placeholder: "Your full name (as per passport)",
      type: "text",
      required: true,
      stateKey: "userName",
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
      stateKey: "idNumber",
    },
  },
};

export default AboutYouForm;

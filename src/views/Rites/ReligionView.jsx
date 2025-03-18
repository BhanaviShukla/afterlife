import { Button, EditableSelectInput, Typography } from "@/components";
import { memo, useEffect, useMemo, useState } from "react";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";
import { getNextStepIndex, STEPS } from "@/appState/stepData";
import { useReligionFromWillOrSearchParams } from "@/utils/hooks";
import { useWill } from "@/appState/WillState";

const CURRENT_SLUG = "rites";
const ReligionView = memo(
  ({
    searchParams,
    title,
    description,
    formData,
    nextLink: defaultNextLink,
    backLink,
    primaryCta,
    secondaryCta,
  }) => {
    const router = useRouter();
    const {
      UNSAFE_replaceWillCategoryByValue,
      will: { rites },
    } = useWill();

    const altNextLink = `/journey/will/step/${
      STEPS[getNextStepIndex(CURRENT_SLUG)].slug
    }`;

    const [religion, setReligion] =
      useReligionFromWillOrSearchParams(searchParams);

    const [nextLink, setNextLink] = useState(`${defaultNextLink}${religion}`);
    console.log({ religion });

    useEffect(() => {
      if (religion) {
        setNextLink(`${defaultNextLink}${religion}`);
      } else {
        setNextLink(altNextLink);
      }
    }, [defaultNextLink, altNextLink, religion]);

    const handleNext = () => {
      UNSAFE_replaceWillCategoryByValue("rites", [
        {
          ...rites,
          religion,
        },
      ]);
      router.push(`${nextLink}`);
    };
    const handleBack = () => {
      if (backLink) router.replace(`${backLink}`);
      else router.back();
    };

    return (
      <div>
        <Typography variant="title-small">{title}</Typography>
        <Typography className="my-10 leading-8">{description}</Typography>
        <form id="children-religion-form" action={handleNext}>
          <div className="flex items-baseline gap-3">
            {formData ? (
              <ReligionSentenceWithInput
                key={`children-with-religion-${religion}`}
                formData={formData}
                religion={religion}
                onChange={(id, newValue) => {
                  setReligion(String(newValue));
                }}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="flex mt-14 gap-4">
            <Button
              variant="outlined"
              className="self-start"
              leftIcon={<ArrowLeftIcon />}
              onClick={handleBack}
              isRound
            >
              {secondaryCta}
            </Button>
            <Button
              variant="filled"
              className="self-start"
              rightIcon={<ArrowRightIcon />}
              type="submit"
              value="submit"
              id={`children-religion-submit-button`}
              title={`${nextLink}`}
            >
              {primaryCta}
            </Button>
          </div>
        </form>
      </div>
    );
  }
);

ReligionView.displayName = "ReligionView";

export const ReligionSentenceWithInput = memo(
  ({ religion, formData, onChange }) => {
    const [preReligionSentence, postReligionSentence] = String(
      formData.sentence
    ).split("{{religion}}");

    const defaultValue =
      formData.religion.options.find((option) => option.value === religion) ??
      formData.religion.options[0];
    console.log(
      "options",
      formData.religion.options.find((option) => option.value === religion)
    );

    return [
      <Typography key="preReligion">{preReligionSentence}</Typography>,
      <EditableSelectInput
        key={"religion"}
        {...formData.religion}
        defaultValue={defaultValue}
        wrapperClassName="min-w-16"
        onChange={onChange}
      />,
      <Typography key="postReligion">{postReligionSentence}</Typography>,
    ];
  }
);

ReligionSentenceWithInput.displayName = "ReligionSentenceWithInput";

export default ReligionView;

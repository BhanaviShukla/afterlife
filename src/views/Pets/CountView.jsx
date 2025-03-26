import { Button, EditableSelectInput, Typography } from "@/components";
import pluralize from "pluralize";
import { memo, useEffect, useMemo, useState } from "react";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";
import { getNextStepIndex, STEPS } from "@/appState/stepData";
import { useCountFromWillOrSearchParams } from "@/utils/hooks";

const CURRENT_SLUG = "pets";
const CountView = memo(
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

    const altNextLink = `/journey/will/step/${
      STEPS[getNextStepIndex(CURRENT_SLUG)].slug
    }`;

    const [count, setCount] = useCountFromWillOrSearchParams(
      searchParams,
      CURRENT_SLUG
    );
    const [nextLink, setNextLink] = useState(`${defaultNextLink}${count}`);
    console.log({ count });

    useEffect(() => {
      if (count) {
        setNextLink(`${defaultNextLink}${count}`);
      } else {
        setNextLink(altNextLink);
      }
    }, [defaultNextLink, altNextLink, count]);

    const handleNext = () => {
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
        <form id="children-count-form" action={handleNext}>
          <div className="flex items-baseline gap-3">
            {formData ? (
              <PetCountSentenceWithInput
                key={`children-with-count-${count}`}
                formData={formData}
                count={count}
                onChange={(id, newValue) => {
                  setCount(Number(newValue));
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
            >
              {secondaryCta}
            </Button>
            <Button
              variant="filled"
              className="self-start"
              rightIcon={<ArrowRightIcon />}
              type="submit"
              value="submit"
              id={`children-count-submit-button`}
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

CountView.displayName = "CountView";

export const PetCountSentenceWithInput = memo(
  ({ count, formData, onChange }) => {
    const [preCountSentence, postCountSentence] = String(
      formData.sentence
    ).split("{{count}}");

    const countOptions = useMemo(
      () =>
        Array.from({ length: formData.count.max }, (_, value) => ({
          label: value + 1,
          value: value + 1,
        })),
      [formData.count]
    );

    console.log({ count, option: countOptions[count - 1] });
    return [
      <Typography key="preCount">{preCountSentence}</Typography>,
      <EditableSelectInput
        key={"number"}
        {...formData.count}
        defaultValue={countOptions[count - 1]}
        wrapperClassName="min-w-16"
        onChange={onChange}
        options={countOptions}
      />,
      <Typography key="postCount">
        {postCountSentence?.replace(`{{pet}}`, pluralize("pet", count))}
      </Typography>,
    ];
  }
);

PetCountSentenceWithInput.displayName = "PetCountSentenceWithInput";

export default CountView;

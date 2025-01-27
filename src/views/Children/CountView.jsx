import { Button, EditableSelectInput, Typography } from "@/components";
import pluralize from "pluralize";
import { memo, useEffect, useMemo, useState } from "react";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";
import { getNextStepIndex, STEPS } from "@/appState/stepData";
import { useWill } from "@/appState/WillState";
import { useCountFromWillOrSearchParams } from "./useCountHook";

// @TODO: add logic to delete children when in edit flow, if the user changes the count
const CURRENT_SLUG = "children";
const CountView = memo(
  ({
    searchParams,
    // pathname,
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

    const [hasChildren, setHasChildren] = useState("yes");
    const [count, setCount] = useCountFromWillOrSearchParams(searchParams);
    const [nextLink, setNextLink] = useState(`${defaultNextLink}${count}`);
    console.log({ count });

    useEffect(() => {
      if (hasChildren === "yes") {
        setCount((prevCount) => prevCount || 1);
        setNextLink(`${defaultNextLink}${count}`);
      } else {
        setCount(0);
        setNextLink(altNextLink);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasChildren, defaultNextLink, altNextLink, count]);

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
            <EditableSelectInput
              {...formData.answer}
              defaultValue={formData.answer.options.find(
                (option) => option.value === hasChildren
              )}
              wrapperClassName="min-w-16"
              onChange={(_, newValue) => {
                setHasChildren(newValue);
                console.log({ newValue });
              }}
            />
            <div className="flex items-baseline gap-3">
              <ChildrenCountSentenceWithInput
                key={`children-with-count-${count}`}
                formData={formData}
                count={count}
                hasChildren={hasChildren}
                onChange={(id, newValue) => {
                  setCount(Number(newValue));
                }}
              />
            </div>
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

export const ChildrenCountSentenceWithInput = memo(
  ({ count, formData, hasChildren, onChange }) => {
    const [preCountSentence, postCountSentence] = String(
      formData.sentence[hasChildren]
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
      hasChildren === "yes" && count > 0 ? (
        <EditableSelectInput
          key={"number"}
          {...formData.count}
          defaultValue={countOptions[count - 1]}
          wrapperClassName="min-w-16"
          onChange={onChange}
          options={countOptions}
        />
      ) : (
        ""
      ),
      <Typography key="postCount">
        {postCountSentence?.replace(`{{child}}`, pluralize("child", count))}
      </Typography>,
    ];
  }
);

ChildrenCountSentenceWithInput.displayName = "ChildrenCountSentenceWithInput";

export default CountView;

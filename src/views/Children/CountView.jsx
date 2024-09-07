import { Button, EditableSelectInput, Typography } from "@/components";
import pluralize from "pluralize";
import { useEffect, useState } from "react";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";
import { useWill } from "@/appState/WillState";
import { getNextStepIndex, STEPS } from "@/appState/stepData";

// @TODO: add logic to delete children when in edit flow, if the user changes the count
const CURRENT_SLUG = "children";
const CountView = ({
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
  console.log("children -> COUNTVIEW", searchParams.get("count"));
  const router = useRouter();

  const { will } = useWill();
  const altNextLink = `/journey/${STEPS[getNextStepIndex(CURRENT_SLUG)].slug}`;

  const [hasChildren, setHasChildren] = useState("yes");
  const [count, setCount] = useState(searchParams.get("count") || 1);
  const [nextLink, setNextLink] = useState(`${defaultNextLink}${count}`);

  useEffect(() => {
    if (hasChildren === "yes") {
      setCount(1);
      setNextLink(`${defaultNextLink}${count}`);
    } else {
      setCount(0);
      setNextLink(altNextLink);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasChildren, defaultNextLink, altNextLink]);

  const countOptions = Array.from(
    { length: formData.count.max },
    (_, value) => ({ label: value + 1, value: value + 1 })
  );

  const handleNext = () => {
    router.push(`${nextLink}`);
  };
  const handleBack = () => {
    const userId = will.user[0].id;
    if (userId) router.replace(`${backLink}${userId}`);
    else router.back();
  };

  const getSentenceByChoice = (arr = formData.sentence([hasChildren])) => {
    const [preCountSentence, postCountSentence] =
      String(arr).split("{{count}}");
    return [
      preCountSentence,
      <EditableSelectInput
        key={"number"}
        {...formData.count}
        defaultValue={countOptions[count - 1]}
        wrapperClassName="min-w-10"
        onChange={(id, newValue) => {
          setCount(newValue);
          console.log({ newValue });
        }}
        options={countOptions}
      />,
      postCountSentence?.replace(`{{child}}`, pluralize("child", count)),
    ];
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
          <Typography>
            <div className="flex items-baseline gap-3">
              {getSentenceByChoice(formData.sentence[hasChildren])}
            </div>
          </Typography>
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
};

export default CountView;

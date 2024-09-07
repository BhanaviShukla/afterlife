import { Button, Typography } from "@/components";
import { useEffect, useState } from "react";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";
import { useWill } from "@/appState/WillState";

const DetailsView = ({
  searchParams,
  // pathname,
  title,
  description,
  // formData,
  nextLink,
  backLink,
  primaryCta,
  secondaryCta,
}) => {
  console.log("children -> DETAILS VIEW", searchParams.get("count"));
  const router = useRouter();

  const { will } = useWill();

  const [count, setCount] = useState(searchParams.get("count") || 1);

  useEffect(() => {
    setCount(searchParams.get("count") || 1);
  }, [searchParams]);

  const handleNext = () => {
    router.push(`${nextLink}`);
  };
  const handleBack = () => {
    router.replace(`${backLink}${count}`);
  };

  return (
    <div>
      <Typography variant="title-small">{title}</Typography>
      <Typography className="my-10 leading-8">{description}</Typography>
      <form id="children-details-form" action={handleNext}>
        <div className="flex items-baseline gap-3">FORM HERE</div>
        <div className="flex mt-14 gap-4">
          <Button
            variant="outlined"
            className="self-start"
            leftIcon={<ArrowLeftIcon />}
            onClick={handleBack}
            title={`${backLink}${count}`}
          >
            {secondaryCta}
          </Button>
          <Button
            variant="filled"
            className="self-start"
            rightIcon={<ArrowRightIcon />}
            type="submit"
            value="submit"
            id={`children-details-submit-button`}
            title={`${nextLink}`}
          >
            {primaryCta}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DetailsView;

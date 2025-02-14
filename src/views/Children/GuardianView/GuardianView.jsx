import { Button, Typography } from "@/components";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";
import { useWill } from "@/appState/WillState";
import { sortObjectByDob } from "../useCountHook";
import { GuardianForChild } from "./GuardianForChild";

const GuardianView = ({
  // searchParams,
  // pathname,
  title,
  description,
  // formData,
  nextLink,
  backLink,
  primaryCta,
  secondaryCta,
}) => {
  console.log("children -> GUARDIAN VIEW");
  const router = useRouter();

  const { will, patchWillEntry } = useWill();

  const count = will.children.length;

  const handleNext = () => {
    router.push(`${nextLink}`);
  };
  const handleBack = () => {
    router.replace(`${backLink}${count}`);
  };

  const handleChangeGuardian = (childId, guardianObject) => {
    const updated = patchWillEntry("children", childId, {
      guardian: { ...guardianObject },
    });
    if (!updated) {
      console.error("Couldn't update for ID", childId);
    }
  };

  const handleRemoveAChild = (childId) => {
    console.warn("Removing from will", childId);
    // if (will.children.find((child) => child.id === id)) {

    //   removeFromWill("children", id);
    // }
  };

  return (
    <div>
      <Typography variant="title-small">{title}</Typography>
      <Typography className="my-10 leading-8">{description}</Typography>
      <form id="children-guardian-form" action={handleNext}>
        {will.children.sort(sortObjectByDob).map((child, index) => (
          <GuardianForChild
            key={`guardian-for-child-forminputs-${child.id}`}
            childId={child.id}
            index={index}
            onChangeGuardian={handleChangeGuardian}
            onRemoveAChild={handleRemoveAChild}
            isEldest={index === 0} // since children are sorted by eldest to youngest
          />
        ))}
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
            id={`children-guardian-submit-button`}
            title={`${nextLink}`}
          >
            {primaryCta}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GuardianView;

import { Button, Typography, UserProfileVariants } from "@/components";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";
import { useWill } from "@/appState/WillState";
import { sortObjectByDob } from "./useCountHook";
import Image from "next/image";
import { useSteps } from "@/appState/StepsState";

const ConfirmView = ({
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
  console.log("children -> CONFIRM VIEW");
  const router = useRouter();

  const { will, addToWill, handleCompleted } = useWill();
  const { setCompletedSteps } = useSteps();

  const handleNext = () => {
    handleCompleted("children", true); // 0 is step id for childreb
    router.push(`${nextLink}`);
  };
  const handleBack = () => {
    router.replace(`${backLink}`);
  };

  return (
    <div>
      <Typography variant="title-small">{title}</Typography>
      <Typography className="my-4 leading-8">{description}</Typography>
      <form id="children-confirm-form" action={handleNext}>
        {will.children.sort(sortObjectByDob).map((child, index) => (
          <div key={child?.id} className="flex items-center gap-3 mt-6">
            <Image
              src={`/images/backpack.png`}
              alt={`child ${child.childName} backpack`}
              width={100}
              height={100}
              quality={90}
              className={`filter hue-rotate-${index * 15} -scale-x-100`}
            />
            <div className="w-full max-w-[480px]">
              <UserProfileVariants.ChildProfileWithGuardian
                name={child.childName}
                dob={child.dob}
                guardian={{
                  main:
                    will.people.find(
                      (person) => person.id === child.guardian.main
                    ).name || undefined,
                  alternative:
                    will.people.find(
                      (person) => person.id === child.guardian.alternative
                    ).name || undefined,
                }}
              />
            </div>
          </div>
        ))}
        <div className="flex mt-14 gap-4">
          <Button
            variant="outlined"
            className="self-start"
            leftIcon={<ArrowLeftIcon />}
            onClick={handleBack}
            title={`${backLink}`}
          >
            {secondaryCta}
          </Button>
          <Button
            variant="filled"
            className="self-start"
            rightIcon={<ArrowRightIcon />}
            type="submit"
            value="submit"
            id={`children-confirm-submit-button`}
            title={`${nextLink}`}
          >
            {primaryCta}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmView;

import { Button, Typography, UserProfileVariants } from "@/components";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";
import { useWill } from "@/appState/WillState";
import Image from "next/image";
import { useChildrenWithGuardians } from "@/utils/hooks";

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

  const { handleCompleted } = useWill();

  const [children] = useChildrenWithGuardians();

  const handleNext = () => {
    handleCompleted("children", true);
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
        {children.map((child, index) => (
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
                guardian={child.guardian}
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

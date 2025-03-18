import { Button, Typography, UserProfileVariants } from "@/components";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";
import { useWill } from "@/appState/WillState";
import Image from "next/image";

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
  console.log("pets -> CONFIRM VIEW");
  const router = useRouter();

  const { will, addToWill, handleCompleted } = useWill();

  const handleNext = () => {
    handleCompleted("rites", true); // 0 is step id for petreb
    router.push(`${nextLink}`);
  };
  const handleBack = () => {
    router.replace(`${backLink}`);
  };

  return (
    <div>
      <Typography variant="title-small">{title}</Typography>
      <Typography className="my-4 leading-8">{description}</Typography>
      <form id="pets-confirm-form" action={handleNext}>
        {will.rites.map((rite, index) => (
          <div key={rite?.id} className="flex items-center gap-3 mt-6">
            <Image
              src={`/images/candle.png`}
              alt={`rite ${rite.id} candle`}
              width={100}
              height={100}
              quality={90}
              className={`filter hue-rotate-${index * 15} -scale-x-100`}
            />
            <div className="w-full max-w-[480px]">
              <UserProfileVariants.RitesDetailsWithInstructions
                religion={rite.religion}
                arrangements={rite.arrangements}
                instructions={rite.instructions}
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
            id={`pets-confirm-submit-button`}
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

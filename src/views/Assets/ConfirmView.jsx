import { Button, Typography, UserProfileVariants } from "@/components";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useWill } from "@/appState/WillState";

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
  const router = useRouter();

  const { will, handleCompleted } = useWill();

  const handleNext = () => {
    handleCompleted("assets", true);
    router.push(`${nextLink}`);
  };
  const handleBack = () => {
    router.replace(`${backLink}`);
  };

  return (
    <div>
      <Typography variant="title-small">{title}</Typography>
      <Typography className="my-4 leading-8">{description}</Typography>
      <form id="assets-confirm-form" action={handleNext}>
        {will.assets.map((asset, index) => {
          const beneficiaryDetailsFromWill = {
            ...will.people.find((person) => person.id === asset.beneficiary),
            allocationPercentage: asset.allocationPercentage,
          };

          return (
            <div key={asset?.id} className="flex items-center gap-3 mt-6">
              <Image
                src={`/images/backpack.png`}
                alt={`asset ${asset.childName} backpack`}
                width={100}
                height={100}
                quality={90}
                className={`filter hue-rotate-${index * 15} -scale-x-100`}
              />
              <div className="w-full max-w-[480px]">
                <UserProfileVariants.UserProfileWithDobAndAssetAllocation
                  name={beneficiaryDetailsFromWill.name}
                  dob={beneficiaryDetailsFromWill.dob}
                  allocationPercentage={
                    beneficiaryDetailsFromWill.allocationPercentage
                  }
                />
              </div>
            </div>
          );
        })}
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
            id={`assets-confirm-submit-button`}
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

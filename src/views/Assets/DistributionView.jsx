import { Button, InfoMessage, Typography } from "@/components";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import AddPersonIcon from "@/components/ui/Icons/Controls/add-user.svg";
import EvenIcon from "@/components/ui/Icons/Controls/percent-rotate.svg";
import { memo, useEffect, useState } from "react";
import DistributionForm from "./DistributionFormPerBeneficiary";
import { useWill } from "@/appState/WillState";
import {
  beneficiaryIdsFromOtherAssets,
  canAddNewEmpty,
  canShowAddNewCta,
  useAssetDistribution,
} from "./useAssetsHook";
import { useRouter } from "next/navigation";
let renderCount = 0;

const DistributionView = memo(
  ({
    searchParams,
    title,
    description,
    nextLink,
    backLink,
    primaryCta,
    secondaryCta,
    tooltip,
  }) => {
    const router = useRouter();
    const handleNext = () => {
      router.push(`${nextLink}`);
    };
    const handleBack = () => {
      router.replace(`${backLink}${count}`);
    };
    const [isLoading, setIsLoading] = useState(true);
    const { will, getWillCategory, removeFromWill } = useWill();
    const [availableBeneficiaries, setAvailableBeneficiaries] = useState([
      ...getWillCategory("people"),
    ]);

    const [
      getAssets,
      onAddEmptyAssetDistribution,
      onChangeAssetDistribution,
      totalAssetPercentage,
    ] = useAssetDistribution();
    const assets = getAssets();

    const handleAddEmptyDistribution = (isLoading) => {
      setIsLoading(true);
      onAddEmptyAssetDistribution(isLoading);
      setIsLoading(false);
    };

    const onRemoveDistribution = (id) => {
      removeFromWill("assets", id);
    };

    const optionFilter = (option, assetId) =>
      !beneficiaryIdsFromOtherAssets(assets, assetId).includes(option.value);

    useEffect(() => {
      // set initial loading as false only after component mount is complete
      setIsLoading(false);
      renderCount++;
    }, []);

    useEffect(() => {
      // show the 1st empty beneficiary only on first render
      if (!assets.length && renderCount === 1) {
        handleAddEmptyDistribution();
      }
    }, [canAddNewEmpty, assets, isLoading, handleAddEmptyDistribution]);

    return (
      <div className="w-full md:min-h-96">
        <div>
          <Typography variant="title-small">{title}</Typography>
          <Typography className="my-10 leading-8">{description}</Typography>
          <form id="assets-distribution-form" action={handleNext}>
            {assets.map((asset, index) => (
              <DistributionForm
                key={asset.id}
                isLast={index === assets.length - 1}
                {...{
                  totalAssetPercentage,
                  availableBeneficiaries,
                  optionFilter,
                  onRemoveDistribution,
                }}
                availableBeneficiaries={getWillCategory("people")}
                id={asset.id}
                distribution={asset}
                onChangeDistribution={onChangeAssetDistribution}
              />
            ))}
            <div className="flex justify-between md:max-w-md">
              {canShowAddNewCta(getAssets()) ? (
                <Button
                  variant="text"
                  leftIcon={<AddPersonIcon />}
                  className="mt-12"
                  onClick={() => handleAddEmptyDistribution(isLoading)}
                >
                  Add another beneficiary
                </Button>
              ) : (
                <></>
              )}
              {assets.length > 1 ? (
                <Button
                  variant="text"
                  leftIcon={<EvenIcon />}
                  className="mt-12"
                  // onClick={() => }
                >
                  Allocate Evenly
                </Button>
              ) : (
                <></>
              )}
            </div>
          </form>
        </div>
        <div className="md:mt-12">
          {tooltip ? <InfoMessage message={tooltip.description} /> : <></>}
        </div>
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
            onClick={handleNext}
            id={`children-guardian-submit-button`}
            title={`${nextLink}`}
          >
            {primaryCta}
          </Button>
        </div>
      </div>
    );
  }
);
export default DistributionView;

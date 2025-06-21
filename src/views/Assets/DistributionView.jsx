import { Button, InfoMessage, Typography } from "@/components";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import AddPersonIcon from "@/components/ui/Icons/Controls/add-user.svg";
import EvenIcon from "@/components/ui/Icons/Controls/percent-rotate.svg";
import { memo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import DistributionForm from "./DistributionFormPerBeneficiary";
import {
  beneficiaryIdsFromOtherAssets,
  canAddNewEmpty,
  canShowAddNewCta,
  useAssetDistribution,
} from "./useAssetsHook";

const DistributionView = memo(
  ({
    // searchParams,
    title,
    description,
    nextLink,
    backLink,
    primaryCta,
    secondaryCta,
    tooltip,
  }) => {
    const router = useRouter();
    const isFirstRender = useRef(true);

    const {
      assets,
      onAddEmptyAssetDistribution,
      onChangeAssetDistribution,
      onRemoveAssetDistribution,
      totalAssetPercentage,
      availableBeneficiaries,
      allocateEvenly,
      isLoading,
      setIsLoading,
    } = useAssetDistribution();

    const handleNext = () => router.push(nextLink);
    const handleBack = () => router.replace(`${backLink}${assets.length}`);

    const optionFilter = (option, assetId) =>
      !beneficiaryIdsFromOtherAssets(assets, assetId).includes(option.value);

    useEffect(() => {
      // show the 1st empty beneficiary only on first render
      if (!assets.length && renderCount === 1) {
        onAddEmptyAssetDistribution();
        isFirstRender.current = false;
      }
    }, [assets, isLoading, onAddEmptyAssetDistribution]);

    const isAddNewCtaVisible = canShowAddNewCta(assets);

    console.log("DistributionView", { isLoading });

    return (
      <div className="w-full md:min-h-96">
        <Typography variant="title-small">{title}</Typography>
        <Typography className="my-10 leading-8">{description}</Typography>

        <form id="assets-distribution-form" action={handleNext}>
          {assets.map((asset, index) => (
            <DistributionForm
              key={asset.id}
              id={asset.id}
              distribution={asset}
              isLast={index === assets.length - 1}
              totalAssetPercentage={totalAssetPercentage}
              availableBeneficiaries={availableBeneficiaries}
              optionFilter={optionFilter}
              onChangeDistribution={onChangeAssetDistribution}
              onRemoveDistribution={onRemoveAssetDistribution}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ))}

          <div className="flex justify-between md:max-w-md mt-12">
            {isAddNewCtaVisible && (
              <Button
                variant="text"
                leftIcon={<AddPersonIcon />}
                onClick={onAddEmptyAssetDistribution}
              >
                Add another beneficiary
              </Button>
            )}

            {assets.length > 1 && (
              <Button
                variant="text"
                leftIcon={<EvenIcon />}
                onClick={allocateEvenly}
              >
                Allocate Evenly
              </Button>
            )}
          </div>
        </form>

        {tooltip && (
          <div className="md:mt-12">
            <InfoMessage message={tooltip.description} />
          </div>
        )}

        <div className="flex mt-14 gap-4">
          <Button
            variant="outlined"
            className="self-start"
            leftIcon={<ArrowLeftIcon />}
            onClick={handleBack}
            title={backLink}
          >
            {secondaryCta}
          </Button>
          <Button
            variant="filled"
            className="self-start"
            rightIcon={<ArrowRightIcon />}
            onClick={handleNext}
            id="children-guardian-submit-button"
            title={nextLink}
          >
            {primaryCta}
          </Button>
        </div>
      </div>
    );
  }
);

DistributionView.displayName = "DistributionView";
export default DistributionView;

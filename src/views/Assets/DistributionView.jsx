import { Button, InfoMessage, Typography } from "@/components";
import AddPersonIcon from "@/components/ui/Icons/Controls/add-user.svg";
import WarningIcon from "@/components/ui/Icons/Informational/warning-circle.svg";
import { memo, useCallback, useEffect, useState } from "react";
import DistributionForm from "./DistributionFormPerBeneficiary";
import { useWill } from "@/appState/WillState";
import {
  beneficiaryIdsFromOtherAssets,
  canAddNewEmpty,
  canShowAddNewCta,
  useAssetDistribution,
} from "./useAssetsHook";
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

    const onRemoveDistribution = (id) => {
      removeFromWill("assets", id);
    };
    return (
      <div className="w-full md:min-h-96">
        <div>
          <Typography variant="title-small">{title}</Typography>
          <Typography className="my-10 leading-8">{description}</Typography>
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
        </div>
        <div className="md:mt-12">
          {tooltip ? <InfoMessage message={tooltip.description} /> : <></>}
        </div>
      </div>
    );
  }
);
export default DistributionView;

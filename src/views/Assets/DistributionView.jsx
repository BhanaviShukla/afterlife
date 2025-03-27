import { Button, Typography } from "@/components";
import AddPersonIcon from "@/components/ui/Icons/Controls/add-user.svg";
import { memo, useCallback, useEffect, useState } from "react";
import DistributionForm from "./DistributionFormPerBeneficiary";
import { useWill } from "@/appState/WillState";
import {
  canAddNewEmpty,
  canShowAddNewCta,
  useAssetDistribution,
} from "./useAssetsHook";

const DistributionView = memo(
  ({
    searchParams,
    title,
    description,
    nextLink,
    backLink,
    primaryCta,
    secondaryCta,
  }) => {
    const [isLoading, setIsLoading] = useState(true);
    const {
      will: { people },
      addToWill,
      getWillCategory,
    } = useWill();
    const [totalAssetPercentage, setTotalAssetPercentage] = useState(0);
    const [availableBeneficiaries, setAvailableBeneficiaries] = useState([
      ...people,
    ]);
    const assets = getWillCategory("assets");
    const [onAddEmptyAssetDistribution, onChangeAssetDistribution] =
      useAssetDistribution();

    const handleAddEmptyDistribution = (isLoading) => {
      setIsLoading(true);
      onAddEmptyAssetDistribution(isLoading);
      setIsLoading;
    };

    useEffect(() => {
      // set initial loading as false only after component mount is complete
      setIsLoading(false);
    }, []);

    useEffect(() => {
      if (canAddNewEmpty(assets) && !isLoading) {
        handleAddEmptyDistribution(isLoading);
      }
    }, [canAddNewEmpty, assets, isLoading, handleAddEmptyDistribution]);

    const onRemoveDistribution = () => {};
    const onAssetDistributionChange = () => {};
    return (
      <div className="w-full">
        <Typography variant="title-small">{title}</Typography>
        <Typography className="my-10 leading-8">{description}</Typography>
        {assets.map((asset) => (
          <DistributionForm
            key={asset.id}
            {...{
              totalAssetPercentage,
              availableBeneficiaries,
              onAssetDistributionChange,
              onRemoveDistribution,
              id: asset.id,
              distribution: asset,
            }}
          />
        ))}
        {canShowAddNewCta(assets) ? (
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
    );
  }
);
export default DistributionView;

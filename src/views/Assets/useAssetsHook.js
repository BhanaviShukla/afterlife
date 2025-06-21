import { useWill } from "@/appState/WillState";
import { areObjectsEqual } from "@/utils/object";
import { useCallback, useEffect, useState } from "react";

/*

assets: [
  {
    beneficiary: <personId>
    allocationPercentage: <percentage> 
  }
]
*/
export const getTotalAllocationFromAssets = (assets) =>
  assets.reduce(
    (currentTotal, distribution) =>
      currentTotal + distribution.allocationPercentage,
    0
  );

export const canShowAddNewCta = (assets) =>
  assets.length &&
  assets.findIndex((value) => value.beneficiary === "") === -1 &&
  getTotalAllocationFromAssets(assets) < 100;

export const canAddNewEmpty = (assets) =>
  !assets.length || canShowAddNewCta(assets);

export const beneficiaryIdsFromOtherAssets = (
  assets,
  currentAssetId = "empty"
) =>
  assets
    .filter((a) => a.id !== currentAssetId)
    .map((asset) => asset.beneficiary);

export const useAssetDistribution = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { will, addToWill, patchWillEntry, getWillCategory, removeFromWill } =
    useWill();
  const getAssets = useCallback(
    () => getWillCategory("assets"),
    [getWillCategory]
  );

  const [assets, setAssets] = useState([...getAssets()]);
  const [totalAssetPercentage, setTotalAssetPercentage] = useState(
    getTotalAllocationFromAssets(assets)
  );
  const [availableBeneficiaries, setAvailableBeneficiaries] = useState([
    ...will.people,
  ]);

  const onAddEmptyAssetDistribution = useCallback(() => {
    if (isLoading) {
      console.warn("LOADING");
      return;
    }

    if (!canAddNewEmpty(assets)) {
      console.warn("can't add a new empty distribution");
      return;
    }

    setIsLoading(true);
    const newDistribution = {
      beneficiary: "",
      allocationPercentage: 100 - totalAssetPercentage ?? 0,
    };
    const id = addToWill("assets", {
      ...newDistribution,
    });
    console.log({ id }, "added to assets");
    if (!id) {
      console.error("Oops! Couldn't add asset for some reason");
    }
  }, [addToWill, totalAssetPercentage, assets, isLoading]);

  const onChangeAssetDistribution = (
    id,
    distribution = {
      beneficiary: "",
      allocationPercentage: 100,
    },
    shouldSetLoading = true
  ) => {
    if (isLoading) {
      console.warn("LOADING");
      return;
    }
    console.log("onChangeAssetDistribution called", { id, distribution });
    if (shouldSetLoading) setIsLoading(true);
    const isUpdated = patchWillEntry("assets", id, { ...distribution });
    if (!isUpdated) {
      console.error("Couldn't update asset distribution for some reason");
    }
  };

  const allocateEvenly = () => {
    if (isLoading) {
      console.warn("LOADING");
      return;
    }
    console.log("Allocating assets evenly");
    const totalAssets = assets.length;
    const equalPercentage = (100 / totalAssets).toFixed(2);

    assets.forEach((asset, index) => {
      onChangeAssetDistribution(
        asset.id,
        {
          beneficiary: asset.beneficiary,
          allocationPercentage: Number(equalPercentage),
        },
        index === 0
      ); // only first time sets is loading to true
    });
  };

  const onRemoveAssetDistribution = (id) => {
    setIsLoading(true);
    removeFromWill("assets", id);
  };

  useEffect(() => {
    if (areObjectsEqual(assets, will.assets)) {
      // do nothin
      console.log("Objects are equal");
      setIsLoading(false);
      return;
    }
    setAssets([...getAssets()]);
    setTotalAssetPercentage(
      will.assets.reduce(
        (currentTotal, distribution) =>
          currentTotal + distribution.allocationPercentage,
        0
      )
    );
    setAvailableBeneficiaries([...getWillCategory("people")]);
    setIsLoading(false);
  }, [assets, will.assets, getAssets, getWillCategory]);

  return {
    assets,
    onAddEmptyAssetDistribution,
    onChangeAssetDistribution,
    onRemoveAssetDistribution,
    totalAssetPercentage,
    availableBeneficiaries,
    allocateEvenly,
    isLoading,
    setIsLoading,
  };
};

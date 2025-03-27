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

export const canShowAddNewCta = (assets) =>
  assets.length && assets.findIndex((value) => value.beneficiary === "") === -1;
export const canAddNewEmpty = (assets) =>
  !assets.length || canShowAddNewCta(assets);

export const useAssetDistribution = () => {
  const { will, addToWill, patchWillEntry, getWillCategory } = useWill();
  const getAssets = () => getWillCategory("assets");

  const [assets, setAssets] = useState([...getAssets()]);
  const [totalAssetPercentage, setTotalAssetPercentage] = useState(0);
  const [availableBeneficiaries, setAvailableBeneficiaries] = useState([
    ...will.people,
  ]);

  const onAddEmptyAssetDistribution = useCallback(
    (isLoading = false) => {
      console.log("onAddEmptyAssetDistribution called");
      if (isLoading) {
        console.log("LOADING");
        return;
      }

      if (!canAddNewEmpty(assets)) {
        console.warn("can't add a new empty distribution");
        return;
      }
      const newDistribution = {
        beneficiary: "",
        allocationPercentage: 100 - totalAssetPercentage ?? 0,
      };
      const id = addToWill("assets", {
        ...newDistribution,
      });
      console.log({ id });
      if (!id) {
        console.error("Oops! Couldn't add asset for some reason");
        return;
      }
    },
    [addToWill, totalAssetPercentage, assets, canAddNewEmpty]
  );
  const onChangeAssetDistribution = (
    id,
    distribution = {
      beneficiary: "",
      allocationPercentage: 100,
    }
  ) => {
    const isUpdated = patchWillEntry("assets", id, { ...distribution });
    if (!isUpdated) {
      console.error("Couldn't update asset distribution for some reason");
    }
  };

  useEffect(() => {
    if (areObjectsEqual(assets, will.assets)) {
      // do nothin
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
  }, [will.assets]);

  return [
    getAssets,
    onAddEmptyAssetDistribution,
    onChangeAssetDistribution,
    totalAssetPercentage,
    availableBeneficiaries,
  ];
};

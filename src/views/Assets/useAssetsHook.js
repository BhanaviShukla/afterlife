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

export const getAvailableBeneficiaries = (assets, people) =>
  people.filter(
    (person) => !beneficiaryIdsFromAssets(assets).includes(person.id)
  );

export const useAssetDistribution = () => {
  const {
    will,
    addToWill,
    patchWillEntry,
    getWillCategory,
    UNSAFE_replaceWillCategoryByValue,
  } = useWill();
  const getAssets = () => getWillCategory("assets");

  const [assets, setAssets] = useState([...getAssets()]);
  const [totalAssetPercentage, setTotalAssetPercentage] = useState(
    getTotalAllocationFromAssets(assets)
  );
  const [availableBeneficiaries, setAvailableBeneficiaries] = useState([
    ...will.people,
  ]);

  const onAddEmptyAssetDistribution = useCallback(
    (isLoading = false) => {
      console.log("onAddEmptyAssetDistribution called");
      if (isLoading) {
        console.warn("LOADING");
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
      console.log({ id }, "added to assets");
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

  const allocateEvenly = () => {
    // select currently only supports multiples of 10.
    //  what happens if we have 6 beneficiaries, so the equal percentage comes out to be: 16.667?
    // can't support allocateEvenly until this is clear
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
  }, [assets, will.assets, getAssets]);

  return [
    getAssets,
    onAddEmptyAssetDistribution,
    onChangeAssetDistribution,
    totalAssetPercentage,
    availableBeneficiaries,
  ];
};

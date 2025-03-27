import { useWill } from "@/appState/WillState";
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
  assets.length && !assets.indexOf((value) => value.beneficiary === "");
export const canAddNewEmpty = (assets) =>
  !assets.length || canShowAddNewCta(assets);

export const useAssetDistribution = () => {
  const { will, addToWill } = useWill();
  const [assets, setAssets] = useState([...will.assets]);
  const [totalAssetPercentage, setTotalAssetPercentage] = useState(0);
  const [availableBeneficiaries, setAvailableBeneficiaries] = useState([
    ...will.people,
  ]);
  const onAddEmptyAssetDistribution = useCallback(
    (isLoading) => {
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

  const onChangeAssetDistribution = () => {};
  // useEffect(() => {
  //   console.log(assets.length);
  //   if (!assets.length) onAddEmptyAssetDistribution();
  // }, [assets.length, onAddEmptyAssetDistribution]);
  // on add new - first add empty distribution

  return [
    onAddEmptyAssetDistribution,
    onChangeAssetDistribution,
    assets,
    totalAssetPercentage,
    availableBeneficiaries,
  ];
};

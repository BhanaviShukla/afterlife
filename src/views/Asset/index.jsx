"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ConfirmView from "../Rites/ConfirmView";
import ReligionView from "../Rites/ReligionView";

import { assetsNestedView } from "@/appState/assetsData";
import { SelectionView } from "./SelectionView";
import { AssetTypeView } from "./AssetTypeView";
import { AssetBeneficiaryView } from "./AssetBeneficiaryView";

const NestedAssetView = ({
  nestedSlug,
  nestedProps,
  searchParams,
  pathname,
}) => {
  console.log({ nestedSlug, nestedProps });
  switch (nestedSlug) {
    case assetsNestedView.SELECTION:
      return (
        <SelectionView
          pathname={pathname}
          searchParams={searchParams}
          {...nestedProps}
        />
      );
    case assetsNestedView.PROPERTY:
    case assetsNestedView.GIFT:
    case assetsNestedView.VEHICLE:
    case assetsNestedView.CASH:
        return (
            <AssetTypeView
              pathname={pathname}
              searchParams={searchParams}
              {...nestedProps}
            />
          );
    case assetsNestedView.BENEFICIARY:
        return (
            <AssetBeneficiaryView
                pathname={pathname}
                searchParams={searchParams}
                {...nestedProps}
            />
            );
    case assetsNestedView.CONFIRM:
      return (
        <ConfirmView
          pathname={pathname}
          searchParams={searchParams}
          {...nestedProps}
        />
      );
    case assetsNestedView.RELIGION:
    default:
      return (
        <ReligionView
          pathname={pathname}
          searchParams={searchParams}
          {...nestedProps}
        />
      );
  }
};

const AssetView = ({ slug, step, data, ...props }) => {
  console.log({ props, slug, step, data });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nestedSlug = step[step.length - 1];
  console.log({ nestedSlug });

  const isNotRedirected = step?.length && step[step.length - 1] === "assets";

  useEffect(() => {
    if (isNotRedirected) router.replace(`${pathname}/selection`);
  }, [isNotRedirected, pathname, router]);

  if (isNotRedirected) return <></>;
  return (
    <div className="flex gap-6">
      <NestedAssetView
        nestedSlug={nestedSlug}
        nestedProps={data[nestedSlug]}
        searchParams={searchParams}
        pathname={pathname}
      />
    </div>
  );
};

export default AssetView;

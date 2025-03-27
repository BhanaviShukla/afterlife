"use client";
import { assetsNestedViews } from "@/appState/assetsData";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ConfirmView from "./ConfirmView";
import DistributionView from "./DistributionView";

const NestedAssetsView = ({
  nestedSlug,
  nestedProps,
  searchParams,
  pathname,
}) => {
  if (nestedSlug === assetsNestedViews.CONFIRM)
    return (
      <ConfirmView
        pathname={pathname}
        searchParams={searchParams}
        {...nestedProps}
      />
    );
  return (
    <DistributionView
      pathname={pathname}
      searchParams={searchParams}
      {...nestedProps}
    />
  );
};

const AssetsView = ({ slug, step, data, ...props }) => {
  const router = useRouter();
  const nestedSlug = step[step.length - 1];
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isNotRedirected = step?.length && step[step.length - 1] === "assets";

  useEffect(() => {
    if (isNotRedirected)
      router.replace(`${pathname}/${assetsNestedViews.DISTRIBUTION}`);
  }, [isNotRedirected, pathname, router]);

  return (
    <div className="flex gap-6">
      <NestedAssetsView
        nestedSlug={nestedSlug}
        nestedProps={data[nestedSlug]}
        searchParams={searchParams}
        pathname={pathname}
      />
    </div>
  );
};

export default AssetsView;

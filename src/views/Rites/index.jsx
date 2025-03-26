"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import DetailsView from "./DetailsView";
import ReligionView from "./ReligionView";
import ConfirmView from "./ConfirmView";
import { ritesNestedViews } from "@/appState/ritesData";

const NestedRitesView = ({
  nestedSlug,
  nestedProps,
  searchParams,
  pathname,
}) => {
  console.log({ nestedSlug, nestedProps });
  switch (nestedSlug) {
    case ritesNestedViews.DETAILS:
      return (
        <DetailsView
          pathname={pathname}
          searchParams={searchParams}
          {...nestedProps}
        />
      );
    case ritesNestedViews.CONFIRM:
      return (
        <ConfirmView
          pathname={pathname}
          searchParams={searchParams}
          {...nestedProps}
        />
      );
    case ritesNestedViews.RELIGION:
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

const RitesView = ({ slug, step, data, ...props }) => {
  console.log({ props, slug, step, data });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nestedSlug = step[step.length - 1];
  console.log({ nestedSlug });

  const isNotRedirected = step?.length && step[step.length - 1] === "rites";

  useEffect(() => {
    if (isNotRedirected) router.replace(`${pathname}/religion`);
  }, [isNotRedirected, pathname, router]);

  if (isNotRedirected) return <></>;
  return (
    <div className="flex gap-6">
      <NestedRitesView
        nestedSlug={nestedSlug}
        nestedProps={data[nestedSlug]}
        searchParams={searchParams}
        pathname={pathname}
      />
    </div>
  );
};

export default RitesView;

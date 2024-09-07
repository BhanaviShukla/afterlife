"use client";
import { useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { childrenNestedViews } from "@/appState/childrenData";
import CountView from "./CountView";
import DetailsView from "./DetailsView";
import GuardianView from "./GuardianView";
import ConfirmView from "./ConfirmView";

const NestedChildrenView = ({
  nestedSlug,
  nestedProps,
  searchParams,
  pathname,
}) => {
  console.log({ nestedSlug, nestedProps });
  switch (nestedSlug) {
    case childrenNestedViews.DETAILS:
      return (
        <DetailsView
          pathname={pathname}
          searchParams={searchParams}
          {...nestedProps}
        />
      );
    case childrenNestedViews.GUARDIAN:
      return (
        <GuardianView
          pathname={pathname}
          searchParams={searchParams}
          {...nestedProps}
        />
      );
    case childrenNestedViews.CONFIRM:
      return (
        <ConfirmView
          pathname={pathname}
          searchParams={searchParams}
          {...nestedProps}
        />
      );
    case childrenNestedViews.COUNT:
    default:
      return (
        <CountView
          pathname={pathname}
          searchParams={searchParams}
          {...nestedProps}
        />
      );
  }
};

const ChildrenView = ({ slug, step, data, ...props }) => {
  console.log({ props, slug, step, data });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nestedSlug = step[step.length - 1];
  console.log({ nestedSlug });

  const isNotRedirected = step?.length && step[step.length - 1] === "children";

  useEffect(() => {
    if (isNotRedirected) router.replace(`${pathname}/count`);
  }, [isNotRedirected, pathname, router]);

  if (isNotRedirected) return <></>;
  return (
    <div className="flex gap-6">
      <NestedChildrenView
        nestedSlug={nestedSlug}
        nestedProps={data[nestedSlug]}
        searchParams={searchParams}
        pathname={pathname}
      />
    </div>
  );
};
export default ChildrenView;

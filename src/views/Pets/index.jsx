"use client";
import { useContext, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useWill } from "@/appState/WillState";
import { Button } from "@/components";
import PlusIcon from "@/components/ui/Icons/Controls/Buttons/plus-button-white.svg";
import { ManagedUI } from "@/appState/UIState";
import { petsData, petsNestedViews } from "@/appState/petsData";
import AddPetModal from "./AddPet";
import NextStepButton from "@/components/NextStepButton";
import DetailsView from "./DetailsView";
import CountView from "./CountView";
import CaretakerView from "./CaretakerView";
import ConfirmView from "./ConfirmView";

const ADD_PET_MODAL = "add_pet_modal";
const NestedPetsView = ({
  nestedSlug,
  nestedProps,
  searchParams,
  pathname,
}) => {
  console.log({ nestedSlug, nestedProps });
  switch (nestedSlug) {
    case petsNestedViews.DETAILS:
      return (
        <DetailsView
          pathname={pathname}
          searchParams={searchParams}
          {...nestedProps}
        />
      );
    case petsNestedViews.CARETAKER:
      return (
        <CaretakerView
          pathname={pathname}
          searchParams={searchParams}
          {...nestedProps}
        />
      );
    case petsNestedViews.CONFIRM:
      return (
        <ConfirmView
          pathname={pathname}
          searchParams={searchParams}
          {...nestedProps}
        />
      );
    case petsNestedViews.COUNT:
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

const PetsView = ({ slug, step, data, ...props }) => {
  console.log({ props, slug, step, data });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nestedSlug = step[step.length - 1];
  console.log({ nestedSlug });

  const isNotRedirected = step?.length && step[step.length - 1] === "pets";

  useEffect(() => {
    if (isNotRedirected) router.replace(`${pathname}/count`);
  }, [isNotRedirected, pathname, router]);

  if (isNotRedirected) return <></>;
  return (
    <div className="flex gap-6">
      <NestedPetsView
        nestedSlug={nestedSlug}
        nestedProps={data[nestedSlug]}
        searchParams={searchParams}
        pathname={pathname}
      />
    </div>
  );
};
export default PetsView;

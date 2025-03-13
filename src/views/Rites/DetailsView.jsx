import {
  Button,
  EditableSelectInput,
  TextInput,
  Typography,
} from "@/components";
import { useEffect, useState } from "react";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";
import { useWill } from "@/appState/WillState";
import Image from "next/image";
import {
  useCategoryList,
  useDebouncedCallback,
  useReligionFromWillOrSearchParams,
} from "@/utils/hooks";

const DetailsView = ({
  searchParams,
  // pathname,
  title,
  description,
  formData,
  nextLink,
  backLink,
  primaryCta,
  secondaryCta,
}) => {
  const router = useRouter();

  const { will, UNSAFE_replaceWillCategoryByValue } = useWill();

  const [religion, setReligion] = useReligionFromWillOrSearchParams(
    searchParams,
    "rites"
  );
  const [rites, setRites] = useCategoryList(1, "rites");

  useEffect(() => {
    setReligion(String(searchParams.get("religion")));
  }, [searchParams]);

  const handleNext = () => {
    UNSAFE_replaceWillCategoryByValue("rites", [...rites]);
    router.push(`${nextLink}`);
  };
  const handleBack = () => {
    router.replace(`${backLink}${religion}`);
  };

  const onChangeInput = (id, name, value) => {
    console.log([{ ...rites[0], [name]: value }]);
    setRites((prevRites) => [{ ...prevRites[0], [name]: value }]);
  };
  const debouncedOnChange = useDebouncedCallback(onChangeInput, 500);

  return (
    <div className="w-full">
      <Typography variant="title-small">{title}</Typography>
      <Typography className="my-10 leading-8">{description}</Typography>
      <form id="rites-details-form" action={handleNext}>
        {rites.map((rite, index) => (
          <div key={rite?.id} className="flex items-center gap-3">
            <Image
              src={`/images/backpack.png`}
              alt={`rite ${rite.arrangements} backpack`}
              width={100}
              height={100}
              quality={90}
              className={`filter hue-rotate-${index * 15} -scale-x-100`}
            />
            <div className="w-full max-w-[480px]">
              {/* Arrangement */}
              <EditableSelectInput
                id={`${rite.id}-${formData.arrangements.name}`}
                {...formData.arrangements}
                defaultValue={
                  rite
                    ? formData.arrangements.options.find(
                        (option) => option.value === rite.arrangements
                      )
                    : formData.arrangements.options[0]
                }
                onChange={(_, value) =>
                  debouncedOnChange(rite.id, formData.arrangements.name, value)
                }
              />
              {/* instructions */}
              <TextInput
                id={`${rite.id}-${formData.instructions.name}`}
                {...formData.instructions}
                defaultValue={rite ? rite.instructions : undefined}
                onChange={(e) =>
                  debouncedOnChange(
                    rite.id,
                    formData.instructions.name,
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        ))}

        <div className="flex mt-14 gap-4">
          <Button
            variant="outlined"
            className="self-start"
            leftIcon={<ArrowLeftIcon />}
            onClick={handleBack}
            title={`${backLink}${religion}`}
          >
            {secondaryCta}
          </Button>
          <Button
            variant="filled"
            className="self-start"
            rightIcon={<ArrowRightIcon />}
            type="submit"
            value="submit"
            id={`rites-details-submit-button`}
            title={`${nextLink}`}
          >
            {primaryCta}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DetailsView;

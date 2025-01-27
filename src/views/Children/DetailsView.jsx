import { Button, TextInput, Typography } from "@/components";
import { useEffect } from "react";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import CrossIcon from "@/components/ui/Icons/Controls/cancel.svg";
import AddChildIcon from "@/components/ui/Icons/Controls/add-user.svg";
import { useRouter } from "next/navigation";
import { useWill } from "@/appState/WillState";
import Image from "next/image";
import { useDebouncedCallback } from "@/utils/hooks";
import {
  sortObjectByDob,
  useChildrenList,
  useCountFromWillOrSearchParams,
} from "./useCountHook";

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

  const { will, UNSAFE_replaceWillCategoryByValue, removeFromWill } = useWill();

  const [count, setCount] = useCountFromWillOrSearchParams(searchParams);
  const [children, setChildren] = useChildrenList(count);

  useEffect(() => {
    setCount(Number(searchParams.get("count")) || 1);
  }, [searchParams]);

  const handleNext = () => {
    UNSAFE_replaceWillCategoryByValue("children", [...children]);
    router.push(`${nextLink}`);
  };
  const handleBack = () => {
    router.replace(`${backLink}${count}`);
  };

  const onAddAChild = () => {
    setCount((prevCount) => prevCount + 1);
    setChildren((prevChildren) => [
      ...prevChildren,
      {
        id: Date.now() + children.length,
        dob: "",
        childName: "",
      },
    ]);
  };

  const onRemoveAChild = (id) => {
    setCount((prevCount) => prevCount - 1);
    setChildren((prevChildren) => [
      ...prevChildren.filter((child) => child.id !== id),
    ]);

    if (will.children.find((child) => child.id === id)) {
      console.warn("Removing from will", id);
      removeFromWill("children", id);
    }
  };
  const onChangeInput = (id, name, value) => {
    const editedChild = children.find((child) => child.id === id);

    setChildren((prevChildren) => [
      // unrelated children remain as i
      ...prevChildren.filter((child) => child.id !== id),
      { ...editedChild, [name]: value },
    ]);
  };
  const debouncedOnChange = useDebouncedCallback(onChangeInput, 500);

  return (
    <div className="w-full">
      <Typography variant="title-small">{title}</Typography>
      <Typography className="my-10 leading-8">{description}</Typography>
      <form id="children-details-form" action={handleNext}>
        {children.sort(sortObjectByDob).map((child, index) => (
          <div key={child?.id} className="flex items-center gap-3">
            <Image
              src={`/images/backpack.png`}
              alt={`child ${child.childName} backpack`}
              width={100}
              height={100}
              quality={90}
              className={`filter hue-rotate-${index * 15} -scale-x-100`}
            />
            <div className="w-full max-w-[480px]" id={child.id}>
              {child.id}
              <TextInput
                id={`${child.id}-${formData.childName.name}`}
                {...formData.childName}
                defaultValue={child ? child.childName : undefined}
                onChange={(e) =>
                  debouncedOnChange(
                    child.id,
                    formData.childName.name,
                    e.target.value
                  )
                }
              />
              {/* dob */}
              <TextInput
                id={`${child.id}-${formData.dob.name}`}
                {...formData.dob}
                defaultValue={child ? child.dob : undefined}
                onChange={(e) =>
                  debouncedOnChange(child.id, formData.dob.name, e.target.value)
                }
              />
            </div>
            <Button
              variant="text"
              onClick={() => {
                onRemoveAChild(child.id);
              }}
              className="min-w-0 text-center align-middle ml-12 p-2 hover:bg-slate-100 rounded-lg"
            >
              <CrossIcon width={16} height={17} />
            </Button>
          </div>
        ))}

        <Button
          variant="text"
          leftIcon={<AddChildIcon />}
          className="mt-12"
          onClick={onAddAChild}
        >
          Add another child
        </Button>

        <div className="flex mt-14 gap-4">
          <Button
            variant="outlined"
            className="self-start"
            leftIcon={<ArrowLeftIcon />}
            onClick={handleBack}
            title={`${backLink}${count}`}
          >
            {secondaryCta}
          </Button>
          <Button
            variant="filled"
            className="self-start"
            rightIcon={<ArrowRightIcon />}
            type="submit"
            value="submit"
            id={`children-details-submit-button`}
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

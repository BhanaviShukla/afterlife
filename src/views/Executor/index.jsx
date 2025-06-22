"use client";
import { Button, Checkbox, InfoMessage, Typography } from "@/components";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import AddPersonIcon from "@/components/ui/Icons/Controls/add-user.svg";
import ExecutorForm from "./ExecutorForm";
import { executorsData } from "@/appState/executorsData";
import { useEffect, useRef } from "react";
import { useExecutors } from "./useExecutorsHook";
import { useRouter } from "next/navigation";

const ExecutorView = ({ ...props }) => {
  const {
    title,
    description,
    tooltip,
    primaryCta,
    secondaryCta,
    backLink,
    nextLink,
  } = executorsData;

  const handleNext = () => router.push(nextLink);
  const handleBack = () => router.back();
  const {
    executors,
    isLoading,
    setIsLoading,
    onChangeExecutor,
    onAddEmptyExecutor,
    optionsFilterForAvailableExecutors,
    setJointExecutors,
    availableExecutors,
  } = useExecutors();

  const router = useRouter();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!executors.length && isFirstRender.current) {
      onAddEmptyExecutor();
      isFirstRender.current = false;
    }
  }, [executors.length, onAddEmptyExecutor]);

  return (
    <div className="w-full md:min-h-96">
      <div>
        <Typography variant="title-small">{title}</Typography>
        <Typography className="my-10 leading-8">{description}</Typography>
        <form id="executors-form" action={handleNext}>
          {executors.map((executor, index) => (
            <ExecutorForm
              key={executor.id}
              id={executor.id}
              {...{
                executor,
                isLoading,
                setIsLoading,
                optionFilter: optionsFilterForAvailableExecutors,
                onChangeExecutor,
                availableExecutors,
              }}
            />
          ))}
          {executors.length === 2 && (
            <Checkbox
              checked={executors.every((e) => e.isJoint)}
              // TODO: move to text in executorsData
              label={
                "I want both executors to work together as joint executors."
              }
              onChange={(e) => {
                setJointExecutors(e.target.checked);
              }}
              className={"text-accent"}
            />
          )}
        </form>
      </div>
      {executors.length < 2 && (
        <div className="flex justify-between md:max-w-md mt-12">
          <Button
            variant="text"
            leftIcon={<AddPersonIcon />}
            onClick={onAddEmptyExecutor}
          >
            Add a second executor
          </Button>
        </div>
      )}
      {tooltip ? (
        <div className="md:mt-12 max-w-md">
          {<InfoMessage message={tooltip.description} />}
        </div>
      ) : (
        <></>
      )}

      <div className="flex mt-14 gap-4">
        <Button
          variant="outlined"
          className="self-start"
          leftIcon={<ArrowLeftIcon />}
          onClick={handleBack}
          title={`${backLink}`}
        >
          {secondaryCta}
        </Button>
        <Button
          variant="filled"
          className="self-start"
          rightIcon={<ArrowRightIcon />}
          onClick={handleNext}
          id={`children-guardian-submit-button`}
          title={`${nextLink}`}
        >
          {primaryCta}
        </Button>
      </div>
    </div>
  );
};
export default ExecutorView;

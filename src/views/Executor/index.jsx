"use client";
import {
  Button,
  EditableSelectInput,
  InfoMessage,
  Typography,
} from "@/components";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import AddPersonIcon from "@/components/ui/Icons/Controls/add-user.svg";
import ExecutorForm from "./ExecutorForm";
import { useWill } from "@/appState/WillState";
import { executorsData } from "@/appState/executorsData";
import { useEffect } from "react";
import { useExecutors } from "./useExecutorsHook";

const ADD_NEW_BENEFICIARY_OPTION = "Add a new executor";

const EDIT_BENEFICIARY_MODAL = "edit-executor-details-modal";
const ADD_BENEFICIARY_MODAL = "add-another-executor-modal";

const ExecutorView = ({ ...props }) => {
  const { will, getWillCategory, removeFromWill } = useWill();
  const {
    title,
    description,
    tooltip,
    formCta,
    primaryCta,
    secondaryCta,
    backLink,
    nextLink,
  } = executorsData;

  const handleNext = () => {};
  const handleBack = () => {};
  const [executors, onChangeExecutor] = useExecutors();
  console.log({ executors });
  return (
    <div className="w-full md:min-h-96">
      <div>
        <Typography variant="title-small">{title}</Typography>
        <Typography className="my-10 leading-8">{description}</Typography>
        <form id="executors-form" action={handleNext}>
          {executors.map((executor) => (
            <ExecutorForm key={executor.id} {...executor} />
          ))}
        </form>
      </div>
      <div className="md:mt-12">
        {tooltip ? <InfoMessage message={tooltip.description} /> : <></>}
      </div>
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

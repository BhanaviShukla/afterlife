import React from "react";
import InfoIcon from "../Icons/Informational/info-empty.svg";
import WarningIcon from "../Icons/Informational/warning-circle.svg";
import Typography from "../Typography/typography";

const InfoMessage = ({
  message,
  Icon = InfoIcon,
  colorClassName = "text-n300",
}) => {
  return (
    <div className="flex items-center gap-x-1.5 text-n400 mt-auto">
      <div
        className="flex-shrink-0"
        style={{
          width: 16,
          height: 16,
        }}
      >
        <Icon className={colorClassName} />
      </div>
      <Typography
        className={`text-secondary text-pretty ${colorClassName}`}
        variant="caption"
      >
        {message}
      </Typography>
    </div>
  );
};

export default InfoMessage;

export const ErrorMessage = ({
  message,
  Icon = WarningIcon,
  colorClassName = "text-status-d300",
}) => <InfoMessage {...{ message, Icon, colorClassName }} />;

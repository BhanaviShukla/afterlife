import React from "react";
import InfoIcon from "../Icons/Informational/info-empty.svg";
import Typography from "../Typography/typography";

const InfoMessage = ({ message }) => {
  return (
    <div className="flex items-center gap-x-1.5 text-n400 mt-auto max-w-md">
      <div className="flex-shrink-0">
        <InfoIcon className=" text-n300" /> {/* Adjust size and color */}
      </div>
      <Typography className="text-secondary text-pretty" variant="caption">
        {message}
      </Typography>
    </div>
  );
};

export default InfoMessage;

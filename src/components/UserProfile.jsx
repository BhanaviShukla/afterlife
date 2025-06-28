import React from "react"; // Using react-icons for the crown icon
import BirthdayCake from "./ui/Icons/Informational/Dashboard/birthday-cake.svg";
import MicrochipIcon from "./ui/Icons/Informational/Dashboard/microchip.svg";
import { Typography } from ".";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", dateString);
    return dateString;
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getHtmlIdFromName = (name = "") => name.split(" ").join("-");

export const UserProfileWithDob = ({ name, dob }) => {
  return (
    <div
      className="flex items-baseline gap-x-2 text-gray-800"
      id={`user-profile-with-dob-${getHtmlIdFromName(name)}`}
    >
      {/* Name */}
      <Typography variant="h4" className="font-sans">
        {name}
      </Typography>
      <div className="flex gap-x-1">
        {/* Crown Icon */}
        <BirthdayCake />
        {/* Date of Birth */}
        <span className="text-gray-500">{formatDate(dob)}</span>
      </div>
    </div>
  );
};

export const UserProfileWithDobAndAssetAllocation = ({
  name,
  dob,
  allocationPercentage,
}) => {
  return (
    <div id={`user-profile-with-assets-${getHtmlIdFromName(name)}`}>
      <UserProfileWithDob {...{ dob, name }} />
      {/* Allocations Section Section */}
      <div className="flex gap-1 mt-2">
        <Typography variant="span" className="text-accent-secondary mr-4">
          Allocation
        </Typography>
        <Typography variant="span" className="font-semibold text-secondary">
          {allocationPercentage}%
        </Typography>
      </div>
    </div>
  );
};

export const PetProfileWithMicrochip = ({ name, microchip }) => {
  return (
    <div
      className="flex items-baseline space-x-3 text-gray-800"
      id={`pet-profile-with-microchip-${microchip}`}
    >
      {/* Name */}
      <Typography variant="h4" className="font-sans">
        {name}
      </Typography>
      <div className="flex space-x-1">
        {/* Crown Icon */}
        <MicrochipIcon />
        {/* Date of Birth */}
        <span className="text-gray-500">{microchip}</span>
      </div>
    </div>
  );
};

export const ChildProfileWithGuardian = ({ name, dob, guardian }) => {
  return (
    <div
      className="flex-1"
      id={`child-profile-with-guardian-${getHtmlIdFromName(name)}`}
    >
      <UserProfileWithDob name={name} dob={dob} />

      {/* Guardians Section */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <p className="text-accent-secondary text-sm">Main guardian</p>
          <p className="font-400 text-secondary">{guardian.main}</p>
        </div>
        <div>
          {guardian.alternative && (
            <>
              <p className="text-accent-secondary text-sm">
                Alternative guardian
              </p>
              <p className="font-400 text-secondary">{guardian.alternative}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const PetProfileWithCaretaker = ({ name, microchip, caretaker }) => {
  return (
    <div className="" id={`pet-profile-with-caretaker-${microchip}`}>
      <PetProfileWithMicrochip name={name} microchip={microchip} />

      {/* Guardians Section */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <p className="text-accent-secondary text-sm">Main caretaker</p>
          <p className="font-400 text-secondary">{caretaker.main}</p>
        </div>
        <div>
          {caretaker.alternative && (
            <>
              <p className="text-accent-secondary text-sm">
                Alternative caretaker
              </p>
              <p className="font-400 text-secondary">{caretaker.alternative}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const RitesDetailsWithInstructions = ({
  religion,
  arrangements,
  instructions,
}) => {
  return (
    <>
      {/* RITES */}
      <div
        className="my-6"
        id={`user-profile-rites-${getHtmlIdFromName(religion)}`}
      >
        <Typography variant="heading" className="text-xl">
          Rites
        </Typography>
        <div className="flex justify-between mt-5">
          <div className="flex justify-between">
            <Typography variant="span" className="text-accent-secondary mr-4">
              Religion
            </Typography>
            <Typography variant="span" className="font-semibold text-secondary">
              {religion}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="span" className="text-accent-secondary mr-4">
              Arrangements
            </Typography>
            <Typography variant="span" className="font-semibold text-secondary">
              {arrangements}
            </Typography>
          </div>
        </div>
      </div>
      {/* Instructions */}
      <div
        className="my-6"
        id={`user-profile-rites-intructions-${getHtmlIdFromName(instructions)}`}
      >
        <Typography variant="heading" className="text-xl">
          Additional Instructions
        </Typography>
        <div className="mt-5">
          <Typography variant="span" className="font-400 text-secondary">
            {instructions}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default UserProfileWithDob;

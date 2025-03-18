import React from "react"; // Using react-icons for the crown icon
import BirthdayCake from "./ui/Icons/Informational/Dashboard/birthday-cake.svg";
import MicrochipIcon from "./ui/Icons/Informational/Dashboard/microchip.svg";
import { Typography } from ".";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const UserProfileWithDob = ({ name, dob }) => {
  return (
    <div
      className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 text-gray-800"
      id={`user-profile-with-dob-${name}`}
    >
      {/* Name */}
      <Typography variant="h4" className="font-sans">
        {name}
      </Typography>
      <div className="flex items-center space-x-2">
        {/* Crown Icon */}
        <BirthdayCake className="h-5 w-5 text-gray-500" />
        {/* Date of Birth */}
        <span className="text-gray-500">{formatDate(dob)}</span>
      </div>
    </div>
  );
};

export const PetProfileWithMicrochip = ({ name, microchip }) => {
  return (
    <div
      className="flex items-baseline space-x-3 text-gray-800"
      id={`pet-profile-with-microchip-${name}`}
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
    <div className="p-2">
      {/* Name and Date of Birth */}
      <UserProfileWithDob name={name} dob={dob} />

      {/* Guardians Section */}
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <p className="text-accent-secondary text-xl">Main guardian:</p>
            <p className="font-medium text-secondary text-xl">{guardian.main}</p>
          </div>
          {guardian.alternative && (
            <div className="flex items-center space-x-2">
              <p className="text-accent-secondary text-xl">Alternative guardian:</p>
              <p className="font-medium text-secondary text-xl">{guardian.alternative}</p>
            </div>
          )}
        </div>
      </div>
    </div>


  );
};

export const PetProfileWithCaretaker = ({ name, microchip, caretaker }) => {
  return (
    <div className="">
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
      <div className="my-6">
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
      <div className="my-6">
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

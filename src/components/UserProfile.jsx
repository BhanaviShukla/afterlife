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
      className="flex items-baseline space-x-3 text-gray-800"
      id={`user-profile-with-dob-${name}`}
    >
      {/* Name */}
      <Typography variant="h4" className="font-sans">
        {name}
      </Typography>
      <div className="flex space-x-1">
        {/* Crown Icon */}
        <BirthdayCake />
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
    <div className="">
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

export default UserProfileWithDob;

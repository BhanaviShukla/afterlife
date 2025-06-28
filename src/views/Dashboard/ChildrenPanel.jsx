"use client";
import { Typography } from "@/components";
import { ChildProfileWithGuardian } from "@/components/UserProfile";
import { useChildrenWithGuardians } from "@/utils/hooks";
import Image from "next/image";

const ChildrenPanel = () => {
  const [children] = useChildrenWithGuardians();
  if (!children || !children.length) return null;
  return (
    <div className="bg-slate-100 rounded-lg lg:p-14 p-6">
      <Typography variant="subtitle">Children (under 21)</Typography>
      {children.map((child, index) => (
        <div
          key={child?.id}
          className="flex items-center gap-3 lg:mt-10 mt-6 lg:max-w-2xl"
        >
          <Image
            src={`/images/backpack.png`}
            alt={`child ${child.childName} backpack`}
            width={100}
            height={100}
            quality={90}
            className={`filter hue-rotate-${index * 15}`}
          />
          <ChildProfileWithGuardian
            name={child.childName}
            dob={child.dob}
            guardian={child.guardian}
            key={child.id}
          />
        </div>
      ))}
    </div>
  );
};

export default ChildrenPanel;

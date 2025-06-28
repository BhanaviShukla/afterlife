"use client";
import { Typography } from "@/components";
import { useAssetsWithBeneficiaries } from "@/utils/hooks";
import Image from "next/image";

const AssetsPanel = () => {
  const [assets] = useAssetsWithBeneficiaries();
  if (!assets || !assets.length) return null;
  return (
    <div className="bg-slate-100 rounded-lg lg:p-14 p-6">
      <Typography variant="subtitle">Assets</Typography>
      <div className="flex items-center gap-3">
        <Image
          src={`/images/boxes.png`}
          alt={`asset boxes`}
          width={100}
          height={100}
          quality={90}
          className={`filter `}
        />
        {assets.map(({ allocationPercentage, id, beneficiary }, index) => (
          <div key={id} className="flex items-center w-full mr-4 ">
            <Typography
              variant="span"
              className="font-semibold text-accent-secondary mr-2"
            >
              {allocationPercentage}%
            </Typography>
            <Typography variant="span" className=" text-secondary">
              {beneficiary.name}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetsPanel;

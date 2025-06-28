"use client";
import { useWill } from "@/appState/WillState";
import { Typography } from "@/components";
import { RitesDetailsWithInstructions } from "@/components/UserProfile";
import Image from "next/image";

const RitesPanel = () => {
  const {
    will: { rites },
  } = useWill();
  if (!rites || !rites.length) return null;
  return (
    <div className="bg-slate-100 rounded-lg lg:p-14 p-6">
      <Typography variant="subtitle">Assets</Typography>
      {will.rites.map((rite, index) => (
        <div key={rite?.id} className="flex items-center gap-3 mt-6">
          <Image
            src={`/images/candle.png`}
            alt={`rite ${rite.id} candle`}
            width={100}
            height={100}
            quality={90}
            className={`filter hue-rotate-${index * 15} -scale-x-100`}
          />
          <div className="w-full max-w-[480px]">
            <RitesDetailsWithInstructions
              religion={rite.religion}
              arrangements={rite.arrangements}
              instructions={rite.instructions}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RitesPanel;

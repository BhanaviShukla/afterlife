import { Typography } from "@/components";
import Image from "next/image";
import { getImageFromSlug } from "@/utils/step";
import { ChildrenView, PetsView, RitesView } from "@/views";
import { childrenData } from "@/appState/childrenData";
import { petsData } from "@/appState/petsData";

const StepView = ({ slug }) => {
  switch (slug) {
    case "children":
      return <ChildrenView slug={slug} />;
    case "pets":
      return <PetsView slug={slug} />;
    case "rites":
      return <RitesView slug={slug} />;
    default:
      return <>Default</>;
  }
};

export default function Journey({ params }) {
  const imageName = getImageFromSlug(params.step);
  const stepData = data[params.step];

  return (
    <div className="max-w-[75%]">
      <div
        style={{ width: 360, height: 360, position: "relative" }}
        className="w-[360px] h-[360px] relative"
      >
        <Image
          src={`/images/${imageName}.png`}
          alt={imageName}
          fill
          className="object-contain"
        />
      </div>
      <Typography variant="title-small">{stepData.title}</Typography>
      <Typography className="my-10 leading-8">
        {stepData.description}
      </Typography>
      <Typography variant="heading">{stepData.heading}</Typography>
      <StepView slug={params.step} />
    </div>
  );
}

const data = {
  children: childrenData,
  pets: petsData,
  rites: {
    title: "Your way to be remembered",
    description:
      "By explicitly stating your preferences for funeral arrangements, burial or cremation, and other specific instructions, you can ease the burden on your loved ones during a difficult time. \n Additionally, you avoid any potential for disagreements among family members and provide a peace of mind to everyone, knowing that your funeral will be conducted in a manner that aligns with your values and desires.",
    primaryCta: "State rites",
    secondaryCta: "Skip and finalise will",
  },
};

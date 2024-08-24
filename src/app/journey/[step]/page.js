import { Typography } from "@/components";
import Image from "next/image";
import { getImageFromSlug } from "@/utils/step";
import { ChildrenView, PetsView, RitesView } from "@/views";
import { childrenData } from "@/appState/childrenData";
import { petsData } from "@/appState/petsData";
import { aboutYouData } from "@/appState/aboutYouData";
import AboutYouForm from "@/views/AboutYou/ index";

const StepView = ({ slug, data }) => {
  switch (slug) {
    case "about-you":
      return <AboutYouForm />;
    case "children":
      return <ChildrenView slug={slug} />;
    case "pets":
      return <PetsView slug={slug} />;
    case "rites":
      return <RitesView data={data} />;
    default:
      return <>Default</>;
  }
};

export default function Journey({ params }) {
  const imageName = getImageFromSlug(params.step);
  const stepData = data[params.step];

  return (
    <div className="flex justify-between gap-6">
      <div className="max-w-[65%] align-middle grow">
        <Typography variant="title-small">{stepData.title}</Typography>
        <Typography className="my-10 leading-8">
          {stepData.description}
        </Typography>
        <Typography variant="heading">{stepData.heading}</Typography>
        <StepView slug={params.step} data={stepData} />
      </div>
      <div
        style={{ width: 474, height: 474, position: "relative" }}
        className="max-w-[30%] h-[474px] relative"
      >
        <Image
          src={`/images/${imageName}.png`}
          alt={imageName}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

const data = {
  "about-you": aboutYouData,
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

import { Typography } from "@/components";
import Image from "next/image";
import { getImageFromSlug } from "@/utils/step";
import { ChildrenView, PetsView, RitesView } from "@/views";
import { childrenCountData } from "@/appState/childrenData";
import { petsData } from "@/appState/petsData";
import { aboutYouData } from "@/appState/aboutYouData";

const StepView = ({ ...props }) => {
  console.log({ props });
  switch (props.slug) {
    case "children":
      return <ChildrenView {...props} />;
    case "pets":
      return <PetsView {...props} />;
    case "rites":
      return <RitesView {...props} />;
    default:
      return <>Default</>;
  }
};

export default function Journey({ params }) {
  console.log({ params });
  const slug = params.step[0];
  const imageName = getImageFromSlug(slug);
  const stepData = data[slug];
  console.log({ slug });

  return (
    <div className="flex justify-between lg:gap-6">
      <div className="lg:max-w-[65%] align-middle grow">
        <Typography variant="title-small">{stepData.title}</Typography>
        <Typography className="my-10 leading-8">
          {stepData.description}
        </Typography>
        <Typography variant="heading">{stepData.heading}</Typography>
        <StepView slug={slug} data={stepData} {...params} />
      </div>
      <div
        // style={{ width: 474, height: 474, position: "relative" }}
        className="max-w-[30%] h-[474px] lg:w-[474px] relative md:w-0 relative"
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
  children: childrenCountData,
  pets: petsData,
  assets: {
    title: "assets and belongings",
  },
  rites: {
    title: "Your way to be remembered",
    description:
      "By explicitly stating your preferences for funeral arrangements, burial or cremation, and other specific instructions, you can ease the burden on your loved ones during a difficult time. \n Additionally, you avoid any potential for disagreements among family members and provide a peace of mind to everyone, knowing that your funeral will be conducted in a manner that aligns with your values and desires.",
    primaryCta: "State rites",
    secondaryCta: "Skip and finalise will",
  },
  dashboard: {
    title: "Here are the people you have added in your will",
  },
};

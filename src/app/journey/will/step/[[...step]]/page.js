import { Typography } from "@/components";
import Image from "next/image";
import { getImageFromSlug } from "@/utils/step";
import { ChildrenView, PetsView, RitesView } from "@/views";
import { childrenCountData } from "@/appState/childrenData";
import { petsCountData } from "@/appState/petsData";
import { aboutYouData } from "@/appState/aboutYouData";
import { ritesData } from "@/appState/ritesData";

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

  return (
    <div className="container mx-auto p-4">
      <div className="flex lg:justify-between lg:items-center lg:flex-row flex-col">
        <div className="lg:w-1/2 lg:order-1 order-2">
          <Typography variant="title-small">{stepData.title}</Typography>
          <Typography className="my-10 leading-8">
            {stepData.description}
          </Typography>
          <Typography variant="heading">{stepData.heading}</Typography>
          <StepView slug={slug} data={stepData} {...params} />
        </div>
        <div className="lg:w-1/2 lg:order-2 order-1 relative w-full h-[400px] lg:h-[400px]">
          <Image
            src={`/images/${imageName}.png`}
            alt={imageName}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

const data = {
  "about-you": aboutYouData,
  children: childrenCountData,
  pets: petsCountData,
  assets: {
    title: "assets and belongings",
  },
  rites: ritesData,
  dashboard: {
    title: "Here are the people you have added in your will",
  },
};
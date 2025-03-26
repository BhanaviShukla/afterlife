import { Typography } from "@/components";
import Image from "next/image";
import { getImageFromSlug } from "@/utils/step";
import { ChildrenView, PetsView, RitesView, AssetsView } from "@/views";
import { childrenCountData } from "@/appState/childrenData";
import { petsCountData } from "@/appState/petsData";
import { aboutYouData } from "@/appState/aboutYouData";
import { ritesData } from "@/appState/ritesData";
import { assetsData } from "@/appState/assetsData";

const StepView = ({ ...props }) => {
  console.log({ props });
  switch (props.slug) {
    case "children":
      return <ChildrenView {...props} />;
    case "pets":
      return <PetsView {...props} />;
    case "rites":
      return <RitesView {...props} />;
    case 'assets':
      return <AssetsView {...props} />;
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
        className="max-w-[30%] h-[474px] lg:w-[474px] md:w-0 relative"
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
  pets: petsCountData,
  assets: assetsData,
  rites: ritesData,
  dashboard: {
    title: "Here are the people you have added in your will",
  },
};

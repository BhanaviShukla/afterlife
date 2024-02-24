import { Typography } from "@/components";
import Image from "next/image";
import { getImageFromSlug } from "@/utils/step";
import { ChildrenView } from "@/views";

const StepView = ({ slug }) => {
  if (slug === "children") {
    return <ChildrenView />;
  }
  return <>default</>;
};

export default function Journey({ params }) {
  const imageName = getImageFromSlug(params.step);
  const stepData = data[params.step];

  return (
    <div className="flex flex-col justify-between grow gap-6">
      <div className="max-w-[75%]">
        <Image
          src={`/images/${imageName}.png`}
          alt={imageName}
          width={360}
          height={360}
          quality={90}
        />
        <Typography variant="title-small">{stepData.title}</Typography>
        <Typography className="my-10 leading-8">
          {stepData.description}
        </Typography>
        <Typography variant="heading">{stepData.heading}</Typography>
        <StepView slug={params.step} />
      </div>
    </div>
  );
}
const data = {
  children: {
    title: "About your children",
    description:
      "By naming someone you trust to care for your children (below 21), you ensure that they continue to be raised in a loving and nurturing environment in the event you are no longer around. It may be difficult to consider these possibilities, but these arrangements will guide and shelter them through any unfortunate circumstances that may happen.",
    primaryCta: "Add a child",
    secondaryCta: "Skip for now",
  },
};

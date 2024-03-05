import { Typography } from "@/components";
import Image from "next/image";
import { getImageFromSlug } from "@/utils/step";
import { ChildrenView, PetsView, RitesView } from "@/views";

const StepView = ({ slug, data }) => {
  switch (slug) {
    case "children":
      return <ChildrenView data={data} />;
    case "pets":
      return <PetsView data={data} />;
    case "rites":

    default:
      return <>Default</>;
  }
};

export default function Journey({ params }) {
  const imageName = getImageFromSlug(params.step);
  console.log({ imageName, params });
  const stepData = data[params.step];

  return (
    <div className="flex flex-col justify-between grow gap-6">
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
        <StepView slug={params.step} data={stepData} />
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
    form: {
      id: "add-child",
      title: "Tell us about your child",
      textInputs: [
        {
          id: "child-name",
          placeholder: "Full name of child (as per passport)",
          type: "text",
          required: true,
        },
        {
          id: "child-dob",
          placeholder: "Birthday",
          // placeholderDay: "Day",
          // placeholderMonth: "Month",
          // placeholderYear: "Year",
          type: "date",
          required: true,
        },
      ],
      primaryCta: "Save",
      secondaryCta: "Cancel",
    },
  },
  pets: {
    title: "Assign care for your furry companions.",
    description:
      "By designating a responsible caretaker and setting aside funds for their upkeep, you guarantee that your beloved companions will be looked after and cherished as part of your family, as well as knowing they will receive the love and attention they deserve even in your absence.",
    primaryCta: "Add a pet",
    secondaryCta: "Skip for now",
  },
  rites: {
    title: "Your way to be remembered",
    description:
      "By explicitly stating your preferences for funeral arrangements, burial or cremation, and other specific instructions, you can ease the burden on your loved ones during a difficult time. \n Additionally, you avoid any potential for disagreements among family members and provide a peace of mind to everyone, knowing that your funeral will be conducted in a manner that aligns with your values and desires.",
    primaryCta: "State rites",
    secondaryCta: "Skip and finalise will",
  },
};

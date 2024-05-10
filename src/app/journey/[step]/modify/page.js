import { childrenData } from "@/appState/childrenData";
import { Typography } from "@/components";
import ChildrenListView from "@/views/Children/ChildrenListView";
import PetsListView from "@/views/Pets/PetsListView";

const StepListView = ({ slug }) => {
  switch (slug) {
    case "children":
      return <ChildrenListView slug={slug} />;
    case "pets":
      return <PetsListView slug={slug} />;
    case "rites":
    // return <RitesView data={data} />;
    default:
      return <>Default List View</>;
  }
};

export default function ModifyStep({ params }) {
  const stepData = data[params.step];
  console.log("MODIFYSTEP", { params }, stepData);
  return (
    <>
      <div className="max-w-[75%]">
        <Typography variant="title-small">{stepData.title}</Typography>
        <Typography className="my-10 leading-8">
          {stepData.description}
        </Typography>
        <Typography variant="heading">{stepData.heading}</Typography>
      </div>
      <StepListView slug={params.step} />
    </>
  );
}
const data = {
  children: childrenData,
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

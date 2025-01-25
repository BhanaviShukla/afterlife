import { Typography } from "@/components";
import { JourneySelectionView } from "@/views";

export default function Will() {
  return (
    <div className="flex flex-col justify-center grow gap-6">
      <div className="max-w-[75%]">
        <Typography variant="title">{data.title}</Typography>
        <Typography className="my-10 leading-8">{data.description}</Typography>
        <Typography variant="heading">{data.heading}</Typography>
      </div>
      <JourneySelectionView data={data} />
    </div>
  );
}
const data = {
  title: "What are you planning for today?",
  description: "Select all that apply.",
  primaryCta: "Next",
  secondaryCta: "Back",
};

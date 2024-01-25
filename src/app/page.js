import { Button, Typography } from "@/components";
import { StepSelectionCarousel } from "@/components/client-side";

export default function Home() {
  return (
    <div className="flex flex-col justify-between grow gap-6">
      <div className="max-w-[75%]">
        <Typography variant="title">{data.title}</Typography>
        <Typography className="my-10 leading-8">{data.description}</Typography>
        <Typography variant="heading">{data.heading}</Typography>
      </div>

      <StepSelectionCarousel />
      <Button variant="text" italic className="self-start">
        {data.secondaryCta}
      </Button>
    </div>
  );
}
const data = {
  title: "Planning for what comes after",
  description:
    "Creating a will isn’t about us. It’s about building shelter and protection that will endure past our lifetime for the ones we care about. Give them the security they deserve and protect them from the uncertainties life will throw at them. Will-making services, free for all.",
  heading: "What are you looking after today?",
  secondaryCta: "How does it work?",
};

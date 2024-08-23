import { Logo, Typography } from "@/components";
import { JourneySelectionView } from "@/views";

export default function Will() {
  return (
    <div className="container flex flex-col justify-between gap-6">
      <a className="flex justify-between" href="/">
        <Logo />
      </a>

      <section className="flex flex-col justify-around grow" id="main-content">
        <div className="flex flex-col justify-between grow gap-6">
          <div className="max-w-[75%]">
            <Typography variant="title">{data.title}</Typography>
            <Typography className="my-10 leading-8">
              {data.description}
            </Typography>
            <Typography variant="heading">{data.heading}</Typography>
          </div>
          <JourneySelectionView data={data} />
        </div>
      </section>
    </div>
  );
}
const data = {
  title: "What are you planning for today?",
  description: "Select all that apply.",
  primaryCta: "Next",
  secondaryCta: "Back",
};

import { Logo, Typography } from "@/components";
import JourneySelectionView from "@/views/Home";

export default function Home() {
  return (
    <div className="container flex flex-col justify-between gap-6">
      <div className="flex justify-between">
        <Logo />
      </div>

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
  title: "Planning for what comes after",
  description:
    "Creating a will isn’t about us. It’s about building shelter and protection that will endure past our lifetime for the ones we care about. Give them the security they deserve and protect them from the uncertainties life will throw at them. Will-making services, free for all.",
  heading: "What are you looking after today?",
  primaryCta: "Begin",
  secondaryCta: "What do I need?",
  secondaryCta2: "Why create a will?",
};

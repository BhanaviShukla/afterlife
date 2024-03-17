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
  requirementsModal: {
    title: "Before you start, make sure you meet the following requirements:",
    description: {
      listItems: [
        {
          icon: "user",
          text: "At least 21 years old",
        },
        {
          icon: "emoji-satisfied",
          text: "Mentally sound",
        },
        {
          icon: "group",
          text: "Non-muslim (as Islamic inheritance laws apply for Muslims)",
        },
        "divider",
        {
          icon: "timer",
          text: "At least 15 minutes to complete it, (as your information will not be saved)",
        },
        {
          icon: "text-size",
          text: "Official full names and birth dates of people you’re planning to put in your will",
        },
        {
          icon: "doc-search-alt",
          text: "Details of your pets, assets & belongings handy",
        },
        {
          icon: "design-nib",
          text: "Signatures from you and two witnesses on the physical print-out at your own time",
        },
      ],
      disclaimer: {
        text: "By clicking on continue, you agree to our Terms of Service and that you have read our Privacy Policy.",
        termsLink: "link",
        privacyPolicyLink: "link",
      },
    },
    cta: {
      type: "outlined",
      label: "close",
    },
  },
};

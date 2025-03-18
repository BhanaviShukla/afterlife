import { Icon, Typography } from "@/components";
import Link from "next/link";

export function DisclaimerContent() {
  return (
    <>
      <Typography variant="subtitle">{data.requirementsModal.title}</Typography>
      <div className="flex flex-col gap-6 md:gap-8">
        {data.requirementsModal.description.listItems.map((item, index) => {
          if (item === "divider") {
            return <hr key={index} className="border-n100 my-4" />;
          }
          return (
            <div key={index} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-2 flex justify-center">
                <Icon name={item.icon} className="w-6 h-6 md:w-8 md:h-8 text-g300" />
              </div>
              <div className="col-span-10">
                <Typography className="text-base md:text-lg leading-6 md:leading-8">
                  {item.text}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>

      <Typography className="text-n300 mt-6 text-sm md:text-base text-n300 leading-6 md:leading-7">
        {data.requirementsModal.description.disclaimer.text
          .split("Terms of Service")
          .map((part, i) => (
            <span key={i}>
              {part}
              {i === 0 && (
                <Link
                  href="/terms"
                  className="text-g300 hover:text-g200 underline"
                >
                  Terms of Service
                </Link>
              )}
            </span>
          ))}
      </Typography>
    </>
  );
}
const data = {
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
          text: "Official full names and birth dates of people you're planning to put in your will",
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
    // this is actually defined in the Modal
    primaryCta: {
      variant: "filled",
      label: "Continue",
      link: "/will",
    },
    secondaryCta: {
      variant: "outlined",
      label: "Back",
      link: "/",
    },
  },
};

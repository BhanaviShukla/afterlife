import { Icon, Typography } from "@/components";
import Link from "next/link";

export function DisclaimerContent() {
  return (
    <>
      <Typography variant="subtitle">{data.requirementsModal.title}</Typography>
      <div className="flex flex-col gap-4">
        {data.requirementsModal.description.listItems.map((item, index) => {
          if (item === "divider") {
            return <hr key={index} className="border-n100" />;
          }
          return (
            <div key={index} className="flex items-start gap-3">
              <Icon name={item.icon} className="w-5 h-5 text-g300 mt-1" />
              <Typography>{item.text}</Typography>
            </div>
          );
        })}
      </div>
      <Typography className="text-n300">
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

import React from "react";
import { Button, Logo, Typography } from "@/components";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import Image from "next/image";
import Link from "next/link";
import { serif } from "@/theme/fonts";

export default function Home() {
  return (
    <>
      <div className="container min-h-screen flex flex-col justify-between gap-6 py-8 md:py-20 px-4 md:px-0">
        <a className="flex justify-start" href="/">
          <Logo width={125} height={31} />
        </a>

        <section
          className="flex flex-col justify-center mb-10 md:mb-20"
          id="main-content"
        >
          <div className="flex flex-col md:flex-row justify-between mt-10 md:2rem gap-8">
            <div className="flex flex-col gap-3 justify-center max-w-full md:max-w-[60%]">
              <Typography
                variant="title"
                className="text-[2.8rem] leading-[3rem] md:text-[4rem] md:leading-[4.5rem]"
              >
                {data.title}
              </Typography>

              <Typography className="my-4 md:my-8 text-lg md:text-xl leading-7">
                {data.description}
              </Typography>
              <Typography
                variant="heading"
                className="text-accent text-xl md:text-2xl"
              >
                {data.heading}
              </Typography>
              <Button
                variant="filled"
                className="self-start mt-6 md:mt-8"
                rightIcon={<ArrowRightIcon />}
              >
                <Link href={`/disclaimer`} scroll={false}>
                  {data.primaryCta}
                </Link>
              </Button>
            </div>
            <div className="flex-1 relative min-w-[40%] md:min-w-[30%] h-auto">
              <Image
                src={`/images/${data.imageName}.png`}
                alt={data.imageName}
                className="relative object-cover w-full h-auto"
                width={646}
                height={646}
              />
            </div>
          </div>
        </section>

        <Button className="self-start mt-6 md:mt-16" variant="text" italic>
          {data.secondaryCta}
        </Button>
      </div>

      <div className="container px-4 md:px-0">
        {/* About wills section */}
        <section className="py-8 md:py-20">
          <Typography variant="title-small" className="text-2xl md:text-3xl">
            {data.aboutSection.title}
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 md:mt-12">
            {data.aboutSection.cards.map((card, index) => (
              <div key={index} className="text-center">
                <Image
                  src={`/icons/${card.icon}.svg`}
                  alt={`${card.icon} icon`}
                  width={48}
                  height={48}
                  className="mb-4 mx-auto"
                />
                <Typography className="text-base md:text-lg">
                  {card.text}
                </Typography>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Mission section */}
      <div className="bg-secondary text-white py-8 md:py-20 ">
        <section className="container flex flex-col md:flex-row justify-between items-center px-4 md:px-0">
          <div className="min-w-full md:min-w-[40%] mb-6 md:mb-0">
            <Typography variant="title-small" className="text-2xl md:text-3xl">
              {data.missionSection.title}
            </Typography>
          </div>
          <div>
            {data.missionSection.paragraphs.map((text, index) => (
              <Typography
                key={index}
                className={`mt-4 md:mt-6 text-lg md:text-xl ${serif.className}`}
              >
                {text}
              </Typography>
            ))}
          </div>
        </section>
      </div>

      <div className="container px-4 md:px-0">
        {/* Services section */}
        <section className="py-8 md:py-20">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <Typography
                variant="title-small"
                className="text-2xl md:text-3xl"
              >
                {data.servicesSection.title}
              </Typography>
              <Typography className="mt-6 text-lg md:text-xl">
                {data.servicesSection.description}
              </Typography>
              <Typography className="mt-6 text-lg md:text-xl">
                {data.servicesSection.questions.join("\n")}
              </Typography>
              <Typography className="mt-4 text-lg md:text-xl">
                {data.servicesSection.callToAction}
              </Typography>
              <Button variant="outlined" className="mt-6">
                {data.servicesSection.buttonText}
              </Button>
            </div>
            <div className="flex-1">
              <Image
                src={data.servicesSection.imagePath}
                alt={data.servicesSection.imageAlt}
                width={500}
                height={500}
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-8 md:py-20 text-center relative">
          <Typography variant="title-small" className="text-2xl md:text-3xl">
            {data.ctaSection.title.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Typography>
          <Button
            variant="filled"
            className="mt-8 mx-auto"
            rightIcon={<ArrowRightIcon />}
          >
            {data.ctaSection.buttonText}
          </Button>
          {/* Decorative leaves */}
          {data.ctaSection.decorativeImages.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt=""
              width={200}
              height={200}
              className={`absolute ${image.className}`}
            />
          ))}
        </section>

        {/* Footer */}
        <footer className="pt-8 pb-16 text-center">
          <div className="flex justify-center gap-8">
            {data.footer.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <Typography variant="caption" className="underline text-accent">
                  {link.text}
                </Typography>
              </Link>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}

const data = {
  title: "Planning for what comes after",
  description:
    "Creating a will isn't about us. It's about building shelter and protection that will endure past our lifetime for the ones we care about. Give them the security they deserve and protect them from the uncertainties life will throw at them. Will-making services, free for all.",
  heading: "Create your will without a lawyer. Completely free",
  primaryCta: "Start here",
  secondaryCta: "Why create a will?",
  imageName: "pot",
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
    cta: {
      type: "outlined",
      label: "close",
    },
  },
  aboutSection: {
    title: "About wills in Singapore",
    cards: [
      {
        icon: "brain",
        text: "Anyone can write a will in Singapore without a lawyer, as long as they are at least 21 years old and mentally sound.",
      },
      {
        icon: "scale",
        text: "If you pass on without a will, your assets will be distributed according to the Intestate Succession Act.",
      },
      {
        icon: "heart",
        text: "Planning ahead serves to take care of your loved ones from having to figure it out during a difficult time.",
      },
    ],
  },
  missionSection: {
    title: "Our mission",
    paragraphs: [
      "We believe everyone should have access to creating a will regardless of their age, background, income level or beliefs.",
      "Which is why our service will always be free to use.",
    ],
  },
  servicesSection: {
    title: "Our services",
    description:
      "We collaborated with legal professionals to make this will-creation service to allow anyone in Singapore to plan for the most important things in their lives effortlessly.",
    questions: [
      "Not sure how to begin? Already have an existing will?",
      "Don't know if this is right for you?",
    ],
    callToAction: "We might have the answers to your questions here.",
    buttonText: "Learn more",
    imagePath: "/images/services-illustration.png",
    imageAlt: "Services illustration",
  },
  ctaSection: {
    title: "Start planning,\nfor the people you love.",
    buttonText: "Create my free will",
    decorativeImages: [
      {
        src: "/images/leaf-left.png",
        className: "absolute left-0 bottom-0",
      },
      {
        src: "/images/leaf-right.png",
        className: "absolute right-0 bottom-0",
      },
    ],
  },
  footer: {
    links: [
      {
        text: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        text: "Terms of Use",
        href: "/terms",
      },
    ],
  },
};

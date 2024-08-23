import { Logo, Typography } from "@/components";
import AboutYouForm from "@/views/AboutYou/ index";
import Image from "next/image";

export default function AboutYou() {
  return (
    <div className="container flex flex-col justify-between gap-6">
      <a className="flex justify-between" href="/">
        <Logo />
      </a>

      <section className="flex flex-col justify-center" id="main-content">
        <div className="flex justify-between gap-6">
          <div className="max-w-[65%] align-middle grow">
            <Typography variant="title">{data.title}</Typography>
            <Typography className="my-10 leading-8">
              {data.description}
            </Typography>
            <AboutYouForm
              primaryCta={data.primaryCta}
              secondaryCta={data.secondaryCta}
            />
          </div>
          <div className="max-w-[30%] relative">
            <Image
              src={`/images/${data.imageName}.png`}
              alt={data.imageName}
              height={474}
              width={474}
              quality={90}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
const data = {
  title: "First, tell us about yourself",
  description: "",
  primaryCta: "Next",
  secondaryCta: "",
  imageName: "pot",
};

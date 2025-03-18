import { AboutYouForm } from "@/views";
import Image from "next/image";

const AboutYouPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex lg:justify-between lg:items-center flex-col lg:flex-row">
        {/* Image */}
        <div className="lg:order-2 order-1 lg:w-1/2 w-full lg:mt-0 mt-10">
          <div className="relative w-full h-[400px] lg:h-[400px]">
            <Image
              src="/images/pot.png"
              alt="Decorative plant"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="lg:order-1 order-2 lg:w-1/2 w-full">
          <h2 className="text-4xl text-normal mb-8">First, tell us about yourself</h2>
          <AboutYouForm />
        </div>
      </div>
    </div>
  );
};

export default AboutYouPage;
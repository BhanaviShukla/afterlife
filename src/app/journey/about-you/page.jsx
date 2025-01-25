import { AboutYouForm } from "@/views";
import Image from "next/image";

export default function AboutYouPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20">
        {/* Left side - Form */}
        <div className="flex-1 max-w-2xl">
          <div className="mb-12">
            <h1 className="text-4xl font-normal mb-8">
              First, tell us about yourself
            </h1>
          </div>
          <AboutYouForm />
        </div>

        {/* Right side - Image */}
        <div className="hidden lg:block flex-shrink-0 pt-20">
          <div className="relative w-[300px] h-[400px]">
            <Image
              src="/images/pot.png"
              alt="Decorative plant"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

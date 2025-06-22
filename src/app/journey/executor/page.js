import { ExecutorView } from "@/views";
import Image from "next/image";

export default function Executor({ params }) {
  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20">
        {/* Left side - Form */}
        <div className="flex-1 max-w-2xl">
          <ExecutorView />
        </div>

        {/* Right side - Image */}
        <div className="hidden lg:block flex-shrink-0 pt-20">
          <div className="relative w-[300px] h-[400px]">
            <Image
              src="/images/frame.png"
              alt="Family photograph"
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

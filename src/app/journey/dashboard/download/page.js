import { Button, InfoMessage, LinkButton, Typography } from "@/components";

import { DownloadView } from "@/views";

export default function Dashboard() {
  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20">
        {/* Left side - Form */}
        <div className="flex-1 max-w-2xl">
          <div className="mb-12">
            <Typography variant="title-small">
              Here is everything you have planned for in your will.
            </Typography>
            <Typography className="my-10 leading-8">
              Make sure all the information here is correct.
            </Typography>
          </div>
        </div>
        <div className="w-full">
          <DownloadView />
        </div>
      </div>
    </div>
  );
}

import { Typography } from "@/components";
import PrintIcon from "@/components/ui/Icons/Informational/Dashboard/print.svg";
import SignIcon from "@/components/ui/Icons/Informational/Dashboard/sign.svg";
import SafeIcon from "@/components/ui/Icons/Informational/Dashboard/safe.svg";

import { DownloadView } from "@/views";

export default function Dashboard() {
  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex flex-col">
        {/* Left side - Form */}
        <div className="flex-1 max-w-3xl">
          <div className="mb-12">
            <Typography variant="title-small">Your will is ready!</Typography>
            <Typography className="my-10 leading-8">
              Ensure your will is legally-binding by completing these next
              steps:
            </Typography>
          </div>
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center justify-center w-14 h-14 mt-1">
              <PrintIcon className="text-[#2A3C36]" />
            </div>
            <div>
              <Typography variant="subtitle" className="font-medium mb-1">
                1.&nbsp;&nbsp;Print it out
              </Typography>
              <Typography className="">
                Download your will and print once you're sure that the
                information is correct.
                <br />
                You can always go back to edit as long as you keep this window
                open.
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center justify-center w-14 h-14 mt-1">
              <SignIcon className="text-[#2A3C36]" />
            </div>
            <div>
              <Typography variant="subtitle" className="font-medium mb-1">
                2.&nbsp;&nbsp;Sign & date with two witnesses
              </Typography>
              <Typography className="">
                Sign the will in the presence of two witnesses who are not
                beneficiaries to any of your assets. Don’t forget to include the
                date as well.
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center justify-center w-14 h-14 mt-1">
              <SafeIcon className="text-[#2A3C36]" />
            </div>
            <div>
              <Typography variant="subtitle" className="font-medium mb-1">
                3.&nbsp;&nbsp;Keep the will in a safe place
              </Typography>
              <Typography className="">
                Store the physical copy of your will and let your executors know
                where you kept it.
              </Typography>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:gap-10 gap-6">
          <DownloadView />
        </div>
      </div>
    </div>
  );
}

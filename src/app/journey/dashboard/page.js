import { InfoMessage, LinkButton, Typography } from "@/components";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import ChildrenPanel from "@/views/Dashboard/ChildrenPanel";
import PetsPanel from "@/views/Dashboard/PetsPanel";

export default function Dashboard() {
  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex flex-col">
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
        <div className="w-full flex flex-col lg:gap-10 gap-6">
          <ChildrenPanel />
          <PetsPanel />
          <div className="">
            {
              <InfoMessage
                message={
                  "You can still come back to edit your information as long as you don’t close this page."
                }
              />
            }
          </div>
          <div className="flex gap-4">
            <LinkButton
              variant="outlined"
              className="self-start"
              leftIcon={<ArrowLeftIcon />}
              id="dashboard-back-to-will"
              href="/journey/will"
            />
            <LinkButton
              variant="filled"
              className="self-start"
              rightIcon={<ArrowRightIcon />}
              id="dashboard-confirm-will-entries-button"
              href="/journey/dashboard/people"
            >
              Confirm
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

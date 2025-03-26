import { Typography } from "@/components";

const DistributionView = ({
  searchParams,
  title,
  description,
  nextLink,
  backLink,
  primaryCta,
  secondaryCta,
}) => {
  console.log({ searchParams, title });
  return (
    <div className="w-full">
      <Typography variant="title-small">{title}</Typography>
      <Typography className="my-10 leading-8">{description}</Typography>
    </div>
  );
};
export default DistributionView;

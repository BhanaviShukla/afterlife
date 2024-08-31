import { SelectInput, Typography } from "@/components";

const CountView = ({
  searchParams,
  pathname,
  title,
  description,
  formData,
  nextLink,
}) => {
  console.log("children -> COUNTVIEW");

  const handleOnSubmit = async (formData) => {
    console.log({ nextLink });
  };
  return (
    <>
      <Typography variant="title-small">{title}</Typography>
      <Typography className="my-10 leading-8">{description}</Typography>
      <form id="children-count-form" action={handleOnSubmit}>
        {/*  */}
        <SelectInput {...formData.answer} />
      </form>
    </>
  );
};

export default CountView;

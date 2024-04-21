import EllipseIcon from "../Icons/Informational/ellipse.svg";
const CarouselIndicator = ({ itemCount, activeItemIndex }) => {
  const indicatorArray = [...Array(itemCount)].map((_, index) => (
    <EllipseIcon
      key={index}
      color={index === activeItemIndex ? "#285857" : "#EDEDED"}
      width={24}
    />
  ));
  console.log({ indicatorArray });
  return (
    <div className="flex align-middle justify-center mt-8">
      {indicatorArray}
    </div>
  );
};
export default CarouselIndicator;

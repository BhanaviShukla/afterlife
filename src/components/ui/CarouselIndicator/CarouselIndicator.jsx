import EllipseIcon from "../Icons/Informational/ellipse.svg";
const CarouselIndicator = ({ itemCount, activeItemIndex }) => {
  const indicatorArray = [...Array(itemCount)].map((_, index) => (
    <EllipseIcon
      key={index}
      style={{
        color:
          index === activeItemIndex
            ? "var(--colour-g300)"
            : "var(--colour-n50)",
      }}
      width={24}
    />
  ));
  return (
    <div className="flex align-middle justify-center mt-8">
      {indicatorArray}
    </div>
  );
};
export default CarouselIndicator;

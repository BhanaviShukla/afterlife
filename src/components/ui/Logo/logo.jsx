import Image from "next/image";
const Logo = ({ className, width = 81, height = 20 }) => {
  return (
    <Image
      id="logo"
      src="/afterlife.svg"
      alt="afterlife logo"
      width={width}
      height={height}
      priority
      className={className}
    />
  );
};
export default Logo;

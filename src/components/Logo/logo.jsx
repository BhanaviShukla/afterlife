import Image from "next/image";
const Logo = () => {
  return (
    <Image
      id="logo"
      src="/afterlife.svg"
      alt="afterlife logo"
      width={100}
      height={24}
      priority
      className=""
    />
  );
};
export default Logo;

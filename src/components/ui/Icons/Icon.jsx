import React from "react";
// import styles from "./iconStyles.module.css";
import Image from "next/image";

const Icon = ({ name, size, color }) => {
  return (
    <Image
      key={`icon-${name}`}
      src="/icons/Controls/Card/check.svg"
      alt="afterlife logo"
      width={24}
      height={24}
      //   className={className}
    />
  );
};
export default Icon;

import React from "react";
// import styles from "./iconStyles.module.css";
import Image from "next/image";

import DesignNib from "./Informational/Landing/design-nib.svg";
import User from "./Informational/Landing/user.svg";
import DocSearch from "./Informational/Landing/doc-search-alt.svg";
import EmojiSatisfied from "./Informational/Landing/emoji-satisfied.svg";
import Group from "./Informational/Landing/group.svg";
import MoneySquare from "./Informational/Landing/money-square.svg";
import TextSize from "./Informational/Landing/text-size.svg";
import Timer from "./Informational/Landing/timer.svg";

const landingIcons = {
  "design-nib": DesignNib,
  user: User,
  "doc-search-alt": DocSearch,
  "emoji-satisfied": EmojiSatisfied,
  group: Group,
  "money-square": MoneySquare,
  "text-size": TextSize,
  timer: Timer,
};

const Icon = ({ name, size, color }) => {
  const IconComponent = landingIcons[name];
  if (IconComponent) return <IconComponent {...{ size, color }} />;
  return (
    <Image
      key={`icon-${name}`}
      src={landingIcons[name]}
      alt="afterlife logo"
      width={24}
      height={24}
      //   className={className}
    />
  );
};
export default Icon;

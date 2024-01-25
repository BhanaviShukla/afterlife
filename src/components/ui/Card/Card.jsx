import React from "react";
import styles from "./cardStyles.module.css";
import Image from "next/image";
import { Typography } from "../..";

const CardBase = ({ imageName = "pet_bowl", backgroundColor, children }) => {
  return (
    <div
      className={`${styles.base}`}
      style={{ backgroundColor: `var(${backgroundColor})` }}
    >
      <Image
        src={`/images/${imageName}.png`}
        alt={imageName}
        fill
        quality={90}
      />
      <div className={`${styles.contentWrapper}`}> {children}</div>
    </div>
  );
};

const CardSelectItem = ({
  imageName = "pet_bowl",
  backgroundColor,
  label,
  subLabel,
  isSelected,
  handleSelect,
  children,
}) => {
  console.log({ backgroundColor });
  return (
    <CardBase {...{ imageName, backgroundColor }}>
      <div className={`${styles.labelWrapper}`}>
        <div>
          <Typography>{subLabel}</Typography>
          <Typography variant="heading" className={styles.label}>
            {label || children}
          </Typography>
        </div>

        {/* {icon here} */}
        <div className={`${styles.iconWrapper}`} onClick={handleSelect}>
          {isSelected ? (
            <Typography>i+selected</Typography>
          ) : (
            <Typography>icon</Typography>
          )}
        </div>
      </div>
    </CardBase>
  );
};

const Card = {
  Base: CardBase,
  SelectItem: CardSelectItem,
};

export default Card;

import React from "react";
import styles from "./cardStyles.module.css";
import Image from "next/image";
import { Badge, Button, Typography } from "../..";
import Check from "../Icons/Controls/Card/check.svg";
import Plus from "../Icons/Controls/Card/plus.svg";
import Cancel from "../Icons/Controls/cancel.svg";

const CardBase = ({ imageName = "pet_bowl", style, children }) => {
  return (
    <div className={`${styles.base}`} style={style}>
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
  return (
    <CardBase
      {...{ imageName, style: { backgroundColor: `var(${backgroundColor})` } }}
    >
      <div className={`${styles.labelWrapper}`}>
        <div>
          <Typography>{subLabel}</Typography>
          <Typography variant="heading" className={styles.label}>
            {label || children}
          </Typography>
        </div>

        {/* {icon here} */}
        <div
          className={`${styles.iconWrapper} ${
            isSelected ? styles.iconSelected : styles.iconDefault
          }`}
          onClick={handleSelect}
        >
          {isSelected ? <Check /> : <Plus />}
        </div>
      </div>
    </CardBase>
  );
};

const CardEditItem = ({
  imageName = "pet_bowl",
  backgroundColor = "--colour-g25",
  badgeColor = "--colour-g100",
  label,
  subLabel,
  children,
  badgeText,
  onPressCross,
  onPressEdit,
}) => {
  return (
    <CardBase
      {...{
        imageName,
        style: { backgroundColor: `var(${backgroundColor})` },
      }}
    >
      <Badge label={badgeText} backgroundColor={badgeColor} />
      <div
        className={`${styles.iconWrapper} ${styles.cancelCta}`}
        onClick={onPressCross}
      >
        <Cancel width={12} height={12} />
      </div>
      <div className={`${styles.labelWrapper}`}>
        <div>
          <Typography>{subLabel}</Typography>
          <Typography variant="heading" className={styles.label}>
            {label || children}
          </Typography>
        </div>

        {/* {icon here} */}
        <Button className={styles.primaryCta} onClick={onPressEdit}>
          Edit
        </Button>
      </div>
    </CardBase>
  );
};
const CancelIconButton = () => {};
const Card = {
  Base: CardBase,
  SelectItem: CardSelectItem,
  EditItem: CardEditItem,
};

export default Card;

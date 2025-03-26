import React from "react";
import styles from "./cardStyles.module.css";
import Image from "next/image";
import { Badge, Button, Selector, Typography } from "../..";
import Cancel from "../Icons/Controls/cancel.svg";

const CardBase = ({ imageName = "pet_bowl", style, onClick, children }) => {
  return (
    // TODO: add a proper onClick handler here
    <div
      className={`${styles.base}`}
      style={style}
      onClick={onClick}
      role="navigation"
      tabIndex={0}
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
  id,
  imageName = "pet_bowl",
  backgroundColor,
  label,
  subLabel,
  isCompleted,
  handleClick,
  children,
}) => {
  return (
    <CardBase
      {...{
        imageName,
        style: {
          backgroundColor: `var(${backgroundColor})`,
          cursor: "pointer",
        },
      }}
      onClick={handleClick}
    >
      <div className={`${styles.labelWrapper}`}>
        <div>
          <Typography>{subLabel}</Typography>
          <Typography variant="heading" className={styles.label}>
            {label || children}
          </Typography>
        </div>
        {isCompleted ? (
          <Selector
            isSelected={isCompleted}
            id={`selector-${id}`}
            width={32}
            height={32}
            readOnly
          />
        ) : (
          <></>
        )}

        {/* {icon here} */}
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
        role="button"
        tabIndex={0}
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
const Card = {
  Base: CardBase,
  SelectItem: CardSelectItem,
  EditItem: CardEditItem,
};

export default Card;

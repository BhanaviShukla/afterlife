import React from "react";
import styles from "./cardStyles.module.css";
import Image from "next/image";
import { Badge, Button, Selector, Typography } from "../..";
import Cancel from "../Icons/Controls/cancel.svg";
import { FiCheckCircle } from "react-icons/fi"; 

const CardBase = ({ imageName = "pet_bowl", style, onClick, isSelected, children }) => {
  return (
    <div
      className={`${styles.base} flex flex-row justify-between items-center relative`} 
      style={style}
      onClick={onClick}
      role="navigation"
      tabIndex={0}
    >
      {/* Text Section */}
      <div className="flex flex-col justify-between w-7/12 pr-4">
        {children}
      </div>

      {/* Image Section */}
      <div className="w-5/12 flex justify-center items-center">
        <Image
          src={`/images/${imageName}.png`}
          alt={imageName}
          width={80} // Resize the image width
          height={80} // Resize the image height
          className="object-contain w-full"
        />
      </div>

      {/* Selected Circle Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 flex justify-center items-center">
          <FiCheckCircle className="w-6 h-6 text-green-500" />
        </div>
      )}
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
  isSelected,
  children,
}) => {
  return (
    <CardBase
      imageName={imageName}
      style={{ backgroundColor: `var(${backgroundColor})`, cursor: "pointer" }}
      onClick={handleClick}
      isSelected={isSelected}
    >
      <div className={`${styles.labelWrapper}`}>
        <div>
          <Typography>{subLabel}</Typography>
          <Typography variant="heading" className={styles.label}>
            {label || children}
          </Typography>
        </div>
        {isCompleted && (
          <Selector
            isSelected={isCompleted}
            id={`selector-${id}`}
            width={32}
            height={32}
            readOnly
          />
        )}
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

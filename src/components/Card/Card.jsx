import React from "react";
import styles from './cardStyles.module.css'
import Image from "next/image";

const CardBase = ({ imageName='pet_bowl', backgroundColor, ...children }) => {
    return <div className={`${styles.base}`} style={{ backgroundColor: `var(${backgroundColor})`}}>
         <Image
            src={`/images/${imageName}.png`}
            alt={imageName}
            fill
            quality={90}
          />
    </div>
}

const Card = {
    Base: CardBase
}

export default Card
import React from "react";
import styles from "./buttonStyles.module.css";

/**
 * Description: Button
 * @param {any} children - text for the button
 * @param {any} variant='filled' | 'outlined' | 'text'
 * @param {any} props - passthrough props to button
 * @param {any} italic = true | false
 * @returns {any}
 */
const Button = ({
  children,
  variant = "filled",
  italic,
  leftIcon,
  rightIcon,
  type = "button",
  isRound,
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className={`${styles.button} ${styles[variant]} ${italic && styles.italic
      } ${props.className} ${isRound ? styles.roundBtn : ''}`}
    >
      {leftIcon && <div className="mr-1">{leftIcon}</div>}
      <label>{children}</label>
      {rightIcon && (
        <div className="ml-1 mr-[-0.25rem] pb-0.5">{rightIcon}</div>
      )}
    </button>
  );
};

export default Button;

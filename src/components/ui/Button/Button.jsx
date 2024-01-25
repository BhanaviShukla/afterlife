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
const Button = ({ children, variant = "filled", italic, ...props }) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[variant]} ${
        italic && styles.italic
      } ${props.className}`}
    >
      <label>{children}</label>
    </button>
  );
};

export default Button;

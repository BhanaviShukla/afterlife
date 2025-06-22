import React from "react";
import { Button } from "./Button";
import Link from "next/link";
import styles from "./buttonStyles.module.css";

/**
 * Description: LinkButton
 * @param {any} children - text for the button
 * @param {any} href=Link href properties
 * @param {any} props - passthrough props to button
 * @param {any} linkProps - passthrough props to link
 * @param {any} italic = true | false
 * @returns {any}
 */
const LinkButton = ({
  children,
  href = "",
  italic,
  leftIcon,
  rightIcon,
  linkProps,
  className,
  variant,
  isRound,
  ...props
}) => {
  return (
    <Link
      href={href}
      {...linkProps}
      className={[
        styles.button,
        styles[variant],
        italic ? styles.italic : "",
        props.className,
        isRound ? styles.roundBtn : "",
      ].join(" ")}
      style={{ pointerEvents: props.disabled ? "none" : "auto" }}
    >
      {leftIcon && <div className="mr-1">{leftIcon}</div>}
      <label>{children}</label>
      {rightIcon && (
        <div className="ml-1 mr-[-0.25rem] pb-0.5">{rightIcon}</div>
      )}
    </Link>
  );
};

export default LinkButton;

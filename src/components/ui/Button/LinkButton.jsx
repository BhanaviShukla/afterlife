import React from "react";
import { Button } from "./Button";
import Link from "next/link";

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
  ...props
}) => {
  return (
    <Link
      href={href}
      {...linkProps}
      style={{ pointerEvents: props.disabled ? "none" : "auto" }}
    >
      {/* <Button className={`self-start ${className}`} {...props}> */}
      {children}
      {/* </Button> */}
    </Link>
  );
};

export default LinkButton;

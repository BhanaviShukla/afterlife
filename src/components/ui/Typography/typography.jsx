import React from "react";

const Typography = ({ variant = "paragraph", className, children }) => {
  const customClassname = className || "";
  const component = (() => {
    switch (variant) {
      case "title":
      case "h1":
        return <h1 className={`title ${customClassname}`}>{children}</h1>;
      case "title-small":
      case "h2":
        return <h2 className={`title-small ${customClassname}`}>{children}</h2>;
      case "subtitle":
      case "h4":
        return <h4 className={`subtitle ${customClassname}`}>{children}</h4>;
      case "heading":
      case "h6":
        return <h6 className={`heading ${customClassname}`}>{children}</h6>;
      case "caption":
        return <span className={`caption ${customClassname}`}>{children}</span>;
      case "paragraph":
      default:
        return <p className={`${customClassname}`}>{children}</p>;
    }
  })();
  return component;
};

export default Typography;

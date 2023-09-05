import { createElement, type ButtonHTMLAttributes, type FC } from "react";
import c from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, ...rest }) =>
  createElement(
    "button",
    {
      ...rest,
      "aria-label": typeof children === "string" ? children : '',
      type: "button",
      className: c("rounded-lg bg-blue-500 p-3 mb-2", rest.className),
    },
    children
  );

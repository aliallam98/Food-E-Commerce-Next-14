import Link from "next/link";
import React, { ReactNode } from "react";

interface Button {
    title? : string
    className?:string
    children?:ReactNode
    onClick?: ()=> void
}

function Button({className,title,children} : Button) {
  return (
    <button className={className}>
      {title}
      {children}
    </button>
  );
}

export default Button;

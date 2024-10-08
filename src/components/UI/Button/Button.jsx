import React from "react";

export default function Button({
  children,
  className,
  onClick,
  type,
  id,
  disabled,
}) {
  return (
    <button
      type={type || "button"}
      className={`btn ${className}`}
      id={id}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

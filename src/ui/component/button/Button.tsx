import React from "react";
import { Link } from "react-router-dom";
import styles from "./button.module.css";

interface ButtonProps {
  text: string;
  width?: "small" | "medium" | "large";
  ariaLabel?: string;
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  width = "medium",
  ariaLabel,
  to,
  onClick,
  disabled = false,
  className = "",
}) => {
  const buttonClass = `${styles.btn} ${
    styles[`btn${width.charAt(0).toUpperCase() + width.slice(1)}`]
  } ${className}`;

  return to ? (
    <Link to={to} className={buttonClass} aria-label={ariaLabel}>
      {text}
    </Link>
  ) : (
    <button
      className={buttonClass}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;

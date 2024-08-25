import React from "react";
import styles from "./styles.module.css";

interface InputProps {
  type: string;
  placeholder: string;
  ariaLabel?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  ariaLabel,
  value,
  onChange,
  required,
}) => {
  return (
    <input
      type={type}
      className={styles.input}
      placeholder={placeholder}
      aria-label={ariaLabel}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;

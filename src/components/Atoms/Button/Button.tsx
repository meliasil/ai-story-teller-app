// components/Atoms/Button/Button.tsx
import React from "react";
import style from "./Button.module.scss";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button className={style.button} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;

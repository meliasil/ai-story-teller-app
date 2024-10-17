
import React from "react";
import style from "./Toast.module.scss";

interface ToastProps {
  setAction: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  message: string;
}

const Toast: React.FC<ToastProps> = ({ setAction, title, message }) => {
  return (
    <div className={style.main}>
      <h4>{title}</h4>
      <p>{message}</p>
      <button onClick={() => setAction("")}>Close</button>
    </div>
  );
};

export default Toast;

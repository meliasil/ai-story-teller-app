import React from 'react';
import style from './WindowBox.module.scss';

interface WindowBoxProps {
  title: string;
  children: React.ReactNode;
}

const WindowBox: React.FC<WindowBoxProps> = ({ title, children }) => {
  return (
    <div className={style.windowBox}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default WindowBox;

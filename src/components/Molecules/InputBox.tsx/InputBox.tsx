import React from 'react';
import style from './InputBox.module.scss';

interface InputBoxProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ label, value, setValue }) => {
  return (
    <div className={style.inputBox}>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputBox;

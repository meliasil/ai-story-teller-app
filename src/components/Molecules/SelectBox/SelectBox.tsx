import React from 'react';
import style from './SelectBox.module.scss';

interface SelectBoxProps {
  label: string;
  list: string[];
  setValue: (value: string) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ label, list, setValue }) => {
  return (
    <div className={style.selectBox}>
      <label>{label}</label>
      <select onChange={(e) => setValue(e.target.value)}>
        <option value="">Select...</option>
        {list.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;

import React from 'react';
import style from './SwitchBox.module.scss';

interface SwitchBoxProps {
  label: string;
  value: boolean;
  setValue: (value: boolean) => void;
}

const SwitchBox: React.FC<SwitchBoxProps> = ({ label, value, setValue }) => {
  return (
    <div className={style.switchBox}>
      <label>
        {label}
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
        />
      </label>
    </div>
  );
};

export default SwitchBox;

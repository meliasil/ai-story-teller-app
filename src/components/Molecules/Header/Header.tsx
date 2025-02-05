import React from 'react';
import style from './Header.module.scss';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className={style.header}>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;

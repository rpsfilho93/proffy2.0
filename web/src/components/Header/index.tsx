import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
  title?: string;
  description?: string;
  pageTitle?: string;
  style?: { backgroundImage: string; backgroundRepeat: string };
}

const Header: React.FC<PageHeaderProps> = ({
  title,
  description,
  pageTitle,
  children,
  style,
}) => {
  return (
    <header className="page-header" style={style}>
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        {pageTitle && <span>{pageTitle}</span>}
        <img src={logo} alt="Proffy" />
      </div>

      <div className="header-content">
        <strong>{title}</strong>
        {!!description && <p>{description}</p>}
        {children}
      </div>
    </header>
  );
};

export default Header;

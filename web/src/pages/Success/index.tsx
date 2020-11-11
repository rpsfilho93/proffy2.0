import React from 'react';
import background from '../../assets/images/Background.png';

import './styles.css';

interface SuccessProps {
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  buttonText: string;
  redirectionURL: string;
}

const Success: React.FC<SuccessProps> = ({
  icon,
  iconAlt,
  title,
  description,
  buttonText,
  redirectionURL,
}) => {

  return (
    <div
      id="page-success"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="content">
        <img src={icon} alt={iconAlt} />
        <h1 className="title">{title}</h1>
        <span>{description}</span>
        <a href={redirectionURL}>{buttonText}</a>
      </div>
    </div>
  );
};

export default Success;

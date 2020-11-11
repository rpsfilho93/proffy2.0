import React, { useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import landing from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import teachIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeart from '../../assets/images/icons/purple-heart.svg';
import quitIcon from '../../assets/images/icons/Sair.png';
import defaultAvatar from '../../assets/images/default-avatar.png';

import api from '../../services/api';

import './styles.css';
import { useAuth } from '../../hooks/auth';

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);
  const [isTeacher, setIsTeacher] = useState(false);
  const { user, signOut } = useAuth();
  const history = useHistory();

  useEffect(() => {
    console.log(user.avatar_url);

    api.get('/connections').then((response) => {
      const { total } = response.data;
      setTotalConnections(total);
    });

    api.get('/profile').then((response) => {
      const { classes } = response.data;

      classes ? setIsTeacher(true) : setIsTeacher(false);
    });
  }, [user.avatar_url]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  const handleProfile = useCallback(() => {
    history.push('/profile');
  }, [history]);

  return (
    <div id="page-landing">
      <div className="header">
        <div className="profile">
          <img
            src={user.avatar ? user.avatar_url : defaultAvatar}
            alt={user.firstName}
            onClick={handleProfile}
          />
          <strong onClick={handleProfile}>
            {user.firstName} {user.lastName}
          </strong>
        </div>
        <button className="logoff-button" type="button" onClick={handleSignOut}>
          <img src={quitIcon} alt="Sair" />
        </button>
      </div>

      <div id="banner">
        <div className="logo-container">
          <img src={logo} alt="Proffy" />
          <h2>
            Sua plataforma de <br /> estudos online.
          </h2>
        </div>

        <img src={landing} alt="Plataforma de Estudos" className="hero-image" />
      </div>

      <div className="content">
        <div className="welcome-connections-container">
          <div className="welcome-container">
            <span>Seja bem-vindo.</span>
            <strong>O que deseja fazer?</strong>
          </div>
          <span className="total-connections">
            Total de {totalConnections} conexões.
            <img src={purpleHeart} alt="" />
          </span>
        </div>
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>

          <Link to={isTeacher ? '/profile' : '/teach'} className="teach">
            <img src={teachIcon} alt="" />
            Dar Aulas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

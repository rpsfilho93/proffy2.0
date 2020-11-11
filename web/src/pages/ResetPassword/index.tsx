import React, { useState, useCallback, FormEvent } from 'react';
import background from '../../assets/images/Background.png';
import backIcon from '../../assets/images/icons/back.svg';
import logo from '../../assets/images/logo.svg';
import PasswordInput from '../../components/PasswordInput';
import api from '../../services/api';

import './styles.css';
import { useHistory, useLocation } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');

  const location = useLocation();

  const history = useHistory();

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const token = location.search.replace('?token=', '');
      api
        .post('/password/reset', { token, password })
        .then(() => history.push('/reset-password-success'));
    },
    [history, location.search, password]
  );

  return (
    <div id="page-forgot-password">
      <div
        className="banner"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="logo-container">
          <img src={logo} alt="Proffy" />
          <h2>Sua plataforma de estudos online</h2>
        </div>
      </div>

      <main>
        <img
          className="go-back"
          src={backIcon}
          alt="Voltar"
          onClick={handleGoBack}
        />
        <form>
          <div className="title-container">
            <h1 className="form-title">
              Escolha uma
              <br /> nova senha:
            </h1>
          </div>

          <PasswordInput
            name="password"
            placeholder="Nova Senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button type="submit" onClick={handleSubmit}>
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
};

export default ResetPassword;

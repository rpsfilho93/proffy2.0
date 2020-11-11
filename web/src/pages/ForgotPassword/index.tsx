import React, { useState, useCallback, FormEvent } from 'react';
import background from '../../assets/images/Background.png';
import backIcon from '../../assets/images/icons/back.svg';
import logo from '../../assets/images/logo.svg';
import Input from '../../components/Input';
import api from '../../services/api';

import './styles.css';
import { useHistory } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const history = useHistory();

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      api.post('/password/forgot', { email });

      history.push('/email-success');
    },
    [email, history]
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
              Eita, esqueceu <br /> sua senha?
            </h1>
            <span className="subtitle">
              Não esquenta, vamos dar um jeito nisso.
            </span>
          </div>

          <Input
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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

export default ForgotPassword;

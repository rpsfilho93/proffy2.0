import React, { useState, useCallback, FormEvent } from 'react';
import background from '../../assets/images/Background.png';
import backIcon from '../../assets/images/icons/back.svg';
import logo from '../../assets/images/logo.svg';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';

import './styles.css';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

const Logon: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      await api.post('/users', { firstName, lastName, email, password });

      history.push('/register-success');
    },
    [email, firstName, history, lastName, password]
  );

  return (
    <div id="page-logon">
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
        <form onSubmit={handleSubmit}>
          <div className="title-container">
            <h1 className="form-title">Cadastro</h1>
            <span className="subtitle">
              Preencha os dados abaixo <br /> para começar.
            </span>
          </div>

          <Input
            name="first_name"
            placeholder="Nome"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />

          <Input
            name="last_name"
            placeholder="Sobrenome"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />

          <Input
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <PasswordInput
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button type="submit">Concluir Cadastro</button>
        </form>
      </main>
    </div>
  );
};

export default Logon;

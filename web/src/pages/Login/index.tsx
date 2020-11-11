import React, { useState, useCallback, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import background from '../../assets/images/Background.png';
import logo from '../../assets/images/logo.svg';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import purpleHeart from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const history = useHistory();
  const { signIn } = useAuth();

  const handleChange = useCallback((e) => {
    setRemember((remember) => !remember);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      await signIn({ email, password, remember });
      history.push('/landing');
    },
    [email, history, password, remember, signIn]
  );

  return (
    <div id="page-login">
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
        <form onSubmit={handleSubmit}>
          <h1 className="form-title">Fazer Login</h1>
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
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div className="remember-forgot-container">
            <div className="remember-container">
              <input
                id="remember-me"
                type="checkbox"
                checked={remember}
                onChange={handleChange}
              />
              <label className="remember-me-label" htmlFor="remember-me">
                Lembre-me
              </label>
            </div>

            <Link to="/forgot-password" className="forgot-password">
              Esqueci minha senha
            </Link>
          </div>

          <button type="submit">Entrar</button>
        </form>

        <footer>
          <div className="logon-container">
            <span>Não tem conta?</span>
            <Link to="/register" className="register">
              Cadastre-se
            </Link>
          </div>

          <span className="for-free">
            É de graça.
            <img src={purpleHeart} alt="" />
          </span>
        </footer>
      </main>
    </div>
  );
};

export default Login;

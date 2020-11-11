import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import doneImg from '../assets/images/Feito.png';

import Login from '../pages/Login';
import Logon from '../pages/Logon';
import TeacherForm from '../pages/TeacherForm';
import TeacherList from '../pages/TeacherList';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
import Success from '../pages/Success';
import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Logon} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/study" isPrivate component={TeacherList} />
      <Route path="/teach" isPrivate component={TeacherForm} />
      <Route
        path="/register-success"
        component={() => (
          <Success
            icon={doneImg}
            iconAlt="Cadastro Concluído"
            title="Cadastro concluído"
            description="Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência."
            buttonText="Fazer login"
            redirectionURL="/"
          />
        )}
      />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route
        path="/email-success"
        component={() => (
          <Success
            icon={doneImg}
            iconAlt="E-mail enviado"
            title="Redefinição Enviada!"
            description="Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos."
            buttonText="Voltar ao login"
            redirectionURL="/"
          />
        )}
      />
      <Route path="/landing" isPrivate component={Landing} />
      <Route path="/profile" isPrivate component={Profile} />
      <Route
        isPrivate
        path="/class-register-success"
        component={() => (
          <Success
            icon={doneImg}
            iconAlt="Cadastro Salvo"
            title="Cadastro Salvo"
            description="Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu Whatsapp."
            buttonText="Acessar"
            redirectionURL={`https://wa.me/55${user.whatsapp}`}
          />
        )}
      />
      <Route
        path="/reset-password-success"
        component={() => (
          <Success
            icon={doneImg}
            iconAlt="Senha Redefinida"
            title="Sua senha foi redefina"
            description="Tudo certo, agora é só se reconectar na plataforma."
            buttonText="Fazer login"
            redirectionURL="/"
          />
        )}
      />
    </Switch>
  );
};

export default Routes;

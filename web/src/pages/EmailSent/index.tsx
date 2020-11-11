import React, { useCallback } from 'react';
import background from '../../assets/images/Background.png';
import doneImg from '../../assets/images/Feito.png';
import { useHistory } from 'react-router-dom';

import './styles.css';

const EmailSent: React.FC = () => {
  const history = useHistory();

  const handleLogin = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <div
      id="page-email-sent"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <img src={doneImg} alt="Registro Concluído" />
      <h1 className="title">Redefinição enviada!</h1>
      <span>
        Boa, agora é só checar o e-mail que foi enviado para você <br />
        redefinir sua senha e aproveitar os estudos.
      </span>
      <span>Tenha uma ótima experiência.</span>
      <button type="button" onClick={handleLogin}>
        Voltar ao login
      </button>
    </div>
  );
};

export default EmailSent;

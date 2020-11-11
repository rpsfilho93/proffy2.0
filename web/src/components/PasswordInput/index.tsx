import React, { InputHTMLAttributes, useCallback, useState } from 'react';
import visibleIcon from '../../assets/images/icons/visible.png';
import invisibleIcon from '../../assets/images/icons/invisible.png';

import './styles.css';

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({ name, ...rest }) => {
  const [visible, setVisible] = useState(false);

  const handleVisible = useCallback(() => {
    setVisible((visible) => !visible);
  }, []);

  return (
    <div className="input-password-block">
      <input type={visible ? 'text' : 'password'} id={name} {...rest} />
      {visible ? (
        <img src={invisibleIcon} alt="Esconder senha" onClick={handleVisible} />
      ) : (
        <img src={visibleIcon} alt="Ver senha" onClick={handleVisible} />
      )}
    </div>
  );
};

export default InputPassword;

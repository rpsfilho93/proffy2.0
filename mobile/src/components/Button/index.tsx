import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Text, TouchableHighlightProps } from 'react-native';

import styles from './styles';

interface ButtonProps extends TouchableHighlightProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title, underlayColor, ...rest }) => {
  const [isPress, setIsPress] = useState(false);

  return (
    <TouchableHighlight
      onHideUnderlay={() => setIsPress((press) => !press)}
      onShowUnderlay={() => setIsPress((press) => !press)}
      underlayColor={underlayColor || '#04D361'}
      style={styles.container}
      {...rest}
    >
      <Text
        style={
          isPress
            ? [styles.buttonText, styles.buttonTextPress]
            : styles.buttonText
        }
      >
        {title}
      </Text>
    </TouchableHighlight>
  );
};

export default Button;

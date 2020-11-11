import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { View, TextInputProps, Text, TextInputComponent } from 'react-native';
import {
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import styles from './styles';

interface InputRef {
  focus(): void;
}

interface InputFormProps extends TextInputProps {
  name?: string;
  label?: string;
  containerStyle?: { [key: string]: string | number };
}

const InputForm: React.ForwardRefRenderFunction<InputRef, InputFormProps> = (
  { label, containerStyle, style, children, ...rest },
  ref
) => {
  const inputRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));

  const handleOnPress = useCallback(() => {
    inputRef.current.focus();
  }, []);

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableWithoutFeedback
        onPress={handleOnPress}
        style={[styles.container, containerStyle]}
      >
        <TextInput
          ref={inputRef}
          style={children ? styles.input : [styles.input, { width: '100%' }]}
          {...rest}
        />
        {children}
      </TouchableWithoutFeedback>
    </View>
  );
};

export default forwardRef(InputForm);

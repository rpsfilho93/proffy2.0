import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { View, TextInputProps, Image, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useField } from '@unform/core';

import seePasswordIcon from '../../assets/images/icons/seePasswordIcon.png';
import hidePasswordIcon from '../../assets/images/icons/unSeePassword.png';

import styles from './styles';

interface InputProps extends TextInputProps {
  name: string;
  placeholder: string;
  containerStyle?: { [key: string]: string | number };
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, placeholder, textContentType, containerStyle, ...rest },
  ref
) => {
  const { registerField, fieldName, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const inputElementRef = useRef<any>(null);

  const [visiblePassword, seVisiblePassword] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  const handleVisiblePassword = useCallback(() => {
    seVisiblePassword((visible) => !visible);
  }, []);

  const handleBlur = useCallback(() => {
    if (inputValueRef.current.value === '') {
      setOnFocus(false);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [registerField, fieldName]);

  return (
    <View
      style={
        onFocus
          ? [styles.container, styles.containerOnFocus, containerStyle]
          : [styles.container, containerStyle]
      }
    >
      {onFocus && <Text style={styles.placeholder}>{placeholder}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputElementRef}
          style={styles.input}
          placeholderTextColor="#9C98A6"
          secureTextEntry={textContentType === 'password' && !visiblePassword}
          defaultValue={defaultValue}
          onFocus={() => setOnFocus(true)}
          onBlur={handleBlur}
          onChangeText={(value) => {
            inputValueRef.current.value = value;
          }}
          placeholder={onFocus ? '' : placeholder}
          {...rest}
        />

        {textContentType === 'password' ? (
          visiblePassword ? (
            <TouchableOpacity onPress={handleVisiblePassword}>
              <Image source={hidePasswordIcon} style={styles.seePasswordIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleVisiblePassword}>
              <Image source={seePasswordIcon} style={styles.seePasswordIcon} />
            </TouchableOpacity>
          )
        ) : null}
      </View>
    </View>
  );
};

export default forwardRef(Input);

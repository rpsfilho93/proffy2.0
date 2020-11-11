import React, { useCallback, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import backgroundImage from '../../assets/images/loginBackground.png';
import logo from '../../assets/images/intro.png';
import goBackIcon from '../../assets/images/icons/goBackIcon.png';

import styles from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const formRef = useRef<FormHandles>(null);
  const { navigate, goBack } = useNavigation();
  const { signIn } = useAuth();

  const handleNewAccount = useCallback(() => {
    navigate('Logon1');
  }, []);

  const handleSubmit = useCallback(async (data: FormData) => {
    const { email } = data;
    api.post('/password/forgot', { email });
    navigate('SentEmail');
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.banner}>
          <ImageBackground source={backgroundImage} style={styles.background}>
            <Image source={logo}></Image>
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => goBack()}
            style={{ right: 9.5, marginBottom: 8 }}
          >
            <Image source={goBackIcon} />
          </TouchableOpacity>

          <Text style={styles.title}>Esqueceu sua senha?</Text>

          <Text style={styles.description}>
            Não esquenta,{'\n'}vamos dar um jeito nisso.
          </Text>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              title="Enviar"
              onPress={() => formRef.current?.submitForm()}
            />
          </Form>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

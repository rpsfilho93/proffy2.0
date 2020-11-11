import React, { useCallback, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import backgroundImage from '../../assets/images/loginBackground.png';
import logo from '../../assets/images/intro.png';
import vectorIcon from '../../assets/images/icons/vector.png';

import styles from './styles';
import { useAuth } from '../../hooks/auth';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const formRef = useRef<FormHandles>(null);
  const { navigate } = useNavigation();
  const passwordInputRef = useRef<TextInput>(null);
  const { signIn } = useAuth();
  const [remember, setRemember] = useState(false);

  const handleNewAccount = useCallback(() => {
    navigate('Logon1');
  }, []);

  const handleSubmit = useCallback(async (data: FormData) => {
    const { email, password } = data;
    await signIn({ email, password, remember });
  }, [remember]);

  const handleRemember = useCallback(() => {
    setRemember(!remember);
  },[remember]);

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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Fazer login</Text>
            <TouchableOpacity onPress={handleNewAccount}>
              <Text style={styles.newAccount}>Criar uma conta</Text>
            </TouchableOpacity>
          </View>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              containerStyle={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderBottomWidth: 0,
              }}
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              name="password"
              placeholder="Senha"
              textContentType="password"
              returnKeyType="send"
              containerStyle={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <View style={styles.rememberForgotContainer}>
              <View style={styles.rememberContainer}>
                <RectButton
                  style={
                    remember
                      ? styles.rememberButtonActive
                      : styles.rememberButton
                  }
                  onPress={handleRemember}
                >
                  {remember && <Image source={vectorIcon} />}
                </RectButton>
                <Text style={styles.rememberText}>Lembrar-me</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
                  <Text style={styles.rememberText}>Esqueci minha senha</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Button
              title="Entrar"
              onPress={() => formRef.current?.submitForm()}
            />
          </Form>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

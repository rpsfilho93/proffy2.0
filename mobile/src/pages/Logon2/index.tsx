import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {
  TouchableOpacity,
  RectButton,
  ScrollView,
} from 'react-native-gesture-handler';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { StatusBar } from 'expo-status-bar';

import Input from '../../components/Input';
import Button from '../../components/Button';

import goBackIcon from '../../assets/images/icons/goBackIcon.png';

import styles from './styles';
import { AuthStackParamList } from '../../routes/auth.routes';
import api from '../../services/api';

type LogonScreenRouteProp = RouteProp<AuthStackParamList, 'Logon2'>;

interface FormData {
  email: string;
  password: string;
}

const Logon2: React.FC = () => {
  const route = useRoute<LogonScreenRouteProp>();
  const { navigate, goBack } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(async (data: FormData) => {
    const { firstName, lastName } = route.params;
    const { email, password } = data;

    await api.post('/users', { firstName, lastName, email, password });
    navigate('RegisterSuccess');
  }, []);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image source={goBackIcon}></Image>
        </TouchableOpacity>
        <View style={styles.pageIndicator}>
          <View style={styles.square1}></View>
          <View style={styles.square2}></View>
        </View>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1, marginBottom: 30 }}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Crie sua {'\n'}conta gratuita</Text>
            <Text style={styles.subtitle}>
              Basta preencher esses dados e você estará conosco.
            </Text>

            <View style={styles.form}>
              <Text style={styles.formTitle}>02. E-mail e Senha </Text>
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
                    passwordRef.current?.focus();
                  }}
                />
                <Input
                  ref={passwordRef}
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
                <Button
                  title="Concluir cadastro"
                  onPress={() => formRef.current?.submitForm()}
                />
              </Form>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="dark" />
    </>
  );
};

export default Logon2;

import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import goBackIcon from '../../assets/images/icons/goBackIcon.png';

import styles from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { StatusBar } from 'expo-status-bar';

interface FormData {
  firstName: string;
  lastName: string;
}

const Logon1: React.FC = () => {
  const { navigate, goBack } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const lastNameRef = useRef<TextInput>(null);

  const handleSubmit = useCallback((data: FormData) => {
    navigate('Logon2', data);
  }, []);

  const handleGoBack = useCallback(() => {
    goBack();
  }, []);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
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
              <Text style={styles.formTitle}>01. Quem é você?</Text>

              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input
                  name="firstName"
                  placeholder="Nome"
                  autoCorrect={false}
                  returnKeyType="next"
                  containerStyle={{
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderBottomWidth: 0,
                  }}
                  onSubmitEditing={() => {
                    lastNameRef.current?.focus();
                  }}
                />
                <Input
                  ref={lastNameRef}
                  name="lastName"
                  placeholder="Sobrenome"
                  autoCorrect={false}
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
                  title="Próximo"
                  onPress={() => formRef.current?.submitForm()}
                  underlayColor="#8257E5"
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

export default Logon1;

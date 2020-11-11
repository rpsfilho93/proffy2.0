import React from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import successBackground from '../../assets/images/successBackground.png';
import doneIcon from '../../assets/images/icons/done.png';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const RegisterSuccess = () => {
  const { navigate } = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={successBackground}
          resizeMode="contain"
          style={styles.background}
        >
          <Image source={doneIcon} />
          <Text style={styles.title}>Cadastro concluído!</Text>
          <Text style={styles.subtitle}>
            Agora você faz parte da plataforma da Proffy
          </Text>
        </ImageBackground>

        <TouchableOpacity
          activeOpacity={0.2}
          style={styles.button}
          onPress={() => navigate('Login')}
        >
          <Text style={styles.buttonText}>Fazer login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RegisterSuccess;

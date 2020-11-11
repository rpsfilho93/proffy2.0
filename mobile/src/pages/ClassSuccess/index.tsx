import React from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import successBackground from '../../assets/images/successBackground.png';
import doneIcon from '../../assets/images/icons/done.png';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const ClassSuccess = () => {
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
          <Text style={styles.title}>Cadastro salvo!</Text>
          <Text style={styles.subtitle}>
            Tudo certo, seu cadastro está na nossa lista de professores. Agora é
            só ficar de olho no seu Whatsapp.
          </Text>
        </ImageBackground>

        <TouchableOpacity
          activeOpacity={0.2}
          style={styles.button}
          onPress={() => navigate('Landing')}
        >
          <Text style={styles.buttonText}>Entendi!</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ClassSuccess;

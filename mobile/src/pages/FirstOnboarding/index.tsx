import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import backgroundImage from '../../assets/images/onboardingBackground1.png';
import studyIcon from '../../assets/images/Estudar.png';
import arrowRight from '../../assets/images/icons/arrowRight.png';

import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';

const Landing = () => {
  const { navigate } = useNavigation();

  const handleNextPage = useCallback(() => {
    navigate('SecondOnboarding');
  }, []);

  useEffect(()=> {
    async function firtVisit() {
      await AsyncStorage.setItem('@ProffyApp:firstVisit', String(true));
    }

    firtVisit();
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
          resizeMode="contain"
        >
          <Image source={studyIcon}></Image>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <Text style={styles.number}>01.</Text>
        <Text style={styles.title}>
          Encontre vários professores para ensinar você
        </Text>

        <View style={styles.footer}>
          <View style={styles.pageIndicator}>
            <View style={styles.square1}></View>
            <View style={styles.square2}></View>
          </View>
          <TouchableOpacity onPress={handleNextPage}>
            <Image source={arrowRight}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Landing;

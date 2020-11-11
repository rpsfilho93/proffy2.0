import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import backgroundImage from '../../assets/images/onboardBackground2.png';
import teachIcon from '../../assets/images/icons/teach.png';
import arrowRight from '../../assets/images/icons/arrowRight.png';


import styles from './styles';

const Landing = () => {
  const { navigate } = useNavigation();

  const handleNextPage = useCallback(() => {
    navigate('Login');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
          resizeMode="contain"
        >
          <Image source={teachIcon}></Image>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <Text style={styles.number}>02.</Text>
        <Text style={styles.title}>
          Ou dê aulas sobre o que você mais conhece
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

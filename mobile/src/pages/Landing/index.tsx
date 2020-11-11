import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';

import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import defaultAvatar from '../../assets/images/default-avatar.png';
import quitIcon from '../../assets/images/icons/quit.png';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import styles from './styles';

const Landing = () => {
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('/connections').then((response) => {
      const { total } = response.data;
      setTotalConnections(total);
    });
  }, []);

  const navigateToGiveClasses = useCallback(() => {
    navigate('GiveClasses');
  }, []);

  const navigateToStudyTabs = useCallback(() => {
    navigate('StudyTabs');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <TouchableOpacity onPress={() => navigate('Profile')}>
              <Image
                source={
                  user.avatar_url ? { uri: user.avatar_url } : defaultAvatar
                }
                style={styles.avatar}
              />
            </TouchableOpacity>
            <Text style={styles.userName}>
              {user.firstName} {user.lastName}
            </Text>
          </View>
          <TouchableOpacity style={styles.quitButton} onPress={() => signOut()}>
            <Image source={quitIcon} style={styles.quitIcon} />
          </TouchableOpacity>
        </View>
        <Image source={landingImage} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Seja bem-vindo, {'\n'}
          <Text style={styles.titleBold}>O que deseja fazer?</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={navigateToStudyTabs}
            style={[styles.button, styles.buttonPrimary]}
          >
            <Image source={studyIcon} />
            <Text style={styles.buttonText}>Estudar</Text>
          </RectButton>

          <RectButton
            onPress={navigateToGiveClasses}
            style={[styles.button, styles.buttonSecondary]}
          >
            <Image source={giveClassesIcon} />
            <Text style={styles.buttonText}>Dar aulas</Text>
          </RectButton>
        </View>

        <Text style={styles.totalConnections}>
          Total de {totalConnections} conexões já realizadas. {'  '}
          <Image source={heartIcon} />
        </Text>
      </View>
    </View>
  );
};

export default Landing;

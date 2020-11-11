import React, { useCallback, ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';
import logo from '../../assets/images/logo.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  headerRight?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, children, headerRight }) => {
  const { navigate } = useNavigation();

  const handleGoBack = useCallback(() => {
    navigate('Landing');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>
      {children}
    </View>
  );
};

export default Header;

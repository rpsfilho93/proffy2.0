import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_700Bold,
  useFonts,
} from '@expo-google-fonts/archivo';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import Routes from './src/routes';
import AppProvider from './src/hooks';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <AppProvider>
          <Routes />
          <StatusBar style="light" />
        </AppProvider>
      </NavigationContainer>
    );
  }
}

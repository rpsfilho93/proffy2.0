import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FirstOnboarding from '../pages/FirstOnboarding';
import SecondOnboarding from '../pages/SecondOnboarding';
import Login from '../pages/Login';
import Logon1 from '../pages/Logon1';
import Logon2 from '../pages/Logon2';
import forgotPassword from '../pages/ForgotPassword';
import RegisterSuccess from '../pages/RegisterSuccess';
import SentEmail from '../pages/SentEmail';
import { useAuth } from '../hooks/auth';

export type AuthStackParamList = {
  FirstOnboarding: undefined;
  SecondOnboarding: undefined;
  Login: undefined;
  Logon1: undefined;
  Logon2: { firstName: string; lastName: string };
  RegisterSuccess: undefined;
  ForgotPassword: undefined;
  SentEmail: undefined;
};

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>();

const AuthRoutes: React.FC = () => {
  const { hasVisited } = useAuth();

  return (
      <Navigator screenOptions={{ headerShown: false }}>
        {!hasVisited &&
          <> 
            <Screen name="FirstOnboarding" component={FirstOnboarding} />
            <Screen name="SecondOnboarding" component={SecondOnboarding} />
          </>
        }

        <Screen name="Login" component={Login} />

        <Screen name="Logon1" component={Logon1} />
        <Screen name="Logon2" component={Logon2} />

        <Screen name="ForgotPassword" component={forgotPassword} />
        <Screen name="SentEmail" component={SentEmail} />

        <Screen name="RegisterSuccess" component={RegisterSuccess} />
      </Navigator>
  );
}

export default AuthRoutes;

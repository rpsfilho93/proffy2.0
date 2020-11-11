import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import { useFavorites } from './favorites';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  avatar_url?: string;
  whatsapp?: string;
  bio?: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInData {
  email: string;
  password: string;
  remember?: boolean;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInData): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
  loading: boolean;
  hasVisited: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);

  const { loadFavoritesList } = useFavorites();

  useEffect(() => {
    async function loadStorageData() {
      setLoading(true);

      const [token, user, firstVisit] = await AsyncStorage.multiGet([
        '@ProffyApp:token',
        '@ProffyApp:user',
        '@ProffyApp:firstVisit',
      ]);

      firstVisit[1] === 'true' ? setHasVisited(true) : setHasVisited(false);

      if (token[1] && user[1]) {
        api.defaults.headers.Authorization = `Bearer ${token}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password, remember }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (remember) {
      await AsyncStorage.multiSet([
        ['@ProffyApp:token', token],
        ['@ProffyApp:user', JSON.stringify(user)],
      ]);
    }

    loadFavoritesList();

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@ProffyApp:token',
      '@ProffyApp:user',
    ]);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      setData({ token: data.token, user });

      await AsyncStorage.setItem('@ProffyApp:user', JSON.stringify(user));
    },
    [data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser, loading, hasVisited }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

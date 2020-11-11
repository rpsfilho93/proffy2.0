import React from 'react';

import { FavoritesProvider } from './favorites';
import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => (
  <FavoritesProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </FavoritesProvider>
);

export default AppProvider;

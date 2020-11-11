import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../../components/Header';
import TeacherItem, { Teacher, ClassData, ScheduleItem } from '../../components/TeacherItem';

import { useFavorites } from '../../hooks/favorites';
import api from '../../services/api';

import styles from './styles';

const Favorites = () => { 
  const { favoritesList, loadFavoritesList } = useFavorites();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadFavorites() {
      setLoading(true);
      loadFavoritesList();
      setLoading(false);
    }

    loadFavorites();
  },[]);

  return (
  <View style={styles.container}>
    <Header title="Meus proffys favoritos" />
    <ScrollView
      style={styles.teacherList}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
    >
      {loading ? 
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#04D361" />
        </View> :
        favoritesList.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} isFavorite />
        ))  
      }
    </ScrollView>
  </View>
);
};

export default Favorites;

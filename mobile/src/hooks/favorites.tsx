import React, { createContext, useCallback, useContext, useState } from 'react';
import { ClassData, ScheduleItem, Teacher } from '../components/TeacherItem';
import api from '../services/api';

interface FavoritesContextData {
  favoritesList: Teacher[];
  loadFavoritesList(): void;
  addFavorite(teacher: Teacher): void;
  deleteFavorite(teacher_id: number): void;
}

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

export const FavoritesProvider: React.FC = ({ children }) => {
  const [favoritesList, setFavoritesList] = useState<Teacher[]>({} as Teacher[]);

  const loadFavoritesList = useCallback(async () => {
    const response = await api.get('/favorites');

    const { teachers, classes, schedules } = response.data;

    setFavoritesList(teachers.map((teacher:Teacher) => {
      const classData = classes.find((clss: ClassData) => clss.user_id === teacher.id);
      const schedule = schedules.filter((schdle: ScheduleItem) => schdle.class_id === classData.id);

      return (
        {...teacher, classData, schedule}
      );
    }));
  },[]);

  const addFavorite = useCallback(async (teacher: Teacher) => {
    await api.post('/favorites', { teacher_id: teacher.id });

    setFavoritesList([...favoritesList, teacher]);
  }, [favoritesList]);

  const deleteFavorite = useCallback(async (teacher_id: number) => {
    await api.delete('/favorites', { params: { teacher_id } });

    setFavoritesList(favoritesList.filter(favorite => favorite.id !== teacher_id));
  }, [favoritesList]);

  return (
    <FavoritesContext.Provider
      value={{ favoritesList, loadFavoritesList, addFavorite, deleteFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  ); 
};

export const useFavorites = (): FavoritesContextData => {
  const context = useContext(FavoritesContext);

  if(!context) {
    throw new Error('useFavorites must be used within an FavoritesProvider');
  }

  return context;
}
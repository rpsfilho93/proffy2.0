import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import goBackIcon from '../../assets/images/icons/goBackWhite.png';
import logo from '../../assets/images/logo.png';

import Select from '../../components/Select';
import Header from '../../components/Header';
import Button from '../../components/Button';

import TeacherItem, {
  ScheduleItem,
  Teacher,
  ClassData,
} from '../../components/TeacherItem';
import { useFavorites } from '../../hooks/favorites';


import api from '../../services/api';

import styles from './styles';

const TeacherList = () => {
  const { favoritesList } = useFavorites();

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [listCompleted, setListCompleted] = useState(false);
  const [favoritesIds, setFavoritesIds] = useState(favoritesList.map(fav => fav.id));

  const [teachersList, setTeachersList] = useState<Teacher[]>([]);

  const navigation = useNavigation();

  const navigateBack = useCallback(() => {
    navigation.navigate('Landing');
  }, []);

  useEffect(() => {
    const loadData = navigation.addListener('focus', async () => {
      console.log('FOCUS');
      setLoading(true);
      const response = await api.get('/classes');

      const { teachers, classes, schedules } = response.data;

      setTeachersList(teachers.map((teacher:Teacher) => {
        const classData = classes.find((clss: ClassData) => clss.user_id === teacher.id);
        const schedule = schedules.filter((schdle: ScheduleItem) => schdle.class_id === classData.id);

        return (
          {...teacher, classData, schedule}
        );
      }));

      setLoading(false);
    });

    return loadData;
  }, [navigation]);

  useEffect(() => {
    async function loadTeachers() {
      setLoading(true);
      const response = await api.get('/classes');

      const { teachers, classes, schedules } = response.data;

      setTeachersList(teachers.map((teacher:Teacher) => {
        const classData = classes.find((clss: ClassData) => clss.user_id === teacher.id);
        const schedule = schedules.filter((schdle: ScheduleItem) => schdle.class_id === classData.id);

        return (
          {...teacher, classData, schedule}
        );
      }));

      setLoading(false);
    }
 
    loadTeachers();
  }, []);

  const handleFilterVisible = useCallback(() => {
    setIsFilterVisible(!isFilterVisible);
  }, [isFilterVisible]);

  const handleFilter = useCallback(async () => {
      setIsFilterVisible(false);
      setPage(2);
      setListCompleted(false);
      setLoading(true);
      
      const response = await api.get('/classes', {
        params: {
          subject,
          week_day,
          time,
        },
      });
      setIsFilterVisible(false);

      const {teachers, classes, schedules } = response.data;

      setTeachersList(teachers.map((teacher:Teacher) => {
        const classData = classes.find((clss: ClassData) => clss.user_id === teacher.id);
        const schedule = schedules.filter((schdle: ScheduleItem) => schdle.class_id === classData.id);

        return (
          {...teacher, classData, schedule}
        );
      }));

      setLoading(false);
  }, [subject, time, week_day]);

  const renderItem = useCallback(({ item })=>{
    return (
      <TeacherItem
        key={item.id}
        teacher={item}
      />
    );
  },[]);

  const loadMoreTeachers = useCallback(async()=>{
    if(!listCompleted) {
      const response = await api.get('/classes', {
        params: {
          subject,
          week_day,
          time,
          page,
        },
      });
      
      const {teachers, classes, schedules } = response.data;

      if(teachers.length > 0) {
        const newTeachers = teachers.map((teacher:Teacher) => {
          const classData = classes.find((clss: ClassData) => clss.user_id === teacher.id);
          const schedule = schedules.filter((schdle: ScheduleItem) => schdle.class_id === classData.id);

          return (
            {...teacher, classData, schedule}
          );
        });

        setTeachersList([...teachersList, ...newTeachers]);
        setPage(page + 1);
      } else {
        setListCompleted(true);
      } 
    }
  },[page, teachersList]);

  const renderFooter = useCallback(()=>{
    return listCompleted ? <Text style={styles.endOfList}>Estes são todos os resultados</Text> : <ActivityIndicator style={{marginTop: 20}} size="small" color="#04D361" />;
  },[listCompleted]);

  return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={navigateBack}>
              <Image source={goBackIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Estudar</Text>
            <Image source={logo} resizeMode={'contain'} />
          </View>

          <Header
            title="Proffys Disponíveis"
            headerRight={
              <TouchableOpacity
                onPress={handleFilterVisible}
                style={styles.filterContainer}
              >
                <Feather name="filter" size={20} color="#04D361" />
                <Text style={styles.filterText}>
                  Filtrar por dia, hora e matéria
                </Text>
              </TouchableOpacity>
            }
          >
            {isFilterVisible && (
              <View style={styles.searchForm}>
                <Text style={styles.label}>Matéria</Text>
                <Select
                  selectedValue={subject}
                  items={[
                    {value: '', label: 'Selecione'},
                    { value: 'Português', label: 'Português' },
                    { value: 'Matemática', label: 'Matemática' },
                    { value: 'Geografia', label: 'Geografia' },
                    { value: 'História', label: 'História' },
                    { value: 'Química', label: 'Química' },
                    { value: 'Física', label: 'Física' },
                    { value: 'Biologia', label: 'Biologia' },
                    { value: 'Inglês', label: 'Inglês' },
                  ]}
                  onValueChange={async (value) => {
                    setSubject(value);                 
                  }}
                />

                <View style={styles.inputGroup}>
                  <View style={styles.inputBlock}>
                    <Text style={styles.label}>Dia da Semana</Text>
                    <Select
                      selectedValue={week_day}
                      items={[
                        { value: '', label: 'Selecione' },
                        { value: '0', label: 'Segunda-feira' },
                        { value: '1', label: 'Terça-feira' },
                        { value: '2', label: 'Quarta-feira' },
                        { value: '3', label: 'Quinta-feira' },
                        { value: '4', label: 'Sexta-feira' },
                      ]}
                      onValueChange={(value) => setWeek_day(value)}
                    />
                  </View>

                  <View style={styles.inputBlock}>
                    <Text style={styles.label}>Horário</Text>
                    <Select
                      selectedValue={time}
                      items={[
                        { value: '', label: 'Selecione' },
                        { value: '1:00', label: '1 hora' },
                        { value: '2:00', label: '2 horas' },
                        { value: '3:00', label: '3 horas' },
                        { value: '4:00', label: '4 horas' },
                        { value: '5:00', label: '5 horas' },
                        { value: '6:00', label: '6 horas' },
                        { value: '7:00', label: '7 horas' },
                        { value: '8:00', label: '8 horas' },
                        { value: '9:00', label: '9 horas' },
                        { value: '10:00', label: '10 horas' },
                        { value: '11:00', label: '11 horas' },
                        { value: '12:00', label: '12 horas' },
                        { value: '13:00', label: '13 horas' },
                        { value: '14:00', label: '14 horas' },
                        { value: '15:00', label: '15 horas' },
                        { value: '16:00', label: '16 horas' },
                        { value: '17:00', label: '17 horas' },
                        { value: '18:00', label: '18 horas' },
                        { value: '19:00', label: '19 horas' },
                        { value: '20:00', label: '20 horas' },
                        { value: '21:00', label: '21 horas' },
                        { value: '22:00', label: '22 horas' },
                        { value: '23:00', label: '23 horas' },
                        { value: '00:00', label: '0 hora' },
                      ]}
                      onValueChange={(value) => setTime(value)}
                    />  
                  </View>
                  
                </View>
                <Button title="Filtrar" onPress={handleFilter}/>
              </View>
            )}
          </Header>

          {loading ?
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="#04D361" />
            </View>
          : 
            <FlatList<Teacher>
              data={teachersList}
              keyExtractor={item => String(item.id)}
              renderItem={renderItem}
              onEndReached={loadMoreTeachers}  
              onEndReachedThreshold={0.1}  
              style={styles.teacherList}
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
              extraData={favoritesIds}
            />
        }
        </View>
      </KeyboardAvoidingView>
    );
};

export default TeacherList;

import React, { useCallback, useMemo, useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsapp from '../../assets/images/icons/whatsapp.png';
import defaultAvatar from '../../assets/images/default-avatar.png';
import arrowRight from '../../assets/images/icons/Voltar.png';

import convertMinutesToHours from '../../utils/convertMinutesToHours';
import api from '../../services/api';

import styles from './styles';
import { useFavorites } from '../../hooks/favorites';

export interface ClassData {
  id: number;
  user_id: number;
  subject: string;
  cost: number;
}

export interface ScheduleItem {
  week_day: number;
  from: number;
  to: number;
  class_id: number;
}

export interface Teacher {
  id: number;
  avatar: string;
  avatar_url: string;
  firstName: string;
  lastName: string;
  subject: string;
  bio: string;
  whatsapp: string;
  cost: number;
  classData: ClassData;
  schedule: ScheduleItem[];
}

interface TeacherItemProps {
  teacher: Teacher;
  isFavorite?: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({
  teacher,
  isFavorite,
}) => {
  const {favoritesList, addFavorite, deleteFavorite } = useFavorites();

  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  const favoritesIds = useMemo(() => favoritesList.map(fav => fav.id), [favoritesList]);

  const handleLinkToWhatsapp = useCallback(async () => {
    await api.post('/connections');
    Linking.openURL(`whatsapp://send?phone=55${whatsapp}`);
  }, []);

  const [favorite, setFavorite] = useState(isFavorite || favoritesIds.includes(teacher.id));

  const handleFavorite = useCallback(async () => {

    if (favorite) {
      deleteFavorite(teacher.id);
      setFavorite(false);
    } else {
      addFavorite(teacher);
      setFavorite(true);
    }
  }, [favorite]);

  return (
    <View style={styles.container} >
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={teacher.avatar ? { uri: teacher.avatar_url } : defaultAvatar}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.firstName} {teacher.lastName}</Text>
          <Text style={styles.subject}>{teacher.classData?.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.scheduleContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Dia</Text>
          <Text style={styles.title}>Horário</Text>
        </View>

        {daysOfWeek.map((day, index) => {
          const dayIndex = teacher.schedule.findIndex(
            (scheduleItem) => scheduleItem.week_day === index
          );

          return dayIndex !== -1 ? (
            <View key={day} style={styles.dayContainer}>
              <Text style={styles.scheduleText}>{day}</Text>
              <Image source={arrowRight} />
              <Text style={styles.scheduleText}>
                {convertMinutesToHours(teacher.schedule[dayIndex].from)}h -{' '}
                {convertMinutesToHours(teacher.schedule[dayIndex].to)}h
              </Text>
            </View>
          ) : (
            <View key={day} style={[styles.dayContainer, { opacity: 0.4 }]}>
              <Text style={[styles.scheduleText, { opacity: 0.4 }]}>{day}</Text>
              <Image source={arrowRight} />
              <Text style={[styles.scheduleText, { width: 77 }]}>-</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Preço da minha hora:</Text>
          <Text style={styles.priceValue}>R$ {teacher.classData?.cost}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleFavorite}
            style={[styles.favoriteButton, favorite ? styles.isFavorite : {}]}
          >
            {favorite ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton
            onPress={handleLinkToWhatsapp}
            style={styles.contactButton}
          >
            <Image source={whatsapp} />
            <Text style={styles.contactButtonText}>Entrar em Contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default React.memo(TeacherItem);

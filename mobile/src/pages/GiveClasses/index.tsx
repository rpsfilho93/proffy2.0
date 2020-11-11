import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Form } from '@unform/mobile';

import { useAuth } from '../../hooks/auth';

import defaultAvatar from '../../assets/images/default-avatar.png';
import logo from '../../assets/images/logo.png';
import goBackIcon from '../../assets/images/icons/goBackWhite.png';
import attentionIcon from '../../assets/images/icons/attention.png';

import InputForm from '../../components/InputForm';
import Button from '../../components/Button';

import styles from './styles';
import Select from '../../components/Select';
import api from '../../services/api';
import convertMinutesToHours from '../../utils/convertMinutesToHours';

interface ScheduleItem {
  week_day: string;
  from: string;
  to: string;
}

const GiveClasses = () => {
  const { goBack, navigate } = useNavigation();
  const { user, updateUser } = useAuth();

  const [whatsapp, setWhatsapp] = useState(user.whatsapp || '');
  const [bio, setBio] = useState(user.bio || '');
  const [subject, setSubject] = useState('Português');
  const [cost, setCost] = useState(0);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { week_day: '0', from: '', to: '' },
  ]);

  const bioInputRef = useRef<TextInput>(null);

  const availableDays = useMemo(() => {
    let days = ['0', '1', '2', '3', '4'];
    scheduleItems.forEach((scheduleItem) => {
      if (days.includes(scheduleItem.week_day)) {
        const index = days.indexOf(scheduleItem.week_day);

        days.splice(index, 1);
      }
    });

    return days;
  }, [scheduleItems]);

  const daysOfWeek = useMemo(() => {
    return [
      {
        value: '0',
        label: 'Segunda-feira',
        hidden: !availableDays.includes('0'),
      },
      {
        value: '1',
        label: 'Terça-feira',
        hidden: !availableDays.includes('1'),
      },
      {
        value: '2',
        label: 'Quarta-feira',
        hidden: !availableDays.includes('2'),
      },
      {
        value: '3',
        label: 'Quinta-feira',
        hidden: !availableDays.includes('3'),
      },
      {
        value: '4',
        label: 'Sexta-feira',
        hidden: !availableDays.includes('4'),
      },
    ];
  }, [availableDays]);

  const navigateBack = useCallback(() => {
    goBack();
  }, []);

  const handleSubmit = useCallback(() => {
    const updatedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule: scheduleItems,
    };

    api
      .post('/classes', updatedUser)
      .then(() => {
        updateUser({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          avatar_url: user.avatar_url,
          email: user.email,
          whatsapp,
          bio,
        });

        navigate('ClassSuccess');
      })
      .catch(() => {
        alert('Erro no cadastro!');
      });
  }, [
    user.firstName,
    user.lastName,
    user.avatar,
    whatsapp,
    bio,
    subject,
    cost,
    scheduleItems,
  ]);

  const showPhoneNumber = useCallback((phone: string) => {
    let i = 0;
    let formattedPhone = '';
    for (i = 0; i < phone.length; i += 1) {
      switch (i) {
        case 0:
          formattedPhone += '(' + phone[0];
          break;
        case 2:
          formattedPhone += ') ' + phone[2];
          break;
        case 3:
          formattedPhone += ' ' + phone[3];
          break;
        case 7:
          formattedPhone += ' ' + phone[7];
          break;
        default:
          formattedPhone += phone[i];
      }
    }
    return formattedPhone;
  }, []);

  const formatValue = useCallback((amount) => {
    return 'R$ ' + Number(amount).toFixed(2);
  }, []);

  const setScheduleItemValue = useCallback(
    (position: number, field: string, value: string) => {
      const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
        if (index === position) {
          return { ...scheduleItem, [field]: value };
        }

        return scheduleItem;
      });

      setScheduleItems(updatedScheduleItems);
    },
    [scheduleItems]
  );

  const addNewScheduleItem = useCallback(() => {
    if (availableDays.length > 0) {
      setScheduleItems([
        ...scheduleItems,
        { week_day: availableDays[0], from: '', to: '' },
      ]);
    }
  }, [availableDays, scheduleItems]);

  const deleteScheduleItem = useCallback(
    (day: string) => {
      if (scheduleItems.length > 1) {
        setScheduleItems((schedule) =>
          schedule.filter((item) => item.week_day !== day)
        );
      }
    },
    [scheduleItems.length]
  );

  useEffect(() => {
    async function loadProfile() {
      const response = await api.get('/profile');
      const { classes, schedule } = response.data;

      if (classes) {
        setCost(classes.cost);
        setSubject(classes.subject);

        setScheduleItems(
          schedule.map(
            (item: { week_day: number; from: number; to: number }) => ({
              week_day: String(item.week_day),
              from: convertMinutesToHours(item.from) + ':00',
              to: convertMinutesToHours(item.to) + ':00',
            })
          )
        );
      }
    }

    loadProfile();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack}>
          <Image source={goBackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dar aulas</Text>
        <Image source={logo} resizeMode={'contain'} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={styles.container}>
            <View style={styles.banner}>
              <Text style={styles.title}>
                Que incrível que você quer dar aulas.
              </Text>
              <Text style={styles.description}>
                O primeiro passo é preencher esse formulário de inscrição.
              </Text>
            </View>

            <View style={styles.content}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.card}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: 25,
                  backgroundColor: '#EBEBF5',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              >
                <View style={styles.form}>
                  <Text style={styles.formTitle}>Seus dados</Text>

                  <TouchableOpacity
                    onPress={() => navigate('Profile')}
                    style={styles.profile}
                  >
                    <Image
                      source={
                        user.avatar ? { uri: user.avatar_url } : defaultAvatar
                      }
                      style={styles.avatar}
                    />
                    <Text style={styles.userName}>
                      {user.firstName} {user.lastName}
                    </Text>
                  </TouchableOpacity>

                  <InputForm
                    name="whatsapp"
                    label="Whatsapp"
                    keyboardType="number-pad"
                    returnKeyType="next"
                    maxLength={16}
                    value={showPhoneNumber(whatsapp)}
                    onChangeText={(value) => {
                      const newWhatsapp = value
                        .replace(/[()]/g, '')
                        .replace(/\s/g, '');
                      if (newWhatsapp.length <= 11) {
                        setWhatsapp(newWhatsapp);
                      }
                    }}
                    onSubmitEditing={() => bioInputRef.current?.focus()}
                  />

                  <InputForm
                    ref={bioInputRef}
                    name="bio"
                    label="Biografia"
                    value={bio}
                    multiline={true}
                    numberOfLines={11}
                    textAlignVertical="top"
                    containerStyle={{
                      paddingTop: 10,
                      height: 54 * 4,
                      justifyContent: 'flex-start',
                    }}
                    onChangeText={(text) => setBio(text)}
                  />

                  <Text style={styles.formTitle}>Sobre a aula</Text>

                  <Select
                    label="Matéria"
                    selectedValue={subject}
                    items={[
                      { value: 'Português', label: 'Português' },
                      { value: 'Matemática', label: 'Matemática' },
                      { value: 'Geografia', label: 'Geografia' },
                      { value: 'História', label: 'História' },
                      { value: 'Química', label: 'Química' },
                      { value: 'Física', label: 'Física' },
                      { value: 'Biologia', label: 'Biologia' },
                      { value: 'Inglês', label: 'Inglês' },
                    ]}
                    onValueChange={(value) => setSubject(value)}
                  />

                  <InputForm
                    name="cost"
                    label="Custo da sua hora por aula"
                    keyboardType="numeric"
                    value={cost !== 0 ? formatValue(cost) : 'R$ '}
                    onChangeText={(value) => {
                      setCost(
                        Number(
                          value.replace(/[^0-9.-]+/g, '').replace(/\./g, '')
                        ) / 100
                      );
                    }}
                  />

                  <View style={styles.scheduleContainer}>
                    <Text style={styles.scheduleTitle}>
                      Horários disponíveis
                    </Text>
                    <TouchableOpacity onPress={addNewScheduleItem}>
                      <Text style={styles.newScheduleText}>+ Novo</Text>
                    </TouchableOpacity>
                  </View>

                  {scheduleItems.map((scheduleItem, index) => {
                    return (
                      <View
                        key={scheduleItem.week_day}
                        style={{ marginBottom: 10 }}
                      >
                        <Select
                          label="Dia da semana"
                          selectedValue={
                            daysOfWeek.find(
                              (day) => day.value === scheduleItem.week_day
                            )?.value
                          }
                          items={daysOfWeek.filter(
                            (day) =>
                              day.hidden === false ||
                              day.value === scheduleItem.week_day
                          )}
                          onValueChange={(value) =>
                            setScheduleItemValue(index, 'week_day', value)
                          }
                        />

                        <View style={styles.timeContainer}>
                          <InputForm
                            name="from"
                            label="Das"
                            keyboardType="numeric"
                            returnKeyType="next"
                            maxLength={2}
                            containerStyle={{ width: 140 }}
                            value={scheduleItem.from.replace(':00', '')}
                            onChangeText={(value) => {
                              setScheduleItemValue(
                                index,
                                'from',
                                value + ':00'
                              );
                            }}
                          >
                            {scheduleItem.from !== '' && (
                              <Text style={styles.timeText}>
                                {Number(scheduleItem.from.replace(':00', '')) >
                                1
                                  ? 'horas'
                                  : 'hora'}
                              </Text>
                            )}
                          </InputForm>

                          <InputForm
                            name="to"
                            label="Até"
                            keyboardType="numeric"
                            maxLength={2}
                            containerStyle={styles.containerStyle}
                            value={scheduleItem.to.replace(':00', '')}
                            onChangeText={(value) => {
                              setScheduleItemValue(index, 'to', value + ':00');
                            }}
                          >
                            {scheduleItem.to !== '' && (
                              <Text style={styles.timeText}>
                                {Number(scheduleItem.to.replace(':00', '')) > 1
                                  ? 'horas'
                                  : 'hora'}
                              </Text>
                            )}
                          </InputForm>
                        </View>
                        {scheduleItems.length > 1 && (
                          <>
                            <View style={styles.deleteSchedule}>
                              <TouchableOpacity
                                onPress={() =>
                                  deleteScheduleItem(scheduleItem.week_day)
                                }
                              >
                                <Text style={styles.deleteText}>
                                  Excluir horário
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                borderBottomWidth: 1,
                                borderBottomColor: '#E6E6F0',
                                marginBottom: 20,
                              }}
                            />
                          </>
                        )}
                      </View>
                  );
                  })}                  
                </View>
                <View style={styles.footer}>
                  <Button title="Salvar Cadastro" onPress={handleSubmit} />
                  <View style={styles.warningContainer}>
                    <Image source={attentionIcon} style={{ marginRight: 10 }} />
                    <View>
                      <Text style={styles.warningTitle}>Importante!</Text>
                      <Text style={styles.warningDescription}>
                        Preencha todos os dados
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default GiveClasses;

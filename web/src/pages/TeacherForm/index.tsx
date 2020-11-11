import React, { useState, useCallback, FormEvent, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';

import warningIcon from '../../assets/images/icons/warning.svg';
import defaultAvatar from '../../assets/images/default-avatar.png';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import './styles.css';

interface ScheduleItem {
  week_day: string;
  from: string;
  to: string;
}

const TeacherForm: React.FC = () => {
  const subjects = [
    { value: 'Português', label: 'Português', hidden: false },
    { value: 'Matemática', label: 'Matemática', hidden: false },
    { value: 'Geografia', label: 'Geografia', hidden: false },
    { value: 'História', label: 'História', hidden: false },
    { value: 'Química', label: 'Química', hidden: false },
    { value: 'Física', label: 'Física', hidden: false },
    { value: 'Biologia', label: 'Biologia', hidden: false },
    { value: 'Inglês', label: 'Inglês', hidden: false },
  ];

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { week_day: '', from: '', to: '' },
  ]);

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

  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState(0);

  const history = useHistory();

  const { user, updateUser } = useAuth();

  const addNewScheduleItem = useCallback(() => {
    if (availableDays.length > 0) {
      setScheduleItems([
        ...scheduleItems,
        { week_day: availableDays[0], from: '', to: '' },
      ]);
    }
  }, [availableDays, scheduleItems]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

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

          history.push('/class-register-success');
        })
        .catch(() => {
          alert('Erro no cadastro!');
        });
    },
    [
      bio,
      cost,
      history,
      scheduleItems,
      subject,
      updateUser,
      user.avatar,
      user.avatar_url,
      user.email,
      user.firstName,
      user.id,
      user.lastName,
      whatsapp,
    ]
  );

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

  const handleEditProfile = useCallback(() => {
    history.push('/profile');
  }, [history]);

  const handleSubjectChange = useCallback((selected) => {
    setSubject(selected.value);
  }, []);

  const handleDayChange = useCallback(
    (index, select) => {
      setScheduleItemValue(index, 'week_day', select.value);
    },
    [setScheduleItemValue]
  );

  return (
    <div id="page-teacher-form">
      <Header
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição."
        pageTitle="Dar aulas"
      />

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Seus Dados</legend>
            <div className="profile">
              <div className="avatar-name">
                <img
                  src={user.avatar ? user.avatar_url : defaultAvatar}
                  alt={user.firstName}
                  onClick={handleEditProfile}
                />
                <strong onClick={handleEditProfile}>
                  {user.firstName} {user.lastName}
                </strong>
              </div>

              <Input
                name="whatsapp"
                label="Whatsapp"
                type="tel"
                placeholder="(  ) _ ____ ____"
                value={showPhoneNumber(whatsapp)}
                onChange={(e) => {
                  const newWhatsapp = e.target.value
                    .replace(/[()]/g, '')
                    .replace(/\s/g, '');
                  if (newWhatsapp.length <= 11) {
                    setWhatsapp(newWhatsapp);
                  }
                }}
              />
            </div>

            <TextArea
              name="bio"
              label="Biografia (Máximo de 300 caracteres)"
              maxLength={300}
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={subjects.find((sub) => sub.value === subject) || undefined}
              placeholder="Selecione qual você quer ensinar"
              options={subjects}
              onChange={handleSubjectChange}
            />
            <Input
              name="cost"
              label="Custo da sua hora/aula"
              value={formatValue(cost)}
              onChange={(e) => {
                setCost(
                  Number(
                    e.target.value.replace(/[^0-9.-]+/g, '').replace(/\./g, '')
                  ) / 100
                );
              }}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo Horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={daysOfWeek.find(
                      (day) => day.value === scheduleItem.week_day
                    )}
                    placeholder="Selecione o dia"
                    options={daysOfWeek}
                    onChange={(selected) => handleDayChange(index, selected)}
                  />
                  <Input
                    name="from"
                    label="Das"
                    value={scheduleItem.from}
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(index, 'from', e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="Até"
                    value={scheduleItem.to}
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(index, 'to', e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;

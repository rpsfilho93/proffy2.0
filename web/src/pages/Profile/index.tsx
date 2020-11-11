import React, {
  useState,
  useCallback,
  FormEvent,
  ChangeEvent,
  useMemo,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import cameraIcon from '../../assets/images/icons/Camera.png';
import defaultAvatar from '../../assets/images/default-avatar.png';
import profileBackground from '../../assets/images/profile-background.png';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import api from '../../services/api';
import convertMinutesToHours from '../../utils/convertMinutesToHours';
import formatValue from '../../utils/formatValue';

import { useAuth } from '../../hooks/auth';

import './styles.css';

interface ScheduleItem {
  week_day: '0' | '1' | '2' | '3' | '4';
  from: 'string';
  to: 'string';
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const subjects = [
    { value: 'Português', label: 'Português' },
    { value: 'Matemática', label: 'Matemática' },
    { value: 'Geografia', label: 'Geografia' },
    { value: 'História', label: 'História' },
    { value: 'Química', label: 'Química' },
    { value: 'Física', label: 'Física' },
    { value: 'Biologia', label: 'Biologia' },
    { value: 'Inglês', label: 'Inglês' },
  ];

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: '', from: '', to: '' },
  ]);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [whatsapp, setWhatsapp] = useState(user.whatsapp || '');
  const [bio, setBio] = useState(user.bio || '');
  const [cost, setCost] = useState(0);
  const [subject, setSubject] = useState('');

  const history = useHistory();

  useEffect(() => {
    api.get('/profile').then((response) => {
      const { classes, schedule } = response.data;

      if (classes) {
        setCost(classes.cost);
        setSubject(classes.subject);

        setScheduleItems(
          schedule.map(
            (item: { week_day: number; from: number; to: number }) => ({
              week_day: String(item.week_day),
              from: convertMinutesToHours(item.from),
              to: convertMinutesToHours(item.to),
            })
          )
        );
      }
    });
  }, []);

  const availableDays = useMemo(() => {
    let days = ['0', '1', '2', '3', '4'];
    scheduleItems.forEach((scheduleItem) => {
      if (days.includes(scheduleItem.week_day)) {
        const index = days.indexOf(String(scheduleItem.week_day));

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
        isDisabled: !availableDays.includes('0'),
      },
      {
        value: '1',
        label: 'Terça-feira',
        isDisabled: !availableDays.includes('1'),
      },
      {
        value: '2',
        label: 'Quarta-feira',
        isDisabled: !availableDays.includes('2'),
      },
      {
        value: '3',
        label: 'Quinta-feira',
        isDisabled: !availableDays.includes('3'),
      },
      {
        value: '4',
        label: 'Sexta-feira',
        isDisabled: !availableDays.includes('4'),
      },
    ];
  }, [availableDays]);

  const addNewScheduleItem = useCallback(() => {
    setScheduleItems([
      ...scheduleItems,
      { week_day: availableDays[0], from: '', to: '' },
    ]);
  }, [availableDays, scheduleItems]);

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('avatar', data).then((response) => {
          updateUser(response.data);
        });
      }
    },
    [updateUser]
  );

  const handleDeleteScheduleItem = useCallback(
    (day: string) => {
      if (scheduleItems.length > 1) {
        setScheduleItems((schedule) =>
          schedule.filter((item) => item.week_day !== day)
        );
      }
    },
    [scheduleItems.length]
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      api
        .post('/classes', {
          firstName: user.firstName,
          lastName: user.lastName,
          whatsapp,
          bio,
          subject,
          cost,
          schedule: scheduleItems,
        })
        .then(() => {
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
      user.firstName,
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
    <div id="page-profile">
      <Header
        pageTitle="Meu perfil"
        style={{
          backgroundImage: `url(${profileBackground})`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="header-profile">
          <div className="avatar-input">
            <img
              src={user.avatar ? user.avatar_url : defaultAvatar}
              alt={user.firstName}
            />
            <label htmlFor="avatar">
              <img src={cameraIcon} alt="Trocar Avatar" />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </div>
          <strong>
            {user.firstName} {user.lastName}
          </strong>
        </div>
      </Header>

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Seus Dados</legend>
            <div className="firstName-lastName">
              <Input
                name="firstName"
                label="Nome"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <Input
                name="lastName"
                label="Sobrenome"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="email-whatsapp">
              <Input
                name="email"
                label="E-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
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
              label="Biografia (Máximo 300 caracteres)"
              value={bio}
              maxLength={300}
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
                      (day) => day.value === String(scheduleItem.week_day)
                    )}
                    placeholder="Selecione o dia"
                    options={daysOfWeek}
                    onChange={(selected) => handleDayChange(index, selected)}
                  />
                  <Input
                    name="from"
                    label="Das"
                    value={String(scheduleItem.from)}
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(index, 'from', e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="Até"
                    value={String(scheduleItem.to)}
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(index, 'to', e.target.value)
                    }
                  />

                  <button
                    className="schedule-item-button"
                    type="button"
                    onClick={() =>
                      handleDeleteScheduleItem(scheduleItem.week_day)
                    }
                  >
                    Excluir horário
                  </button>
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

export default Profile;

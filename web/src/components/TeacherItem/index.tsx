import React, { useCallback } from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import defaultAvatar from '../../assets/images/default-avatar.png';
import './styles.css';
import api from '../../services/api';
import convertMinutesToHours from '../../utils/convertMinutesToHours';
import formatValue from '../../utils/formatValue';

export interface ScheduleItem {
  week_day: number;
  from: number;
  to: number;
  class_id: number;
}

export interface Teacher {
  id: number;
  avatar: string;
  avatar_url:string;
  firstName: string;
  lastName: string;
  subject: string;
  bio: string;
  whatsapp: string;
  cost: number;
  classData: ClassData;
  schedule: ScheduleItem[];
}

export interface ClassData {
  id: number;
  user_id: number;
  subject: string;
  cost: number;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  const createNewConnection = useCallback(async () => {
    await api.post('/connections', { user_id: teacher.id });
  }, [teacher.id]);

  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar ? teacher.avatar_url : defaultAvatar}
          alt={teacher.firstName}
        />
        <div>
          <strong>
            {teacher.firstName} {teacher.lastName}
          </strong>
          <span>{teacher.classData.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <div className="schedule">
        {daysOfWeek.map((day, index) => {
          const dayIndex = teacher.schedule.findIndex(
            (scheduleItem) => scheduleItem.week_day === index
          );

          return dayIndex !== -1 ? (
            <div className="schedule-item" key={day}>
              <div className="day">
                <span>Dia</span>
                <strong>{daysOfWeek[index]}</strong>
              </div>
              <div className="time">
                <span>Horário</span>
                <strong>
                  {convertMinutesToHours(teacher.schedule[dayIndex].from)}-
                  {convertMinutesToHours(teacher.schedule[dayIndex].to)}
                </strong>
              </div>
            </div>
          ) : (
            <div className="schedule-item-inactive" key={day}>
              <div className="day">
                <span>Dia</span>
                <strong>{daysOfWeek[index]}</strong>
              </div>

              <div className="time">
                <span>Horário</span>
                <strong>-</strong>
              </div>
            </div>
          );
        })}
      </div>

      <footer>
        <p>
          Preço/hora
          <strong>{formatValue(teacher.classData.cost)}</strong>
        </p>
        <a
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
        >
          <img src={whatsappIcon} alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;

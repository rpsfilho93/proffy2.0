import React, { useState, useCallback, FormEvent, useEffect } from 'react';
import Header from '../../components/Header';
import TeacherItem, {
  ClassData,
  Teacher,
  ScheduleItem,
} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';

const TeacherList: React.FC = () => {
  const [teachersList, setTeachersList] = useState<Teacher[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

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

  const daysOfWeek = [
    { value: '0', label: 'Segunda-Feira' },
    { value: '1', label: 'Terça-feira' },
    { value: '2', label: 'Quarta-feira' },
    { value: '3', label: 'Quinta-feira' },
    { value: '4', label: 'Sexta-feira' },
  ];

  useEffect(() => {
    async function loadTeachers() {
      const response = await api.get('/classes');

      const { teachers, classes, schedules } = response.data;

      setTeachersList(teachers.map((teacher:Teacher) => {
        const classData = classes.find((clss: ClassData) => clss.user_id === teacher.id);
        const schedule = schedules.filter((schdle: ScheduleItem) => schdle.class_id === classData.id);

        return (
          {...teacher, classData, schedule}
        );
      }));

    }
 
    loadTeachers();
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const response = await api.get('/classes', {
        params: {
          subject,
          week_day,
          time,
        },
      });

      const { teachers, classes, schedules } = response.data;

      setTeachersList(teachers.map((teacher:Teacher) => {
        const classData = classes.find((clss: ClassData) => clss.user_id === teacher.id);
        const schedule = schedules.filter((schdle: ScheduleItem) => schdle.class_id === classData.id);

        return (
          {...teacher, classData, schedule}
        );
      }));
    },
    [subject, time, week_day]
  );

  const handleDayChange = useCallback((selected) => {
    setWeek_day(selected.value);
  }, []);

  const handleSubjectChange = useCallback((selected) => {
    setSubject(selected.value);
  }, []);

  return (
    <div id="page-teacher-list" className="container ">
      <Header title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={handleSubmit}>
          <Select
            name="subject"
            label="Matéria"
            value={subjects.find((sub) => sub.value === subject) || undefined}
            placeholder="Selecione"
            options={subjects}
            onChange={handleSubjectChange}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            placeholder="Selecione"
            value={daysOfWeek.find((day) => day.value === week_day)}
            options={daysOfWeek}
            onChange={(selected) => handleDayChange(selected)}
          />
          <Input
            type="time"
            name="time"
            label="Horário"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </Header>

      <main>
        {teachersList.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
            />
          );
        })}
      </main>
    </div>
  );
};

export default TeacherList;

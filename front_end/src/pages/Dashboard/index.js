import React, { 
  useState, 
  useMemo, 
  useEffect
} from 'react';
import { 
  format, 
  subDays, 
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';
import { Container, Time } from './styles';

const range = [
  8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20
];

export default function Dashboard() {

  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('shcedule', {
        params: {  date: new Date(date).toISOString() }
      });
      
      
      
      const timezone = Intl
        .DateTimeFormat()
        .resolvedOptions().timeZone;

      
      const data = range.map(hour => {
        const checkDate = 
          setSeconds(setMinutes(setHours(date, hour), 0), 0);
        
          
        const compareDate = new Date(utcToZonedTime(checkDate, timezone));
        // console.log(new Date(compareDate));
        
        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(a =>{
            
            isEqual(parseISO(a.date), compareDate)
            return a;
          })
        };

      });
      
      setSchedule(data);
    }
    
    loadSchedule();
  } ,[date]);

  return (
    <Container>
      <header>
        <button 
          type="button"
          onClick={handlePrevDay}
        >
          <MdChevronLeft size={35} color="#FFF" />
        </button>
          <strong>{dateFormatted}</strong>
        <button 
          type="button"
          onClick={handleNextDay}
        >
          <MdChevronRight size={35} color="#FFF" />
        </button>
      </header>

      <ul>
        {schedule.map(time => (
          <Time 
            key={time.time} 
            past={time.past}
            available={!time.appointment}
          >
            <strong>{time.time}</strong>
            <span>{time.appointment ? time.appointment.user.name : 'Em aberto'}</span>
          </Time>
        ))}
        
      </ul>
    </Container>
  );
}

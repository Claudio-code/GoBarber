import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/background';
import Appointment from '../../components/Appointment';
import { getAppointments } from '../../store/modules/appointments/actions';
import { 
  Container, 
  Title, 
  List 
} from './styles';

const data = [1, 2, 3, 4, 5];

export default function Dashboard() {
  const dispatch = useDispatch();
  const appointments = useSelector(state => state.appointments.appointments);

  useEffect(() => {
    dispatch(getAppointments());
  }, []);

  return (
    <Background>
      <Container>
        <Title>
          Agendamentos
        </Title>
        <List
          data={appointments}
          keyExtractor={item => item.id}
          key={item => item.id}
          renderItem={item => <Appointment data={data} key={data.id} />}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor })  => (
    <Icon name="event" size={20} color={tintColor} />
  )
};
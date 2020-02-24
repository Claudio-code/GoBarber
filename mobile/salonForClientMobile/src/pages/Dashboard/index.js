import React, { useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
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



function Dashboard({ isFocused }) {
  const dispatch = useDispatch();
  const appointments = useSelector(state => state.appointments.appointments);

  useEffect(() => {
    if (isFocused) {
      dispatch(getAppointments());
    }
  }, [isFocused] );

  return (
    <Background>
      <Container>
        <Title>
          Agendamentos
        </Title>
        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          key={item => String(item.id)}
          renderItem={item => <Appointment data={item.item} key={String(item.item.id)} />}
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

export default withNavigationFocus(Dashboard);
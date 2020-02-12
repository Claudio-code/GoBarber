import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import { useDispatch } from 'react-redux';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { cancelAppointments } from '../../store/modules/appointments/actions';
import { 
  Container,
  Avatar,
  Left,
  Info,
  Name,
  Time
} from './styles';

export default function Appointment({ data }) {
  const dispatch = useDispatch();

  const dateParsed = useMemo(
    () => {
      return formatRelative(parseISO(data.date), new Date(), {
        locale: pt,
        addSuffix: true
      });
    }, [data.date]
  );

  function onCancel() {
    dispatch(cancelAppointments(data.id));
  }

  return (
    <Container past={data.past}>
      <Left>
        <Avatar 
          source={{ 
            uri: data.provider.avatar ? data.provider.avatar 
              : `https://api.adorable.io/avatars/40/${data.provider.name}.png` 
          }} 
        />
        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>
      {data.cancelable && (
        <TouchableOpacity
          onPress={onCancel}
        >
          <Icon 
            name="event-busy" 
            size={20} 
            color="#f64c75" 
          />
        </TouchableOpacity>
      )}
    </Container>
  );
}

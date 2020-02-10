import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { 
  Container,
  Avatar,
  Left,
  Info,
  Name,
  Time
} from './styles';

export default function Appointment() {
  return (
    <Container>
      <Left>
        <Avatar 
          source={{ 
            uri: 'https://api.adorable.io/avatars/40/abott@adorable.png' 
          }} 
        />
        <Info>
          <Name>Claudio</Name>
          <Time>em 3 minutos</Time>
        </Info>
      </Left>

      <TouchableOpacity>
        <Icon 
          name="event-busy" 
          size={20} 
          color="#f64c75" 
        />
      </TouchableOpacity>
    </Container>
  );
}

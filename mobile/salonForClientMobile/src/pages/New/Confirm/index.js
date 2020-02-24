import React, { useMemo } from 'react';
import pt from 'date-fns/locale/pt';
import { parseISO, formatRelative } from 'date-fns';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../components/background';
import { Container, Avatar, Time, Name, SubmitButton } from './styles';
import api from '../../../services/api';

export default function Confirm({ navigation }) {
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');

  const dateFormated = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time],
  );

  async function handleConfirm() {
    try {
      await api.post('appointments', {
        provider_id: provider.id,
        date: time,
      });
      return navigation.navigate('Dashboard');
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <Background>
      <Container>
        <Avatar 
          source={{
            uri: provider.avatar ? provider.avatar 
            : `https://api.adorable.io/avatars/40/${provider.name}.png` 
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{dateFormated}</Time>
        <SubmitButton
          onPress={handleConfirm}
        >
          Agendar
        </SubmitButton>
      </Container>
    </Background>
  );
}


Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirme o Horario',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={24} color="#FFF" />
    </TouchableOpacity>
  )
});

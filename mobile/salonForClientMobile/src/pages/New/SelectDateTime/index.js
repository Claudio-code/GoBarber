import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../components/background';
import DateInput from '../../../components/DateInput';

// import { Container } from './styles';

export default function SelectDateTime() {
  const [date, setDate] = useState(new Date());

  return (
    <Background>
      <Text>SelectDateTime</Text>
      <DateInput date={date} onChange={setDate} />
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o Horario',
  headerLeft: () => (
    <TouchableOpacity 
      onPress={() => navigation.goBack()}
    >
      <Icon name="chevron-left" size={24} color="#FFF" />
    </TouchableOpacity>
  )
});

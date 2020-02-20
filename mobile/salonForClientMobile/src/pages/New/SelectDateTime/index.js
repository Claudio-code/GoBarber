import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../components/background';
import DateInput from '../../../components/DateInput';
import api from '../../../services/api';

import { Container, Hour, HoursList, Title } from './styles';

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
  const provider = navigation.getParam('provider');

  useEffect(() => {
    async function loadDate() {
      try {
        
        const response = await api.get(`/providers/${provider.id}/available`, {
          params: {
            date: date.getTime(),
          }
        });
        
        setHours(response.data);

      } catch (error) {
        console.log(error);
        return;
      }
    }
    loadDate();
  }, [date, provider.id]);

  function handleSelectHours(value) {
    navigation.navigate('Confirm', {
      provider,
      time: value
    });
  }

  return (
    <Background>
      <Container>
        <DateInput 
          date={date} 
          onChange={setDate} 
        />
        <HoursList 
          data={hours}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hour 
              onPress={() => handleSelectHours(item.value)}
              enabled={item.avaliable}
            >
              <Title>
                {item.time}
              </Title>
            </Hour>
          )}
        />
      </Container>
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

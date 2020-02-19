import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../components/background';

import { getAllProviders } from '../../../store/modules/appointments/actions';
import { 
  Container,
  ProviderList,
  Provider,
  Avatar,
  Name
} from './styles';

export default function SelectProvider({ navigation }) {

  const dispatch = useDispatch();
  const providers = useSelector(state => state.appointments.providers);

  useEffect(() => {
    dispatch(getAllProviders());
    console.log(providers);
    
  }, []);

  return (
    <Background>
      <Container>
        <ProviderList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider onPress={() => 
              navigation.navigate('SelectDateTime', { provider })
            }>
              <Avatar 
                source={{
                  uri: provider.avatar ? provider.avatar 
                  : `https://api.adorable.io/avatars/40/${provider.name}.png` 
                }}
              />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o Prestador',
  headerLeft: () => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Dashboard')}
    >
      <Icon name="chevron-left" size={24} color="#FFF" />
    </TouchableOpacity>
  )
});
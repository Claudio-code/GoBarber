import React from 'react';
import { Image } from 'react-native';

import Background from '../../components/background';

import logo from '../../assets/logo.png';

import { 
  Container, 
  Form, 
  FormInput, 
  SubmitButton,
  SignLink,
  SignLinkText
} from './styles';

export default function SignIn({ navigation }) {

  function handleChangePage() {
    navigation.navigate('SignUp');
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />    
        <Form>
          <FormInput 
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
          />

          <FormInput 
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha"
          />
          <SubmitButton>
            Acessar
          </SubmitButton>
        </Form>
        <SignLink onPress={handleChangePage}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

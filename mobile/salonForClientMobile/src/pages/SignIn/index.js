import React, { useRef } from 'react';
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
  const passwordRef = useRef();

  function handleSubmit() {
    
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
            returnKeyType="next"
            placeholder="Digite seu e-mail"
            onSubmitEditing={() => passwordRef.current.focus()}
          />

          <FormInput 
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha"
            ref={passwordRef}
            onSubmitEditing={handleSubmit}
          />
          <SubmitButton>
            Acessar
          </SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

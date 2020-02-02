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

export default function SignUp({ navigation }) {
  const passwordRef = useRef();
  const emailRef = useRef();

  function handleSubmit() {
    
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />    
        <Form>
          <FormInput 
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu nome"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <FormInput 
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            ref={emailRef}
            onSubmitEditing={() => passwordRef.current.focus()}
          />

          <FormInput 
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha"
            ref={passwordRef}
            onSubmitEditing={handleSubmit}
          />

          <SubmitButton> Criar conta </SubmitButton>

        </Form>
        
        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já tenho uma conta</SignLinkText>
        </SignLink>

      </Container>
    </Background>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { 
  Container,
  Form,
  FormInput,
  Separator,
  Title,
  SubmitButton,
  LogoutButton
} from './styles';

import { updateProfileRequest } from '../../store/modules/user/actions';
import { signOut } from '../../store/modules/auth/actions';
import Background from '../../components/background';

export default function Profile() {

  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile); 

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');

  }, [profile]);

  function handleSubmit() {
    dispatch(updateProfileRequest({
      name: name,
      email: email,
      oldPassword: oldPassword,
      password: newPassword,
      ConfirmPassword: confirmPassword
    }));
  }

  function handleLogOut() {
   dispatch(signOut());
  }
  
  return (
    <Background>
      <Container>
        <Title>Atualizar perfil</Title>
        <Form>
          <FormInput 
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome Completo"
            returnKeyType="next"
            value={name}
            onChangeText={setName}
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <FormInput 
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu email"
            returnKeyType="next"
            ref={emailRef}
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={() => oldPasswordRef.current.focus()}
          />
          
          <Separator />

          <FormInput 
            icon="lock-outline"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite sua senha antiga"
            returnKeyType="next"
            ref={oldPasswordRef}
            value={oldPassword}
            onChangeText={setOldPassword}
            onSubmitEditing={() => newPasswordRef.current.focus()}
          />
          <FormInput 
            icon="lock-outline"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite sua senha nova"
            returnKeyType="next"
            ref={newPasswordRef}
            value={newPassword}
            onChangeText={setNewPassword}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
          />
          <FormInput 
            icon="lock-outline"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Confirme sua nova senha"
            returnKeyType="next"
            ref={confirmPasswordRef}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onSubmitEditing={handleSubmit}
          />
          
          <SubmitButton onPress={handleSubmit}>
            Atualizar perfil
          </SubmitButton>

          <LogoutButton onPress={handleLogOut}>
            Sair
          </LogoutButton>

        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon 
      name="person"
      size={20}
      color={tintColor}
    />
  )
};
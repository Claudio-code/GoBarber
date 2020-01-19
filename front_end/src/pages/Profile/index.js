import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '../../store/modules/auth/actions';
import { updateProfileRequest } from '../../store/modules/user/actions';
import AvatarInput from './AvatarInput';
import { Container } from './styles';


export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  console.log(profile);
  
  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleLogOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id"/>
        <Input 
          name="name" 
          placeholder="Digite seu nome completo" 
        />
        <Input 
          name="email" 
          placeholder="Digite seu nome completo" 
        />
        <hr/>

        <Input  
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />
        <Input  
          type="password"
          name="password"
          placeholder="Sua senha nova"
        />
        <Input  
          type="password"
          name="confirmPassword"
          placeholder="confirme sua senha nova"
        />
        <button type="submit">Atualizar perfil</button>
      </Form>
      <button type="button" onClick={handleLogOut}>Sair da aplicação</button>
    </Container>
  );
}

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { updateProfileRequest } from '../../store/modules/user/actions';
import { Container } from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
    console.tron.log(data);
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
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
      <button type="button">Sair da aplicação</button>
    </Container>
  );
}

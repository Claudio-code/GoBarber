import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email valido')
    .required('O e-mail é obrigatorio.'),

  password: Yup.string()
    .required('A senha é obrigatorio.'),
});

export default function SingIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Gobarber" width="08%" height="10%" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="insira seu email" />
        <Input name="password" type="password" placeholder="insira sua senha" />
        <button type="submit">{ loading ? 'loading....' : 'Acessar' }</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}

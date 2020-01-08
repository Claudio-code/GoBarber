import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email('Insira o email')
    .required('Esse parametro é obrigatorio'),
  password: Yup.string()
    .required('A senha é obrigatoria.'),
});

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }
  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form 
        schema={schema} 
        onSubmit={handleSubmit}
      >
        <Input name="name" type="text" placeholder="Seu nome" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <button type="submit">Acessar</button>
        <Link to="/" >Já tenho conta</Link>
      </Form>
    </>
  );
}

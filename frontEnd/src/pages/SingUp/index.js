import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  nome: Yup.string()
    .required('O nome é Obrigatorio'),

  email: Yup.string()
    .email('Insira um email valido')
    .required('O e-mail é obrigatorio.'),

  password: Yup.string()
    .required('A senha é obrigatorio.'),
});

export default function SingUp() {
  
  function handleSubmit(data) {

  }

  return (
    <>
      <img src={logo} alt="Gobarber" width="08%" height="10%" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="nome" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="insira seu email" />
        <Input name="password" type="password" placeholder="insira sua senha" />
        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}

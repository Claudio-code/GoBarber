import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';

import { signInSucess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
        email, password
    });
    console.log(response.data);
    
    const { token, User } = response.data;

    if (!User.provider) {
        toast.error('Deu pau n é provedor');
        console.tron.error('usuario n permitido');
        return;
    }
    yield put(signInSucess(token, User));
    toast.success('Td joia');
    history.push('/dashboard');
  } catch (error) {
    toast.error('Deu pau');
    console.log(error);
    yield put(signFailure());
    return;
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users',{
      name,
      email,
      password,
      provider: true,
    });
    toast.success('Td joia');
    history.push('/');  
  } catch (error) {
    toast.error('Deu pau');
    console.log(error);
    yield put(signFailure());
    return;
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp)
]);
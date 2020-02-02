import { all, takeLatest, put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';


import { signInSucess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    if (!email || !password) return;
    const response = yield call(api.post, 'sessions', {
      email, password
    });
    
    const { token, User } = response.data;

    if (User.provider) {
      return Alert.alert(
        'Login not authorized', 
        'This user is provider.'
      );
    }
    
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSucess(token, User));
  } catch (error) {
    
    yield put(signFailure());
    return Alert.alert(
      'Login not authorized', 
      'Occured one generic error.'
    );
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

export function setToken({ payload }) {
  if (!payload) return;
  
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut)
]);
import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { updateProfileSuccess, updateProfileFailure } from './actions';

import api from '../../../services/api';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data; 
    
    const profile = Object.assign(
      { name, email},
      rest.OldPassword ? rest : {}
    );
      
      
    const response = yield call(api.put, 'users', profile);
    
    yield put(updateProfileSuccess(response.data));

    return Alert.alert('Sucesso', 'perfil alterado com sucesso.');
    
  } catch (error) {
    console.log(error);
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)
]);
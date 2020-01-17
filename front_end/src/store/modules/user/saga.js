import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { updateProfileSuccess, updateProfileFailure } from './actions';
import api from '../../../services/api';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar, ...rest } = payload.data;
    console.tron.log(payload.data);
    
    // const avatar_id = avatar.id;
    const profile = Object.assign(
      { name, email, avatar},
      rest.OldPassword ? rest : {}
    );
  
    const response = yield call(api.put, 'users', profile);
    toast.success('Perfil atualizado');
    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    console.log(error);
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)
]);
import { all, takeLatest, put, call } from 'redux-saga/effects';

import api from '../../../services/api';
import history from '../../../services/history';

import { signInSucess } from './actions';

export function* signIn({ payload }) {
try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
        email, password
    });
    console.log(response.data);
    
    const { token, User } = response.data;

    if (!User.provider) {
        console.tron.error('usuario n permitido');
        return;
    }
    yield put(signInSucess(token, User));

    history.push('/dashboard');
} catch (error) {
    console.log(error);
    return;
}
}

export default all([
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
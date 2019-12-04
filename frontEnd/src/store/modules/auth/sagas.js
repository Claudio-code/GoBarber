import { all, takeLatest, call, put } from 'redux-saga/effects';

import { signInSuccess } from './actions';

import history from '../../../service/history';
import api from '../../../service/api';

export function* signIn({ payload }) {
    
    const { email, password } = payload;
    
    const response = yield call(api.post, 'sessions', { email, password });

    const { token, User: user } = response.data;
    
    if (!user.provider) {
        console.log("fazer uma falidacao melhor");
        return;
    }
    yield put(signInSuccess(token, user));
    history.push('/dashboard');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
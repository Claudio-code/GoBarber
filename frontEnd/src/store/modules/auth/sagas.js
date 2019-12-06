import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { signInSuccess, signFailure } from './actions';

import history from '../../../service/history';
import api from '../../../service/api';

export function* signIn({ payload }) {

    try {
        const { email, password } = payload;
    
        const response = yield call(api.post, 'sessions', { email, password });
    
        const { token, User: user } = response.data;
        
        if (!user.provider) {
            toast.error("fazer uma falidacao melhor");
            yield put(signFailure());
            return;
        }
        yield put(signInSuccess(token, user));
        history.push('/dashboard'); 
    } catch (error) {
        toast.error("Falha na autenticação vc fez bosta");
        yield put(signFailure());
    }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
import { all, takeLatest, put, call } from 'redux-saga/effects';
import api from '../../../services/api';
import { setAppointments } from './actions';


function* getAllAppointments() {
  try {
    
    const response = yield call(api.get, 'appointments');
    
    yield put(setAppointments(response.data));
    // setAppointments(response.data);

  } catch (error) {
    console.log(error);
    return;
  }
}


export default all([
  takeLatest('@appointments/GET_ALL', getAllAppointments),
]);
import { all, takeLatest, put, call } from 'redux-saga/effects';
import api from '../../../services/api';
import { 
  setAppointments, 
  getAppointments,
  setAllProviders
} from './actions';


function* getAllAppointmentsApi() {
  try {
    
    const response = yield call(api.get, 'appointments');
    
    yield put(setAppointments(response.data));

  } catch (error) {
    console.log(error);
    return;
  }
}

function* cancelIsAppointment({ payload }) {
  try {
    const { appointmentId } = payload;
    
    yield call(api.delete, `appointments/${appointmentId}`);

    yield put(getAppointments());

  } catch (error) {
    console.log(error);
    return;
  }
}

function* getAllProviders() {
  try {
    const response = yield call(api.get, 'providers');

    yield put(setAllProviders(response.data));

  } catch (error) {
    console.log(error);
    return;
  }
}


export default all([
  takeLatest('@appointments/GET_ALL_APOINTMENTS', getAllProviders),
  takeLatest('@appointments/GET_ALL', getAllAppointmentsApi),
  takeLatest('@appointments/DELETE_IS_APPOINTMENT', cancelIsAppointment)
]);
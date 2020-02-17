
  
export function getAppointments() {  
  return {
    type: '@appointments/GET_ALL',
    payload: {}
  };   
}

export function setAppointments(appointments) {
  return {
    type: '@appointments/SET_ALL',
    payload: { appointments }
  };   
}

export function cancelAppointments(appointmentId) {
  return {
    type: '@appointments/DELETE_IS_APPOINTMENT',
    payload: { appointmentId }
  };
}

export function getAllProviders() {
  return {
    type: '@appointments/GET_ALL_APOINTMENTS',
    payload: {}
  };
}

export function setAllProviders(providers) {
  return {
    type: '@appointments/SET_ALL_APOINTMENTS',
    payload: { providers }
  };
}
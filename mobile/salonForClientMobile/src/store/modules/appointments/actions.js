
  
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
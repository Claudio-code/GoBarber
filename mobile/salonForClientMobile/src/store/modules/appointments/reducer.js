import produce from 'immer';

const INITIAL_STATE = {
  appointments: null,
};

export default function appointments(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@appointments/SET_ALL': {
        draft.appointments = action.payload.appointments;
        break;
      }
      case '@auth/SIGN_OUT': { 
        draft.appointments = null;
        break;
      }
      default:
        return state;
    }
  });
  
}
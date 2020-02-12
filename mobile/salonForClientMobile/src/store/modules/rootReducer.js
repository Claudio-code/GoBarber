import { combineReducers } from 'redux';

import auth from './auth/reducer';
import appointments from './appointments/reducer';
import user from './user/reducer';

export default combineReducers({
    auth, user, appointments
});
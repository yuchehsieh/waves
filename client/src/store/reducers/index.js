import { combineReducers } from 'redux';

import user from './user.js';

const rootReducer = combineReducers({
  User: user
});

export default rootReducer;

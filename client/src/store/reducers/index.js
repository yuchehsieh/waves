import { combineReducers } from 'redux';

import user from './user.js';
import product from './product';

const rootReducer = combineReducers({
  User: user,
  Product: product
});

export default rootReducer;

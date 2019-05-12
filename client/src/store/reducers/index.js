import { combineReducers } from 'redux';

import user from './user.js';
import product from './product';
import site from './site';

const rootReducer = combineReducers({
  User: user,
  Product: product,
  Site: site
});

export default rootReducer;

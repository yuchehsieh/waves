import { LOGIN_USER, REGISTER_USER } from '../types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload.loginSuccess
      };
    case REGISTER_USER:
      return {
        ...state,
        registerSuccess: action.payload.success
      };
    default:
      return state;
  }
};

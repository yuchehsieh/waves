import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from '../types';

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
    case AUTH_USER:
      return {
        ...state,
        userData: action.payload
      };
    case LOGOUT_USER:
      return {
        ...state
      };
    default:
      return state;
  }
};

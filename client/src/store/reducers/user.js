import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEM_USER
} from '../types';

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
    case ADD_TO_CART_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload
        }
      };
    case GET_CART_ITEM_USER:
      return {
        ...state,
        cartDetail: action.payload
      };
    default:
      return state;
  }
};

import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEM_USER,
  REMOVE_CART_ITEM_USER,
  ON_SUCCESS_BUY_USER
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
    case REMOVE_CART_ITEM_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        },
        cartDetail: action.payload.cartDetail
      };
    case ON_SUCCESS_BUY_USER:
      return {
        ...state,
        successBuy: action.payload.success,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        },
        cartDetail: action.payload.cartDetail
      };
    default:
      return state;
  }
};

import axios from 'axios';

import { USER_SERVER, PRODUCT_SERVER } from '../../components/utils/misc';
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

export const loginUser = async dataToSubmit => {
  //   const request = axios
  //     .post(`${USER_SERVER}/login`, dataToSubmit)
  //     .then(response => response.data);

  const request = await axios.post(`${USER_SERVER}/login`, dataToSubmit);
  return {
    type: LOGIN_USER,
    payload: request.data
  };
};

export const registerUser = async dataToSubmit => {
  // const request = axios
  //   .post(`${USER_SERVER}/register`, dataToSubmit)
  //   .then(response => response.data)

  const request = await axios.post(`${USER_SERVER}/register`, dataToSubmit);
  return {
    type: REGISTER_USER,
    payload: request.data
  };
};

export const auth = async () => {
  const request = await axios.get(`${USER_SERVER}/auth`);
  return {
    type: AUTH_USER,
    payload: request.data
  };
};

export const logoutUser = async () => {
  const request = await axios.get(`${USER_SERVER}/logout`);
  return {
    type: LOGOUT_USER,
    payload: request.data
  };
};

export const addToCart = async _id => {
  const request = await axios.post(`${USER_SERVER}/addToCart?productId=${_id}`);
  return {
    type: ADD_TO_CART_USER,
    payload: request.data
  };
};

export const getCartItems = async (cartItems, userCart) => {
  const response = await axios.get(
    `${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`
  );

  userCart.forEach(item => {
    response.data.forEach((k, i) => {
      if (item.id === k._id) {
        response.data[i].quantity = item.quantity;
      }
    });
  });

  return {
    type: GET_CART_ITEM_USER,
    payload: response.data
  };
};

export const removeCartItem = async id => {
  const response = await axios.get(`${USER_SERVER}/removeFromCart?_id=${id}`);

  const { cartDetail, cart } = response.data;
  cart.forEach(item => {
    cartDetail.forEach((k, i) => {
      if (k._id === item.id) {
        cartDetail[i].quantity = item.quantity;
      }
    });
  });

  return {
    type: REMOVE_CART_ITEM_USER,
    payload: response.data
  };
};

export const onSuccessBuy = async data => {
  const response = await axios.post(`${USER_SERVER}/successBuy`, data);

  return {
    type: ON_SUCCESS_BUY_USER,
    payload: response.data
  };
};

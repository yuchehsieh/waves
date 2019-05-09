import axios from 'axios';

import { USER_SERVER } from '../../components/utils/misc';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER
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

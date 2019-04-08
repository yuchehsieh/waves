import axios from 'axios';

import { USER_SERVER } from '../../components/utils/misc';
import { LOGIN_USER, REGISTER_USER } from '../types';

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

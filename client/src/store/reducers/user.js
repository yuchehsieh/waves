import { LOGIN_USER } from '../types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

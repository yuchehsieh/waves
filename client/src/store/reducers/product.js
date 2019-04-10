import { GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL } from '../types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };

    default:
      return state;
  }
};

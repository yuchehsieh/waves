import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP
} from '../types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_BRANDS:
      return { ...state, brands: action.payload };
    case GET_WOODS:
      return { ...state, woods: action.payload };
    case GET_PRODUCTS_TO_SHOP: {
      return {
        ...state,
        toShop: action.payload.articles,
        toSize: action.payload.size
      };
    }
    default:
      return state;
  }
};

import axios from 'axios';
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP
} from '../types';
import { PRODUCT_SERVER } from '../../components/utils/misc';

export const getProductsByArrival = async () => {
  // /articles?sortBy=createdAt&order=desc&limit=4
  const request = await axios.get(
    `${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`
  );

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request.data
  };
};

export const getProductsBySell = async () => {
  // /articles?sortBy=sold&order=desc&limit=4
  const request = await axios.get(
    `${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`
  );

  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request.data
  };
};

export const getProductsToShop = async (
  skip,
  limit,
  filters = [],
  prevState = []
) => {
  const data = {
    limit,
    skip,
    filters
  };

  const request = await axios.post(`${PRODUCT_SERVER}/shop`, data);
  const { size, articles } = request.data;
  const newState = [...prevState, ...articles];

  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: { size, articles: newState }
  };
};

///////////////////////////////
//////      CATEGORIES
///////////////////////////////

export const getBrands = async () => {
  const request = await axios.get(`${PRODUCT_SERVER}/brands`);

  return {
    type: GET_BRANDS,
    payload: request.data
  };
};

export const getWoods = async () => {
  const request = await axios.get(`${PRODUCT_SERVER}/woods`);

  return {
    type: GET_WOODS,
    payload: request.data
  };
};

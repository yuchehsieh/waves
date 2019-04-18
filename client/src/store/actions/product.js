import axios from 'axios';
import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  ADD_BRAND,
  ADD_WOOD,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from '../types';
import { PRODUCT_SERVER } from '../../components/utils/misc';

export const getProductDetail = async id => {
  // /api/product/articles_by_id?id=XXX,AAA,BBB&type=array
  const request = await axios.get(
    `${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`
  );

  console.log(request.data[0]);

  return {
    type: GET_PRODUCT_DETAIL,
    payload: request.data[0]
  };
};

export const clearProductDetail = () => ({ type: CLEAR_PRODUCT_DETAIL });

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

export const addProduct = async dataToSubmit => {
  const request = await axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit);

  return {
    type: ADD_PRODUCT,
    payload: request.data
  };
};

export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT,
    payload: ''
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

export const addBrand = async (dataToSubmit, existingBrands) => {
  const request = await axios.post(`${PRODUCT_SERVER}/brand`, dataToSubmit);

  const brands = [...existingBrands, request.data.brand];

  // in real world should catch the false!
  return {
    type: ADD_BRAND,
    payload: {
      success: request.data.success,
      brands
    }
  };
};

export const getWoods = async () => {
  const request = await axios.get(`${PRODUCT_SERVER}/woods`);

  return {
    type: GET_WOODS,
    payload: request.data
  };
};

export const addWood = async (dataToSubmit, existingWoods) => {
  const request = await axios.post(`${PRODUCT_SERVER}/wood`, dataToSubmit);

  const woods = [...existingWoods, request.data.wood];

  return {
    type: ADD_WOOD,
    payload: {
      success: request.data.success,
      woods
    }
  };
};

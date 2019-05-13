import axios from 'axios';

import {
  GET_SITE_DATA,
  UPDATE_SITE_DATA,
  CLEAR_UPDATE_SITE_DATA
} from '../types';

import { SITE_SERVER } from '../../components/utils/misc';

export const getSiteData = async () => {
  const response = await axios.get(`${SITE_SERVER}/site_data`);

  return {
    type: GET_SITE_DATA,
    payload: response.data
  };
};

export const updateSiteData = async data => {
  const response = await axios.post(`${SITE_SERVER}/site_data`, data);

  return {
    type: UPDATE_SITE_DATA,
    payload: response.data
  };
};

export const clearUpdateSiteData = () => {
  return {
    type: CLEAR_UPDATE_SITE_DATA,
    payload: ''
  };
};

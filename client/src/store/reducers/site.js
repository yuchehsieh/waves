import {
  GET_SITE_DATA,
  UPDATE_SITE_DATA,
  CLEAR_UPDATE_SITE_DATA
} from '../types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SITE_DATA:
      return {
        ...state,
        siteData: action.payload
      };
    case UPDATE_SITE_DATA:
      return {
        ...state,
        siteData: action.payload.siteInfo,
        updateSite: action.payload.success
      };
    case CLEAR_UPDATE_SITE_DATA:
      return {
        ...state,
        updateSite: action.payload
      };
    default:
      return state;
  }
};

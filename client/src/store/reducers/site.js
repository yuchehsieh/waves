import { GET_SITE_DATA } from '../types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SITE_DATA:
      return {
        ...state,
        siteData: action.payload
      };

    default:
      return state;
  }
};

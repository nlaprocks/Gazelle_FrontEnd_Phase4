// retailersReducer.js
import {
    FETCH_RETAILERS_REQUEST,
    FETCH_RETAILERS_SUCCESS,
    FETCH_RETAILERS_FAILURE,
  } from "./retailersType";
  
  const initialState = {
    loading: false,
    retailers: [],
    error: "",
  };
  
  const retailersReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RETAILERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_RETAILERS_SUCCESS:
        return {
          ...state,
          loading: false,
          retailers: action.payload,
          error: "",
        };
      case FETCH_RETAILERS_FAILURE:
        return {
          ...state,
          loading: false,
          retailers: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default retailersReducer;
  
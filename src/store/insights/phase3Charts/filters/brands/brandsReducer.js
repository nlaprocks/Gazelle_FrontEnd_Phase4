import {
    FETCH_BRANDS_REQUEST,
    FETCH_BRANDS_SUCCESS,
    FETCH_BRANDS_FAILURE,
  } from "./brandsType";
  
  const initialState = {
    loading: false,
    brands: [],
    error: "",
  };
  
  const brandsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BRANDS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_BRANDS_SUCCESS:
        return {
          ...state,
          loading: false,
          brands: action.payload,
          error: "",
        };
      case FETCH_BRANDS_FAILURE:
        return {
          ...state,
          loading: false,
          brands: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default brandsReducer;
  
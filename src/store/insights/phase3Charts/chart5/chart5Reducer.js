import {
    CHART5_REQUEST,
    CHART5_SUCCESS,
    CHART5_FAILURE,
  } from "./chart5Type";
  
  const initialState = {
    success: false,
    loading: false,
    chart5Data: [],
    error: "",
  };
  
  const chart5Reducer = (state = initialState, action) => {
    switch (action.type) {
      case CHART5_REQUEST:
        return {
          ...state,
          success: false,
          loading: action.loading,
        };
      case CHART5_SUCCESS:
        return {
          ...state,
          success: true,
          loading: action.loading,
          chart5Data: action.payload,
          error: "",
        };
      case CHART5_FAILURE:
        return {
          ...state,
          success: false,
          loading: action.loading,
          chart5Data: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default chart5Reducer;
  
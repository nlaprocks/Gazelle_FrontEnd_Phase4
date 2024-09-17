import {
    CHART9_REQUEST,
    CHART9_SUCCESS,
    CHART9_FAILURE,
  } from "./chart9Type";
  
  const initialState = {
    success: false,
    loading: false,
    chart9Data: [],
    error: "",
  };
  
  const chart9Reducer = (state = initialState, action) => {
    switch (action.type) {
      case CHART9_REQUEST:
        return {
          ...state,
          success: false,
          loading: action.loading,
        };
      case CHART9_SUCCESS:
        return {
          ...state,
          success: true,
          loading: action.loading,
          chart9Data: action.payload,
          error: "",
        };
      case CHART9_FAILURE:
        return {
          ...state,
          success: false,
          loading: action.loading,
          chart9Data: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default chart9Reducer;
  
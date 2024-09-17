import {
    CHART8_REQUEST,
    CHART8_SUCCESS,
    CHART8_FAILURE,
  } from "./chart8Type";
  
  const initialState = {
    success: false,
    loading: false,
    chart8Data: [],
    error: "",
  };
  
  const chart8Reducer = (state = initialState, action) => {
    switch (action.type) {
      case CHART8_REQUEST:
        return {
          ...state,
          success: false,
          loading: action.loading,
        };
      case CHART8_SUCCESS:
        return {
          ...state,
          success: true,
          loading: action.loading,
          chart8Data: action.payload,
          error: "",
        };
      case CHART8_FAILURE:
        return {
          ...state,
          success: false,
          loading: action.loading,
          chart8Data: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default chart8Reducer;
  
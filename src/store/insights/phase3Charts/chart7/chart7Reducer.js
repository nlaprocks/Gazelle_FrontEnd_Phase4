import {
    CHART7_REQUEST,
    CHART7_SUCCESS,
    CHART7_FAILURE,
  } from "./chart7Type";
  
  const initialState = {
    success: false,
    loading: false,
    chart7Data: [],
    error: "",
  };
  
  const chart7Reducer = (state = initialState, action) => {
    switch (action.type) {
      case CHART7_REQUEST:
        return {
          ...state,
          success: false,
          loading: action.loading,
        };
      case CHART7_SUCCESS:
        return {
          ...state,
          success: true,
          loading: action.loading,
          chart7Data: action.payload,
          error: "",
        };
      case CHART7_FAILURE:
        return {
          ...state,
          success: false,
          loading: action.loading,
          chart7Data: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default chart7Reducer;
  
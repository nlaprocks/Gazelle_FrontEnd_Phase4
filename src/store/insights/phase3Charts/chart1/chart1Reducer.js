import { CHART1_REQUEST, CHART1_SUCCESS, CHART1_FAILURE } from "./chart1Type";

const initialState = {
  success: false,
  loading: false,
  chart1Data: [],
  error: "",
};

const chart1Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHART1_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case CHART1_SUCCESS:
      return {
        ...state,
        success: true,
        loading: action.loading,
        chart1Data: action.payload,
        error: "",
      };
    case CHART1_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        chart1Data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default chart1Reducer;

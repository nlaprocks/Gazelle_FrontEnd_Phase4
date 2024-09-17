import { CHART2_REQUEST, CHART2_SUCCESS, CHART2_FAILURE } from "./chart2Type";

const initialState = {
  success: false,
  loading: false,
  chart2Data: [],
  error: "",
};

const chart2Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHART2_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case CHART2_SUCCESS:
      return {
        ...state,
        success: true,
        loading: action.loading,
        chart2Data: action.payload,
        error: "",
      };
    case CHART2_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        chart2Data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default chart2Reducer;

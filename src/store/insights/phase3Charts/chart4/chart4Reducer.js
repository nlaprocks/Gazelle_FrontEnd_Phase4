import { CHART4_REQUEST, CHART4_SUCCESS, CHART4_FAILURE } from "./chart4Type";

const initialState = {
  success: false,
  loading: false,
  chart4Data: [],
  error: "",
};

const chart4Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHART4_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case CHART4_SUCCESS:
      return {
        ...state,
        success: true,
        loading: action.loading,
        chart4Data: action.payload,
        error: "",
      };
    case CHART4_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        chart4Data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default chart4Reducer;

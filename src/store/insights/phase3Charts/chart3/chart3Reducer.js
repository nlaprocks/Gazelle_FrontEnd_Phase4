import { CHART3_REQUEST, CHART3_SUCCESS, CHART3_FAILURE } from "./chart3Type";

const initialState = {
  success: false,
  loading: false,
  chart3Data: [],
  error: "",
};

const chart3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHART3_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case CHART3_SUCCESS:
      return {
        ...state,
        success: true,
        loading: action.loading,
        chart3Data: action.payload,
        error: "",
      };
    case CHART3_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        chart3Data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default chart3Reducer;

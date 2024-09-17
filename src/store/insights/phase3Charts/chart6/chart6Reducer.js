import { CHART6_REQUEST, CHART6_SUCCESS, CHART6_FAILURE } from "./chart6Type";

const initialState = {
  success: false,
  loading: false,
  chart6Data: [],
  error: "",
};

const chart6Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHART6_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case CHART6_SUCCESS:
      return {
        ...state,
        success: true,
        loading: action.loading,
        chart6Data: action.payload,
        error: "",
      };
    case CHART6_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        chart6Data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default chart6Reducer;

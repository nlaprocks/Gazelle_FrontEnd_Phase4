import {
  GET_CHART_DATA_REQUEST,
  GET_CHART_DATA_SUCCESS,
  GET_CHART_DATA_FAILURE,
} from "./getChartDataType";
const initialState = {
  success: false,
  loading: false,
  chartData: [],
  error: "",
};
const getChartDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHART_DATA_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_CHART_DATA_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        chartData: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_CHART_DATA_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        chartData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getChartDataReducer;

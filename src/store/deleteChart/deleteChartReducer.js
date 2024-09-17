import {
  DELETE_CHART_REQUEST,
  DELETE_CHART_SUCCESS,
  DELETE_CHART_FAILURE,
} from "./deleteChartType";
const chartState = {
  success: false,
  loading: false,
  chart: [],
  error: "",
};
const deleteChartReducer = (state = chartState, action) => {
  switch (action.type) {
    case DELETE_CHART_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case DELETE_CHART_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        chart: action.payload,
        error: "",
      };
      return setSignUpState;
    case DELETE_CHART_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        chart: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default deleteChartReducer;

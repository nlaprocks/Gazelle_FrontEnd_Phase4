import {
  COPY_CHART_REQUEST,
  COPY_CHART_SUCCESS,
  COPY_CHART_FAILURE,
} from "./copyChartType";
const chartState = {
  success: false,
  loading: false,
  chart: [],
  error: "",
};
const copyChartReducer = (state = chartState, action) => {
  switch (action.type) {
    case COPY_CHART_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case COPY_CHART_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        chart: action.payload,
        error: "",
      };
      return setSignUpState;
    case COPY_CHART_FAILURE:
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
export default copyChartReducer;

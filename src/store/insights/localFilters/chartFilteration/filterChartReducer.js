import { FILTER_CHART_REQUEST, FILTER_CHART_SUCCESS, FILTER_CHART_FAILURE } from "./filterChartType";

const initialState = {
  loading: false,
  chartData: [],
  error: "",
  success: false,
  role: "",
};

const filterChartReducer = (state = initialState, action) => {
  // console.log("action::: ", action);
  switch (action.type) {
    case FILTER_CHART_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case FILTER_CHART_SUCCESS:
      return {
        ...state,
        loading: false,
        chartData: action.payload.data,
        error: "",
        success: true,
        role: action.payload.role,
      };
    case FILTER_CHART_FAILURE:
      return {
        ...state,
        loading: false,
        chartData: [],
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default filterChartReducer;

import {
  ADD_CHART_REQUEST,
  ADD_CHART_SUCCESS,
  ADD_CHART_FAILURE,
} from "./addChartType";

const chartState = {
  success: false,
  loading: false,
  chart: [],
  error: "",
};

const addChartReducer = (state = chartState, action) => {
  switch (action.type) {
    case ADD_CHART_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_CHART_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        chart: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_CHART_FAILURE:
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
export default addChartReducer;

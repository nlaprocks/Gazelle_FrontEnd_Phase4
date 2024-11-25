import {
  UPDATE_CHART_NAME_REQUEST,
  UPDATE_CHART_NAME_SUCCESS,
  UPDATE_CHART_NAME_FAILURE,
} from "./updateChartNameType";
const investmentState = {
  success: false,
  loading: false,
  chartName: [],
  error: "",
};
const updateChartNameReducer = (state = investmentState, action) => {
  switch (action.type) {
    case UPDATE_CHART_NAME_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case UPDATE_CHART_NAME_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        chartName: action.payload,
        error: "",
      };
      return setSignUpState;
    case UPDATE_CHART_NAME_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        chartName: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default updateChartNameReducer;

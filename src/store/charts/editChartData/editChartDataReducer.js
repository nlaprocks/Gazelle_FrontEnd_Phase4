import {
  EDIT_CHART_DATA_REQUEST,
  EDIT_CHART_DATA_SUCCESS,
  EDIT_CHART_DATA_FAILURE,
} from "./editChartDataType";
const initialState = {
  success: false,
  loading: false,
  chartData: [],
  error: "",
};
const editChartDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_CHART_DATA_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case EDIT_CHART_DATA_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        chartData: action.payload,
        error: "",
      };
      return setSignUpState;
    case EDIT_CHART_DATA_FAILURE:
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
export default editChartDataReducer;

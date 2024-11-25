import {
  FILTER_USERS_CHART_REQUEST,
  FILTER_USERS_CHART_SUCCESS,
  FILTER_USERS_CHART_FAILURE,
} from "./filterUsersChartType";
const initialState = {
  success: false,
  loading: false,
  filterChart: [],
  error: "",
};
const filterUsersChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_USERS_CHART_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case FILTER_USERS_CHART_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        filterChart: action.payload,
        error: "",
      };
      return setSignUpState;
    case FILTER_USERS_CHART_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        filterChart: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default filterUsersChartReducer;

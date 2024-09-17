import {
  USERS_CHARTS_REQUEST,
  USERS_CHARTS_SUCCESS,
  USERS_CHARTS_FAILURE,
} from "./usersChartsType";
const initialState = {
  success: false,
  loading: false,
  chartData: [],
  error: "",
};
const usersChartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_CHARTS_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case USERS_CHARTS_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        chartData: action.payload,
        error: "",
      };
      return setSignUpState;
    case USERS_CHARTS_FAILURE:
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
export default usersChartsReducer;

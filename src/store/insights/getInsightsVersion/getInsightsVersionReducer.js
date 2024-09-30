import {
  GET_INSIGHTS_VERSION_REQUEST,
  GET_INSIGHTS_VERSION_SUCCESS,
  GET_INSIGHTS_VERSION_FAILURE,
} from "./getInsightsVersionType";

const initialState = {
  success: false,
  loading: false,
  insightsVersion: [],
  error: "",
};

const getInsightsVersionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INSIGHTS_VERSION_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_INSIGHTS_VERSION_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        insightsVersion: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_INSIGHTS_VERSION_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        insightsVersion: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getInsightsVersionReducer;

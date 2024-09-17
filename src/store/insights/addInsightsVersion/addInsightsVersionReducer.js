import {
  ADD_INSIGHTS_VERSION_REQUEST,
  ADD_INSIGHTS_VERSION_SUCCESS,
  ADD_INSIGHTS_VERSION_FAILURE,
} from "./addInsightsVersionType";
const initialState = {
  success: false,
  loading: false,
  addInsightsVersion: [],
  error: "",
};
const addInsightsVersionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INSIGHTS_VERSION_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_INSIGHTS_VERSION_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        addInsightsVersion: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_INSIGHTS_VERSION_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        addInsightsVersion: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default addInsightsVersionReducer;

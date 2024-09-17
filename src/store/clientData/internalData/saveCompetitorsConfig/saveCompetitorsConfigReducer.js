import {
  SAVE_COMPETITORS_CONFIG_REQUEST,
  SAVE_COMPETITORS_CONFIG_SUCCESS,
  SAVE_COMPETITORS_CONFIG_FAILURE,
} from "./saveCompetitorsConfigType";
const IState = {
  success: false,
  loading: false,
  competitorsConfig: [],
  error: "",
};
const saveCompetitorsConfigReducer = (state = IState, action) => {
  switch (action.type) {
    case SAVE_COMPETITORS_CONFIG_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case SAVE_COMPETITORS_CONFIG_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        competitorsConfig: action.payload,
        error: "",
      };
      return setSignUpState;
    case SAVE_COMPETITORS_CONFIG_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        competitorsConfig: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default saveCompetitorsConfigReducer;

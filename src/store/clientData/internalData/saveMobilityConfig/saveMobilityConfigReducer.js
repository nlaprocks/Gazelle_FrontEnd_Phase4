import {
  SAVE_MOBILITY_CONFIG_REQUEST,
  SAVE_MOBILITY_CONFIG_SUCCESS,
  SAVE_MOBILITY_CONFIG_FAILURE,
} from "./saveMobilityConfigType";
const IState = {
  success: false,
  loading: false,
  mobilityConfig: [],
  error: "",
};
const saveMobilityConfigReducer = (state = IState, action) => {
  switch (action.type) {
    case SAVE_MOBILITY_CONFIG_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case SAVE_MOBILITY_CONFIG_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        mobilityConfig: action.payload,
        error: "",
      };
      return setSignUpState;
    case SAVE_MOBILITY_CONFIG_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        mobilityConfig: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default saveMobilityConfigReducer;

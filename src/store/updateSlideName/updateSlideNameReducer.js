import {
  UPDATE_SLIDE_NAME_REQUEST,
  UPDATE_SLIDE_NAME_SUCCESS,
  UPDATE_SLIDE_NAME_FAILURE,
} from "./updateSlideNameType";
const slideState = {
  success: false,
  loading: false,
  slideName: [],
  error: "",
};
const updateSlideNameReducer = (state = slideState, action) => {
  switch (action.type) {
    case UPDATE_SLIDE_NAME_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case UPDATE_SLIDE_NAME_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        slideName: action.payload,
        error: "",
      };
      return setSignUpState;
    case UPDATE_SLIDE_NAME_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        slideName: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default updateSlideNameReducer;

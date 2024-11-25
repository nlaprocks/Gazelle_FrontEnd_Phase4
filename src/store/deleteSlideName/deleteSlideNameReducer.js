import {
  DELETE_SLIDE_NAME_REQUEST,
  DELETE_SLIDE_NAME_SUCCESS,
  DELETE_SLIDE_NAME_FAILURE,
} from "./deleteSlideNameType";
const slideState = {
  success: false,
  loading: false,
  slideName: [],
  error: "",
};
const deleteSlideNameReducer = (state = slideState, action) => {
  switch (action.type) {
    case DELETE_SLIDE_NAME_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case DELETE_SLIDE_NAME_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        slideName: action.payload,
        error: "",
      };
      return setSignUpState;
    case DELETE_SLIDE_NAME_FAILURE:
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
export default deleteSlideNameReducer;

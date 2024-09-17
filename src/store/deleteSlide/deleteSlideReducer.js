import {
  DELETE_SLIDE_REQUEST,
  DELETE_SLIDE_SUCCESS,
  DELETE_SLIDE_FAILURE,
} from "./deleteSlideType";
const slideState = {
  success: false,
  loading: false,
  slideName: [],
  error: "",
};
const deleteSlideReducer = (state = slideState, action) => {
  switch (action.type) {
    case DELETE_SLIDE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case DELETE_SLIDE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        slideName: action.payload,
        error: "",
      };
      return setSignUpState;
    case DELETE_SLIDE_FAILURE:
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
export default deleteSlideReducer;

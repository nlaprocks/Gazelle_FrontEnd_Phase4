import {
  ADD_SLIDE_NAME_REQUEST,
  ADD_SLIDE_NAME_SUCCESS,
  ADD_SLIDE_NAME_FAILURE,
} from "./addSlideNameType";
const slideState = {
  success: false,
  loading: false,
  slideName: [],
  error: "",
};
const addSlideNameReducer = (state = slideState, action) => {
  switch (action.type) {
    case ADD_SLIDE_NAME_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_SLIDE_NAME_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        slideName: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_SLIDE_NAME_FAILURE:
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
export default addSlideNameReducer;

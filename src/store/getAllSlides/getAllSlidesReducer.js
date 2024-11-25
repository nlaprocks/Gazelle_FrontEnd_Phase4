import {
  GET_SLIDE_REQUEST,
  GET_SLIDE_SUCCESS,
  GET_SLIDE_FAILURE,
} from "./getAllSlidesType";
const investmentState = {
  success: false,
  loading: false,
  slide: [],
  error: "",
};
const getAllSlideReducer = (state = investmentState, action) => {
  switch (action.type) {
    case GET_SLIDE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_SLIDE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        slide: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_SLIDE_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        slide: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getAllSlideReducer;

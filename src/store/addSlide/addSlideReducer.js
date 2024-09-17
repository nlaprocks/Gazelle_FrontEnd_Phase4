import {
  ADD_SLIDE_REQUEST,
  ADD_SLIDE_SUCCESS,
  ADD_SLIDE_FAILURE,
} from "./addSlideType";
const investmentState = {
  success: false,
  loading: false,
  slide: [],
  error: "",
};
const addSlideReducer = (state = investmentState, action) => {
  switch (action.type) {
    case ADD_SLIDE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_SLIDE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        slide: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_SLIDE_FAILURE:
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
export default addSlideReducer;

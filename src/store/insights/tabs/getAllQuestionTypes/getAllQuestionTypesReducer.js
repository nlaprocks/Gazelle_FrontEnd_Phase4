import {
  GET_ALL_QUESTION_TYPES_REQUEST,
  GET_ALL_QUESTION_TYPES_SUCCESS,
  GET_ALL_QUESTION_TYPES_FAILURE,
} from "./getAllQuestionTypesType";
const initialState = {
  success: false,
  loading: false,
  allQuestion: [],
  error: "",
};
const getAllQuestionTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_QUESTION_TYPES_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_ALL_QUESTION_TYPES_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        allQuestion: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_ALL_QUESTION_TYPES_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        allQuestion: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getAllQuestionTypesReducer;

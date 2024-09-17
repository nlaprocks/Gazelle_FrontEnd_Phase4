import {
  ADD_ADMIN_QUESTION_REQUEST,
  ADD_ADMIN_QUESTION_SUCCESS,
  ADD_ADMIN_QUESTION_FAILURE,
} from "./addAdminQuestionType";
const questionInitialState = {
  success: false,
  loading: false,
  question: [],
  error: "",
};
const addAdminQuestionReducer = (state = questionInitialState, action) => {
  switch (action.type) {
    case ADD_ADMIN_QUESTION_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_ADMIN_QUESTION_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        question: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_ADMIN_QUESTION_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        question: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default addAdminQuestionReducer;

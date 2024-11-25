import {
  DELETE_ADMIN_QUESTION_REQUEST,
  DELETE_ADMIN_QUESTION_SUCCESS,
  DELETE_ADMIN_QUESTION_FAILURE,
} from "./deleteAdminQuestionType";
const questionInitialState = {
  success: false,
  loading: false,
  question: [],
  error: "",
};
const deleteAdminQuestionReducer = (state = questionInitialState, action) => {
  switch (action.type) {
    case DELETE_ADMIN_QUESTION_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case DELETE_ADMIN_QUESTION_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        question: action.payload,
        error: "",
      };
      return setSignUpState;
    case DELETE_ADMIN_QUESTION_FAILURE:
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
export default deleteAdminQuestionReducer;

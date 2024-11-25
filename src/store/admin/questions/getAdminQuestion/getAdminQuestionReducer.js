import {
  GET_ADMIN_QUESTION_REQUEST,
  GET_ADMIN_QUESTION_SUCCESS,
  GET_ADMIN_QUESTION_FAILURE,
} from "./getAdminQuestionType";
const questionInitialState = {
  success: false,
  loading: false,
  question: [],
  error: "",
};
const getAdminQuestionReducer = (state = questionInitialState, action) => {
  switch (action.type) {
    case GET_ADMIN_QUESTION_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_ADMIN_QUESTION_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        question: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_ADMIN_QUESTION_FAILURE:
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
export default getAdminQuestionReducer;

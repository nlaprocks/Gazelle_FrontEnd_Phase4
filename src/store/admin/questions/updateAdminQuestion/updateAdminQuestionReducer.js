import {
  UPDATE_ADMIN_QUESTION_REQUEST,
  UPDATE_ADMIN_QUESTION_SUCCESS,
  UPDATE_ADMIN_QUESTION_FAILURE,
} from "./updateAdminQuestionType";
const questionInitialState = {
  success: false,
  loading: false,
  question: [],
  error: "",
};
const updateAdminQuestionReducer = (state = questionInitialState, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_QUESTION_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case UPDATE_ADMIN_QUESTION_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        question: action.payload,
        error: "",
      };
      return setSignUpState;
    case UPDATE_ADMIN_QUESTION_FAILURE:
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
export default updateAdminQuestionReducer;

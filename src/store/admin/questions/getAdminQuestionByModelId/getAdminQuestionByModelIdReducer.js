import {
  GET_ADMIN_QUESTION_BY_MODELID_REQUEST,
  GET_ADMIN_QUESTION_BY_MODELID_SUCCESS,
  GET_ADMIN_QUESTION_BY_MODELID_FAILURE,
} from "./getAdminQuestionByModelIdType";
const questionInitialState = {
  success: false,
  loading: false,
  question: [],
  error: "",
};
const getAdminQuestionByModelIdReducer = (
  state = questionInitialState,
  action
) => {
  switch (action.type) {
    case GET_ADMIN_QUESTION_BY_MODELID_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_ADMIN_QUESTION_BY_MODELID_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        question: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_ADMIN_QUESTION_BY_MODELID_FAILURE:
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
export default getAdminQuestionByModelIdReducer;

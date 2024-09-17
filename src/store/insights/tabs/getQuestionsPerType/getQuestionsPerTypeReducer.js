import {
  GET_QUESTIONS_PER_TYPE_REQUEST,
  GET_QUESTIONS_PER_TYPE_SUCCESS,
  GET_QUESTIONS_PER_TYPE_FAILURE,
} from "./getQuestionsPerTypeType";
const initialState = {
  success: false,
  loading: false,
  question: [],
  error: "",
};
const getQuestionsPerTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS_PER_TYPE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_QUESTIONS_PER_TYPE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        question: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_QUESTIONS_PER_TYPE_FAILURE:
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
export default getQuestionsPerTypeReducer;

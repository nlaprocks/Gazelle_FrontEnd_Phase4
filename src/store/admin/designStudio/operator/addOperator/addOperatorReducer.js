import {
  ADD_OPERATOR_REQUEST,
  ADD_OPERATOR_SUCCESS,
  ADD_OPERATOR_FAILURE,
} from "./addOperatorType";
const initialState = {
  success: false,
  loading: false,
  operator: [],
  error: "",
};
const addOperatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_OPERATOR_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_OPERATOR_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        operator: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_OPERATOR_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        operator: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default addOperatorReducer;

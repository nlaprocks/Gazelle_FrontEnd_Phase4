import {
  DELETE_OPERATOR_REQUEST,
  DELETE_OPERATOR_SUCCESS,
  DELETE_OPERATOR_FAILURE,
} from "./deleteOperatorType";
const initialState = {
  success: false,
  loading: false,
  operator: [],
  error: "",
};
const deleteOperatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_OPERATOR_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case DELETE_OPERATOR_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        operator: action.payload,
        error: "",
      };
      return setSignUpState;
    case DELETE_OPERATOR_FAILURE:
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
export default deleteOperatorReducer;

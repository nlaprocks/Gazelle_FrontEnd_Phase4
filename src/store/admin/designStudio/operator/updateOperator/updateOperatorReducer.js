import {
  UPDATE_OPERATOR_REQUEST,
  UPDATE_OPERATOR_SUCCESS,
  UPDATE_OPERATOR_FAILURE,
} from "./updateOperatorType";
const initialState = {
  success: false,
  loading: false,
  operator: [],
  error: "",
};
const updateOperatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OPERATOR_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case UPDATE_OPERATOR_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        operator: action.payload,
        error: "",
      };
      return setSignUpState;
    case UPDATE_OPERATOR_FAILURE:
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
export default updateOperatorReducer;

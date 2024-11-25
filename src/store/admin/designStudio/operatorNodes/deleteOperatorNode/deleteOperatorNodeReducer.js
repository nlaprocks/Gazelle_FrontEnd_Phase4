import {
  DELETE_OPERATOR_NODE_REQUEST,
  DELETE_OPERATOR_NODE_SUCCESS,
  DELETE_OPERATOR_NODE_FAILURE,
} from "./deleteOperatorNodeType";
const initialState = {
  success: false,
  loading: false,
  operator: [],
  error: "",
};
const deleteOperatorNodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_OPERATOR_NODE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case DELETE_OPERATOR_NODE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        operator: action.payload,
        error: "",
      };
      return setSignUpState;
    case DELETE_OPERATOR_NODE_FAILURE:
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
export default deleteOperatorNodeReducer;

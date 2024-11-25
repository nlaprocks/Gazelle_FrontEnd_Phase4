import {
  UPDATE_OPERATOR_NODE_REQUEST,
  UPDATE_OPERATOR_NODE_SUCCESS,
  UPDATE_OPERATOR_NODE_FAILURE,
} from "./updateOperatorNodeType";
const initialState = {
  success: false,
  loading: false,
  operator: [],
  error: "",
};
const updateOperatorNodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OPERATOR_NODE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case UPDATE_OPERATOR_NODE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        operator: action.payload,
        error: "",
      };
      return setSignUpState;
    case UPDATE_OPERATOR_NODE_FAILURE:
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
export default updateOperatorNodeReducer;

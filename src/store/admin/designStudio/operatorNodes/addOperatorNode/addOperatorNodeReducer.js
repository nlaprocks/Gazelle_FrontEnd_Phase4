import {
  ADD_OPERATOR_NODE_REQUEST,
  ADD_OPERATOR_NODE_SUCCESS,
  ADD_OPERATOR_NODE_FAILURE,
} from "./addOperatorNodeType";
const initialState = {
  success: false,
  loading: false,
  operator: [],
  error: "",
};
const addOperatorNodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_OPERATOR_NODE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_OPERATOR_NODE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        operator: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_OPERATOR_NODE_FAILURE:
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
export default addOperatorNodeReducer;

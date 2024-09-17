import {
  GET_ALL_OPERATORS_WITH_NODES_REQUEST,
  GET_ALL_OPERATORS_WITH_NODES_SUCCESS,
  GET_ALL_OPERATORS_WITH_NODES_FAILURE,
} from "./getAllOperatorsWithNodesType";
const initialState = {
  success: false,
  loading: false,
  operators: [],
  error: "",
};
const getAllOperatorsWithNodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_OPERATORS_WITH_NODES_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_ALL_OPERATORS_WITH_NODES_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        operators: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_ALL_OPERATORS_WITH_NODES_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        operators: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getAllOperatorsWithNodesReducer;

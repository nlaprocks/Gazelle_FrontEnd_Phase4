import {
  GET_ALL_OPERATORS_REQUEST,
  GET_ALL_OPERATORS_SUCCESS,
  GET_ALL_OPERATORS_FAILURE,
} from "./getAllOperatorsType";
const initialState = {
  success: false,
  loading: false,
  operators: [],
  error: "",
};
const getAllOperatorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_OPERATORS_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_ALL_OPERATORS_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        operators: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_ALL_OPERATORS_FAILURE:
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
export default getAllOperatorsReducer;

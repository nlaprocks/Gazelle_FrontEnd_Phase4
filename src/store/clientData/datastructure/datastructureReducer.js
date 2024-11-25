import {
  DATASTRUCTURE_REQUEST,
  DATASTRUCTURE_SUCCESS,
  DATASTRUCTURE_FAILURE,
} from "./datastructureType";
const IState = {
  success: false,
  loading: false,
  structure: [],
  error: "",
};
const datastructureReducer = (state = IState, action) => {
  switch (action.type) {
    case DATASTRUCTURE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case DATASTRUCTURE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        structure: action.payload,
        error: "",
      };
      return setSignUpState;
    case DATASTRUCTURE_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        structure: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default datastructureReducer;

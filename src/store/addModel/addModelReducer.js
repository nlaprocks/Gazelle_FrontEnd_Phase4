import {
  NODE_RESULTS_REQUEST,
  NODE_RESULTS_SUCCESS,
  NODE_RESULTS_FAILURE,
} from "./addModelType";
const IState = {
  success: false,
  loading: false,
  user: [],
  error: "",
};
const addModelReducer = (state = IState, action) => {
  switch (action.type) {
    case NODE_RESULTS_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case NODE_RESULTS_SUCCESS:
      const newAuthState = {
        ...state,
        success: true,
        loading: action.loading,
        user: action.payload,
        error: "",
      };
      return newAuthState;
    case NODE_RESULTS_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        user: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default addModelReducer;

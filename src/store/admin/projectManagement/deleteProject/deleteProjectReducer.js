import {
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
} from "./deleteProjectType";
const projectState = {
  success: false,
  loading: false,
  project: [],
  error: "",
};
const deleteProjectReducer = (state = projectState, action) => {
  switch (action.type) {
    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case DELETE_PROJECT_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        project: action.payload,
        error: "",
      };
      return setSignUpState;
    case DELETE_PROJECT_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        project: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default deleteProjectReducer;

import {
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
} from "./updateProjectType";
const projectState = {
  success: false,
  loading: false,
  project: [],
  error: "",
};
const updateProjectReducer = (state = projectState, action) => {
  switch (action.type) {
    case UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case UPDATE_PROJECT_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        project: action.payload,
        error: "",
      };
      return setSignUpState;
    case UPDATE_PROJECT_FAILURE:
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
export default updateProjectReducer;

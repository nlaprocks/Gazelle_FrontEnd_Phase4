import {
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILURE,
} from "./addProjectType";
const projectState = {
  success: false,
  loading: false,
  project: [],
  error: "",
};
const addProjectReducer = (state = projectState, action) => {
  switch (action.type) {
    case ADD_PROJECT_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_PROJECT_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        project: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_PROJECT_FAILURE:
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
export default addProjectReducer;

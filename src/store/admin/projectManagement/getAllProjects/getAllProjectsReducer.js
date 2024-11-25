import {
  GET_ALL_PROJECTS_REQUEST,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_FAILURE,
} from "./getAllProjectsType";
const projectState = {
  success: false,
  loading: false,
  projects: [],
  error: "",
};
const getAllProjectsReducer = (state = projectState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECTS_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_ALL_PROJECTS_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        projects: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_ALL_PROJECTS_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        projects: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getAllProjectsReducer;

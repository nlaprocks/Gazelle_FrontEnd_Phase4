import {
  DATABASE_REQUIREMENTS_REQUEST,
  DATABASE_REQUIREMENTS_SUCCESS,
  DATABASE_REQUIREMENTS_FAILURE,
} from "./databaseRequirementsType";
const IState = {
  success: false,
  loading: false,
  requirements: [],
  error: "",
};
const databaseRequirementsReducer = (state = IState, action) => {
  switch (action.type) {
    case DATABASE_REQUIREMENTS_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case DATABASE_REQUIREMENTS_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        requirements: action.payload,
        error: "",
      };
      return setSignUpState;
    case DATABASE_REQUIREMENTS_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        requirements: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default databaseRequirementsReducer;

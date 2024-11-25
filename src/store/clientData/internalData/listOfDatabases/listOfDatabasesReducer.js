import {
  LIST_OF_DATABASES_REQUEST,
  LIST_OF_DATABASES_SUCCESS,
  LIST_OF_DATABASES_FAILURE,
} from "./listOfDatabasesType";
const IState = {
  success: false,
  loading: false,
  databases: [],
  error: "",
};
const listOfDatabasesReducer = (state = IState, action) => {
  switch (action.type) {
    case LIST_OF_DATABASES_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case LIST_OF_DATABASES_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        databases: action.payload,
        error: "",
      };
      return setSignUpState;
    case LIST_OF_DATABASES_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        databases: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default listOfDatabasesReducer;

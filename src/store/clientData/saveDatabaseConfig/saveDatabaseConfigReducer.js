import {
  SAVE_DATABASE_CONFIG_REQUEST,
  SAVE_DATABASE_CONFIG_SUCCESS,
  SAVE_DATABASE_CONFIG_FAILURE,
} from "./saveDatabaseConfigType";
const IState = {
  success: false,
  loading: false,
  dbConfig: [],
  error: "",
};
const saveDatabaseConfigReducer = (state = IState, action) => {
  switch (action.type) {
    case SAVE_DATABASE_CONFIG_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case SAVE_DATABASE_CONFIG_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        dbConfig: action.payload,
        error: "",
      };
      return setSignUpState;
    case SAVE_DATABASE_CONFIG_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        dbConfig: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default saveDatabaseConfigReducer;

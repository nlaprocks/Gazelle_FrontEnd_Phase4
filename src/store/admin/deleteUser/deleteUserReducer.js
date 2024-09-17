import {
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "./deleteUserType";
const usersState = {
  success: false,
  loading: false,
  user: [],
  error: "",
};
const deleteUserReducer = (state = usersState, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case DELETE_USER_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        user: action.payload,
        error: "",
      };
      return setSignUpState;
    case DELETE_USER_FAILURE:
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
export default deleteUserReducer;

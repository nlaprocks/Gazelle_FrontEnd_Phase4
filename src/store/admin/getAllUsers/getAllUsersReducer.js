import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
} from "./getAllUsersType";
const usersState = {
  success: false,
  loading: false,
  users: [],
  error: "",
};
const getAllUsersReducer = (state = usersState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_ALL_USERS_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        users: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getAllUsersReducer;

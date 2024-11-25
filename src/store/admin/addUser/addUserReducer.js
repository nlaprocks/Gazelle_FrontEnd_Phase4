import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from "./addUserType";
const usersState = {
  success: false,
  loading: false,
  user: [],
  error: "",
};
const addUserReducer = (state = usersState, action) => {
  switch (action.type) {
    case ADD_USER_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_USER_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        user: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_USER_FAILURE:
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
export default addUserReducer;

import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "./updateUserType";
const usersState = {
  success: false,
  loading: false,
  user: [],
  error: "",
};
const updateUserReducer = (state = usersState, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case UPDATE_USER_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        user: action.payload,
        error: "",
      };
      return setSignUpState;
    case UPDATE_USER_FAILURE:
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
export default updateUserReducer;

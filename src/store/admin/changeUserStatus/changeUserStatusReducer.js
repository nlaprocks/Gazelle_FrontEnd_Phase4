import {
  CHANGE_USER_STATUS_REQUEST,
  CHANGE_USER_STATUS_SUCCESS,
  CHANGE_USER_STATUS_FAILURE,
} from "./changeUserStatusType";
const userStatusState = {
  success: false,
  loading: false,
  status: [],
  error: "",
};
const changeUserStatusReducer = (state = userStatusState, action) => {
  switch (action.type) {
    case CHANGE_USER_STATUS_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case CHANGE_USER_STATUS_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        status: action.payload,
        error: "",
      };
      return setSignUpState;
    case CHANGE_USER_STATUS_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        status: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default changeUserStatusReducer;

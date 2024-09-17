import {
  FILTER_USER_REQUEST,
  FILTER_USER_SUCCESS,
  FILTER_USER_FAILURE,
} from "./filterUserType";
const usersState = {
  success: false,
  loading: false,
  user: [],
  error: "",
};
const updateUserReducer = (state = usersState, action) => {
  switch (action.type) {
    case FILTER_USER_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case FILTER_USER_SUCCESS:
      const setState = {
        ...state,
        success: true,
        loading: action.loading,
        user: action.payload,
        error: "",
      };
      return setState;
    case FILTER_USER_FAILURE:
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

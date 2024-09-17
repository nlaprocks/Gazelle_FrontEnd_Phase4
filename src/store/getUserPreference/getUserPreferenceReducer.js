import {
  GET_USERS_PREFERENCE_REQUEST,
  GET_USERS_PREFERENCE_SUCCESS,
  GET_USERS_PREFERENCE_FAILURE,
} from "./getUserPreferenceType";
const usersState = {
  success: false,
  loading: false,
  preference: [],
  error: "",
};
const getUserPreferenceReducer = (state = usersState, action) => {
  switch (action.type) {
    case GET_USERS_PREFERENCE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_USERS_PREFERENCE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        preference: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_USERS_PREFERENCE_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        preference: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getUserPreferenceReducer;

import {
  ADD_USERS_PREFERENCE_REQUEST,
  ADD_USERS_PREFERENCE_SUCCESS,
  ADD_USERS_PREFERENCE_FAILURE,
} from "./addUserPreferenceType";
const usersState = {
  success: false,
  loading: false,
  preference: [],
  error: "",
};
const addUsersPreferenceReducer = (state = usersState, action) => {
  switch (action.type) {
    case ADD_USERS_PREFERENCE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_USERS_PREFERENCE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        preference: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_USERS_PREFERENCE_FAILURE:
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
export default addUsersPreferenceReducer;

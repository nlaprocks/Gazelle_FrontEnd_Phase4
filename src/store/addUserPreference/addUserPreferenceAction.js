import axios from "axios";
import {
  ADD_USERS_PREFERENCE_REQUEST,
  ADD_USERS_PREFERENCE_SUCCESS,
  ADD_USERS_PREFERENCE_FAILURE,
} from "./addUserPreferenceType";

const addUsersPreferenceRequest = (data) => {
  return {
    type: ADD_USERS_PREFERENCE_REQUEST,
    loading: true,
  };
};
const addUsersPreferenceSuccess = (state) => {
  return {
    type: ADD_USERS_PREFERENCE_SUCCESS,
    payload: state,
    loading: false,
  };
};
const addUsersPreferenceFailure = (error) => {
  return {
    type: ADD_USERS_PREFERENCE_FAILURE,
    payload: error,
    loading: false,
  };
};
const addUsersPreference = (user) => {
  console.log("User", user);
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(addUsersPreferenceRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/user/add-user-preferences`;
      var res = await axios.post(api, user);
      const { data } = res;
      loading = false;
      dispatch(addUsersPreferenceSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addUsersPreferenceFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addUsersPreferenceRequest,
  addUsersPreferenceSuccess,
  addUsersPreferenceFailure,
  addUsersPreference,
};

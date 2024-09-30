import axios from "axios";
import {
  GET_USERS_PREFERENCE_REQUEST,
  GET_USERS_PREFERENCE_SUCCESS,
  GET_USERS_PREFERENCE_FAILURE,
} from "./getUserPreferenceType";

const getUserPreferenceRequest = (data) => {
  return {
    type: GET_USERS_PREFERENCE_REQUEST,
    loading: true,
  };
};
const getUserPreferenceSuccess = (state) => {
  return {
    type: GET_USERS_PREFERENCE_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getUserPreferenceFailure = (error) => {
  return {
    type: GET_USERS_PREFERENCE_FAILURE,
    payload: error,
    loading: false,
  };
};
const getUserPreference = (userId) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(getUserPreferenceRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/user/get-user-preferences`;
      var res = await axios.post(api, { user_id: userId });
      const { data } = res;
      loading = false;
      dispatch(getUserPreferenceSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getUserPreferenceFailure(msg));
      console.log(msg);
    }
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUserPreferenceRequest,
  getUserPreferenceSuccess,
  getUserPreferenceFailure,
  getUserPreference,
};

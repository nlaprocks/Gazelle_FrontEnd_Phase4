import axios from "axios";
import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "./updateUserType";

const updateUserRequest = (data) => {
  return {
    type: UPDATE_USER_REQUEST,
    loading: true,
  };
};
const updateUserSuccess = (state) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: state,
    loading: false,
  };
};
const updateUserFailure = (error) => {
  return {
    type: UPDATE_USER_FAILURE,
    payload: error,
    loading: false,
  };
};
const updateUser = (details) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(updateUserRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/update-user`;
      var res = await axios.put(api, details);
      const { data } = res;
      loading = false;
      dispatch(updateUserSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(updateUserFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  updateUser,
};

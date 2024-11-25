import axios from "axios";
import {
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "./deleteUserType";

const deleteUserRequest = (data) => {
  return {
    type: DELETE_USER_REQUEST,
    loading: true,
  };
};
const deleteUserSuccess = (state) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: state,
    loading: false,
  };
};
const deleteUserFailure = (error) => {
  return {
    type: DELETE_USER_FAILURE,
    payload: error,
    loading: false,
  };
};
const deleteUser = (email) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(deleteUserRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/delete-user`;
      var res = await axios.post(api, email);
      const { data } = res;
      loading = false;
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(deleteUserFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  deleteUser,
};

import axios from "axios";
import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from "./addUserType";

const addUserRequest = (data) => {
  return {
    type: ADD_USER_REQUEST,
    loading: true,
  };
};
const addUserSuccess = (state) => {
  return {
    type: ADD_USER_SUCCESS,
    payload: state,
    loading: false,
  };
};
const addUserFailure = (error) => {
  return {
    type: ADD_USER_FAILURE,
    payload: error,
    loading: false,
  };
};
const addUser = (details) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(addUserRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/add-user`;
      var res = await axios.post(api, details);
      const { data } = res;
      loading = false;
      dispatch(addUserSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addUserFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  addUser,
};

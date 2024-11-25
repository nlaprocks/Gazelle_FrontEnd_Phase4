import axios from "axios";
import {
  FILTER_USER_REQUEST,
  FILTER_USER_SUCCESS,
  FILTER_USER_FAILURE,
} from "./filterUserType";

const filterUserRequest = (data) => {
  return {
    type: FILTER_USER_REQUEST,
    loading: true,
  };
};
const filterUserSuccess = (state) => {
  return {
    type: FILTER_USER_SUCCESS,
    payload: state,
    loading: false,
  };
};
const filterUserFailure = (error) => {
  return {
    type: FILTER_USER_FAILURE,
    payload: error,
    loading: false,
  };
};
const filterUser = (users) => {
  console.log("users", users);
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(filterUserRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/user-filters`;
      var res = await axios.post(api, users);
      const { data } = res;
      loading = false;
      dispatch(filterUserSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(filterUserFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  filterUserRequest,
  filterUserSuccess,
  filterUserFailure,
  filterUser,
};

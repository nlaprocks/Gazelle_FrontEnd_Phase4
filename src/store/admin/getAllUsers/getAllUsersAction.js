import axios from "axios";
import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
} from "./getAllUsersType";

const getAllUsersRequest = (data) => {
  return {
    type: GET_ALL_USERS_REQUEST,
    loading: true,
  };
};
const getAllUsersSuccess = (state) => {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getAllUsersFailure = (error) => {
  return {
    type: GET_ALL_USERS_FAILURE,
    payload: error,
    loading: false,
  };
};
const getAllUsers = () => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(getAllUsersRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/get-all-users`;
      var res = await axios.get(api);
      const { data } = res;
      loading = false;
      dispatch(getAllUsersSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getAllUsersFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFailure,
  getAllUsers,
};

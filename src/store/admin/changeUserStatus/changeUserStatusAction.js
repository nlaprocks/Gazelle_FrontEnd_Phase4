import axios from "axios";
import {
  CHANGE_USER_STATUS_REQUEST,
  CHANGE_USER_STATUS_SUCCESS,
  CHANGE_USER_STATUS_FAILURE,
} from "./changeUserStatusType";

const changeUserStatusRequest = (data) => {
  return {
    type: CHANGE_USER_STATUS_REQUEST,
    loading: true,
  };
};
const changeUserStatusSuccess = (state) => {
  return {
    type: CHANGE_USER_STATUS_SUCCESS,
    payload: state,
    loading: false,
  };
};
const changeUserStatusFailure = (error) => {
  return {
    type: CHANGE_USER_STATUS_FAILURE,
    payload: error,
    loading: false,
  };
};
const changeUserStatus = (status) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(changeUserStatusRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/change-user-status`;
      var res = await axios.post(api, status);
      const { data } = res;
      loading = false;
      dispatch(changeUserStatusSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(changeUserStatusFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  changeUserStatusRequest,
  changeUserStatusSuccess,
  changeUserStatusFailure,
  changeUserStatus,
};

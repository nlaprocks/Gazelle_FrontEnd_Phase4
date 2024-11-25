import axios from "axios";
import {
  GET_ALL_AUDIT_USER_REQUEST,
  GET_ALL_AUDIT_USER_SUCCESS,
  GET_ALL_AUDIT_USER_FAILURE,
} from "./getAllAuditUserType";

const getAllAuditUserRequest = () => {
  return {
    type: GET_ALL_AUDIT_USER_REQUEST,
    loading: true,
  };
};

const getAllAuditUserSuccess = (state) => {
  return {
    type: GET_ALL_AUDIT_USER_SUCCESS,
    payload: state,
    loading: false,
  };
};

const getAllAuditUserFailure = (error) => {
  return {
    type: GET_ALL_AUDIT_USER_FAILURE,
    payload: error,
    loading: false,
  };
};

const getAllAuditUser = () => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getAllAuditUserRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/audit/all-audit-users`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getAllAuditUserSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getAllAuditUserFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllAuditUserRequest,
  getAllAuditUserSuccess,
  getAllAuditUserFailure,
  getAllAuditUser,
};

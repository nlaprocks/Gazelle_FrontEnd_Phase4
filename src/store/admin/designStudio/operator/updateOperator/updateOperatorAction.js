import axios from "axios";
import { UPDATE_OPERATOR_REQUEST, UPDATE_OPERATOR_SUCCESS, UPDATE_OPERATOR_FAILURE } from "./updateOperatorType";

const updateOperatorRequest = () => {
  return {
    type: UPDATE_OPERATOR_REQUEST,
    loading: true,
  };
};
const updateOperatorSuccess = (state) => {
  return {
    type: UPDATE_OPERATOR_SUCCESS,
    payload: state,
    loading: false,
  };
};
const updateOperatorFailure = (error) => {
  return {
    type: UPDATE_OPERATOR_FAILURE,
    payload: error,
    loading: false,
  };
};
const updateOperator = (details) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(updateOperatorRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/update-operator`;
      var res = await axios.put(api, details, config);
      const { data } = res;
      loading = false;
      dispatch(updateOperatorSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(updateOperatorFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  updateOperatorRequest,
  updateOperatorSuccess,
  updateOperatorFailure,
  updateOperator,
};

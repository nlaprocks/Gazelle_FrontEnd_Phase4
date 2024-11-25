import axios from "axios";
import { DELETE_OPERATOR_REQUEST, DELETE_OPERATOR_SUCCESS, DELETE_OPERATOR_FAILURE } from "./deleteOperatorType";

const deleteOperatorRequest = () => {
  return {
    type: DELETE_OPERATOR_REQUEST,
    loading: true,
  };
};
const deleteOperatorSuccess = (state) => {
  return {
    type: DELETE_OPERATOR_SUCCESS,
    payload: state,
    loading: false,
  };
};
const deleteOperatorFailure = (error) => {
  return {
    type: DELETE_OPERATOR_FAILURE,
    payload: error,
    loading: false,
  };
};
const deleteOperator = (id) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(deleteOperatorRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/delete-operator/${id}`;
      var res = await axios.delete(api, config);
      const { data } = res;
      loading = false;
      dispatch(deleteOperatorSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(deleteOperatorFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  deleteOperatorRequest,
  deleteOperatorSuccess,
  deleteOperatorFailure,
  deleteOperator,
};

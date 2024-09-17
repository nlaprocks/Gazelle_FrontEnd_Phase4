import axios from "axios";
import { ADD_OPERATOR_REQUEST, ADD_OPERATOR_SUCCESS, ADD_OPERATOR_FAILURE } from "./addOperatorType";

const addOperatorRequest = () => {
  return {
    type: ADD_OPERATOR_REQUEST,
    loading: true,
  };
};
const addOperatorSuccess = (state) => {
  return {
    type: ADD_OPERATOR_SUCCESS,
    payload: state,
    loading: false,
  };
};
const addOperatorFailure = (error) => {
  return {
    type: ADD_OPERATOR_FAILURE,
    payload: error,
    loading: false,
  };
};
const addOperator = (details) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(addOperatorRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/add-operator`;
      var res = await axios.post(api, { operator: details }, config);
      const { data } = res;
      loading = false;
      dispatch(addOperatorSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addOperatorFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addOperatorRequest,
  addOperatorSuccess,
  addOperatorFailure,
  addOperator,
};

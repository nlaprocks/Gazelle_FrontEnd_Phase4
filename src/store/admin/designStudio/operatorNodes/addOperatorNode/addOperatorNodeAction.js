import axios from "axios";
import { ADD_OPERATOR_NODE_REQUEST, ADD_OPERATOR_NODE_SUCCESS, ADD_OPERATOR_NODE_FAILURE } from "./addOperatorNodeType";

const addOperatorNodeRequest = () => {
  return {
    type: ADD_OPERATOR_NODE_REQUEST,
    loading: true,
  };
};
const addOperatorNodeSuccess = (state) => {
  return {
    type: ADD_OPERATOR_NODE_SUCCESS,
    payload: state,
    loading: false,
  };
};
const addOperatorNodeFailure = (error) => {
  return {
    type: ADD_OPERATOR_NODE_FAILURE,
    payload: error,
    loading: false,
  };
};
const addOperatorNode = (details) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(addOperatorNodeRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/add-operator-node`;
      var res = await axios.post(api, details, config);
      const { data } = res;
      loading = false;
      dispatch(addOperatorNodeSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addOperatorNodeFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addOperatorNodeRequest,
  addOperatorNodeSuccess,
  addOperatorNodeFailure,
  addOperatorNode,
};

import axios from "axios";
import {
  DELETE_OPERATOR_NODE_REQUEST,
  DELETE_OPERATOR_NODE_SUCCESS,
  DELETE_OPERATOR_NODE_FAILURE,
} from "./deleteOperatorNodeType";

const deleteOperatorNodeRequest = () => {
  return {
    type: DELETE_OPERATOR_NODE_REQUEST,
    loading: true,
  };
};
const deleteOperatorNodeSuccess = (state) => {
  return {
    type: DELETE_OPERATOR_NODE_SUCCESS,
    payload: state,
    loading: false,
  };
};
const deleteOperatorNodeFailure = (error) => {
  return {
    type: DELETE_OPERATOR_NODE_FAILURE,
    payload: error,
    loading: false,
  };
};
const deleteOperatorNode = (details) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(deleteOperatorNodeRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/delete-operator-node/${details?.operator_node_id}`;
      var res = await axios.delete(api, config);
      const { data } = res;
      loading = false;
      dispatch(deleteOperatorNodeSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(deleteOperatorNodeFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  deleteOperatorNodeRequest,
  deleteOperatorNodeSuccess,
  deleteOperatorNodeFailure,
  deleteOperatorNode,
};

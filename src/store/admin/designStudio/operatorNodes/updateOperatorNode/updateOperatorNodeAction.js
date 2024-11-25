import axios from "axios";
import {
  UPDATE_OPERATOR_NODE_REQUEST,
  UPDATE_OPERATOR_NODE_SUCCESS,
  UPDATE_OPERATOR_NODE_FAILURE,
} from "./updateOperatorNodeType";

const updateOperatorNodeRequest = () => {
  return {
    type: UPDATE_OPERATOR_NODE_REQUEST,
    loading: true,
  };
};
const updateOperatorNodeSuccess = (state) => {
  return {
    type: UPDATE_OPERATOR_NODE_SUCCESS,
    payload: state,
    loading: false,
  };
};
const updateOperatorNodeFailure = (error) => {
  return {
    type: UPDATE_OPERATOR_NODE_FAILURE,
    payload: error,
    loading: false,
  };
};
const updateOperatorNode = (details) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(updateOperatorNodeRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/update-operator-node`;
      var res = await axios.put(api, details, config);
      const { data } = res;
      loading = false;
      dispatch(updateOperatorNodeSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(updateOperatorNodeFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  updateOperatorNodeRequest,
  updateOperatorNodeSuccess,
  updateOperatorNodeFailure,
  updateOperatorNode,
};

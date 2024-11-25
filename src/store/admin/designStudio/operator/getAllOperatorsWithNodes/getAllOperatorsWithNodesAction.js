import axios from "axios";
import {
  GET_ALL_OPERATORS_WITH_NODES_REQUEST,
  GET_ALL_OPERATORS_WITH_NODES_SUCCESS,
  GET_ALL_OPERATORS_WITH_NODES_FAILURE,
} from "./getAllOperatorsWithNodesType";

const getAllOperatorsWithNodesRequest = () => {
  return {
    type: GET_ALL_OPERATORS_WITH_NODES_REQUEST,
    loading: true,
  };
};
const getAllOperatorsWithNodesSuccess = (state) => {
  return {
    type: GET_ALL_OPERATORS_WITH_NODES_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getAllOperatorsWithNodesFailure = (error) => {
  return {
    type: GET_ALL_OPERATORS_WITH_NODES_FAILURE,
    payload: error,
    loading: false,
  };
};
const getAllOperatorsWithNodes = () => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getAllOperatorsWithNodesRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/get-all-operator-with-nodes`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getAllOperatorsWithNodesSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getAllOperatorsWithNodesFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllOperatorsWithNodesRequest,
  getAllOperatorsWithNodesSuccess,
  getAllOperatorsWithNodesFailure,
  getAllOperatorsWithNodes,
};

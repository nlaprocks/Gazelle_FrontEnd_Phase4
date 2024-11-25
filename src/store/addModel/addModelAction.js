import { NODE_RESULTS_REQUEST, NODE_RESULTS_SUCCESS, NODE_RESULTS_FAILURE } from "./addModelType";
import axios from "axios";

const addModelRequest = (data) => {
  return {
    type: NODE_RESULTS_REQUEST,
    loading: true,
  };
};
const addModelSuccess = (SignInData) => {
  return {
    type: NODE_RESULTS_SUCCESS,
    payload: SignInData,
    loading: false,
  };
};
const addModelFailure = (error) => {
  return {
    type: NODE_RESULTS_FAILURE,
    payload: error,
    loading: false,
  };
};

const nodeState = (modelData) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(addModelRequest(loading));
      const auth = JSON.parse(localStorage.getItem("auth"));
      const config = { headers: { Authorization: `Bearer ` + auth.token } };
      // let { data } = await Api("POST", "api/v1/model/add", modelData, config);
      // loading = false;
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/model/add`;
      var res = await axios.post(api, modelData, config);
      const { data } = res;
      loading = false;
      dispatch(addModelSuccess(data, loading));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addModelFailure(msg, loading));
      // console.log(msg);
    }
  };
};

export default {
  addModelRequest,
  addModelSuccess,
  addModelFailure,
  nodeState,
};

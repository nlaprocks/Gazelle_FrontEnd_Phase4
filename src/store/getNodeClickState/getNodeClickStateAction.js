import {
  GET_NODE_CLICK_STATE_REQUEST,
  GET_NODE_CLICK_STATE_SUCCESS,
  GET_NODE_CLICK_STATE_FAILURE,
} from "./getNodeClickStateType.js";
const getNodeStateRequest = () => {
  return {
    type: GET_NODE_CLICK_STATE_REQUEST,
    loading: true,
  };
};
const getNodeStateSuccess = (settingState) => {
  return {
    type: GET_NODE_CLICK_STATE_SUCCESS,
    payload: settingState,
    loading: false,
  };
};
const getNodeStateFailure = (error, loading) => {
  return {
    type: GET_NODE_CLICK_STATE_FAILURE,
    payload: error,
    loading: loading,
  };
};
const getNodeStateResponse = (state) => {
  let loading = true;
  return function (dispatch) {
    try {
      dispatch(getNodeStateRequest(loading));
      loading = false;
      console.log("getNodeStateResponse", state);
      dispatch(getNodeStateSuccess(state, loading));
    } catch (error) {
      loading = false;
      dispatch(getNodeStateFailure(error, loading));
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getNodeStateRequest,
  getNodeStateSuccess,
  getNodeStateFailure,
  getNodeStateResponse,
};

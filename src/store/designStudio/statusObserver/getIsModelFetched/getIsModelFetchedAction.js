import axios from "axios";
import {
  GET_IS_MODEL_FETCHED_REQUEST,
  GET_IS_MODEL_FETCHED_SUCCESS,
  GET_IS_MODEL_FETCHED_FAILURE,
} from "./getIsModelFetchedType";

const getIsModelFetchedRequest = (data) => {
  return {
    type: GET_IS_MODEL_FETCHED_REQUEST,
    loading: true,
  };
};
const getIsModelFetchedSuccess = (SignUpData) => {
  return {
    type: GET_IS_MODEL_FETCHED_SUCCESS,
    payload: SignUpData,
    loading: false,
  };
};
const getIsModelFetchedFailure = (error) => {
  return {
    type: GET_IS_MODEL_FETCHED_FAILURE,
    payload: error,
    loading: false,
  };
};
const getIsModelFetched = (model_id) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getIsModelFetchedRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/nla_api/model_completed_status/${model_id}`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getIsModelFetchedSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getIsModelFetchedFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getIsModelFetchedRequest,
  getIsModelFetchedSuccess,
  getIsModelFetchedFailure,
  getIsModelFetched,
};

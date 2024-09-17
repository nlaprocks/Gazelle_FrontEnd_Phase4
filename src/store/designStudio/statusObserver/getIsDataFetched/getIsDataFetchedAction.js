import axios from "axios";
import {
  GET_IS_DATA_FETCHED_REQUEST,
  GET_IS_DATA_FETCHED_SUCCESS,
  GET_IS_DATA_FETCHED_FAILURE,
} from "./getIsDataFetchedType";

const getIsDataFetchedRequest = (data) => {
  return {
    type: GET_IS_DATA_FETCHED_REQUEST,
    loading: true,
  };
};
const getIsDataFetchedSuccess = (SignUpData) => {
  return {
    type: GET_IS_DATA_FETCHED_SUCCESS,
    payload: SignUpData,
    loading: false,
  };
};
const getIsDataFetchedFailure = (error) => {
  return {
    type: GET_IS_DATA_FETCHED_FAILURE,
    payload: error,
    loading: false,
  };
};
const getIsDataFetched = (model_id) => {
  // console.log("model_id::: ", model_id);
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getIsDataFetchedRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/nla_api/fetched_data_status/${model_id}`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getIsDataFetchedSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getIsDataFetchedFailure(msg));
      // console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getIsDataFetchedRequest,
  getIsDataFetchedSuccess,
  getIsDataFetchedFailure,
  getIsDataFetched,
};

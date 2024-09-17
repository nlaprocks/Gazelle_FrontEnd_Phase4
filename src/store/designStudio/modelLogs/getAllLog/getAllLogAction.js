import axios from "axios";
import {
  GET_ALL_LOG_REQUEST,
  GET_ALL_LOG_SUCCESS,
  GET_ALL_LOG_FAILURE,
} from "./getAllLogType";

const getAllLogRequest = () => {
  return {
    type: GET_ALL_LOG_REQUEST,
    loading: true,
  };
};
const getAllLogSuccess = (state) => {
  return {
    type: GET_ALL_LOG_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getAllLogFailure = (error) => {
  return {
    type: GET_ALL_LOG_FAILURE,
    payload: error,
    loading: false,
  };
};
const getAllLog = (model_id) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getAllLogRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/model/get-logs/${model_id}`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getAllLogSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getAllLogFailure(msg));
      console.log(error);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllLogRequest,
  getAllLogSuccess,
  getAllLogFailure,
  getAllLog,
};

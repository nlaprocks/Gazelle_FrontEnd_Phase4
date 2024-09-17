import axios from "axios";
import {
  ADD_LOG_REQUEST,
  ADD_LOG_SUCCESS,
  ADD_LOG_FAILURE,
} from "./addLogType";

const addLogRequest = () => {
  return {
    type: ADD_LOG_REQUEST,
    loading: true,
  };
};
const addLogSuccess = (state) => {
  return {
    type: ADD_LOG_SUCCESS,
    payload: state,
    loading: false,
  };
};
const addLogFailure = (error) => {
  return {
    type: ADD_LOG_FAILURE,
    payload: error,
    loading: false,
  };
};
const addLog = (model_id, details) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(addLogRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/model/add-log/${model_id}`;
      var res = await axios.post(api, details, config);
      const { data } = res;
      loading = false;
      dispatch(addLogSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addLogFailure(msg));
      console.log(error);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addLogRequest,
  addLogSuccess,
  addLogFailure,
  addLog,
};

import axios from "axios";
import {
  FETCH_CLIENT_DATA_REQUEST,
  FETCH_CLIENT_DATA_SUCCESS,
  FETCH_CLIENT_DATA_FAILURE,
} from "./runModelType";

const runModelRequest = (data) => {
  return {
    type: FETCH_CLIENT_DATA_REQUEST,
    loading: true,
  };
};
const runModelSuccess = (data) => {
  return {
    type: FETCH_CLIENT_DATA_SUCCESS,
    payload: data,
    loading: false,
  };
};
const runModelFailure = (error) => {
  return {
    type: FETCH_CLIENT_DATA_FAILURE,
    payload: error,
    loading: false,
  };
};
const runModel = (state) => {
  let loading = true;
  console.log("ahsaj", state);
  return async (dispatch) => {
    try {
      dispatch(runModelRequest(loading));
      const formData = new FormData();
      Object.entries(state).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const api = `${process.env.REACT_APP_NGROK}/client-data/model/run-model`;
      var res = await axios.post(api, formData);
      const { data } = res;
      loading = false;
      dispatch(runModelSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(runModelFailure(msg));
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  runModelRequest,
  runModelSuccess,
  runModelFailure,
  runModel,
};

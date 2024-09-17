import axios from "axios";
import {
  SAVE_MODEL_TYPE_REQUEST,
  SAVE_MODEL_TYPE_SUCCESS,
  SAVE_MODEL_TYPE_FAILURE,
} from "./saveModelidType";

const saveModelidRequest = (data) => {
  return {
    type: SAVE_MODEL_TYPE_REQUEST,
    loading: true,
  };
};
const saveModelidSuccess = (data) => {
  return {
    type: SAVE_MODEL_TYPE_SUCCESS,
    payload: data,
    loading: false,
  };
};
const saveModelidFailure = (error) => {
  return {
    type: SAVE_MODEL_TYPE_FAILURE,
    payload: error,
    loading: false,
  };
};
const saveModelid = (state) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(saveModelidRequest(loading));
      console.log(state);
      const formData = new FormData();
      formData.append("model_id", state.model_id);
      formData.append("event_id", state.event_id);
      const api = `${process.env.REACT_APP_NGROK}/client-data/database/save-model-id`;
      var res = await axios.post(api, formData);
      const { data } = res;
      loading = false;
      dispatch(saveModelidSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(saveModelidFailure(msg));
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveModelidRequest,
  saveModelidSuccess,
  saveModelidFailure,
  saveModelid,
};

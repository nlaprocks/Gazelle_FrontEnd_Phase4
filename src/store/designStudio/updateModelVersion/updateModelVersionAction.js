import axios from "axios";
import {
  UPDATE_MODEL_VERSION_REQUEST,
  UPDATE_MODEL_VERSION_SUCCESS,
  UPDATE_MODEL_VERSION_FAILURE,
} from "./updateModelVersionType";

const updateModelVersionRequest = () => {
  return {
    type: UPDATE_MODEL_VERSION_REQUEST,
    loading: true,
  };
};
const updateModelVersionSuccess = (state) => {
  return {
    type: UPDATE_MODEL_VERSION_SUCCESS,
    payload: state,
    loading: false,
  };
};
const updateModelVersionFailure = (error) => {
  return {
    type: UPDATE_MODEL_VERSION_FAILURE,
    payload: error,
    loading: false,
  };
};
const updateModelVersion = (model_id, details) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(updateModelVersionRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/model/update/${model_id}`;
      var res = await axios.put(api, details, config);
      const { data } = res;
      loading = false;
      dispatch(updateModelVersionSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(updateModelVersionFailure(msg));
      console.log(error);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  updateModelVersionRequest,
  updateModelVersionSuccess,
  updateModelVersionFailure,
  updateModelVersion,
};

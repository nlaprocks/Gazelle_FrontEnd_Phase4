import axios from "axios";
import {
  DATASTRUCTURE_REQUEST,
  DATASTRUCTURE_SUCCESS,
  DATASTRUCTURE_FAILURE,
} from "./datastructureType";

const datastructureRequest = (data) => {
  return {
    type: DATASTRUCTURE_REQUEST,
    loading: true,
  };
};

const datastructureSuccess = (data) => {
  return {
    type: DATASTRUCTURE_SUCCESS,
    payload: data,
    loading: false,
  };
};

const datastructureFailure = (error) => {
  return {
    type: DATASTRUCTURE_FAILURE,
    payload: error,
    loading: false,
  };
};

const datastructure = (state) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(datastructureRequest(loading));
      const formData = new FormData();
      Object.entries(state).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const api = `${process.env.REACT_APP_NGROK}/client-data/database/get-structure`;
      var res = await axios.post(api, formData);
      const { data } = res;
      loading = false;
      dispatch(datastructureSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(datastructureFailure(msg));
    }
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  datastructureRequest,
  datastructureSuccess,
  datastructureFailure,
  datastructure,
};

import axios from "axios";
import {
  CLIENT_CSV_FILE_REQUEST,
  CLIENT_CSV_FILE_SUCCESS,
  CLIENT_CSV_FILE_FAILURE,
} from "./clientCsvFileType";

const clientCsvFileRequest = (data) => {
  return {
    type: CLIENT_CSV_FILE_REQUEST,
    loading: true,
  };
};
const clientCsvFileSuccess = (data) => {
  return {
    type: CLIENT_CSV_FILE_SUCCESS,
    payload: data,
    loading: false,
  };
};
const clientCsvFileFailure = (error) => {
  return {
    type: CLIENT_CSV_FILE_FAILURE,
    payload: error,
    loading: false,
  };
};
const clientCsvFile = (state) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(clientCsvFileRequest(loading));
      const formData = new FormData();
      formData.append("input_file", state.input_file);
      formData.append("client_id", state.client_id);
      formData.append("project_id", state.project_id);
      formData.append("model_id", state.model_id);
      const api = `${process.env.REACT_APP_NGROK}/internal-data/client/extra-csv`;
      var res = await axios.post(api, formData);
      const { data } = res;
      loading = false;
      dispatch(clientCsvFileSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(clientCsvFileFailure(msg));
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  clientCsvFileRequest,
  clientCsvFileSuccess,
  clientCsvFileFailure,
  clientCsvFile,
};

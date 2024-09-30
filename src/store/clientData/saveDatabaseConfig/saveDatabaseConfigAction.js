import axios from "axios";
import {
  SAVE_DATABASE_CONFIG_REQUEST,
  SAVE_DATABASE_CONFIG_SUCCESS,
  SAVE_DATABASE_CONFIG_FAILURE,
} from "./saveDatabaseConfigType";

const saveDatabaseConfigRequest = (data) => {
  return {
    type: SAVE_DATABASE_CONFIG_REQUEST,
    loading: true,
  };
};
const saveDatabaseConfigSuccess = (data) => {
  return {
    type: SAVE_DATABASE_CONFIG_SUCCESS,
    payload: data,
    loading: false,
  };
};
const saveDatabaseConfigFailure = (error) => {
  return {
    type: SAVE_DATABASE_CONFIG_FAILURE,
    payload: error,
    loading: false,
  };
};

const saveDatabaseConfig = (state) => {
  let loading = true;

  return async (dispatch) => {
    try {
      dispatch(saveDatabaseConfigRequest(loading));
      const formData = new FormData();

      formData.append("database_config", JSON.stringify(state.database_config));
      formData.append("event_id", state.event_id);

      if (state.schedule_timestamp) {
        formData.append("schedule_timestamp", state.schedule_timestamp);
      }

      const api = `${process.env.REACT_APP_NGROK}/client-data/database/save-config`;

      var res = await axios.post(api, formData);

      const { data } = res;
      loading = false;
      dispatch(saveDatabaseConfigSuccess(data));

    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(saveDatabaseConfigFailure(msg));
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveDatabaseConfigRequest,
  saveDatabaseConfigSuccess,
  saveDatabaseConfigFailure,
  saveDatabaseConfig,
};

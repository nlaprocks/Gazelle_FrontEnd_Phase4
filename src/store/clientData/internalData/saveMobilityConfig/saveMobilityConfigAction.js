import axios from "axios";
import {
  SAVE_MOBILITY_CONFIG_REQUEST,
  SAVE_MOBILITY_CONFIG_SUCCESS,
  SAVE_MOBILITY_CONFIG_FAILURE,
} from "./saveMobilityConfigType";

const saveMobilityConfigRequest = (data) => {
  return {
    type: SAVE_MOBILITY_CONFIG_REQUEST,
    loading: true,
  };
};
const saveMobilityConfigSuccess = (data) => {
  return {
    type: SAVE_MOBILITY_CONFIG_SUCCESS,
    payload: data,
    loading: false,
  };
};
const saveMobilityConfigFailure = (error) => {
  return {
    type: SAVE_MOBILITY_CONFIG_FAILURE,
    payload: error,
    loading: false,
  };
};
const saveMobilityConfig = (state) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(saveMobilityConfigRequest(loading));
      const formData = new FormData();
      formData.append("database_config", JSON.stringify(state.database_config));
      formData.append("event_id", state.event_id);
      const api = `${process.env.REACT_APP_NGROK}/internal-data/mobility/save-config`;
      var res = await axios.post(api, formData);
      const { data } = res;
      loading = false;
      dispatch(saveMobilityConfigSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(saveMobilityConfigFailure(msg));
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveMobilityConfigRequest,
  saveMobilityConfigSuccess,
  saveMobilityConfigFailure,
  saveMobilityConfig,
};

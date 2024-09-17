import axios from "axios";
import {
  SAVE_COMPETITORS_CONFIG_REQUEST,
  SAVE_COMPETITORS_CONFIG_SUCCESS,
  SAVE_COMPETITORS_CONFIG_FAILURE,
} from "./saveCompetitorsConfigType";

const saveCompetitorsConfigRequest = (data) => {
  return {
    type: SAVE_COMPETITORS_CONFIG_REQUEST,
    loading: true,
  };
};
const saveCompetitorsConfigSuccess = (data) => {
  return {
    type: SAVE_COMPETITORS_CONFIG_SUCCESS,
    payload: data,
    loading: false,
  };
};
const saveCompetitorsConfigFailure = (error) => {
  return {
    type: SAVE_COMPETITORS_CONFIG_FAILURE,
    payload: error,
    loading: false,
  };
};
const saveCompetitorsConfig = (state) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(saveCompetitorsConfigRequest(loading));
      const formData = new FormData();
      formData.append("database_config", JSON.stringify(state.database_config));
      formData.append("event_id", state.event_id);
      const api = `${process.env.REACT_APP_NGROK}/internal-data/competitors/save-config`;
      var res = await axios.post(api, formData);
      const { data } = res;
      loading = false;
      dispatch(saveCompetitorsConfigSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(saveCompetitorsConfigFailure(msg));
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveCompetitorsConfigRequest,
  saveCompetitorsConfigSuccess,
  saveCompetitorsConfigFailure,
  saveCompetitorsConfig,
};

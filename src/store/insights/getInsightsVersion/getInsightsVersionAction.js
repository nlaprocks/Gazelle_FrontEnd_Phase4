import axios from "axios";
import {
  GET_INSIGHTS_VERSION_REQUEST,
  GET_INSIGHTS_VERSION_SUCCESS,
  GET_INSIGHTS_VERSION_FAILURE,
} from "./getInsightsVersionType";

const getInsightsVersionRequest = () => {
  return {
    type: GET_INSIGHTS_VERSION_REQUEST,
    loading: true,
  };
};

const getInsightsVersionSuccess = (state) => {
  return {
    type: GET_INSIGHTS_VERSION_SUCCESS,
    payload: state,
    loading: false,
  };
};

const getInsightsVersionFailure = (error) => {
  return {
    type: GET_INSIGHTS_VERSION_FAILURE,
    payload: error,
    loading: false,
  };
};

const getInsightsVersion = (model_id) => {

  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };

  return async (dispatch) => {
    try {
      dispatch(getInsightsVersionRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/all-insight-versions/${model_id}`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getInsightsVersionSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getInsightsVersionFailure(msg));
      console.log(error);
    }
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getInsightsVersionRequest,
  getInsightsVersionSuccess,
  getInsightsVersionFailure,
  getInsightsVersion,
};

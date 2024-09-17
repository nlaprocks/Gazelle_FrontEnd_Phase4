import axios from "axios";
import {
  ADD_INSIGHTS_VERSION_REQUEST,
  ADD_INSIGHTS_VERSION_SUCCESS,
  ADD_INSIGHTS_VERSION_FAILURE,
} from "./addInsightsVersionType";

const addInsightsVersionRequest = () => {
  return {
    type: ADD_INSIGHTS_VERSION_REQUEST,
    loading: true,
  };
};
const addInsightsVersionSuccess = (state) => {
  return {
    type: ADD_INSIGHTS_VERSION_SUCCESS,
    payload: state,
    loading: false,
  };
};
const addInsightsVersionFailure = (error) => {
  return {
    type: ADD_INSIGHTS_VERSION_FAILURE,
    payload: error,
    loading: false,
  };
};
const addInsightsVersion = (model_id) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(addInsightsVersionRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/add-insight/${model_id}`;
      var res = await axios.post(api, {}, config);

      const { data } = res;
      loading = false;
      dispatch(addInsightsVersionSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addInsightsVersionFailure(msg));
      console.log(error);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addInsightsVersionRequest,
  addInsightsVersionSuccess,
  addInsightsVersionFailure,
  addInsightsVersion,
};

import axios from "axios";
import {
  DELETE_CHART_REQUEST,
  DELETE_CHART_SUCCESS,
  DELETE_CHART_FAILURE,
} from "./deleteChartType";

const deleteChartRequest = (data) => {
  return {
    type: DELETE_CHART_REQUEST,
    loading: true,
  };
};
const deleteChartSuccess = (SignUpData) => {
  return {
    type: DELETE_CHART_SUCCESS,
    payload: SignUpData,
    loading: false,
  };
};
const deleteChartFailure = (error) => {
  return {
    type: DELETE_CHART_FAILURE,
    payload: error,
    loading: false,
  };
};
const deleteChart = (state) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(deleteChartRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/delete-chart`;
      var res = await axios.post(api, state);
      const { data } = res;
      loading = false;
      dispatch(deleteChartSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(deleteChartFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  deleteChartRequest,
  deleteChartSuccess,
  deleteChartFailure,
  deleteChart,
};

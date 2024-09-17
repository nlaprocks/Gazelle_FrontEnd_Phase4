import axios from "axios";
import {
  ADD_CHART_REQUEST,
  ADD_CHART_SUCCESS,
  ADD_CHART_FAILURE,
} from "./addChartType";

const addChartRequest = (data) => {
  return {
    type: ADD_CHART_REQUEST,
    loading: true,
  };
};
const addChartSuccess = (data) => {
  return {
    type: ADD_CHART_SUCCESS,
    payload: data,
    loading: false,
  };
};
const addChartFailure = (error) => {
  return {
    type: ADD_CHART_FAILURE,
    payload: error,
    loading: false,
  };
};
const addChart = (state) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(addChartRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/add-insight-chart`;
      var res = await axios.post(api, state);
      const { data } = res;
      console.log(res);
      loading = false;
      dispatch(addChartSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addChartFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addChartRequest,
  addChartSuccess,
  addChartFailure,
  addChart,
};

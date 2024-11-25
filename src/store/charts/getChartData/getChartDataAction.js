import axios from "axios";
import {
  GET_CHART_DATA_REQUEST,
  GET_CHART_DATA_SUCCESS,
  GET_CHART_DATA_FAILURE,
} from "./getChartDataType";

const getChartDataRequest = () => {
  return {
    type: GET_CHART_DATA_REQUEST,
    loading: true,
  };
};
const getChartDataSuccess = (state) => {
  return {
    type: GET_CHART_DATA_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getChartDataFailure = (error) => {
  return {
    type: GET_CHART_DATA_FAILURE,
    payload: error,
    loading: false,
  };
};
const getChartData = (details) => {
  let loading = true;
  // const auth = JSON.parse(localStorage.getItem("auth"));
  // const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getChartDataRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/get-dummy-chart-data`;
      var res = await axios.get(api);
      const { data } = res;
      loading = false;
      dispatch(getChartDataSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getChartDataFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getChartDataRequest,
  getChartDataSuccess,
  getChartDataFailure,
  getChartData,
};

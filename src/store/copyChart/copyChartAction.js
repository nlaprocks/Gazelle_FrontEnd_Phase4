import axios from "axios";
import {
  COPY_CHART_REQUEST,
  COPY_CHART_SUCCESS,
  COPY_CHART_FAILURE,
} from "./copyChartType";

const copyChartRequest = (data) => {
  return {
    type: COPY_CHART_REQUEST,
    loading: true,
  };
};
const copyChartSuccess = (SignUpData) => {
  return {
    type: COPY_CHART_SUCCESS,
    payload: SignUpData,
    loading: false,
  };
};
const copyChartFailure = (error) => {
  return {
    type: COPY_CHART_FAILURE,
    payload: error,
    loading: false,
  };
};
const copyChart = (state) => {
  console.log("copyChart", state);
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(copyChartRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/copy-chart`;
      var res = await axios.post(api, state);
      const { data } = res;
      loading = false;
      console.log(res);
      dispatch(copyChartSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(copyChartFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  copyChartRequest,
  copyChartSuccess,
  copyChartFailure,
  copyChart,
};

// filterChartAction.js
import axios from "axios";
import { FILTER_CHART_REQUEST, FILTER_CHART_SUCCESS, FILTER_CHART_FAILURE } from "./filterChartType";

const filterChartRequest = () => {
  return {
    type: FILTER_CHART_REQUEST,
  };
};

const filterChartSuccess = (data) => {
  return {
    type: FILTER_CHART_SUCCESS,
    payload: data,
  };
};

const filterChartFailure = (error) => {
  return {
    type: FILTER_CHART_FAILURE,
    payload: error,
  };
};

const applyFilterToChart = ({ filterData, role }) => {
  return async (dispatch) => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const config = { headers: { Authorization: `Bearer ` + auth.token } };
    try {
      dispatch(filterChartRequest());
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/filter-chart/${filterData.chart_id}`;
      const res = await axios.put(api, filterData.data, config);
      const { data } = res;
      dispatch(filterChartSuccess({ data: data, role: role }));
    } catch (error) {
      const msg = error.response;
      dispatch(filterChartFailure(msg));
      console.log(error);
    }
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  filterChartRequest,
  filterChartSuccess,
  filterChartFailure,
  applyFilterToChart,
};

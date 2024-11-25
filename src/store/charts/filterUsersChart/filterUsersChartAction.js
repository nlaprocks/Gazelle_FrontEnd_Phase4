import axios from "axios";
import {
  FILTER_USERS_CHART_REQUEST,
  FILTER_USERS_CHART_SUCCESS,
  FILTER_USERS_CHART_FAILURE,
} from "./filterUsersChartType";

const filterUsersChartRequest = () => {
  return {
    type: FILTER_USERS_CHART_REQUEST,
    loading: true,
  };
};
const filterUsersChartSuccess = (state) => {
  return {
    type: FILTER_USERS_CHART_SUCCESS,
    payload: state,
    loading: false,
  };
};
const filterUsersChartFailure = (error) => {
  return {
    type: FILTER_USERS_CHART_FAILURE,
    payload: error,
    loading: false,
  };
};
const filterUsersChart = (chart_id, details) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(filterUsersChartRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/filter-chart/${chart_id}`;
      var res = await axios.put(api, details, config);
      const { data } = res;
      loading = false;
      dispatch(filterUsersChartSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(filterUsersChartFailure(msg));
      console.log(error);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  filterUsersChartRequest,
  filterUsersChartSuccess,
  filterUsersChartFailure,
  filterUsersChart,
};

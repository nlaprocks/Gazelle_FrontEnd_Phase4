import axios from "axios";
import {
  EDIT_CHART_DATA_REQUEST,
  EDIT_CHART_DATA_SUCCESS,
  EDIT_CHART_DATA_FAILURE,
} from "./editChartDataType";

const editChartDataRequest = () => {
  return {
    type: EDIT_CHART_DATA_REQUEST,
    loading: true,
  };
};
const editChartDataSuccess = (state) => {
  return {
    type: EDIT_CHART_DATA_SUCCESS,
    payload: state,
    loading: false,
  };
};
const editChartDataFailure = (error) => {
  return {
    type: EDIT_CHART_DATA_FAILURE,
    payload: error,
    loading: false,
  };
};
const editChartData = (details) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(editChartDataRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/update-insight-chart`;
      var res = await axios.put(api, details);
      const { data } = res;
      loading = false;
      dispatch(editChartDataSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(editChartDataFailure(msg));
      console.log(error);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  editChartDataRequest,
  editChartDataSuccess,
  editChartDataFailure,
  editChartData,
};

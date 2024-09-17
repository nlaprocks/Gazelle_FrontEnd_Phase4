import axios from "axios";
import {
  UPDATE_CHART_NAME_REQUEST,
  UPDATE_CHART_NAME_SUCCESS,
  UPDATE_CHART_NAME_FAILURE,
} from "./updateChartNameType";

const updateChartNameRequest = (data) => {
  return {
    type: UPDATE_CHART_NAME_REQUEST,
    loading: true,
  };
};
const updateChartNameSuccess = (SignUpData) => {
  return {
    type: UPDATE_CHART_NAME_SUCCESS,
    payload: SignUpData,
    loading: false,
  };
};
const updateChartNameFailure = (error) => {
  return {
    type: UPDATE_CHART_NAME_FAILURE,
    payload: error,
    loading: false,
  };
};
const updateChartName = (state) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(updateChartNameRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/add-question`;
      var res = await axios.delete(api, state);
      const { data } = res;
      loading = false;
      dispatch(updateChartNameSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(updateChartNameFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  updateChartNameRequest,
  updateChartNameSuccess,
  updateChartNameFailure,
  updateChartName,
};

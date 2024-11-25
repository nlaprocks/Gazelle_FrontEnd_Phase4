import axios from "axios";
import {
  USERS_CHARTS_REQUEST,
  USERS_CHARTS_SUCCESS,
  USERS_CHARTS_FAILURE,
} from "./usersChartsType";

const usersChartsRequest = () => {
  return {
    type: USERS_CHARTS_REQUEST,
    loading: true,
  };
};
const usersChartsSuccess = (state) => {
  return {
    type: USERS_CHARTS_SUCCESS,
    payload: state,
    loading: false,
  };
};
const usersChartsFailure = (error) => {
  return {
    type: USERS_CHARTS_FAILURE,
    payload: error,
    loading: false,
  };
};
const usersCharts = ({ project_id, model_id }) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(usersChartsRequest(loading));
      const api = `${process.env.REACT_APP_NGROK}/insights/user-charts?project_id=${project_id}&model_id=${model_id}`;
      var res = await axios.get(api);
      const { data } = res;
      loading = false;
      dispatch(usersChartsSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(usersChartsFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  usersChartsRequest,
  usersChartsSuccess,
  usersChartsFailure,
  usersCharts,
};

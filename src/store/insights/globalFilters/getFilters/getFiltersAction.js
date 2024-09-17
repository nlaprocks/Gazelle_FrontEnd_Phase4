import axios from "axios";
import {
  GET_FILTERS_REQUEST,
  GET_FILTERS_SUCCESS,
  GET_FILTERS_FAILURE,
} from "./getFiltersType";

const getFiltersRequest = () => {
  return {
    type: GET_FILTERS_REQUEST,
  };
};

const getFiltersSuccess = (filters) => {
  return {
    type: GET_FILTERS_SUCCESS,
    payload: filters,
  };
};

const getFiltersFailure = (error) => {
  return {
    type: GET_FILTERS_FAILURE,
    payload: error,
  };
};

const fetchFilters = ({ model_id }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getFiltersRequest());
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/global/filters/get/${model_id}`;
      const res = await axios.get(api, config);
      const { data } = res;
      dispatch(getFiltersSuccess(data));
    } catch (error) {
      const msg = error.response;
      dispatch(getFiltersFailure(msg));
      console.log(error);
    }
  };
};

export default {
  getFiltersRequest,
  getFiltersSuccess,
  getFiltersFailure,
  fetchFilters,
};

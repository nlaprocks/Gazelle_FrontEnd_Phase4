import axios from "axios";
import {
  ADD_FILTERS_REQUEST,
  ADD_FILTERS_SUCCESS,
  ADD_FILTERS_FAILURE,
} from "./addFiltersType";

const addFiltersRequest = () => {
  return {
    type: ADD_FILTERS_REQUEST,
  };
};

const addFiltersSuccess = (filters) => {
  return {
    type: ADD_FILTERS_SUCCESS,
    payload: filters,
  };
};

const addFiltersFailure = (error) => {
  return {
    type: ADD_FILTERS_FAILURE,
    payload: error,
  };
};

const saveFilters = (newFilters) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(addFiltersRequest());
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/global/filters/add`;
      const res = await axios.post(api, newFilters, config);
      const { data } = res;
      dispatch(addFiltersSuccess(data));
    } catch (error) {
      const msg = error.response;
      dispatch(addFiltersFailure(msg));
      console.log(error);
    }
  };
};

export default {
  addFiltersRequest,
  addFiltersSuccess,
  addFiltersFailure,
  saveFilters,
};

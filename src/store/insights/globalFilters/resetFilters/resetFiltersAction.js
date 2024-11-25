import axios from "axios";
import { RESET_FILTERS_REQUEST, RESET_FILTERS_SUCCESS, RESET_FILTERS_FAILURE } from "./resetFiltersType";

const resetFiltersRequest = () => {
  return {
    type: RESET_FILTERS_REQUEST,
  };
};

const resetFiltersSuccess = () => {
  return {
    type: RESET_FILTERS_SUCCESS,
  };
};

const resetFiltersFailure = (error) => {
  return {
    type: RESET_FILTERS_FAILURE,
    payload: error,
  };
};

const resetFilters = (model_id) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(resetFiltersRequest());
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/global/filters/reset/${model_id}`;
      const res = await axios.get(api, config);
      const { data } = res;
      dispatch(resetFiltersSuccess(data));
    } catch (error) {
      // Dispatch failure action if reset fails
      dispatch(resetFiltersFailure(error.message));
      console.log(error);
    }
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  resetFiltersRequest,
  resetFiltersSuccess,
  resetFiltersFailure,
  resetFilters,
};

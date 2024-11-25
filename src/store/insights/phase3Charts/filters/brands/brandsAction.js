// brandsAction.js
import axios from "axios";
import {
  FETCH_BRANDS_REQUEST,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_FAILURE,
} from "./brandsType";

const fetchBrandsRequest = () => {
  return {
    type: FETCH_BRANDS_REQUEST,
  };
};

const fetchBrandsSuccess = (brands) => {
  return {
    type: FETCH_BRANDS_SUCCESS,
    payload: brands,
  };
};

const fetchBrandsFailure = (error) => {
  return {
    type: FETCH_BRANDS_FAILURE,
    payload: error,
  };
};

const fetchBrands = ({ project_id, model_id }) => {
  return async (dispatch) => {
    try {
      dispatch(fetchBrandsRequest());
      // Replace with your API endpoint for fetching brands
      const api = `${process.env.REACT_APP_NGROK}/insights/brands?project_id=${project_id}&model_id=${model_id}`;
      const res = await axios.get(api);
      const { data } = res;
      dispatch(fetchBrandsSuccess(data));
    } catch (error) {
      const msg = error.response;
      dispatch(fetchBrandsFailure(msg));
      console.log(error);
    }
  };
};

export default {
  fetchBrandsRequest,
  fetchBrandsSuccess,
  fetchBrandsFailure,
  fetchBrands,
};

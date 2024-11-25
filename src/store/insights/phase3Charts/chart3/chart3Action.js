// chart3Action.js
import axios from "axios";
import { CHART3_REQUEST, CHART3_SUCCESS, CHART3_FAILURE } from "./chart3Type";

const chart3Request = () => {
  return {
    type: CHART3_REQUEST,
    loading: true,
  };
};

const chart3Success = (data) => {
  return {
    type: CHART3_SUCCESS,
    payload: data,
    loading: false,
  };
};

const chart3Failure = (error) => {
  return {
    type: CHART3_FAILURE,
    payload: error,
    loading: false,
  };
};

const fetchChart3Data = ({ project_id, model_id, products, retailers, brands, date_start, date_end }) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(chart3Request(loading));
      let api = `${process.env.REACT_APP_NGROK}/insights/chart3?project_id=${encodeURIComponent(project_id)}&model_id=${encodeURIComponent(model_id)}`;
    
      // Add products to the API URL if the array is not empty
      if (products && products.length > 0) {
        const productParam = products.map((product) => encodeURIComponent(product)).join(encodeURIComponent(','));
        api += `&Product=${productParam}`;
      }
    
      // Add retailers to the API URL if the array is not empty
      if (retailers && retailers.length > 0) {
        const retailerParam = retailers.map((retailer) => encodeURIComponent(retailer)).join(encodeURIComponent(','));
        api += `&Retailer=${retailerParam}`;
      }
    
      // Add brands to the API URL if the array is not empty
      if (brands && brands.length > 0) {
        const brandParam = brands.map((brand) => encodeURIComponent(brand)).join(encodeURIComponent(','));
        api += `&Brand=${brandParam}`;
      }
    
      // Add date_start to the API URL if it's provided
      if (date_start) {
        const isoDate = date_start;
        const date = new Date(isoDate);
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
          .getDate()
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;
        api += `&date_start=${encodeURIComponent(formattedDate)}`;
      }
    
      // Add date_end to the API URL if it's provided
      if (date_end) {
        const isoDate = date_end;
        const date = new Date(isoDate);
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
          .getDate()
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;
        api += `&date_end=${encodeURIComponent(formattedDate)}`;
      }
      const res = await axios.get(api);
      const { data } = res;
      loading = false;
      dispatch(chart3Success(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(chart3Failure(msg));
      console.log(error);
    }
    
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  chart3Request,
  chart3Success,
  chart3Failure,
  fetchChart3Data,
};

// retailerBrandsProductsAction.js
import axios from "axios";
import {
  FETCH_RETAILER_BRANDS_PRODUCTS_REQUEST,
  FETCH_RETAILER_BRANDS_PRODUCTS_SUCCESS,
  FETCH_RETAILER_BRANDS_PRODUCTS_FAILURE,
} from "./retailerBrandsProductsType";

const fetchRetailerBrandsProductsRequest = () => {
  return {
    type: FETCH_RETAILER_BRANDS_PRODUCTS_REQUEST,
  };
};

const fetchRetailerBrandsProductsSuccess = (data) => {
  return {
    type: FETCH_RETAILER_BRANDS_PRODUCTS_SUCCESS,
    payload: data,
  };
};

const fetchRetailerBrandsProductsFailure = (error) => {
  return {
    type: FETCH_RETAILER_BRANDS_PRODUCTS_FAILURE,
    payload: error,
  };
};

const fetchRetailerBrandsProducts = ({ project_id, model_id }) => {
  return async (dispatch) => {
    try {
      dispatch(fetchRetailerBrandsProductsRequest());
      const api = `${process.env.REACT_APP_NGROK}/insights/retailer_brands_products?project_id=${project_id}&model_id=${model_id}`;
      const res = await axios.get(api);

      const { data } = res;
      dispatch(fetchRetailerBrandsProductsSuccess(data));
    } catch (error) {
      const msg = error.response;
      dispatch(fetchRetailerBrandsProductsFailure(msg));
      console.log(error);
    }
  };
};

export default {
  fetchRetailerBrandsProductsRequest,
  fetchRetailerBrandsProductsSuccess,
  fetchRetailerBrandsProductsFailure,
  fetchRetailerBrandsProducts,
};

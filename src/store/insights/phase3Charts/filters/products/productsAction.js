// productsAction.js
import axios from "axios";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "./productsType";

const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST,
  };
};

const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
};

const fetchProductsFailure = (error) => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
};

const fetchProducts = ({ project_id, model_id }) => {
  return async (dispatch) => {
    try {
      dispatch(fetchProductsRequest());
      const api = `${process.env.REACT_APP_NGROK}/insights/products?project_id=${project_id}&model_id=${model_id}`;
      const res = await axios.get(api);

      const { data } = res;
      dispatch(fetchProductsSuccess(data));
    } catch (error) {
      const msg = error.response;
      dispatch(fetchProductsFailure(msg));
      console.log(error);
    }
  };
};

export default {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProducts,
};

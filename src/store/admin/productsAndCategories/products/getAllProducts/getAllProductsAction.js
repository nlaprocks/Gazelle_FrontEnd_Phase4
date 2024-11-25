import axios from "axios";
import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
} from "./getAllProductsType";

const getAllProductsRequest = () => {
  return {
    type: GET_ALL_PRODUCTS_REQUEST,
    loading: true,
  };
};
const getAllProductsSuccess = (state) => {
  return {
    type: GET_ALL_PRODUCTS_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getAllProductsFailure = (error) => {
  return {
    type: GET_ALL_PRODUCTS_FAILURE,
    payload: error,
    loading: false,
  };
};
const getAllProducts = () => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getAllProductsRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/get-all-products`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getAllProductsSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getAllProductsFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFailure,
  getAllProducts,
};

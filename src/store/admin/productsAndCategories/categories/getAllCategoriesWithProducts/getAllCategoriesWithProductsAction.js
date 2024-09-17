import axios from "axios";
import {
  GET_ALL_CATEGORIES_WITH_PRODUCTS_REQUEST,
  GET_ALL_CATEGORIES_WITH_PRODUCTS_SUCCESS,
  GET_ALL_CATEGORIES_WITH_PRODUCTS_FAILURE,
} from "./getAllCategoriesWithProductsType";

const getAllCategoriesWithProductsRequest = () => {
  return {
    type: GET_ALL_CATEGORIES_WITH_PRODUCTS_REQUEST,
    loading: true,
  };
};
const getAllCategoriesWithProductsSuccess = (state) => {
  return {
    type: GET_ALL_CATEGORIES_WITH_PRODUCTS_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getAllCategoriesWithProductsFailure = (error) => {
  return {
    type: GET_ALL_CATEGORIES_WITH_PRODUCTS_FAILURE,
    payload: error,
    loading: false,
  };
};
const getAllCategoriesWithProducts = () => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getAllCategoriesWithProductsRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/get-all-categories-with-products`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getAllCategoriesWithProductsSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getAllCategoriesWithProductsFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllCategoriesWithProductsRequest,
  getAllCategoriesWithProductsSuccess,
  getAllCategoriesWithProductsFailure,
  getAllCategoriesWithProducts,
};

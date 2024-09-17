import axios from "axios";
import { ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE } from "./addProductType";

const addProductRequest = () => {
  return {
    type: ADD_PRODUCT_REQUEST,
    loading: true,
  };
};
const addProductSuccess = (state) => {
  return {
    type: ADD_PRODUCT_SUCCESS,
    payload: state,
    loading: false,
  };
};
const addProductFailure = (error) => {
  return {
    type: ADD_PRODUCT_FAILURE,
    payload: error,
    loading: false,
  };
};
const addProduct = (file) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(addProductRequest(loading));
      // const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/add-product`;
      // var res = await axios.post(api, details, config);
      const formData = new FormData();
      formData.append("products_file", file);
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/upload-product-csv`;
      var res = await axios.post(api, formData, config);
      const { data } = res;
      loading = false;
      dispatch(addProductSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addProductFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addProductRequest,
  addProductSuccess,
  addProductFailure,
  addProduct,
};

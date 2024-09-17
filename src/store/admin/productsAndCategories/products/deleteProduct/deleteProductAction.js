import axios from "axios";
import {
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from "./deleteProductType";

const deleteProductRequest = () => {
  return {
    type: DELETE_PRODUCT_REQUEST,
    loading: true,
  };
};
const deleteProductSuccess = (state) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: state,
    loading: false,
  };
};
const deleteProductFailure = (error) => {
  return {
    type: DELETE_PRODUCT_FAILURE,
    payload: error,
    loading: false,
  };
};
const deleteProduct = (details) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(deleteProductRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/delete-product/${details.product_id}`;
      var res = await axios.delete(api, config);
      const { data } = res;
      loading = false;
      dispatch(deleteProductSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(deleteProductFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  deleteProduct,
};

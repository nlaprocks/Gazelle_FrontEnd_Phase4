import axios from "axios";
import {
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from "./updateProductType";

const updateProductRequest = () => {
  return {
    type: UPDATE_PRODUCT_REQUEST,
    loading: true,
  };
};
const updateProductSuccess = (state) => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload: state,
    loading: false,
  };
};
const updateProductFailure = (error) => {
  return {
    type: UPDATE_PRODUCT_FAILURE,
    payload: error,
    loading: false,
  };
};
const updateProduct = (details) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(updateProductRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/update-product`;
      var res = await axios.post(api, details, config);
      const { data } = res;
      loading = false;
      dispatch(updateProductSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(updateProductFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  updateProduct,
};

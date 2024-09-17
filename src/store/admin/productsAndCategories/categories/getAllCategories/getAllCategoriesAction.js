import axios from "axios";
import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAILURE,
} from "./getAllCategoriesType";

const getAllCategoriesRequest = () => {
  return {
    type: GET_ALL_CATEGORIES_REQUEST,
    loading: true,
  };
};
const getAllCategoriesSuccess = (state) => {
  return {
    type: GET_ALL_CATEGORIES_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getAllCategoriesFailure = (error) => {
  return {
    type: GET_ALL_CATEGORIES_FAILURE,
    payload: error,
    loading: false,
  };
};
const getAllCategories = () => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getAllCategoriesRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/get-all-categories`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getAllCategoriesSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getAllCategoriesFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllCategoriesRequest,
  getAllCategoriesSuccess,
  getAllCategoriesFailure,
  getAllCategories,
};

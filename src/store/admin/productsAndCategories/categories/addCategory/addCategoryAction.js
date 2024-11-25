import axios from "axios";
import {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
} from "./addCategoryType";

const addCategoryRequest = () => {
  return {
    type: ADD_CATEGORY_REQUEST,
    loading: true,
  };
};
const addCategorySuccess = (state) => {
  return {
    type: ADD_CATEGORY_SUCCESS,
    payload: state,
    loading: false,
  };
};
const addCategoryFailure = (error) => {
  return {
    type: ADD_CATEGORY_FAILURE,
    payload: error,
    loading: false,
  };
};
const addCategory = (file) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(addCategoryRequest(loading));
      // const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/add-category`;
      // var res = await axios.post(api, { category_name: details }, config);
      const formData = new FormData();
      formData.append("category_file", file);
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/upload-category-csv`;
      var res = await axios.post(api, formData, config);
      const { data } = res;
      loading = false;
      dispatch(addCategorySuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addCategoryFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addCategoryRequest,
  addCategorySuccess,
  addCategoryFailure,
  addCategory,
};

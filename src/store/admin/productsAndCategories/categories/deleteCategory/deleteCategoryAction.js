import axios from "axios";
import {
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
} from "./deleteCategoryType";

const deleteCategoryRequest = () => {
  return {
    type: DELETE_CATEGORY_REQUEST,
    loading: true,
  };
};
const deleteCategorySuccess = (state) => {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: state,
    loading: false,
  };
};
const deleteCategoryFailure = (error) => {
  return {
    type: DELETE_CATEGORY_FAILURE,
    payload: error,
    loading: false,
  };
};
const deleteCategory = (id) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(deleteCategoryRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/delete-category/${id}`;
      var res = await axios.delete(api, config);
      const { data } = res;
      loading = false;
      dispatch(deleteCategorySuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(deleteCategoryFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure,
  deleteCategory,
};

import axios from "axios";
import {
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
} from "./updateCategoryType";

const updateCategoryRequest = () => {
  return {
    type: UPDATE_CATEGORY_REQUEST,
    loading: true,
  };
};
const updateCategorySuccess = (state) => {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    payload: state,
    loading: false,
  };
};
const updateCategoryFailure = (error) => {
  return {
    type: UPDATE_CATEGORY_FAILURE,
    payload: error,
    loading: false,
  };
};
const updateCategory = (details) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(updateCategoryRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/update-category`;
      var res = await axios.post(api, details, config);
      const { data } = res;
      loading = false;
      dispatch(updateCategorySuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(updateCategoryFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailure,
  updateCategory,
};

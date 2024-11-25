import axios from "axios";
import {
  DELETE_SLIDE_NAME_REQUEST,
  DELETE_SLIDE_NAME_SUCCESS,
  DELETE_SLIDE_NAME_FAILURE,
} from "./deleteSlideNameType";

const deleteSlideNameRequest = (data) => {
  return {
    type: DELETE_SLIDE_NAME_REQUEST,
    loading: true,
  };
};
const deleteSlideNameSuccess = (data) => {
  return {
    type: DELETE_SLIDE_NAME_SUCCESS,
    payload: data,
    loading: false,
  };
};
const deleteSlideNameFailure = (error) => {
  return {
    type: DELETE_SLIDE_NAME_FAILURE,
    payload: error,
    loading: false,
  };
};
const deleteSlideName = (state) => {
  console.log(state);
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(deleteSlideNameRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/delete-slide-name`;
      var res = await axios.post(api, state);
      const { data } = res;
      console.log(res);
      loading = false;
      dispatch(deleteSlideNameSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(deleteSlideNameFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  deleteSlideNameRequest,
  deleteSlideNameSuccess,
  deleteSlideNameFailure,
  deleteSlideName,
};

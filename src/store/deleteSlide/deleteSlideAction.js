import axios from "axios";
import {
  DELETE_SLIDE_REQUEST,
  DELETE_SLIDE_SUCCESS,
  DELETE_SLIDE_FAILURE,
} from "./deleteSlideType";

const deleteSlideRequest = (data) => {
  return {
    type: DELETE_SLIDE_REQUEST,
    loading: true,
  };
};
const deleteSlideSuccess = (data) => {
  return {
    type: DELETE_SLIDE_SUCCESS,
    payload: data,
    loading: false,
  };
};
const deleteSlideFailure = (error) => {
  return {
    type: DELETE_SLIDE_FAILURE,
    payload: error,
    loading: false,
  };
};
const deleteSlide = (state) => {
  console.log(state);
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(deleteSlideRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/delete-question`;
      var res = await axios.post(api, state);
      const { data } = res;
      console.log(res);
      loading = false;
      dispatch(deleteSlideSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(deleteSlideFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  deleteSlideRequest,
  deleteSlideSuccess,
  deleteSlideFailure,
  deleteSlide,
};

import axios from "axios";
import {
  UPDATE_SLIDE_NAME_REQUEST,
  UPDATE_SLIDE_NAME_SUCCESS,
  UPDATE_SLIDE_NAME_FAILURE,
} from "./updateSlideNameType";

const updateSlideNameRequest = (data) => {
  return {
    type: UPDATE_SLIDE_NAME_REQUEST,
    loading: true,
  };
};
const updateSlideNameSuccess = (data) => {
  return {
    type: UPDATE_SLIDE_NAME_SUCCESS,
    payload: data,
    loading: false,
  };
};
const updateSlideNameFailure = (error) => {
  return {
    type: UPDATE_SLIDE_NAME_FAILURE,
    payload: error,
    loading: false,
  };
};

const updateSlideName = (state) => {
  // console.log("state", state);
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(updateSlideNameRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/update-slide-name`;
      var res = await axios.put(api, state);
      const { data } = res;
      console.log(res);
      loading = false;
      dispatch(updateSlideNameSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(updateSlideNameFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  updateSlideNameRequest,
  updateSlideNameSuccess,
  updateSlideNameFailure,
  updateSlideName,
};

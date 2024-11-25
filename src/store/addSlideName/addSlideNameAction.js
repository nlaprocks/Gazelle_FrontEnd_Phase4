import axios from "axios";
import {
  ADD_SLIDE_NAME_REQUEST,
  ADD_SLIDE_NAME_SUCCESS,
  ADD_SLIDE_NAME_FAILURE,
} from "./addSlideNameType";

const addSlideNameRequest = (data) => {
  return {
    type: ADD_SLIDE_NAME_REQUEST,
    loading: true,
  };
};
const addSlideNameSuccess = (data) => {
  return {
    type: ADD_SLIDE_NAME_SUCCESS,
    payload: data,
    loading: false,
  };
};
const addSlideNameFailure = (error) => {
  return {
    type: ADD_SLIDE_NAME_FAILURE,
    payload: error,
    loading: false,
  };
};
const addSlideName = (state) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(addSlideNameRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/add-slide-name`;
      var res = await axios.post(api, state);
      const { data } = res;
      console.log(res);
      loading = false;
      dispatch(addSlideNameSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addSlideNameFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addSlideNameRequest,
  addSlideNameSuccess,
  addSlideNameFailure,
  addSlideName,
};

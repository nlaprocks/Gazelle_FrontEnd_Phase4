import axios from "axios";
import { ADD_SLIDE_REQUEST, ADD_SLIDE_SUCCESS, ADD_SLIDE_FAILURE } from "./addSlideType";

const addSlideRequest = (data) => {
  return {
    type: ADD_SLIDE_REQUEST,
    loading: true,
  };
};
const addSlideSuccess = (SignUpData) => {
  return {
    type: ADD_SLIDE_SUCCESS,
    payload: SignUpData,
    loading: false,
  };
};
const addSlideFailure = (error) => {
  return {
    type: ADD_SLIDE_FAILURE,
    payload: error,
    loading: false,
  };
};
const addSlide = (state) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(addSlideRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/add-question`;
      var res = await axios.post(api, state);
      const { data } = res;
      loading = false;
      dispatch(addSlideSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addSlideFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addSlideRequest,
  addSlideSuccess,
  addSlideFailure,
  addSlide,
};

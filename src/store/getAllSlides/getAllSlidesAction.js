import axios from "axios";
import { GET_SLIDE_REQUEST, GET_SLIDE_SUCCESS, GET_SLIDE_FAILURE } from "./getAllSlidesType";

const getAllSlideRequest = (data) => {
  return {
    type: GET_SLIDE_REQUEST,
    loading: true,
  };
};
const getAllSlideSuccess = (SignUpData) => {
  return {
    type: GET_SLIDE_SUCCESS,
    payload: SignUpData,
    loading: false,
  };
};
const getAllSlideFailure = (error) => {
  return {
    type: GET_SLIDE_FAILURE,
    payload: error,
    loading: false,
  };
};
const getAllSlide = (model_id) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(getAllSlideRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/all-questions/${model_id}`;

      var res = await axios.get(api);
      const { data } = res;
      loading = false;
      dispatch(getAllSlideSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getAllSlideFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllSlideRequest,
  getAllSlideSuccess,
  getAllSlideFailure,
  getAllSlide,
};

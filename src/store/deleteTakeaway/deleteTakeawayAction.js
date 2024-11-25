import axios from "axios";
import {
  DELETE_TAKEAWAY_REQUEST,
  DELETE_TAKEAWAY_SUCCESS,
  DELETE_TAKEAWAY_FAILURE,
} from "./deleteTakeawayType";

const deleteTakeawayRequest = (data) => {
  return {
    type: DELETE_TAKEAWAY_REQUEST,
    loading: true,
  };
};
const deleteTakeawaySuccess = (data) => {
  return {
    type: DELETE_TAKEAWAY_SUCCESS,
    payload: data,
    loading: false,
  };
};
const deleteTakeawayFailure = (error) => {
  return {
    type: DELETE_TAKEAWAY_FAILURE,
    payload: error,
    loading: false,
  };
};
const deleteTakeaway = (state) => {
  console.log(state);
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(deleteTakeawayRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/delete-takeaway`;
      var res = await axios.post(api, state);
      const { data } = res;
      loading = false;
      dispatch(deleteTakeawaySuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(deleteTakeawayFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  deleteTakeawayRequest,
  deleteTakeawaySuccess,
  deleteTakeawayFailure,
  deleteTakeaway,
};

import axios from "axios";
import {
  ADD_TAKEAWAY_REQUEST,
  ADD_TAKEAWAY_SUCCESS,
  ADD_TAKEAWAY_FAILURE,
} from "./addTakeawayType";

const addTakeawayRequest = (data) => {
  return {
    type: ADD_TAKEAWAY_REQUEST,
    loading: true,
  };
};
const addTakeawaySuccess = (data) => {
  return {
    type: ADD_TAKEAWAY_SUCCESS,
    payload: data,
    loading: false,
  };
};
const addTakeawayFailure = (error) => {
  return {
    type: ADD_TAKEAWAY_FAILURE,
    payload: error,
    loading: false,
  };
};
const addTakeaway = (state) => {
  console.log(state);
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(addTakeawayRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/add-takeaway`;
      var res = await axios.post(api, state);
      const { data } = res;
      console.log(res);
      loading = false;
      dispatch(addTakeawaySuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addTakeawayFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addTakeawayRequest,
  addTakeawaySuccess,
  addTakeawayFailure,
  addTakeaway,
};

import axios from "axios";
import {
  GET_EVENT_ID_REQUEST,
  GET_EVENT_ID_SUCCESS,
  GET_EVENT_ID_FAILURE,
} from "./getEventIdType";

const getEventIdRequest = (data) => {
  return {
    type: GET_EVENT_ID_REQUEST,
    loading: true,
  };
};
const getEventIdSuccess = (SignUpData) => {
  return {
    type: GET_EVENT_ID_SUCCESS,
    payload: SignUpData,
    loading: false,
  };
};
const getEventIdFailure = (error) => {
  return {
    type: GET_EVENT_ID_FAILURE,
    payload: error,
    loading: false,
  };
};
const getEventId = (model_id) => {
  let loading = true;
  return async (dispatch) => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const config = { headers: { Authorization: `Bearer ` + auth.token } };
      dispatch(getEventIdRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/nla_api/event_id_status/${model_id}`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getEventIdSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getEventIdFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getEventIdRequest,
  getEventIdSuccess,
  getEventIdFailure,
  getEventId,
};

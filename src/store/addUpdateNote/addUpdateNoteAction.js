import axios from "axios";
import {
  ADD_UPDATE_NOTE_REQUEST,
  ADD_UPDATE_NOTE_SUCCESS,
  ADD_UPDATE_NOTE_FAILURE,
} from "./addUpdateNoteType";

const addUpdateNoteRequest = (data) => {
  return {
    type: ADD_UPDATE_NOTE_REQUEST,
    loading: true,
  };
};
const addUpdateNoteSuccess = (data) => {
  return {
    type: ADD_UPDATE_NOTE_SUCCESS,
    payload: data,
    loading: false,
  };
};
const addUpdateNoteFailure = (error) => {
  return {
    type: ADD_UPDATE_NOTE_FAILURE,
    payload: error,
    loading: false,
  };
};
const addUpdateNote = (state) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(addUpdateNoteRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/add-note`;
      var res = await axios.post(api, state);
      const { data } = res;
      console.log(res);
      loading = false;
      dispatch(addUpdateNoteSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addUpdateNoteFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addUpdateNoteRequest,
  addUpdateNoteSuccess,
  addUpdateNoteFailure,
  addUpdateNote,
};

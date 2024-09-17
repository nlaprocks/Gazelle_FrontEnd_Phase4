import axios from "axios";
import {
  ADD_ADMIN_QUESTION_REQUEST,
  ADD_ADMIN_QUESTION_SUCCESS,
  ADD_ADMIN_QUESTION_FAILURE,
} from "./addAdminQuestionType";

const addAdminQuestionRequest = (data) => {
  return {
    type: ADD_ADMIN_QUESTION_REQUEST,
    loading: true,
  };
};
const addAdminQuestionSuccess = (state) => {
  return {
    type: ADD_ADMIN_QUESTION_SUCCESS,
    payload: state,
    loading: false,
  };
};
const addAdminQuestionFailure = (error) => {
  return {
    type: ADD_ADMIN_QUESTION_FAILURE,
    payload: error,
    loading: false,
  };
};
const addAdminQuestion = (details) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(addAdminQuestionRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/add-admin-question`;
      var res = await axios.post(api, details, config);
      const { data } = res;
      loading = false;
      dispatch(addAdminQuestionSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addAdminQuestionFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addAdminQuestionRequest,
  addAdminQuestionSuccess,
  addAdminQuestionFailure,
  addAdminQuestion,
};

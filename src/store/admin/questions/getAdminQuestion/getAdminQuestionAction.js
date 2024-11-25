import axios from "axios";
import {
  GET_ADMIN_QUESTION_REQUEST,
  GET_ADMIN_QUESTION_SUCCESS,
  GET_ADMIN_QUESTION_FAILURE,
} from "./getAdminQuestionType";

const getAdminQuestionRequest = (data) => {
  return {
    type: GET_ADMIN_QUESTION_REQUEST,
    loading: true,
  };
};
const getAdminQuestionSuccess = (state) => {
  return {
    type: GET_ADMIN_QUESTION_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getAdminQuestionFailure = (error) => {
  return {
    type: GET_ADMIN_QUESTION_FAILURE,
    payload: error,
    loading: false,
  };
};
const getAdminQuestion = () => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getAdminQuestionRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/get-admin-questions`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getAdminQuestionSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getAdminQuestionFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAdminQuestionRequest,
  getAdminQuestionSuccess,
  getAdminQuestionFailure,
  getAdminQuestion,
};

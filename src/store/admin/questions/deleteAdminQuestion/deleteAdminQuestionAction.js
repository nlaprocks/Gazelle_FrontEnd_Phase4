import axios from "axios";
import {
  DELETE_ADMIN_QUESTION_REQUEST,
  DELETE_ADMIN_QUESTION_SUCCESS,
  DELETE_ADMIN_QUESTION_FAILURE,
} from "./deleteAdminQuestionType";

const deleteAdminQuestionRequest = (data) => {
  return {
    type: DELETE_ADMIN_QUESTION_REQUEST,
    loading: true,
  };
};
const deleteAdminQuestionSuccess = (state) => {
  return {
    type: DELETE_ADMIN_QUESTION_SUCCESS,
    payload: state,
    loading: false,
  };
};
const deleteAdminQuestionFailure = (error) => {
  return {
    type: DELETE_ADMIN_QUESTION_FAILURE,
    payload: error,
    loading: false,
  };
};
const deleteAdminQuestion = (id) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(deleteAdminQuestionRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/delete-admin-question/${id}`;
      var res = await axios.delete(api, config);
      const { data } = res;
      loading = false;
      dispatch(deleteAdminQuestionSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(deleteAdminQuestionFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  deleteAdminQuestionRequest,
  deleteAdminQuestionSuccess,
  deleteAdminQuestionFailure,
  deleteAdminQuestion,
};

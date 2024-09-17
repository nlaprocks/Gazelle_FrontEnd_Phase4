import axios from "axios";
import {
  UPDATE_ADMIN_QUESTION_REQUEST,
  UPDATE_ADMIN_QUESTION_SUCCESS,
  UPDATE_ADMIN_QUESTION_FAILURE,
} from "./updateAdminQuestionType";

const updateAdminQuestionRequest = (data) => {
  return {
    type: UPDATE_ADMIN_QUESTION_REQUEST,
    loading: true,
  };
};
const updateAdminQuestionSuccess = (state) => {
  return {
    type: UPDATE_ADMIN_QUESTION_SUCCESS,
    payload: state,
    loading: false,
  };
};
const updateAdminQuestionFailure = (error) => {
  return {
    type: UPDATE_ADMIN_QUESTION_FAILURE,
    payload: error,
    loading: false,
  };
};
const updateAdminQuestion = (details) => {
  console.log("details", details);
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(updateAdminQuestionRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/update-admin-question`;
      var res = await axios.post(api, details, config);
      const { data } = res;
      loading = false;
      dispatch(updateAdminQuestionSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(updateAdminQuestionFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  updateAdminQuestionRequest,
  updateAdminQuestionSuccess,
  updateAdminQuestionFailure,
  updateAdminQuestion,
};

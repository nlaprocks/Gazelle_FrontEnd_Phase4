import axios from "axios";
import {
  GET_ADMIN_QUESTION_BY_MODELID_REQUEST,
  GET_ADMIN_QUESTION_BY_MODELID_SUCCESS,
  GET_ADMIN_QUESTION_BY_MODELID_FAILURE,
} from "./getAdminQuestionByModelIdType";

const getAdminQuestionByModelIdRequest = (data) => {
  return {
    type: GET_ADMIN_QUESTION_BY_MODELID_REQUEST,
    loading: true,
  };
};
const getAdminQuestionByModelIdSuccess = (state) => {
  return {
    type: GET_ADMIN_QUESTION_BY_MODELID_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getAdminQuestionByModelIdFailure = (error) => {
  return {
    type: GET_ADMIN_QUESTION_BY_MODELID_FAILURE,
    payload: error,
    loading: false,
  };
};
const getAdminQuestionByModelId = (model_id) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getAdminQuestionByModelIdRequest(loading));
      // removing model id for now
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/get-admin-questions/${model_id}`;
      // const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/get-admin-questions`;
      var res = await axios.get(api, config);

      const { data } = res;
      console.log("res data: ", data);
      loading = false;
      dispatch(getAdminQuestionByModelIdSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getAdminQuestionByModelIdFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAdminQuestionByModelIdRequest,
  getAdminQuestionByModelIdSuccess,
  getAdminQuestionByModelIdFailure,
  getAdminQuestionByModelId,
};

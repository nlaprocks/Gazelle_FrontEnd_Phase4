import axios from "axios";
import {
  GET_QUESTIONS_PER_TYPE_REQUEST,
  GET_QUESTIONS_PER_TYPE_SUCCESS,
  GET_QUESTIONS_PER_TYPE_FAILURE,
} from "./getQuestionsPerTypeType";

const getQuestionsPerTypeRequest = () => {
  return {
    type: GET_QUESTIONS_PER_TYPE_REQUEST,
    loading: true,
  };
};
const getQuestionsPerTypeSuccess = (state) => {
  return {
    type: GET_QUESTIONS_PER_TYPE_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getQuestionsPerTypeFailure = (error) => {
  return {
    type: GET_QUESTIONS_PER_TYPE_FAILURE,
    payload: error,
    loading: false,
  };
};
const getQuestionsPerType = (project_id, type) => {
  console.log("project_id", project_id);
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getQuestionsPerTypeRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/questions-per-type/${project_id}/${type}`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getQuestionsPerTypeSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getQuestionsPerTypeFailure(msg));
      console.log(error);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getQuestionsPerTypeRequest,
  getQuestionsPerTypeSuccess,
  getQuestionsPerTypeFailure,
  getQuestionsPerType,
};

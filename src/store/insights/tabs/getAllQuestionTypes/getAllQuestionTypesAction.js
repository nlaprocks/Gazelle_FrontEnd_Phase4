import axios from "axios";
import {
  GET_ALL_QUESTION_TYPES_REQUEST,
  GET_ALL_QUESTION_TYPES_SUCCESS,
  GET_ALL_QUESTION_TYPES_FAILURE,
} from "./getAllQuestionTypesType";

const getAllQuestionTypesRequest = () => {
  return {
    type: GET_ALL_QUESTION_TYPES_REQUEST,
    loading: true,
  };
};
const getAllQuestionTypesSuccess = (state) => {
  return {
    type: GET_ALL_QUESTION_TYPES_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getAllQuestionTypesFailure = (error) => {
  return {
    type: GET_ALL_QUESTION_TYPES_FAILURE,
    payload: error,
    loading: false,
  };
};
const getAllQuestionTypes = (project_id) => {
  console.log("project_id", project_id);
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getAllQuestionTypesRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/question-types/${project_id}`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getAllQuestionTypesSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getAllQuestionTypesFailure(msg));
      console.log(error);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllQuestionTypesRequest,
  getAllQuestionTypesSuccess,
  getAllQuestionTypesFailure,
  getAllQuestionTypes,
};

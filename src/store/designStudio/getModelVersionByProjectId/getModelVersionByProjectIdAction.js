import axios from "axios";
import {
  GET_MODEL_VERSION_BY_PROJECT_ID_REQUEST,
  GET_MODEL_VERSION_BY_PROJECT_ID_SUCCESS,
  GET_MODEL_VERSION_BY_PROJECT_ID_FAILURE,
} from "./getModelVersionByProjectIdType";

const getModelVersionByProjectIdRequest = () => {
  return {
    type: GET_MODEL_VERSION_BY_PROJECT_ID_REQUEST,
    loading: true,
  };
};
const getModelVersionByProjectIdSuccess = (state) => {
  return {
    type: GET_MODEL_VERSION_BY_PROJECT_ID_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getModelVersionByProjectIdFailure = (error) => {
  return {
    type: GET_MODEL_VERSION_BY_PROJECT_ID_FAILURE,
    payload: error,
    loading: false,
  };
};
const getModelVersionByProjectId = (project_id) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getModelVersionByProjectIdRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/model/get-model-versions/${project_id}`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getModelVersionByProjectIdSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getModelVersionByProjectIdFailure(msg));
      console.log(error);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getModelVersionByProjectIdRequest,
  getModelVersionByProjectIdSuccess,
  getModelVersionByProjectIdFailure,
  getModelVersionByProjectId,
};

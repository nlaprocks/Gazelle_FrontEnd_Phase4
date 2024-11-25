import axios from "axios";
import {
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
} from "./deleteProjectType";

const deleteProjectRequest = () => {
  return {
    type: DELETE_PROJECT_REQUEST,
    loading: true,
  };
};
const deleteProjectSuccess = (state) => {
  return {
    type: DELETE_PROJECT_SUCCESS,
    payload: state,
    loading: false,
  };
};
const deleteProjectFailure = (error) => {
  return {
    type: DELETE_PROJECT_FAILURE,
    payload: error,
    loading: false,
  };
};
const deleteProject = (project_id) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(deleteProjectRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/delete-project/${project_id}`;
      var res = await axios.delete(api, config);
      const { data } = res;
      loading = false;
      dispatch(deleteProjectSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(deleteProjectFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectFailure,
  deleteProject,
};

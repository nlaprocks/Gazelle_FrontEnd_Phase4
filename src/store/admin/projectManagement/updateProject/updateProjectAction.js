import axios from "axios";
import {
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
} from "./updateProjectType";

const updateProjectRequest = () => {
  return {
    type: UPDATE_PROJECT_REQUEST,
    loading: true,
  };
};
const updateProjectSuccess = (state) => {
  return {
    type: UPDATE_PROJECT_SUCCESS,
    payload: state,
    loading: false,
  };
};
const updateProjectFailure = (error) => {
  return {
    type: UPDATE_PROJECT_FAILURE,
    payload: error,
    loading: false,
  };
};
const updateProject = (project) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(updateProjectRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/edit-project`;
      var res = await axios.put(api, project, config);
      const { data } = res;
      loading = false;
      dispatch(updateProjectSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(updateProjectFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectFailure,
  updateProject,
};

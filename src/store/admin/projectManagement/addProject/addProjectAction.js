import axios from "axios";
import {
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILURE,
} from "./addProjectType";

const addProjectRequest = () => {
  return {
    type: ADD_PROJECT_REQUEST,
    loading: true,
  };
};
const addProjectSuccess = (state) => {
  return {
    type: ADD_PROJECT_SUCCESS,
    payload: state,
    loading: false,
  };
};
const addProjectFailure = (error) => {
  return {
    type: ADD_PROJECT_FAILURE,
    payload: error,
    loading: false,
  };
};
const addProject = (project) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(addProjectRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/add-project`;
      var res = await axios.post(api, project, config);
      const { data } = res;
      loading = false;
      dispatch(addProjectSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addProjectFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addProjectRequest,
  addProjectSuccess,
  addProjectFailure,
  addProject,
};

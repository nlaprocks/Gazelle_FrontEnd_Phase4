import axios from "axios";
import {
  GET_ALL_PROJECTS_REQUEST,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_FAILURE,
} from "./getAllProjectsType";

const getAllProjectsRequest = () => {
  return {
    type: GET_ALL_PROJECTS_REQUEST,
    loading: true,
  };
};
const getAllProjectsSuccess = (state) => {
  return {
    type: GET_ALL_PROJECTS_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getAllProjectsFailure = (error) => {
  return {
    type: GET_ALL_PROJECTS_FAILURE,
    payload: error,
    loading: false,
  };
};
const getAllProjects = () => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getAllProjectsRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/get-all-projects`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getAllProjectsSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getAllProjectsFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllProjectsRequest,
  getAllProjectsSuccess,
  getAllProjectsFailure,
  getAllProjects,
};

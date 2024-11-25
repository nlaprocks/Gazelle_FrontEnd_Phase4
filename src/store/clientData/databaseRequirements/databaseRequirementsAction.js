import axios from "axios";
import {
  DATABASE_REQUIREMENTS_REQUEST,
  DATABASE_REQUIREMENTS_SUCCESS,
  DATABASE_REQUIREMENTS_FAILURE,
} from "./databaseRequirementsType";

const databaseRequirementsRequest = (data) => {
  return {
    type: DATABASE_REQUIREMENTS_REQUEST,
    loading: true,
  };
};
const databaseRequirementsSuccess = (data) => {
  return {
    type: DATABASE_REQUIREMENTS_SUCCESS,
    payload: data,
    loading: false,
  };
};
const databaseRequirementsFailure = (error) => {
  return {
    type: DATABASE_REQUIREMENTS_FAILURE,
    payload: error,
    loading: false,
  };
};
const databaseRequirements = () => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(databaseRequirementsRequest(loading));
      const api = `${process.env.REACT_APP_NGROK}/client-data/database-requirements`;
      var res = await axios.get(api);
      const { data } = res;
      loading = false;
      console.log(res);
      dispatch(databaseRequirementsSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(databaseRequirementsFailure(msg));
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  databaseRequirementsRequest,
  databaseRequirementsSuccess,
  databaseRequirementsFailure,
  databaseRequirements,
};

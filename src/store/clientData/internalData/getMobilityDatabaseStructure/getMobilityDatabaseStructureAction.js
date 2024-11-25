import axios from "axios";
import {
  GET_MOBILITY_DATABASE_STRUCTURE_REQUEST,
  GET_MOBILITY_DATABASE_STRUCTURE_SUCCESS,
  GET_MOBILITY_DATABASE_STRUCTURE_FAILURE,
} from "./getMobilityDatabaseStructureType";

const getMobilityDatabaseStructureRequest = (data) => {
  return {
    type: GET_MOBILITY_DATABASE_STRUCTURE_REQUEST,
    loading: true,
  };
};
const getMobilityDatabaseStructureSuccess = (data) => {
  return {
    type: GET_MOBILITY_DATABASE_STRUCTURE_SUCCESS,
    payload: data,
    loading: false,
  };
};
const getMobilityDatabaseStructureFailure = (error) => {
  return {
    type: GET_MOBILITY_DATABASE_STRUCTURE_FAILURE,
    payload: error,
    loading: false,
  };
};
const getMobilityDatabaseStructure = () => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(getMobilityDatabaseStructureRequest(loading));
      const api = `${process.env.REACT_APP_NGROK}/internal-data/mobility/database-structure`;
      var res = await axios.get(api);
      const { data } = res;
      loading = false;
      dispatch(getMobilityDatabaseStructureSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getMobilityDatabaseStructureFailure(msg));
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getMobilityDatabaseStructureRequest,
  getMobilityDatabaseStructureSuccess,
  getMobilityDatabaseStructureFailure,
  getMobilityDatabaseStructure,
};

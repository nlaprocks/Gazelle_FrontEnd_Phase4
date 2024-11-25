import axios from "axios";
import {
  GET_COMPETITORS_DATABASE_STRUCTURE_REQUEST,
  GET_COMPETITORS_DATABASE_STRUCTURE_SUCCESS,
  GET_COMPETITORS_DATABASE_STRUCTURE_FAILURE,
} from "./getCompetitorsDatabaseStructureType";

const getCompetitorsDatabaseStructureRequest = (data) => {
  return {
    type: GET_COMPETITORS_DATABASE_STRUCTURE_REQUEST,
    loading: true,
  };
};
const getCompetitorsDatabaseStructureSuccess = (data) => {
  return {
    type: GET_COMPETITORS_DATABASE_STRUCTURE_SUCCESS,
    payload: data,
    loading: false,
  };
};
const getCompetitorsDatabaseStructureFailure = (error) => {
  return {
    type: GET_COMPETITORS_DATABASE_STRUCTURE_FAILURE,
    payload: error,
    loading: false,
  };
};
const getCompetitorsDatabaseStructure = () => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(getCompetitorsDatabaseStructureRequest(loading));
      const api = `${process.env.REACT_APP_NGROK}/internal-data/competitors/database-structure`;
      var res = await axios.get(api);
      const { data } = res;
      loading = false;
      dispatch(getCompetitorsDatabaseStructureSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getCompetitorsDatabaseStructureFailure(msg));
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCompetitorsDatabaseStructureRequest,
  getCompetitorsDatabaseStructureSuccess,
  getCompetitorsDatabaseStructureFailure,
  getCompetitorsDatabaseStructure,
};

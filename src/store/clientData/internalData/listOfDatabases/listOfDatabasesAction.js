import axios from "axios";

import {
  LIST_OF_DATABASES_REQUEST,
  LIST_OF_DATABASES_SUCCESS,
  LIST_OF_DATABASES_FAILURE,
} from "./listOfDatabasesType";

const listOfDatabasesRequest = (data) => {
  return {
    type: LIST_OF_DATABASES_REQUEST,
    loading: true,
  };
};
const listOfDatabasesSuccess = (data) => {
  return {
    type: LIST_OF_DATABASES_SUCCESS,
    payload: data,
    loading: false,
  };
};
const listOfDatabasesFailure = (error) => {
  return {
    type: LIST_OF_DATABASES_FAILURE,
    payload: error,
    loading: false,
  };
};
const listOfDatabases = (state) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(listOfDatabasesRequest(loading));
      const api = `${process.env.REACT_APP_NGROK}/internal-data/database`;
      var res = await axios.get(api);
      const { data } = res;
      loading = false;
      dispatch(listOfDatabasesSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(listOfDatabasesFailure(msg));
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  listOfDatabasesRequest,
  listOfDatabasesSuccess,
  listOfDatabasesFailure,
  listOfDatabases,
};

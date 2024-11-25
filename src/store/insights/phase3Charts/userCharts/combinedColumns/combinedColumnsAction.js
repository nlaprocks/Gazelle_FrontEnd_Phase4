// combinedColumnsAction.js
import axios from "axios";
import {
  FETCH_COMBINED_COLUMNS_REQUEST,
  FETCH_COMBINED_COLUMNS_SUCCESS,
  FETCH_COMBINED_COLUMNS_FAILURE,
} from "./combinedColumnsType";

const fetchCombinedColumnsRequest = () => {
  return {
    type: FETCH_COMBINED_COLUMNS_REQUEST,
  };
};

const fetchCombinedColumnsSuccess = (columns) => {
  return {
    type: FETCH_COMBINED_COLUMNS_SUCCESS,
    payload: columns,
  };
};

const fetchCombinedColumnsFailure = (error) => {
  return {
    type: FETCH_COMBINED_COLUMNS_FAILURE,
    payload: error,
  };
};

const fetchCombinedColumns = ({ project_id, model_id }) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCombinedColumnsRequest());
      const api = `${process.env.REACT_APP_NGROK}/insights/user-charts/columns?project_id=${project_id}&model_id=${model_id}`;
      const res = await axios.get(api);
      const { data } = res;
      dispatch(fetchCombinedColumnsSuccess(data));
    } catch (error) {
      const msg = error.response;
      dispatch(fetchCombinedColumnsFailure(msg));
      console.log(error);
    }
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchCombinedColumnsRequest,
  fetchCombinedColumnsSuccess,
  fetchCombinedColumnsFailure,
  fetchCombinedColumns,
};

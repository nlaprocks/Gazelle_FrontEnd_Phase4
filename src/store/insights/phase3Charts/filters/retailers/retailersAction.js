// retailersAction.js
import axios from "axios";
import {
  FETCH_RETAILERS_REQUEST,
  FETCH_RETAILERS_SUCCESS,
  FETCH_RETAILERS_FAILURE,
} from "./retailersType";

const fetchRetailersRequest = () => {
  return {
    type: FETCH_RETAILERS_REQUEST,
  };
};

const fetchRetailersSuccess = (retailers) => {
  return {
    type: FETCH_RETAILERS_SUCCESS,
    payload: retailers,
  };
};

const fetchRetailersFailure = (error) => {
  return {
    type: FETCH_RETAILERS_FAILURE,
    payload: error,
  };
};

const fetchRetailers = ({ project_id, model_id }) => {
  return async (dispatch) => {
    try {
      dispatch(fetchRetailersRequest());
      // Replace with your API endpoint for fetching retailers
      const api = `${process.env.REACT_APP_NGROK}/insights/retialers?project_id=${project_id}&model_id=${model_id}`;
      const res = await axios.get(api);
      const { data } = res;
      dispatch(fetchRetailersSuccess(data));
    } catch (error) {
      const msg = error.response;
      dispatch(fetchRetailersFailure(msg));
      console.log(error);
    }
  };
};

export default {
  fetchRetailersRequest,
  fetchRetailersSuccess,
  fetchRetailersFailure,
  fetchRetailers,
};

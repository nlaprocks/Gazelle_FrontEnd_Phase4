import {
  ADD_MODEL_WITH_VERSION_REQUEST,
  ADD_MODEL_WITH_VERSION_SUCCESS,
  ADD_MODEL_WITH_VERSION_FAILURE,
} from "./addModelWithVersionType";
import axios from "axios";

const addModelWithVersionRequest = (data) => {
  return {
    type: ADD_MODEL_WITH_VERSION_REQUEST,
    loading: true,
  };
};
const addModelWithVersionSuccess = (SignInData) => {
  return {
    type: ADD_MODEL_WITH_VERSION_SUCCESS,
    payload: SignInData,
    loading: false,
  };
};
const addModelWithVersionFailure = (error) => {
  return {
    type: ADD_MODEL_WITH_VERSION_FAILURE,
    payload: error,
    loading: false,
  };
};

const addModelWithVersion = (modelData) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(addModelWithVersionRequest(loading));
      const auth = JSON.parse(localStorage.getItem("auth"));
      const config = { headers: { Authorization: `Bearer ` + auth.token } };
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/model/add/with/version`;
      var res = await axios.post(api, modelData, config);
      const { data } = res;
      loading = false;
      dispatch(addModelWithVersionSuccess(data, loading));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(addModelWithVersionFailure(msg, loading));
      console.log(msg);
    }
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addModelWithVersionRequest,
  addModelWithVersionSuccess,
  addModelWithVersionFailure,
  addModelWithVersion,
};

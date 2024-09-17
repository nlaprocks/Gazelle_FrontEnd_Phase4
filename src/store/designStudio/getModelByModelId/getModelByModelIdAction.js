import axios from "axios";
import {
  GET_MODEL_BY_MODEL_ID_REQUEST,
  GET_MODEL_BY_MODEL_ID_SUCCESS,
  GET_MODEL_BY_MODEL_ID_FAILURE,
} from "./getModelByModelIdType";

const getModelByModelIdRequest = () => {
  return {
    type: GET_MODEL_BY_MODEL_ID_REQUEST,
    loading: true,
  };
};
const getModelByModelIdSuccess = (state) => {
  return {
    type: GET_MODEL_BY_MODEL_ID_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getModelByModelIdFailure = (error) => {
  return {
    type: GET_MODEL_BY_MODEL_ID_FAILURE,
    payload: error,
    loading: false,
  };
};
const getModelByModelId = (model_id) => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getModelByModelIdRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/model/get-model/${model_id}`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getModelByModelIdSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getModelByModelIdFailure(msg));
      console.log(error);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getModelByModelIdRequest,
  getModelByModelIdSuccess,
  getModelByModelIdFailure,
  getModelByModelId,
};

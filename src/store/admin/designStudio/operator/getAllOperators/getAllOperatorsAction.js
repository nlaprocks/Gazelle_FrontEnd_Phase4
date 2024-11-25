import axios from "axios";
import { GET_ALL_OPERATORS_REQUEST, GET_ALL_OPERATORS_SUCCESS, GET_ALL_OPERATORS_FAILURE } from "./getAllOperatorsType";

const getAllOperatorsRequest = () => {
  return {
    type: GET_ALL_OPERATORS_REQUEST,
    loading: true,
  };
};
const getAllOperatorsSuccess = (state) => {
  return {
    type: GET_ALL_OPERATORS_SUCCESS,
    payload: state,
    loading: false,
  };
};
const getAllOperatorsFailure = (error) => {
  return {
    type: GET_ALL_OPERATORS_FAILURE,
    payload: error,
    loading: false,
  };
};
const getAllOperators = () => {
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(getAllOperatorsRequest(loading));
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/admin/get-all-operators`;
      var res = await axios.get(api, config);
      const { data } = res;
      loading = false;
      dispatch(getAllOperatorsSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(getAllOperatorsFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllOperatorsRequest,
  getAllOperatorsSuccess,
  getAllOperatorsFailure,
  getAllOperators,
};

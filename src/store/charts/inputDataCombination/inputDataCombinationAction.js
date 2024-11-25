import axios from "axios";
import {
  INPUT_DATA_COMBINATION_REQUEST,
  INPUT_DATA_COMBINATION_SUCCESS,
  INPUT_DATA_COMBINATION_FAILURE,
} from "./inputDataCombinationType";

const inputDataCombinationRequest = () => {
  return {
    type: INPUT_DATA_COMBINATION_REQUEST,
    loading: true,
  };
};
const inputDataCombinationSuccess = (state) => {
  return {
    type: INPUT_DATA_COMBINATION_SUCCESS,
    payload: state,
    loading: false,
  };
};
const inputDataCombinationFailure = (error) => {
  return {
    type: INPUT_DATA_COMBINATION_FAILURE,
    payload: error,
    loading: false,
  };
};
const inputDataCombination = ({ project_id, model_id }) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(inputDataCombinationRequest(loading));
      const api = `${process.env.REACT_APP_NGROK}/insights/input-data/combs?project_id=${project_id}&model_id=${model_id}`;
      var res = await axios.get(api);
      const { data } = res;
      loading = false;
      dispatch(inputDataCombinationSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(inputDataCombinationFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  inputDataCombinationRequest,
  inputDataCombinationSuccess,
  inputDataCombinationFailure,
  inputDataCombination,
};

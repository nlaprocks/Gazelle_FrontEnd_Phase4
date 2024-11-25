import axios from "axios";
import {
  OUTPUT_DATA_COMBINATION_REQUEST,
  OUTPUT_DATA_COMBINATION_SUCCESS,
  OUTPUT_DATA_COMBINATION_FAILURE,
} from "./outputDataCombinationType";

const outputDataCombinationRequest = () => {
  return {
    type: OUTPUT_DATA_COMBINATION_REQUEST,
    loading: true,
  };
};
const outputDataCombinationSuccess = (state) => {
  return {
    type: OUTPUT_DATA_COMBINATION_SUCCESS,
    payload: state,
    loading: false,
  };
};
const outputDataCombinationFailure = (error) => {
  return {
    type: OUTPUT_DATA_COMBINATION_FAILURE,
    payload: error,
    loading: false,
  };
};
const outputDataCombination = ({ project_id, model_id }) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(outputDataCombinationRequest(loading));
      const api = `${process.env.REACT_APP_NGROK}/insights/output-data/combs?project_id=${project_id}&model_id=${model_id}`;
      var res = await axios.get(api);
      const { data } = res;
      loading = false;
      dispatch(outputDataCombinationSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(outputDataCombinationFailure(msg));
      console.log(msg);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  outputDataCombinationRequest,
  outputDataCombinationSuccess,
  outputDataCombinationFailure,
  outputDataCombination,
};

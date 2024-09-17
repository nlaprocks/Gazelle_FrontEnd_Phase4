import {
  OUTPUT_DATA_COMBINATION_REQUEST,
  OUTPUT_DATA_COMBINATION_SUCCESS,
  OUTPUT_DATA_COMBINATION_FAILURE,
} from "./outputDataCombinationType";
const initialState = {
  success: false,
  loading: false,
  outputData: [],
  error: "",
};
const outputDataCombinationReducer = (state = initialState, action) => {
  switch (action.type) {
    case OUTPUT_DATA_COMBINATION_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case OUTPUT_DATA_COMBINATION_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        outputData: action.payload,
        error: "",
      };
      return setSignUpState;
    case OUTPUT_DATA_COMBINATION_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        outputData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default outputDataCombinationReducer;

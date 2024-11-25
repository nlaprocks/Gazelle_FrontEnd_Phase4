import {
  INPUT_DATA_COMBINATION_REQUEST,
  INPUT_DATA_COMBINATION_SUCCESS,
  INPUT_DATA_COMBINATION_FAILURE,
} from "./inputDataCombinationType";
const initialState = {
  success: false,
  loading: false,
  inputData: [],
  error: "",
};
const inputDataCombinationReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_DATA_COMBINATION_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case INPUT_DATA_COMBINATION_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        inputData: action.payload,
        error: "",
      };
      return setSignUpState;
    case INPUT_DATA_COMBINATION_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        inputData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default inputDataCombinationReducer;

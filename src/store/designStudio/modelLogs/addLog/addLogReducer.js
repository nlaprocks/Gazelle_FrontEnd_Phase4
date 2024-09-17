import {
  ADD_LOG_REQUEST,
  ADD_LOG_SUCCESS,
  ADD_LOG_FAILURE,
} from "./addLogType";
const initialState = {
  success: false,
  loading: false,
  log: [],
  error: "",
};
const addLogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOG_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_LOG_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        log: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_LOG_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        log: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default addLogReducer;

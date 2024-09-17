import {
  GET_ALL_LOG_REQUEST,
  GET_ALL_LOG_SUCCESS,
  GET_ALL_LOG_FAILURE,
} from "./getAllLogType";
const initialState = {
  success: false,
  loading: false,
  log: [],
  error: "",
};
const getAllLogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LOG_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_ALL_LOG_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        log: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_ALL_LOG_FAILURE:
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
export default getAllLogReducer;

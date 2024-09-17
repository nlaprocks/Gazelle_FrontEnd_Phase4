import {
  CLIENT_CSV_FILE_REQUEST,
  CLIENT_CSV_FILE_SUCCESS,
  CLIENT_CSV_FILE_FAILURE,
} from "./clientCsvFileType";
const IState = {
  success: false,
  loading: false,
  clientCSV: [],
  error: "",
};
const clientCsvFileReducer = (state = IState, action) => {
  switch (action.type) {
    case CLIENT_CSV_FILE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case CLIENT_CSV_FILE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        clientCSV: action.payload,
        error: "",
      };
      return setSignUpState;
    case CLIENT_CSV_FILE_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        clientCSV: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default clientCsvFileReducer;

import {
  FETCH_CLIENT_DATA_REQUEST,
  FETCH_CLIENT_DATA_SUCCESS,
  FETCH_CLIENT_DATA_FAILURE,
} from "./runModelType";
const IState = {
  success: false,
  loading: false,
  clientData: [],
  error: "",
};
const runModelReducer = (state = IState, action) => {
  switch (action.type) {
    case FETCH_CLIENT_DATA_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case FETCH_CLIENT_DATA_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        clientData: action.payload,
        error: "",
      };
      return setSignUpState;
    case FETCH_CLIENT_DATA_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        clientData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default runModelReducer;

import {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
} from "./sendEmailType";
const initialState = {
  success: false,
  loading: false,
  sendEmail: [],
  error: "",
};
const sendEmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_EMAIL_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case SEND_EMAIL_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        sendEmail: action.payload,
        error: "",
      };
      return setSignUpState;
    case SEND_EMAIL_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        sendEmail: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default sendEmailReducer;

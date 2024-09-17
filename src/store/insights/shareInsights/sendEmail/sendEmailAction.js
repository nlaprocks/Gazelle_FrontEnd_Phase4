import axios from "axios";
import {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
} from "./sendEmailType";

const sendEmailRequest = () => {
  return {
    type: SEND_EMAIL_REQUEST,
    loading: true,
  };
};
const sendEmailSuccess = (state) => {
  return {
    type: SEND_EMAIL_SUCCESS,
    payload: state,
    loading: false,
  };
};
const sendEmailFailure = (error) => {
  return {
    type: SEND_EMAIL_FAILURE,
    payload: error,
    loading: false,
  };
};
const sendEmail = (emailData) => {
  console.log("emailData::: ", emailData);
  let loading = true;
  const auth = JSON.parse(localStorage.getItem("auth"));
  const config = { headers: { Authorization: `Bearer ` + auth.token } };
  return async (dispatch) => {
    try {
      dispatch(sendEmailRequest(loading));
      const formData = new FormData();
      formData.append("from_email", emailData.from_email);
      formData.append("to_email", emailData.to_email);
      formData.append("document", emailData.document);
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/share`;
      var res = await axios.post(api, formData, config);
      const { data } = res;
      loading = false;
      dispatch(sendEmailSuccess(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(sendEmailFailure(msg));
      console.log(error);
    }
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  sendEmailRequest,
  sendEmailSuccess,
  sendEmailFailure,
  sendEmail,
};

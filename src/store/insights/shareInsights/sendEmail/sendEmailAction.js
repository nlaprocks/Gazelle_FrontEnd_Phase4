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
// const sendEmail = (emailData) => {
//   console.log("emailData::: ", emailData);
//   let loading = true;
//   const auth = JSON.parse(localStorage.getItem("auth"));
//   const config = { headers: { Authorization: `Bearer ` + auth.token } };
//   console.log(auth.token)
//   console.log(config)
//   return async (dispatch) => {
//     try {
//       dispatch(sendEmailRequest(loading));
//       const formData = new FormData();
//       formData.append("from_email", emailData.from_email);
//       formData.append("to_email", emailData.to_email);
//       formData.append("document", emailData.document);
//       const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/share`;
//       var res = await axios.post(api, formData, config);
//       console.log(res,"resasd")
//       const { data } = res;
//       loading = false;
//       dispatch(sendEmailSuccess(data));
//     } catch (error) {
//       const msg = error.response;
//       loading = false;
//       dispatch(sendEmailFailure(msg));
//       console.log(error);
//     }
//   };
// };
const sendEmail = (emailData) => {
  console.log("emailData::: ", emailData);
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth || !auth.token) {
    console.error("Authorization token missing!");
    return;
  }
  const config = { 
    headers: { Authorization: `Bearer ${auth.token}`, "Content-Type": "multipart/form-data" },
    timeout: 10000, 
  };
  const api = `${process.env.REACT_APP_Base_URL}/api/v1/insights/share`;

  return async (dispatch) => {
    try {
      dispatch(sendEmailRequest());
      const formData = new FormData();
      formData.append("from_email", emailData.from_email);
      formData.append("to_email", emailData.to_email);
      formData.append("document", emailData.document);
    

      console.log("Sending request to API:", api);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
      // const res = await axios.post(api, formData, config);
      const res = await axios.post(api, formData, config);
      console.log("API Response:", res);
      dispatch(sendEmailSuccess(res.data));
    } catch (error) {
      console.error("API Call Failed:", error);
      const errorMsg = error.response?.data || "Unknown Error";
      dispatch(sendEmailFailure(errorMsg));
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

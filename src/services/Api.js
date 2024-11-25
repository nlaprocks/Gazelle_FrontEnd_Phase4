import axios from "axios";
const baseURL = `${process.env.REACT_APP_Base_URL}/`;

const axiosRequest = (method, url, data, header) => {
  return axios({
    url: baseURL + url,
    method,
    data,
    headers: header,
  });
};

export default axiosRequest;

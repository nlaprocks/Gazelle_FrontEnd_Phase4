import axios from "axios";

// const baseURL = "https://nlaanalytics.de.r.appspot.com/";
// const baseURL = "http://localhost:8080/";
const baseURL = "http://35.239.41.208:8082/";

export default (method, url, data, header) => {
  return axios({
    url: baseURL + url,
    method,
    data,
    headers: header,
  });
};

import axios from "axios";
import { CHART1_REQUEST, CHART1_SUCCESS, CHART1_FAILURE } from "./chart1Type";

const chart1Request = () => {
  return {
    type: CHART1_REQUEST,
    loading: true,
  };
};

const chart1Success = (data) => {
  return {
    type: CHART1_SUCCESS,
    payload: data,
    loading: false,
  };
};

const chart1Failure = (error) => {
  return {
    type: CHART1_FAILURE,
    payload: error,
    loading: false,
  };
};

const fetchChart1Data = ({ project_id, model_id, products, retailers, brands, date_start, date_end }) => {
  let loading = true;
  return async (dispatch) => {
    try {
      dispatch(chart1Request(loading));
      let api = `${process.env.REACT_APP_NGROK}/insights/chart1?project_id=${encodeURIComponent(
        project_id
      )}&model_id=${encodeURIComponent(model_id)}`;
                      //old code 
      // Add products to the API URL if the array is not empty
      if (products && products.length > 0) {
        const productParam = products.map((product) => encodeURIComponent(product)).join(encodeURIComponent(","));
        api += `&Product=${productParam}`;
      }

      // Add retailers to the API URL if the array is not empty
      if (retailers && retailers.length > 0) {
        const retailerParam = retailers.map((retailer) => encodeURIComponent(retailer)).join(encodeURIComponent(","));
        api += `&Retailer=${retailerParam}`;
      }

      // Add brands to the API URL if the array is not empty
      if (brands && brands.length > 0) {
        const brandParam = brands.map((brand) => encodeURIComponent(brand)).join(encodeURIComponent(","));
        api += `&Brand=${brandParam}`;
      }

      // Add date_start to the API URL if it's provided
      if (date_start) {
        const isoDate = date_start;
        const date = new Date(isoDate);
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
          .getDate()
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;
        api += `&date_start=${encodeURIComponent(formattedDate)}`;
      }

      // Add date_end to the API URL if it's provided
      if (date_end) {
        const isoDate = date_end;
        const date = new Date(isoDate);
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
          .getDate()
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;
        api += `&date_end=${encodeURIComponent(formattedDate)}`;
      }

      const res = await axios.get(api);
      const { data } = res;
      // console.log("data1",data)
      loading = false;
      dispatch(chart1Success(data));
    } catch (error) {
      const msg = error.response;
      loading = false;
      dispatch(chart1Failure(msg));
      console.log(error);
    }
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  chart1Request,
  chart1Success,
  chart1Failure,
  fetchChart1Data,
};

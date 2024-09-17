// userChartsDataAction.js
import axios from "axios";
import {
  FETCH_USER_CHARTS_DATA_REQUEST,
  FETCH_USER_CHARTS_DATA_SUCCESS,
  FETCH_USER_CHARTS_DATA_FAILURE,
} from "./userChartsDataType";

const fetchUserChartsDataRequest = () => {
  return {
    type: FETCH_USER_CHARTS_DATA_REQUEST,
  };
};

const fetchUserChartsDataSuccess = (data) => {
  return {
    type: FETCH_USER_CHARTS_DATA_SUCCESS,
    payload: data,
  };
};

const fetchUserChartsDataFailure = (error) => {
  return {
    type: FETCH_USER_CHARTS_DATA_FAILURE,
    payload: error,
  };
};

const fetchUserChartsData = ({ project_id, model_id, columns, retailers, products, brands }) => {
  const transformColumn = columns.join("|");
  return async (dispatch) => {
    try {
      dispatch(fetchUserChartsDataRequest());
      let api = `${process.env.REACT_APP_NGROK}/insights/user-charts/columns-data?project_id=${project_id}&model_id=${model_id}`;
      if (retailers?.length > 0) {
        const productParam = retailers?.map((product) => encodeURIComponent(product)).join(encodeURIComponent(","));
        api += `&Retailer=${productParam}`;
      }

      if (products?.length > 0) {
        const productParam = products?.map((product) => encodeURIComponent(product)).join(encodeURIComponent(","));
        api += `&Product=${productParam}`;
      }

      if (brands?.length > 0) {
        const productParam = brands?.map((product) => encodeURIComponent(product)).join(encodeURIComponent(","));
        api += `&Brand=${productParam}`;
      }

      var formdata = new FormData();
      formdata.append("cols_required", transformColumn);
      const res = await axios.post(api, formdata);
      const { data } = res;
      dispatch(fetchUserChartsDataSuccess(data));
    } catch (error) {
      const msg = error.response;
      dispatch(fetchUserChartsDataFailure(msg));
      // console.error("error::: ", error.message);
    }
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchUserChartsDataRequest,
  fetchUserChartsDataSuccess,
  fetchUserChartsDataFailure,
  fetchUserChartsData,
};

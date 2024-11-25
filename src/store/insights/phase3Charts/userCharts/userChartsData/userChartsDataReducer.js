// userChartsDataReducer.js
import {
  FETCH_USER_CHARTS_DATA_REQUEST,
  FETCH_USER_CHARTS_DATA_SUCCESS,
  FETCH_USER_CHARTS_DATA_FAILURE,
} from "./userChartsDataType";

const initialState = {
  loading: false,
  data: [],
  error: "",
  success: false,
};

const userChartsDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_CHARTS_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case FETCH_USER_CHARTS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
        success: true,
      };
    case FETCH_USER_CHARTS_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default userChartsDataReducer;

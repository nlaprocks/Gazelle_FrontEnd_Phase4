import {
  FETCH_RETAILER_BRANDS_PRODUCTS_REQUEST,
  FETCH_RETAILER_BRANDS_PRODUCTS_SUCCESS,
  FETCH_RETAILER_BRANDS_PRODUCTS_FAILURE,
} from "./retailerBrandsProductsType";

const initialState = {
  loading: false,
  data: [],
  error: "",
  success: false,
};

const retailerBrandsProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RETAILER_BRANDS_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case FETCH_RETAILER_BRANDS_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
        success: true,
      };
    case FETCH_RETAILER_BRANDS_PRODUCTS_FAILURE:
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

export default retailerBrandsProductsReducer;

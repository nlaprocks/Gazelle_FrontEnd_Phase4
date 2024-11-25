import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
} from "./getAllProductsType";
const initialState = {
  success: false,
  loading: false,
  products: [],
  error: "",
};
const getAllProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        products: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        products: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getAllProductsReducer;

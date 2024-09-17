import {
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from "./deleteProductType";
const initialState = {
  success: false,
  loading: false,
  product: [],
  error: "",
};
const deleteProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case DELETE_PRODUCT_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        product: action.payload,
        error: "",
      };
      return setSignUpState;
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        product: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default deleteProductReducer;

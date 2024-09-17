import {
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from "./updateProductType";
const initialState = {
  success: false,
  loading: false,
  product: [],
  error: "",
};
const updateProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case UPDATE_PRODUCT_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        product: action.payload,
        error: "",
      };
      return setSignUpState;
    case UPDATE_PRODUCT_FAILURE:
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
export default updateProductReducer;

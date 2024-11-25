import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
} from "./addProductType";
const initialState = {
  success: false,
  loading: false,
  product: [],
  error: "",
};
const addProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_PRODUCT_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        product: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_PRODUCT_FAILURE:
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
export default addProductReducer;

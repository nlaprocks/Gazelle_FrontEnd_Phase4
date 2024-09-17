import {
  GET_ALL_CATEGORIES_WITH_PRODUCTS_REQUEST,
  GET_ALL_CATEGORIES_WITH_PRODUCTS_SUCCESS,
  GET_ALL_CATEGORIES_WITH_PRODUCTS_FAILURE,
} from "./getAllCategoriesWithProductsType";
const initialState = {
  success: false,
  loading: false,
  categories: [],
  error: "",
};
const getAllCategoriesWithProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES_WITH_PRODUCTS_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_ALL_CATEGORIES_WITH_PRODUCTS_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        categories: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_ALL_CATEGORIES_WITH_PRODUCTS_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        categories: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getAllCategoriesWithProductsReducer;

import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAILURE,
} from "./getAllCategoriesType";
const initialState = {
  success: false,
  loading: false,
  categories: [],
  error: "",
};
const getAllCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_ALL_CATEGORIES_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        categories: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_ALL_CATEGORIES_FAILURE:
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
export default getAllCategoriesReducer;

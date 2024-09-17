import {
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
} from "./deleteCategoryType";
const initialState = {
  success: false,
  loading: false,
  category: [],
  error: "",
};
const deleteCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case DELETE_CATEGORY_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        category: action.payload,
        error: "",
      };
      return setSignUpState;
    case DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        category: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default deleteCategoryReducer;

import {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
} from "./addCategoryType";
const initialState = {
  success: false,
  loading: false,
  category: [],
  error: "",
};
const addCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_CATEGORY_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        category: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_CATEGORY_FAILURE:
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
export default addCategoryReducer;

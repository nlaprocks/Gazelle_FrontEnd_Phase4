import {
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
} from "./updateCategoryType";
const initialState = {
  success: false,
  loading: false,
  category: [],
  error: "",
};
const updateCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case UPDATE_CATEGORY_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        category: action.payload,
        error: "",
      };
      return setSignUpState;
    case UPDATE_CATEGORY_FAILURE:
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
export default updateCategoryReducer;

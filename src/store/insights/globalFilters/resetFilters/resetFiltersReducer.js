import { RESET_FILTERS_REQUEST, RESET_FILTERS_SUCCESS, RESET_FILTERS_FAILURE } from "./resetFiltersType";

const initialState = {
  success: false,
  loading: false,
  error: "",
};

const resetFiltersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FILTERS_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case RESET_FILTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        success: true,
      };
    case RESET_FILTERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default resetFiltersReducer;

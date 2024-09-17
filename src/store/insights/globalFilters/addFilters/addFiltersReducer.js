import {
  ADD_FILTERS_REQUEST,
  ADD_FILTERS_SUCCESS,
  ADD_FILTERS_FAILURE,
} from "./addFiltersType";

const initialState = {
  success: false,
  loading: false,
  filters: null,
  error: "",
};

const addFiltersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILTERS_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case ADD_FILTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        filters: action.payload,
        error: "",
        success: true,
      };
    case ADD_FILTERS_FAILURE:
      return {
        ...state,
        loading: false,
        filters: null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default addFiltersReducer;

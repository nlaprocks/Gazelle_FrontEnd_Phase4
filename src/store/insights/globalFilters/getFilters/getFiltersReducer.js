import {
  GET_FILTERS_REQUEST,
  GET_FILTERS_SUCCESS,
  GET_FILTERS_FAILURE,
} from "./getFiltersType";

const initialState = {
  loading: false,
  filters: null,
  error: "",
  success: false,
};

const getFiltersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILTERS_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case GET_FILTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        filters: action.payload,
        error: "",
        success: true,
      };
    case GET_FILTERS_FAILURE:
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

export default getFiltersReducer;

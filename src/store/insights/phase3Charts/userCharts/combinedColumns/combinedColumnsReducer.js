import {
  FETCH_COMBINED_COLUMNS_REQUEST,
  FETCH_COMBINED_COLUMNS_SUCCESS,
  FETCH_COMBINED_COLUMNS_FAILURE,
} from "./combinedColumnsType";

const initialState = {
  loading: false,
  columns: [],
  error: "",
};

const combinedColumnsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMBINED_COLUMNS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMBINED_COLUMNS_SUCCESS:
      return {
        ...state,
        loading: false,
        columns: action.payload,
        error: "",
      };
    case FETCH_COMBINED_COLUMNS_FAILURE:
      return {
        ...state,
        loading: false,
        columns: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default combinedColumnsReducer;

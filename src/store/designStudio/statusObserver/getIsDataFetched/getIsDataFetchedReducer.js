import {
  GET_IS_DATA_FETCHED_REQUEST,
  GET_IS_DATA_FETCHED_SUCCESS,
  GET_IS_DATA_FETCHED_FAILURE,
} from "./getIsDataFetchedType";
const IState = {
  success: false,
  loading: false,
  data: [],
  error: "",
};
const getIsDataFetchedReducer = (state = IState, action) => {
  switch (action.type) {
    case GET_IS_DATA_FETCHED_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_IS_DATA_FETCHED_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        data: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_IS_DATA_FETCHED_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getIsDataFetchedReducer;

import {
  GET_IS_MODEL_FETCHED_REQUEST,
  GET_IS_MODEL_FETCHED_SUCCESS,
  GET_IS_MODEL_FETCHED_FAILURE,
} from "./getIsModelFetchedType";
const IState = {
  success: false,
  loading: false,
  model: [],
  error: "",
};
const getIsModelFetchedReducer = (state = IState, action) => {
  switch (action.type) {
    case GET_IS_MODEL_FETCHED_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_IS_MODEL_FETCHED_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        model: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_IS_MODEL_FETCHED_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        model: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getIsModelFetchedReducer;

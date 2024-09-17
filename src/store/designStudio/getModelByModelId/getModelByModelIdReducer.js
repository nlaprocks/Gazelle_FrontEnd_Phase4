import {
  GET_MODEL_BY_MODEL_ID_REQUEST,
  GET_MODEL_BY_MODEL_ID_SUCCESS,
  GET_MODEL_BY_MODEL_ID_FAILURE,
} from "./getModelByModelIdType";
const initialState = {
  success: false,
  loading: false,
  model: [],
  error: "",
};
const getModelByModelIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MODEL_BY_MODEL_ID_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_MODEL_BY_MODEL_ID_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        model: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_MODEL_BY_MODEL_ID_FAILURE:
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
export default getModelByModelIdReducer;

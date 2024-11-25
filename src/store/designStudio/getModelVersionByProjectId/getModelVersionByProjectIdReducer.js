import {
  GET_MODEL_VERSION_BY_PROJECT_ID_REQUEST,
  GET_MODEL_VERSION_BY_PROJECT_ID_SUCCESS,
  GET_MODEL_VERSION_BY_PROJECT_ID_FAILURE,
} from "./getModelVersionByProjectIdType";
const initialState = {
  success: false,
  loading: false,
  modelVersion: [],
  error: "",
};
const getModelVersionByProjectIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MODEL_VERSION_BY_PROJECT_ID_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_MODEL_VERSION_BY_PROJECT_ID_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        modelVersion: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_MODEL_VERSION_BY_PROJECT_ID_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        modelVersion: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getModelVersionByProjectIdReducer;

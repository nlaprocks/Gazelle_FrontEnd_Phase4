import {
  UPDATE_MODEL_VERSION_REQUEST,
  UPDATE_MODEL_VERSION_SUCCESS,
  UPDATE_MODEL_VERSION_FAILURE,
} from "./updateModelVersionType";
const initialState = {
  success: false,
  loading: false,
  updateModelVersion: [],
  error: "",
};
const updateModelVersionReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MODEL_VERSION_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case UPDATE_MODEL_VERSION_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        updateModelVersion: action.payload,
        error: "",
      };
      return setSignUpState;
    case UPDATE_MODEL_VERSION_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        updateModelVersion: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default updateModelVersionReducer;

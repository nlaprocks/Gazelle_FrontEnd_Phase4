import {
  SAVE_MODEL_TYPE_REQUEST,
  SAVE_MODEL_TYPE_SUCCESS,
  SAVE_MODEL_TYPE_FAILURE,
} from "./saveModelidType";
const IState = {
  success: false,
  loading: false,
  saveModelid: [],
  error: "",
};
const saveModelidReducer = (state = IState, action) => {
  switch (action.type) {
    case SAVE_MODEL_TYPE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case SAVE_MODEL_TYPE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        saveModelid: action.payload,
        error: "",
      };
      return setSignUpState;
    case SAVE_MODEL_TYPE_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        saveModelid: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default saveModelidReducer;

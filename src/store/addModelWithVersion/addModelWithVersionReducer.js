import {
  ADD_MODEL_WITH_VERSION_REQUEST,
  ADD_MODEL_WITH_VERSION_SUCCESS,
  ADD_MODEL_WITH_VERSION_FAILURE,
} from "./addModelWithVersionType";
const IState = {
  success: false,
  loading: false,
  modelWithVersion: [],
  error: "",
};
const addModelWithVersionWithVersionReducer = (state = IState, action) => {
  switch (action.type) {
    case ADD_MODEL_WITH_VERSION_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_MODEL_WITH_VERSION_SUCCESS:
      const newAuthState = {
        ...state,
        success: true,
        loading: action.loading,
        modelWithVersion: action.payload,
        error: "",
      };
      return newAuthState;
    case ADD_MODEL_WITH_VERSION_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        modelWithVersion: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default addModelWithVersionWithVersionReducer;

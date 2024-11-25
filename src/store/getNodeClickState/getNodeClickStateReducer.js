import {
  GET_NODE_CLICK_STATE_REQUEST,
  GET_NODE_CLICK_STATE_SUCCESS,
  GET_NODE_CLICK_STATE_FAILURE,
} from "./getNodeClickStateType.js";
const initialState = {
  loading: false,
  settingState: [],
  error: false,
};
const getNodeStateResponseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NODE_CLICK_STATE_REQUEST:
      return {
        ...state,
        loading: action.loading,
        error: "",
      };
    case GET_NODE_CLICK_STATE_SUCCESS:
      return {
        ...state,
        settingState: action.payload,
        loading: action.loading,
        error: "",
      };
    case GET_NODE_CLICK_STATE_FAILURE:
      return {
        ...state,
        settingState: false,
        loading: action.loading,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getNodeStateResponseReducer;

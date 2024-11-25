import {
  DELETE_TAKEAWAY_REQUEST,
  DELETE_TAKEAWAY_SUCCESS,
  DELETE_TAKEAWAY_FAILURE,
} from "./deleteTakeawayType";
const takeawayState = {
  success: false,
  loading: false,
  takeaway: [],
  error: "",
};
const deleteTakeawayReducer = (state = takeawayState, action) => {
  switch (action.type) {
    case DELETE_TAKEAWAY_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case DELETE_TAKEAWAY_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        takeaway: action.payload,
        error: "",
      };
      return setSignUpState;
    case DELETE_TAKEAWAY_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        takeaway: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default deleteTakeawayReducer;

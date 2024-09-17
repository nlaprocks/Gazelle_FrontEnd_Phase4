import {
  ADD_TAKEAWAY_REQUEST,
  ADD_TAKEAWAY_SUCCESS,
  ADD_TAKEAWAY_FAILURE,
} from "./addTakeawayType";
const takeawayState = {
  success: false,
  loading: false,
  takeaway: [],
  error: "",
};
const addTakeawayReducer = (state = takeawayState, action) => {
  switch (action.type) {
    case ADD_TAKEAWAY_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_TAKEAWAY_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        takeaway: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_TAKEAWAY_FAILURE:
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
export default addTakeawayReducer;

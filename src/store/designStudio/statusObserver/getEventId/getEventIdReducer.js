import {
  GET_EVENT_ID_REQUEST,
  GET_EVENT_ID_SUCCESS,
  GET_EVENT_ID_FAILURE,
} from "./getEventIdType";
const IState = {
  success: false,
  loading: false,
  eventId: [],
  error: "",
};
const getEventIdReducer = (state = IState, action) => {
  switch (action.type) {
    case GET_EVENT_ID_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_EVENT_ID_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        eventId: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_EVENT_ID_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        eventId: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getEventIdReducer;

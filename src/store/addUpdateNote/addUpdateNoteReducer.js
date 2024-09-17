import {
  ADD_UPDATE_NOTE_REQUEST,
  ADD_UPDATE_NOTE_SUCCESS,
  ADD_UPDATE_NOTE_FAILURE,
} from "./addUpdateNoteType";
const noteState = {
  success: false,
  loading: false,
  note: [],
  error: "",
};
const addUpdateNoteReducer = (state = noteState, action) => {
  switch (action.type) {
    case ADD_UPDATE_NOTE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case ADD_UPDATE_NOTE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        note: action.payload,
        error: "",
      };
      return setSignUpState;
    case ADD_UPDATE_NOTE_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        note: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default addUpdateNoteReducer;

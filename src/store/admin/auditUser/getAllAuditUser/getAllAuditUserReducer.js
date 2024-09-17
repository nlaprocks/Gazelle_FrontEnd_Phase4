import {
  GET_ALL_AUDIT_USER_REQUEST,
  GET_ALL_AUDIT_USER_SUCCESS,
  GET_ALL_AUDIT_USER_FAILURE,
} from "./getAllAuditUserType";
const userState = {
  success: false,
  loading: false,
  auditUser: [],
  error: "",
};
const getAllAuditUserReducer = (state = userState, action) => {
  switch (action.type) {
    case GET_ALL_AUDIT_USER_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_ALL_AUDIT_USER_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        auditUser: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_ALL_AUDIT_USER_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        auditUser: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getAllAuditUserReducer;

import {
  GET_MOBILITY_DATABASE_STRUCTURE_REQUEST,
  GET_MOBILITY_DATABASE_STRUCTURE_SUCCESS,
  GET_MOBILITY_DATABASE_STRUCTURE_FAILURE,
} from "./getMobilityDatabaseStructureType";
const IState = {
  success: false,
  loading: false,
  mobilityData: [],
  error: "",
};
const getMobilityDatabaseStructureReducer = (state = IState, action) => {
  switch (action.type) {
    case GET_MOBILITY_DATABASE_STRUCTURE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_MOBILITY_DATABASE_STRUCTURE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        mobilityData: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_MOBILITY_DATABASE_STRUCTURE_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        mobilityData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getMobilityDatabaseStructureReducer;

import {
  GET_COMPETITORS_DATABASE_STRUCTURE_REQUEST,
  GET_COMPETITORS_DATABASE_STRUCTURE_SUCCESS,
  GET_COMPETITORS_DATABASE_STRUCTURE_FAILURE,
} from "./getCompetitorsDatabaseStructureType";
const IState = {
  success: false,
  loading: false,
  competitorsData: [],
  error: "",
};
const getCompetitorsDatabaseStructureReducer = (state = IState, action) => {
  switch (action.type) {
    case GET_COMPETITORS_DATABASE_STRUCTURE_REQUEST:
      return {
        ...state,
        success: false,
        loading: action.loading,
      };
    case GET_COMPETITORS_DATABASE_STRUCTURE_SUCCESS:
      const setSignUpState = {
        ...state,
        success: true,
        loading: action.loading,
        competitorsData: action.payload,
        error: "",
      };
      return setSignUpState;
    case GET_COMPETITORS_DATABASE_STRUCTURE_FAILURE:
      return {
        ...state,
        success: false,
        loading: action.loading,
        competitorsData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getCompetitorsDatabaseStructureReducer;

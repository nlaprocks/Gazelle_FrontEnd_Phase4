import {
  GET_NODES_REQUEST,
  GET_NODES_SUCCESS,
  GET_NODES_FAILURE,
} from "./getNodesType";
const userState = {
  isLoggedIn: false,
  loading: false,
  user: [],
  error: "",
};

const getNodesReducer = (state = userState, action) => {
  switch (action.type) {
    case GET_NODES_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        loading: action.loading,
      };
    case GET_NODES_SUCCESS:
      const newAuthState = {
        ...state,
        isLoggedIn: true,
        loading: action.loading,
        user: action.payload,
        error: "",
      };
      return newAuthState;
    case GET_NODES_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        loading: action.loading,
        user: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default getNodesReducer;

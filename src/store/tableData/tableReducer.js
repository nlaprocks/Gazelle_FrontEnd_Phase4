import { SET_CURRENT_TABLE } from "./tableType";

const initialState = {
  // currentTable: "",  // default value
  currentTable: "golden_krust_full",  // default value
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TABLE:
      return {
        ...state,
        currentTable: action.payload,
      };
    default:
      return state;
  }
};

export default tableReducer;

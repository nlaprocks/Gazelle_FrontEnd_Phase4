import { SET_CURRENT_TABLE } from "./tableType"

export const setCurrentTable = (table) => ({
  type: SET_CURRENT_TABLE,
  payload: table,
});
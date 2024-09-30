import React from "react";
import Modal from "react-bootstrap/Modal";
import "./connectionConfirm.css";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../../store/index";


const InternalDatabaseConnectionConfirm = ({ internalSelectedDatabase, internalDbConnectionConfirmModal, setInternalDbConnectionConfirmModal, }) => {

  const dispatch = useDispatch();
  const [database, setDatabase] = React.useState([]);
  const [currentTable, setCurrentTable] = React.useState(null);
  const [selectedTables, setSelectedTables] = React.useState([]);
  const [selectedColumns, setSelectedColumns] = React.useState([]);

  const handleClose = () => {
    setInternalDbConnectionConfirmModal(false);
    setCurrentTable(null);
    setSelectedTables([]);
    setSelectedColumns([]);
    setDatabase([]);
  };

  const datastructureReducer = useSelector((state) => state.datastructureReducer);
  const mobilityDatabaseReducer = useSelector((state) => state.getMobilityDatabaseStructureReducer);
  const competitorsDatabaseReducer = useSelector((state) => state.getCompetitorsDatabaseStructureReducer);
  const saveMobilityConfigReducer = useSelector((state) => state.saveMobilityConfigReducer);
  const saveCompetitorsConfigReducer = useSelector((state) => state.saveCompetitorsConfigReducer);

  const handleTableSelect = (e) => {
    setCurrentTable(e.target.value);
    const selectedTable = e.target.value;
    const tableIndex = selectedTables.findIndex((table) => table.table === selectedTable);
    if (tableIndex === -1) {
      setSelectedTables([
        ...selectedTables,
        { table: selectedTable, columns: [] },
      ]);
    }
  };

  // this function is to check if the current table all values are selected is selected
  const isTableAllColumnsSelected = () => {
    // Get the data structure of the current table
    const currentTableStructure = database.find((table) => table.table === currentTable);
    // Get the selected columns for the current table
    const tableMapping = selectedColumns.find((tableMapping) => tableMapping.table === currentTable);
    if (tableMapping) {
      // Get an array of column names for the selected columns
      const selectedColumnsNames = tableMapping.columns.map((columnMapping) => columnMapping.original_column);

      // // Filter the current table structure to only include selected columns
      // const filteredTableStructure = {
      //   table: currentTableStructure.table,
      //   columns: currentTableStructure.columns.filter((column) =>
      //     selectedColumnsNames.includes(column)
      //   ),
      // };
      // Compare the filtered data structure with the selected columns
      const match = selectedColumnsNames.length === currentTableStructure.columns.length;
      return match;
    }
    return false;
  };

  // const isTableAllColumnsSelected = () => {
  //   const tableMapping = selectedColumns.find(
  //     (tableMapping) => tableMapping.table === currentTable
  //   );

  //   if (tableMapping) {
  //     const tableColumns = tableMapping.columns.map(
  //       (columnMapping) => columnMapping.original_column
  //     );

  //     return tableColumns.every((column) =>
  //       selectedColumns.some(
  //         (tableMapping) =>
  //           tableMapping.table === currentTable &&
  //           tableMapping.columns.some(
  //             (columnMapping) =>
  //               columnMapping.original_column === column &&
  //               columnMapping.mapped_column === column
  //           )
  //       )
  //     );
  //   }

  //   return false;
  // };

  const handleSelectAllColumn = (currentTableVal) => {
    const tableData = currentTableVal[0];
    const columns = tableData.columns.map((column) => ({
      original_column: column,
      mapped_column: column,
    }));

    // Find the index of the selected table in the selectedColumns array
    const tableIndex = selectedColumns.findIndex((item) => item.table === tableData.table);

    if (tableIndex === -1) {
      // If the selected table is not yet in the selectedColumns array,
      // add it with all columns as the items
      setSelectedColumns([
        ...selectedColumns,
        {
          table: tableData.table,
          columns: columns,
        },
      ]);
    } else {
      // If the selected table is already in the selectedColumns array,
      // update its columns array to include all columns
      setSelectedColumns((prevState) => {
        return [
          ...prevState.slice(0, tableIndex),
          { table: tableData.table, columns: columns },
          ...prevState.slice(tableIndex + 1),
        ];
      });
    }
  };

  const handleUnselectAllColumns = (currentTableVal) => {
    // Find the index of the selected table in the selectedColumns array
    const tableIndex = selectedColumns.findIndex((item) => item.table === currentTableVal[0].table);
    if (tableIndex !== -1) {
      // If the selected table is already in the selectedColumns array,
      // remove it from the array
      setSelectedColumns((prevState) => [
        ...prevState.slice(0, tableIndex),
        ...prevState.slice(tableIndex + 1),
      ]);
    }
  };

  // Handler function for selecting a column
  const handleSelectColumn = (column, val) => {
    // Find the index of the selected table in the selectedColumns array
    const tableIndex = selectedColumns.findIndex((item) => item.table === currentTable);

    if (tableIndex === -1) {
      // If the selected table is not yet in the selectedColumns array,
      // add it with the selected column as the first item if checked is true
      if (val.checked) {
        setSelectedColumns([
          ...selectedColumns,
          {
            table: currentTable,
            columns: [
              {
                original_column: column,
                mapped_column: column,
              },
            ],
          },
        ]);
      }
    } else {
      // If the selected table is already in the selectedColumns array,
      // update its columns array with the selected column
      setSelectedColumns((prevState) => {
        const newColumns = [...prevState[tableIndex].columns];
        const columnIndex = newColumns.findIndex(
          (item) => item.original_column === column
        );
        if (val.checked) {
          // If the column is checked and not yet in the columns array,
          // add it to the end
          if (columnIndex === -1) {
            newColumns.push({
              original_column: column,
              mapped_column: column,
            });
          }
        } else {
          // If the column is unchecked and in the columns array,
          // remove it from the array
          if (columnIndex !== -1) {
            newColumns.splice(columnIndex, 1);
          }
        }
        // If the columns array for the current table is empty, remove the object from the array
        if (newColumns.length === 0) {
          return [
            ...prevState.slice(0, tableIndex),
            ...prevState.slice(tableIndex + 1),
          ];
        } else {
          // Otherwise, update the columns array for the current table
          return [
            ...prevState.slice(0, tableIndex),
            { table: currentTable, columns: newColumns },
            ...prevState.slice(tableIndex + 1),
          ];
        }
      });
    }
  };

  const addDatabaseConfig = () => {
    if (internalSelectedDatabase === "Mobility") {
      dispatch(
        allActions.saveMobilityConfigAction.saveMobilityConfig({
          database_config: selectedColumns,
          event_id: datastructureReducer?.structure?.data?.event_id,
        })
      );
    }
    if (internalSelectedDatabase === "Competitors") {
      dispatch(
        allActions.saveCompetitorsConfigAction.saveCompetitorsConfig({
          database_config: selectedColumns,
          event_id: datastructureReducer?.structure?.data?.event_id,
        })
      );
    }
  };

  React.useEffect(() => {
    if (internalSelectedDatabase === "Mobility") {
      dispatch(
        allActions.getMobilityDatabaseStructureAction.getMobilityDatabaseStructure()
      );
    }
    if (internalSelectedDatabase === "Competitors") {
      dispatch(
        allActions.getCompetitorsDatabaseStructureAction.getCompetitorsDatabaseStructure()
      );
    }
  }, [internalSelectedDatabase]);

  React.useEffect(() => {
    if (mobilityDatabaseReducer.success) {
      setDatabase(mobilityDatabaseReducer?.mobilityData?.data);
      delete mobilityDatabaseReducer.success;
    }
    if (competitorsDatabaseReducer.success) {
      setDatabase(competitorsDatabaseReducer?.competitorsData?.data);
      delete competitorsDatabaseReducer.success;
    }
  }, [mobilityDatabaseReducer, competitorsDatabaseReducer]);

  React.useEffect(() => {
    if (saveMobilityConfigReducer.success) {
      handleClose();
      delete saveMobilityConfigReducer.success;
    }
    if (saveCompetitorsConfigReducer.success) {
      handleClose();
      delete saveCompetitorsConfigReducer.success;
    }
  }, [saveMobilityConfigReducer, saveCompetitorsConfigReducer]);

  return (
    <Modal
      show={internalDbConnectionConfirmModal}
      onHide={handleClose}
      centered
      className="nladatabaseparametermodal"
    >
      <Modal.Header>
        <Modal.Title>Connection Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row align-items-center justify-center">
          <div className="col-md-6 db_coonection-text flex gap-4 align-items-center">
            <img
              src={require("../../../assets/images/data-connection-image.png")}
              alt="placeholder"
              className="img-fluid"
            />
            <div>
              <h4>Database connection successfully</h4>
              <p className="mx-auto">
                DB Connection is successfully confirmed. <br /> Select Table field and confirm items.
              </p>
            </div>
          </div>
        </div>
        <div className="row padding-spacer mt-3">
          <div className="col-md-8">
            <div className="search-icon-box">
              <input type="search" placeholder="Search" />
            </div>
          </div>
          <div className="col-md-4 select_table-box">
            <select onChange={(e) => handleTableSelect(e)}>
              <option value="">Select a table</option>
              {database?.map(({ table }) => (
                <option key={table} value={table}>
                  {table}
                </option>
              ))}
            </select>
          </div>
          {currentTable !== null ? (
            <div className="table-responsivev">
              <table className="table">
                <thead>
                  <tr>
                    <th className="d-flex align-items-center">
                      <div className="form-check custom-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`selectAll`}
                          // value={column}
                          checked={isTableAllColumnsSelected()}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleSelectAllColumn(
                                database?.filter(
                                  (val) => val.table === currentTable
                                )
                              );
                            } else {
                              handleUnselectAllColumns(
                                database?.filter(
                                  (val) => val.table === currentTable
                                )
                              );
                            }
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`selectAll`}
                        ></label>
                      </div>
                      Select
                    </th>
                    <th>Columns</th>
                  </tr>
                </thead>
                <tbody>
                  {database
                    ?.filter((val) => val.table === currentTable)[0]
                    ?.columns.map((column, index) => {
                      // Find the mapping for the specific table
                      const dataMapping = selectedColumns.find(
                        (tableMapping) => tableMapping.table === currentTable
                      );

                      // Check if the `original_column` array includes the specific column
                      const isSelected = dataMapping?.columns?.some(
                        (columnMapping) =>
                          columnMapping.original_column === column
                      );
                      return (
                        <tr key={index}>
                          <td>
                            <div className="form-check custom-checkbox">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`${column}-${index}`}
                                value={column}
                                checked={isSelected}
                                onChange={(e) =>
                                  handleSelectColumn(e.target.value, e.target)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`${column}-${index}`}
                              ></label>
                            </div>
                          </td>
                          <td>{column}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-primary px-4 inline-block"
          onClick={addDatabaseConfig}
        >
          {saveMobilityConfigReducer?.loading ||
            saveCompetitorsConfigReducer?.loading
            ? "...loading"
            : "Confirm Configuration"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default InternalDatabaseConnectionConfirm;

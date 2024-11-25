import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./connectionConfirm.css";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../../store/index";
import { Navigate, useParams } from "react-router-dom";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import SelectedConnectionDatabaseConfirm from "./SelectedConnectionDatabaseConfirm";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ModalTabs from "./ModalTabs";
import axios from "axios";
import { UPDATE_FORM_DATA } from "../../../store/formData/formType";
import { SET_CURRENT_TABLE } from "../../../store/tableData/tableType";
import { useNavigate } from "react-router-dom";

const preSelectedColumns = [
  "WeekEnding",
  "Retailer",
  "Product",
  "Total_Volume",
  "Dollars",
  "%Increase_in_Vol_by_Merch',_PR_Only",
  "Wtd_Avg_%_PR",
  "Dollars_Price_Reduct_Only",
  //   "TPCW",
  "Volume_Price_Reduct_Only",
  "Dollars_Feat_Only",
  "Volume_Feat_Only",
  "Dollars_Disp_Only",
  "Volume_Disp_Only",
  "Dollars_F&D",
  "Volume_F&D",
  "Units",
  "Brand",
];

const feature_map = {
  WeekEnding: "Frequency", // Time - Frequency
  Retailer: "Geography", // Geography
  Product: "Product", // Product
  Brand: "Brand", // Brand

  Total_Volume: "Volume", // Volume
  Dollars: "Dollars", // Dollars

  "%Increase_in_Vol_by_Merch',_PR_Only": "Lift", // Lift
  "Wtd_Avg_%_PR": "Discount", // Discount
  Dollars_Price_Reduct_Only: "Dollars_TPR", // Dollars_TPR

  // 'Total_Pts_Cumu_Wks':'Distribution',
  // 'TPCW': 'Distribution',  // Distribution
  // TDP: "Distribution",
  Volume_Price_Reduct_Only: "Volume_TPR", // Volume_TPR
  Dollars_Feat_Only: "Dollars_FO", // Dollars_FO
  Volume_Feat_Only: "Volume_FO", // Volume_FO

  Dollars_Disp_Only: "Dollars_DO", // Dollars_DO
  Volume_Disp_Only: "Volume_DO", // Volume_DO

  "Dollars_F&D": "Dollars_FD", // Dollars_FD
  "Volume_F&D": "Volume_FD", // Volume_FD
  Units: "Units",
};

let data = JSON.parse(localStorage.getItem("auth"));


const requiredColumns = [
  "WeekEnding",
  "Retailer",
  "Product",
  "Total_Volume",
  "Dollars", //changes
  "WeekEnding",
  "Retailer",
  "Product",
  "Total_Volume",
  "Dollars",
  "%Increase_in_Vol_by_Merch',_PR_Only",
  "Wtd_Avg_%_PR",
  "Dollars_Price_Reduct_Only",
  //   "TPCW",
  "Volume_Price_Reduct_Only",
  "Dollars_Feat_Only",
  "Volume_Feat_Only",
  "Dollars_Disp_Only",
  "Volume_Disp_Only",
  "Dollars_F&D",
  "Volume_F&D",
  "Units",
  "Brand",
];

const moment = require("moment");

const ConnectionConfirm = ({
  connectionConfirmModal,
  setConnectionConfirmModal,
  tableFromDb,
}) => {

  const [scheduleObserver, setScheduleObserver] = React.useState(false);
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("center");
  const [startDate, setStartDate] = React.useState();
  const minDate = new Date();
  const dispatch = useDispatch();
  const { model_id } = useParams();
  const [loader, setLoader] = React.useState(false);

  const getIsDataFetchedReducer = useSelector(
    (state) => state.getIsDataFetchedReducer
  );

  const handleClose = () => {
    setConnectionConfirmModal(false);
    setStartDate();
  
    
  };

  const datastructureReducer = useSelector(
    (state) => state.datastructureReducer
  );

  const databaseConfigReducer = useSelector(
    (state) => state.saveDatabaseConfigReducer
  );

  const [currentTable, setCurrentTable] = React.useState("golden_krust_full");

  const [externalCurrentTable, setExternalCurrentTable] = React.useState(null);
  const [selectedTables, setSelectedTables] = useState([]);
  const [selectedColumns, setSelectedColumns] = React.useState([]);
  const [externalColumns, setExternalColumns] = React.useState([]);

  // connection Confirm Modal
  const [selectedConnectionConfirmModal, setSelectedConnectionConfirmModal] =
    useState(false);

  const handleTableSelect = (e) => {
    setCurrentTable(e.target.value);

    dispatch({ type: SET_CURRENT_TABLE, payload: e.target.value });
    const selectedTable = e.target.value;
    const tableIndex = selectedTables.findIndex(
      (table) => table.table === selectedTable
    );
    if (tableIndex === -1) {
      setSelectedTables([
        ...selectedTables,
        { table: selectedTable, columns: [] },
      ]);
    }
  };
  const handleTableSelectForExternalData = (e) => {
    setExternalCurrentTable(e.target.value);
    const selectedTable = e.target.value;
    const tableIndex = selectedTables.findIndex(
      (table) => table.table === selectedTable
    );
    if (tableIndex === -1) {
      setSelectedTables([
        ...selectedTables,
        { table: selectedTable, columns: [] },
      ]);
    }
  };
  // this function is to check if the current table all values are selected
  const isTableAllColumnsSelected = () => {
    // Get the data structure of the current table
    const currentTableStructure =
      datastructureReducer.structure.data.structure.find(
        (table) => table.table === currentTable
      );
    // console.log(datastructureReducer.structure, "datastrudc");
    // console.log(databaseConfigReducer,"datab");

    // Get the selected columns for the current table
    const tableMapping = selectedColumns.find(
      (tableMapping) => tableMapping.table === currentTable
    );
    if (tableMapping) {
      // Get an array of column names for the selected columns
      const selectedColumnsNames = tableMapping.columns.map(
        (columnMapping) => columnMapping.original_column
      );

      // // Filter the current table structure to only include selected columns
      // const filteredTableStructure = {
      //   table: currentTableStructure.table,
      //   columns: currentTableStructure.columns.filter((column) =>
      //     selectedColumnsNames.includes(column)
      //   ),
      // };

      // Compare the filtered data structure with the selected columns
      const match =
        selectedColumnsNames?.length === currentTableStructure?.columns?.length;
      return match;
    }

    return false;
  };

  const handleInternalInputChange = (value, column) => {
    // Find the index of the selected table in the selectedColumns array
    const tableIndex = selectedColumns.findIndex(
      (item) => item.table === currentTable
    );
    // console.log({ tableIndex });

    setSelectedColumns((prevState) => {
      const newColumns = [...prevState[tableIndex].columns];
      const columnIndex = newColumns.findIndex(
        (item) => item.original_column === column
      );

      // update the mapped_column of the column
      newColumns[columnIndex].mapped_column = value;

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
  };

  const handleSelectAllColumn = (currentTableVal) => {
    const tableData = currentTableVal[0];
    // console.log("\n tableData: ", tableData);
    const columns = tableData.columns.map((column) => ({
      original_column: column,
      mapped_column: column,
    }));

    // Find the index of the selected table in the selectedColumns array
    const tableIndex = selectedColumns.findIndex(
      (item) => item.table === tableData.table
    );
    // console.log("tableIndex: ", tableIndex);

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

  // console.log("selectedColumns: ", selectedColumns[4]);
  const handleUnselectAllColumns = (currentTableVal) => {
    // Find the index of the selected table in the selectedColumns array
    const tableIndex = selectedColumns.findIndex(
      (item) => item.table === currentTableVal[0].table
    );

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
    const tableIndex = selectedColumns.findIndex(
      (item) => item.table === currentTable
    );

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

  const handleDropDownChange = (event, column) => {
    const { value } = event.target;
    const tableIndex = selectedColumns.findIndex(
      (table) => table.table === currentTable
    );
    // Make a copy of the columns array for the selected table
    const updatedColumns = [...selectedColumns[tableIndex].columns];
    // Find the index of the column in the columns array
    const columnToUpdateIndex = updatedColumns.findIndex(
      (col) => col.original_column === column
    );
    // Update the mapped_column property with the selected value
    updatedColumns[columnToUpdateIndex].mapped_column = value;
    // Make a copy of the data array and update the columns array for the selected table
    const updatedData = [...selectedColumns];
    updatedData[tableIndex] = {
      ...updatedData[tableIndex],
      columns: updatedColumns,
    };
    // Set the updated data
    setSelectedColumns(updatedData);
  };

  const openConnectionConfirmModal = () => {
    setConnectionConfirmModal(false);
    setSelectedConnectionConfirmModal(true);
  };

  const addDatabaseConfig = (formData) => {
    dispatch({ type: UPDATE_FORM_DATA, payload: formData });

    const tableIndex = selectedColumns.findIndex(
      (item) => item.table === currentTable
    );
    if (tableIndex === -1) {
      alert("Error occurred on confirmation");
      return;
    }
    setLoader(true);
    if (startDate) {
      const date = startDate;
      const formattedDate = moment(date)
        .subtract(5, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
      dispatch(
        allActions.saveDatabaseConfigAction.saveDatabaseConfig({
          database_config: selectedColumns,
          event_id: datastructureReducer?.structure?.data?.event_id,
          schedule_timestamp: formattedDate,
        })
      );
    } else {
      dispatch(
        allActions.saveDatabaseConfigAction.saveDatabaseConfig({
          database_config: [selectedColumns[tableIndex]],
          event_id: datastructureReducer?.structure?.data?.event_id,
        })
      );
      setSelectedConnectionConfirmModal(false);
    }
  };

  React.useEffect(() => {
    // console.log("adsfsdfsd")
    // dispatch({ type: SET_CURRENT_TABLE, payload: "golden_krust_full" });
    if (databaseConfigReducer.success) {
      if (!startDate) {
        dispatch(allActions.getIsDataFetchedAction.getIsDataFetched(model_id));
      } else {
        setScheduleObserver(true);
        const timerId = setTimeout(() => {
          setScheduleObserver(false);
          handleClose();
        }, 2000);
        return () => {
          clearTimeout(timerId);
        };
      }
      delete databaseConfigReducer.success;
    }
  }, [databaseConfigReducer, model_id]);

  React.useEffect(() => {
    if (getIsDataFetchedReducer.success) {
      const timeout = setTimeout(() => {
        handleClose();
        setLoader(false);
      }, 3000);
      // Clear timeout if the component unmounts before the 3 seconds are up
      return () => clearTimeout(timeout);
    }
  }, [getIsDataFetchedReducer]);

  const fetchExternalColumns = async () => {
    try {
      const api = `${process.env.REACT_APP_NGROK}/client-data/external-structure`;
      const response = await axios.get(api);
      if (response.status === 200) {
        // console.log("response: ", response.data);
        setExternalColumns(response.data.data.columns);
        // setRetailerBrandProducts(response?.data?.data);
      }
    } catch (error) {
      // console.log("Error in fetching columns", error);
    }
  };

  React.useEffect(() => {
    fetchExternalColumns();
  }, []);

  React.useEffect(() => {
    const preSelectedColumnsData = preSelectedColumns.map((column) => ({
      original_column: column,
      mapped_column: feature_map[column],
    }));

    setSelectedColumns((prevState) => {
      const tableIndex = prevState.findIndex(
        (item) => item.table === currentTable
      );
      if (tableIndex === -1) {
        // If the selected table is not yet in the selectedColumns array,
        // add it with the pre-selected columns
        return [
          ...prevState,
          {
            table: currentTable,
            columns: preSelectedColumnsData,
          },
        ];
      } else {
        // If the selected table is already in the selectedColumns array,
        // update its columns array with the pre-selected columns
        return [
          ...prevState.slice(0, tableIndex),
          { table: currentTable, columns: preSelectedColumnsData },
          ...prevState.slice(tableIndex + 1),
        ];
      }
    });
  }, [currentTable]);


  return (
    <>
      <Modal
        show={connectionConfirmModal}
        // show={true}
        onHide={handleClose}
        centered
        className="nladatabaseparametermodal">
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto">Connection Confirms</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "550px", overflowY: "auto" }}>
          <div>
            <div className="row align-items-center">
              <div className="col-md-4 nla_modal_banenr">
                <img
                  src={require("../../../assets/images/data-connection-image.png")}
                  alt="placeholder"
                  className="img-fluid"
                  style={{ width: "25%", height: "25%" }}
                />
              </div>
              <div className="col-md-8 db_coonection-text">
                <h4>Database connection successfully</h4>
                <p className="mx-auto">
                  DB Connection is successfully confirmed. <br /> Select Table
                  field and confirm items.
                </p>
              </div>
            </div>
            <ModalTabs
              currentTable={currentTable}
              externalCurrentTable={externalCurrentTable}
              selectedColumns={selectedColumns}
              datastructureReducer={datastructureReducer}
              isTableAllColumnsSelected={isTableAllColumnsSelected}
              handleDropDownChange={handleDropDownChange}
              handleSelectColumn={handleSelectColumn}
              handleTableSelect={handleTableSelect}
              handleTableSelectForExternalData={
                handleTableSelectForExternalData
              }
              handleSelectAllColumn={handleSelectAllColumn}
              handleUnselectAllColumns={handleUnselectAllColumns}
              preSelectedColumns={preSelectedColumns}
              requiredColumns={requiredColumns}
              handleInternalInputChange={handleInternalInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-outline-danger"
            data-bs-dismiss="modal"
            onClick={() => {
              handleClose(false);
              window.location.reload();
            }}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={openConnectionConfirmModal}>
            {loader ? "Loading..." : "Confirm Configuration"}
          </button>
        </Modal.Footer>
        <Snackbar
          open={scheduleObserver}
          autoHideDuration={3000}
          key="projectCreatedAlert"
          anchorOrigin={{ vertical, horizontal }}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Data Fetching Scheduling
          </Alert>
        </Snackbar>
      </Modal>
      <SelectedConnectionDatabaseConfirm
      setConnectionConfirmModal={setConnectionConfirmModal}
        selectedConnectionConfirmModal={selectedConnectionConfirmModal}
        setSelectedConnectionConfirmModal={setSelectedConnectionConfirmModal}
        connectDbConnecttion={addDatabaseConfig}
        setConnectionConfirmModal={setConnectionConfirmModal}
        selectedColumns={selectedColumns}
        currentTables={currentTable}
      />
    </>
  );  
};

export default ConnectionConfirm;

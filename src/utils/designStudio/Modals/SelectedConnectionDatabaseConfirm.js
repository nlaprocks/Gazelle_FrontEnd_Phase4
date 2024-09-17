import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./connectionConfirm.css";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../../store/index";
import { useParams } from "react-router-dom";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import axios from "axios";
import { Tabs } from "antd";

const { TabPane } = Tabs;
const requiredColumns = ["WeekEnding", "Retailer", "Product", "Total_Volume", "Dollars"];

const moment = require("moment");
const SelectedConnectionDatabaseConfirm = ({ selectedConnectionConfirmModal, setSelectedConnectionConfirmModal, handleSelectColumn }) => {
  const [scheduleObserver, setScheduleObserver] = React.useState(false);
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("center");
  const [startDate, setStartDate] = React.useState();
  const minDate = new Date();
  const [columnAliases, setColumnAliases] = useState({});
  const dispatch = useDispatch();
  const { model_id } = useParams();
  const [loader, setLoader] = React.useState(false);
  const getIsDataFetchedReducer = useSelector((state) => state.getIsDataFetchedReducer);
  const handleClose = () => {
    setSelectedConnectionConfirmModal(false);
    setStartDate();
  };
  const [externalColumnAliases, setExternalColumnAliases] = useState({});
  const datastructureReducer = useSelector((state) => state.datastructureReducer);
  const databaseConfigReducer = useSelector((state) => state.saveDatabaseConfigReducer);
  const [currentTable, setCurrentTable] = React.useState("golden_krust_full");
  const [externalCurrentTable, setExternalCurrentTable] = React.useState(null);
  const [selectedTables, setSelectedTables] = useState([]);
  const [selectedColumns, setSelectedColumns] = React.useState([]);
  const [externalColumns, setExternalColumns] = React.useState([]);

  const selectedDatabaseConfig = () => {
    const tableIndex = selectedColumns.findIndex((item) => item.table === currentTable);
    if (tableIndex === -1) {
      alert("Error occurred on confirmation");
      return;
    }
    setLoader(true);
    if (startDate) {
      const date = startDate;
      const formattedDate = moment(date).subtract(5, "hours").format("YYYY-MM-DD HH:mm:ss");
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
    }
  };

  const handleInputChange = (e, column, tab) => {
    if (tab === "internal") {
      setColumnAliases((prevColumnAliases) => ({
        ...prevColumnAliases,
        [column]: e.target.value,
      }));
    }
    if (tab === "external") {
      setExternalColumnAliases((prevColumnAliases) => ({
        ...prevColumnAliases,
        [column]: e.target.value,
      }));
    }
  };

  React.useEffect(() => {
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
        console.log("response: ", response.data);
        setExternalColumns(response.data.data.columns);
        // setRetailerBrandProducts(response?.data?.data);
      }
    } catch (error) {
      console.log("Error in fetching columns", error);
    }
  };

  React.useEffect(() => {
    fetchExternalColumns();
  }, []);

  return (
    <Modal
      show={selectedConnectionConfirmModal}
      // show={true}
      onHide={handleClose}
      centered
      className="nladatabaseparametermodal"
    >
      <Modal.Header>
        <Modal.Title>Selected Connection Database Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "560px", overflowY: "auto" }}>
        <div>
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
                  DB Connection is Database Name
                </p>
              </div>
            </div>
          </div>

          <div className="table-responsivev" style={{ maxHeight: "300px", overflowY: "auto" }}>
            <table className="table">
              <thead className="table-head">
                <tr>
                  <th>Database Measure</th>
                  <th>Renamed Measure</th>
                </tr>
              </thead>
              <tbody>
                {datastructureReducer?.structure?.data?.structure
                  ?.filter((val) => val.table === currentTable)[0]
                  ?.columns.map((column, index) => {
                    const dataMapping = selectedColumns.find((tableMapping) => tableMapping.table === currentTable);
                    const isSelected = dataMapping?.columns?.some(
                      (columnMapping) => columnMapping.original_column === column
                    );
                    const isRequired = requiredColumns.includes(column);
                    return (
                      <tr key={index}>
                        <td>
                          <div className="form-check custom-checkbox">
                            <span>{column}</span>
                          </div>
                        </td>
                        <td>{column}</td>
                        <td>
                          <div className="col-md-8">
                            <div className="input-box">
                              <span>{columnAliases[column] || ""}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-center">
          <button type="button" className="btn btn-primary px-4 inline-block max-w-40" onClick={selectedDatabaseConfig}>
            {loader ? "Loading..." : "Submit"}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectedConnectionDatabaseConfirm;

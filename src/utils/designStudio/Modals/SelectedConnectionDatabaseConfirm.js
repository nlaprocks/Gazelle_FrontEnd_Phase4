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
import { Input } from "antd";
import { DatePicker } from 'antd';
import { Select } from 'antd';
import { CalendarOutlined, DollarOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const requiredColumns = ["WeekEnding", "Retailer", "Product", "Total_Volume", "Dollars"];
const { Option } = Select;
const moment = require("moment");
const SelectedConnectionDatabaseConfirm = ({ selectedConnectionConfirmModal, setSelectedConnectionConfirmModal, handleSelectColumn, connectDbConnecttion, selectedColumns, currentTables }) => {
  const { RangePicker } = DatePicker;
  const [scheduleObserver, setScheduleObserver] = React.useState(false);
  const [startDate, setStartDate] = React.useState();
  const [columnAliases, setColumnAliases] = useState({});
  const dispatch = useDispatch();
  const { model_id } = useParams();
  const [loader, setLoader] = React.useState(false);
  const getIsDataFetchedReducer = useSelector((state) => state.getIsDataFetchedReducer);
  const handleClose = () => {
    setSelectedConnectionConfirmModal(false);
    setStartDate();
  };
  const datastructureReducer = useSelector((state) => state.datastructureReducer);
  const databaseConfigReducer = useSelector((state) => state.saveDatabaseConfigReducer);
  // const [currentTable, setCurrentTable] = React.useState("golden_krust_full");
  // const [selectedColumns, setSelectedColumns] = React.useState([]);
  const [externalColumns, setExternalColumns] = React.useState([]);

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
      <Modal.Header closeButton>
        <Modal.Title className="ms-auto">Selected Connection Database Confirm</Modal.Title>
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

          <div className="nla-add-heading-block mt-6">
            <form>
              <div className="row border-y mb-4 pt-6 ps-7 items-center">
                <div className="col-md-4 col-12 relative nla_form_project_name position-relative nla_form_field_block mb-4">
                  <Input size="large" placeholder="Cumulative Share of Brand's Revenue(%)" prefix={<CalendarOutlined />} />
                  {/* <Input size="large" value="" placeholder="Cumulative Share of Brand's Revenue(%)" prefix={<CalendarOutlined />} /> */}
                </div>
                <div className="col-md-4 col-12 relative nla_form_project_name position-relative nla_form_field_block mb-4">
                  <Input size="large" placeholder="Minimum Dollar Sales(L52 Weeks)" prefix={<DollarOutlined />} />
                </div>
                <div className="col-md-4 col-12 relative nla_form_project_name position-relative nla_form_field_block mb-4">
                  <Select
                    showSearch
                    style={{
                      width: "100%",
                      height: "40px",
                    }}
                    placeholder="Select No of Weeks"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="52">52</Option>
                    <Option value="104">104</Option>
                    <Option value="156">156</Option>
                    <Option value="208">208</Option>
                  </Select>
                </div>
              </div>
            </form>
          </div>

          <div className="table-responsivev" style={{ maxHeight: "300px", overflowY: "auto" }}>
            <table className="table">
              <thead className="table-head">
                <tr>
                  <th>Database Measure</th>
                  <th>Renamed Measure</th>
                </tr>
              </thead>
              {/* <tbody>
                {datastructureReducer?.structure?.data?.structure
                  ?.filter((val) => val.table === currentTable)[0]
                  ?.columns.map((column, index) => {
                    console.log(column,"columns")
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
              </tbody> */}
              <tbody>
                {
                  selectedColumns
                    .filter((val) => val.table === currentTables)

                    .map((tableData) => {
                      console.log("Mapped tableData:", tableData);
                      return tableData.columns.map((column, columnIndex) => {

                        const originalColumn = column.original_column;
                        // const mappedColumn = column.mapped_column || ""; 

                        return (
                          <tr key={columnIndex}>
                            <td>
                              <div className="form-check custom-checkbox">
                                <span>{originalColumn}</span>
                              </div>
                            </td>
                            <td>{originalColumn}</td>
                            <td>
                              <div className="col-md-8">
                                <div className="input-box">
                                  {/* <span>{columnAliases[originalColumn] || ""}</span> */}
                                </div>
                              </div>
                            </td>
                            <td>
                              {/* <span>{mappedColumn}</span> */}
                            </td>
                          </tr>
                        );
                      });
                    })
                }

              </tbody>

            </table>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-outline-danger"
            data-bs-dismiss="modal"
            onClick={() => {
              handleClose(false);
            }}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-primary px-4 inline-block max-w-40" onClick={connectDbConnecttion}>
            {loader ? "Loading..." : "Submit"}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectedConnectionDatabaseConfirm;
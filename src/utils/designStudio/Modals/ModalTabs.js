import React, { useState, useEffect, memo } from "react";
import "./connectionConfirm.css";
import { Tabs } from "antd";
import "react-input-range/lib/css/index.css";

const { TabPane } = Tabs;

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

export default memo(function ModalTabs(props) {
  const {
    currentTable,
    externalCurrentTable,
    selectedColumns,
    datastructureReducer,
    isTableAllColumnsSelected,
    handleDropDownChange,
    handleSelectColumn,
    handleTableSelect,
    handleTableSelectForExternalData,
    handleSelectAllColumn,
    handleUnselectAllColumns,
    preSelectedColumns,
    requiredColumns,
    handleInternalInputChange,
  } = props;

  const [salesValue, setSalesValue] = useState(10);
  const [marketSalesValue, setMarketSalesValue] = useState(100);
  const [isMounted, setIsMounted] = useState(false);
  const [columnAliases, setColumnAliases] = useState({});
  const [externalColumnAliases, setExternalColumnAliases] = useState({});
  const [selectedExternalColumns, setSelectedExternalColumns] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  let data = JSON.parse(localStorage.getItem("auth"));
  let email = data?.email;

  const allowedEmails = ["rick.miller@nla.com", "rod.brown@nla.com", "kim@nla.com", "bridget@nla.com"];

  useEffect(() => {
    const initialColumnAliases = {};
    datastructureReducer?.structure?.data?.structure
      ?.filter(
        (val) =>
          val.table === currentTable || val.table === externalCurrentTable
      )[0]
      ?.columns.forEach((column) => {
        if (preSelectedColumns.includes(column)) {
          initialColumnAliases[column] = feature_map[column];
        } else {
          initialColumnAliases[column] = column;
        }
      });
    setColumnAliases(initialColumnAliases);
    setExternalColumnAliases(initialColumnAliases);
    setIsMounted(true);
  }, [datastructureReducer, currentTable, externalCurrentTable]);

  if (!isMounted) return null; // Prevent rendering before mounting

  const handleInputChange = (e, column, tab) => {
    const dataMapping = selectedColumns.find(
      (tableMapping) => tableMapping.table === currentTable
    );
    const isSelected = dataMapping?.columns?.some(
      (columnMapping) => columnMapping.original_column === column
    );

    if (tab === "internal" && isSelected) {
      // console.log("change", e.target.value, column);
      setColumnAliases((prevColumnAliases) => ({
        ...prevColumnAliases,
        [column]: e.target.value,
      }));
      handleInternalInputChange(e.target.value, column);
    }

    if (tab === "external") {
      setExternalColumnAliases((prevColumnAliases) => ({
        ...prevColumnAliases,
        [column]: e.target.value,
      }));
    }
  };

  const ModalHeader = () => {
    return (
      <div className="row padding-spacer align-items-center mb-4 ">
        {/* <div className="col-md-4 select_table-box">
          <div className="px-3">
            <label className="mb-4">Market Sales</label>
            <InputRange
              maxValue={100}
              minValue={0}
              value={marketSalesValue}
              formatLabel={marketSalesValue => `${marketSalesValue}%`}
              onChange={(marketSalesValue) => setMarketSalesValue(marketSalesValue)}
            />
          </div>
        </div>
        <div className="col-md-4 select_table-box">
          <div className="px-3">
            <label className="mb-4">Sales Revenue</label>
            <InputRange
              maxValue={10}
              minValue={0}
              value={salesValue}
              formatLabel={salesValue => `${salesValue}%`}
              onChange={(salesValue) => setSalesValue(salesValue)}
            />
          </div>
        </div> */}
        <div
          className="col-md-4 select_table-box position-relative"
          style={{ marginBottom: "10px" }}>
          <select
            className="form-select"
            value={currentTable}
            onChange={(e) => handleTableSelect(e)}>
            <option value="">Select internal table</option>
            {/* {datastructureReducer?.structure?.data?.structure?.map(({ table }) => (
              <option value={table}>{table}</option>
            ))} */}
            {datastructureReducer?.structure?.data?.structure
              ?.filter(({ table }) => {
                if (allowedEmails.includes(email)) {
                  return table === "Kevins" || table === "SubKevins";
                }
                return true;
              })
              ?.map(({ table }) => (
                <option value={table}>{table}</option>
              ))}
          </select>
        </div>
      </div>
    );
  };

  // const filterdValue = datastructureReducer?.structure?.data?.structure?.filter((value)=>{value.isSelected === 'IsSelected'})
  // console.log(filterdValue)
  // console.log(datastructureReducer, "datasturcuts")
  const exampleColumns = [
    "_id",
    "WeekEnding",
    "Retailer",
    "Product",
    "mobility_workplaces",
    "Mob",
  ];

  return (
    <Tabs
      defaultActiveKey="1"
      tabPosition="top"
      size="middle"
      style={{ paddingLeft: "15px" }}>
      <TabPane tab="Internal" key="1" color="primary">
        <div className="row padding-spacer">
          <ModalHeader />
          {currentTable !== null ? (
            <>
              <div
                className="table-responsivev"
                style={{ maxHeight: "300px", overflowY: "auto" }}>
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
                                  datastructureReducer?.structure?.data?.structure?.filter(
                                    (val) => val.table === currentTable
                                  )
                                );
                              } else {
                                handleUnselectAllColumns(
                                  datastructureReducer?.structure?.data?.structure?.filter(
                                    (val) => val.table === currentTable
                                  )
                                );
                              }
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`selectAll`}></label>
                        </div>
                        Select All
                      </th>
                      <th>Database Measure</th>
                      <th>Renamed Measure</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    
                    {datastructureReducer?.structure?.data?.structure?.filter((val) => val.table === currentTable)[0]?.columns.map((column, index) => {
                      // console.log(column)
                      const dataMapping = selectedColumns.find((tableMapping) => tableMapping.table === currentTable);
                      const isSelected = dataMapping?.columns?.some((columnMapping) => columnMapping.original_column === column);
                      const isRequired = requiredColumns.includes(column);
                      return (
                        <tr key={index}>
                          <td>
                            <div className="form-check custom-checkbox">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`${column}-${index}`}
                                checked={isSelected}
                                value={column}
                                onChange={(e) => handleSelectColumn(e.target.value, e.target)}
                                disabled={isRequired}
                              />
                              <label className="form-check-label" htmlFor={`${column}-${index}`}></label>
                            </div>
                          </td>
                          <td>{column}</td>
                          <td>
                            <div className="col-md-8">
                              <div className="input-box">
                                <input
                                  type="text"
                                  value={columnAliases[column] || ""}
                                  placeholder="Renamed Measure"
                                  className="centered-placeholder"
                                  onChange={(e) => handleInputChange(e, column, "internal")}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody> */}

                  <tbody>
                    {datastructureReducer?.structure?.data?.structure
                      ?.filter((val) => val.table === currentTable)[0]
                      ?.columns.sort((a, b) => {
                        // console.log(b,"b")
                        const dataMapping = selectedColumns.find(
                          (tableMapping) => tableMapping.table === currentTable
                        );
                        const isSelectedA = dataMapping?.columns?.some(
                          (columnMapping) => columnMapping.original_column === a
                        );
                        const isSelectedB = dataMapping?.columns?.some(
                          (columnMapping) => columnMapping.original_column === b
                        );
                        // console.log(isSelectedA)

                        return isSelectedA === isSelectedB
                          ? 0
                          : isSelectedA
                            ? -1
                            : 1;
                      })
                      .map((column, index) => {
                        const dataMapping = selectedColumns.find(
                          (tableMapping) => tableMapping.table === currentTable
                        );
                        const isSelected = dataMapping?.columns?.some(
                          (columnMapping) =>
                            columnMapping.original_column === column
                        );
                        const isRequired = requiredColumns.includes(column);

                        // console.log(dataMapping, isSelected, isRequired);

                        return (
                          <tr key={index}>
                            <td>
                              <div className="form-check custom-checkbox">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`${column}-${index}`}
                                  checked={isSelected}
                                  value={column}
                                  onChange={(e) =>
                                    handleSelectColumn(e.target.value, e.target)
                                  }
                                  disabled={isRequired}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`${column}-${index}`}></label>
                              </div>
                            </td>

                            <td>{column}</td>

                            {/* Input Box for Renaming */}
                            <td>
                              <div className="col-md-8">
                                <div className="input-box">
                                  {preSelectedColumns &&
                                    preSelectedColumns.includes(column) ? (
                                    <input
                                      readonly="readonly"
                                      type="text"
                                      value={columnAliases[column] || ""}
                                      placeholder="Renamed Measure"
                                      className="centered-placeholder"
                                      style={{ color: "#808080" }}
                                    // onChange={(e) =>
                                    //   handleInputChange(e, column, "internal")
                                    // }
                                    />
                                  ) : (
                                    <input
                                      type="text"
                                      value={columnAliases[column] || ""}
                                      placeholder="Renamed Measure"
                                      className="centered-placeholder"
                                      onChange={(e) =>
                                        handleInputChange(e, column, "internal")
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}
        </div>
      </TabPane>
      <TabPane tab="External" key="2" color="primary">
        <div className="row padding-spacer">
          <div className="col-md-3">
            {/* <div className="search-icon-box">
              <input
                type="number"
                placeholder="Market Share (%)"
                class="centered-placeholder"
                step="0.01"
                min="0"
                max="100"
              />
            </div> */}
          </div>
          <div className="col-md-3">
            {/* <div className="search-icon-box">
              <input type="text" placeholder="Competitor dollar sales" class="centered-placeholder" />
            </div> */}
          </div>
          <div className="col-md-3 select_table-box">
            {/* <select>
              <option value="">No. of weeks</option>
              <option value="golden_krust_full">26</option>
              <option value="golden_krust_full">52</option>
            </select> */}
          </div>
          <div className="col-md-3 select_table-box">
            <select onChange={(e) => handleTableSelectForExternalData(e)}>
              <option value="">Select external table</option>
              <option value="golden_krust_full">Mobility</option>
            </select>
          </div>
          {externalCurrentTable !== null ? (
            <>
              <div
                className="table-responsivev"
                style={{ maxHeight: "300px", overflowY: "auto" }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th className="d-flex align-items-center">
                        <div className="form-check custom-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`selectAll`}
                            checked={selectAllChecked}
                            onChange={(e) => {
                              const isChecked = e.target.checked;

                              // Update the "Select All" checkbox state
                              setSelectAllChecked(isChecked);

                              // Update the state of all individual checkboxes based on "Select All" checkbox
                              if (isChecked) {
                                const allColumns = exampleColumns.map(
                                  (column) => ({
                                    original_column: column,
                                  })
                                );
                                setSelectedExternalColumns(allColumns);
                              } else {
                                setSelectedExternalColumns([]);
                              }
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`selectAll`}></label>
                        </div>
                        Select All
                      </th>
                      <th>Database Measure</th>
                      <th>Renamed Measure</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exampleColumns.map((column, index) => {
                      const isSelected = selectedExternalColumns.some(
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
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const isChecked = e.target.checked;

                                  if (isChecked) {
                                    // Add the selected column to the state
                                    setSelectedExternalColumns(
                                      (prevSelectedColumns) => [
                                        ...prevSelectedColumns,
                                        { original_column: value },
                                      ]
                                    );
                                  } else {
                                    // Remove the unselected column from the state
                                    setSelectedExternalColumns(
                                      (prevSelectedColumns) =>
                                        prevSelectedColumns.filter(
                                          (columnMapping) =>
                                            columnMapping.original_column !==
                                            value
                                        )
                                    );
                                  }
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`${column}-${index}`}></label>
                            </div>
                          </td>
                          <td>{column}</td>
                          <td>
                            <div className="col-md-8">
                              <div className="input-box">
                                <input
                                  type="text"
                                  value={column}
                                  placeholder="Renamed Measure"
                                  className="centered-placeholder"
                                  onChange={(e) =>
                                    handleInputChange(e, column, "external")
                                  }
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}
        </div>
      </TabPane>
    </Tabs>
  );
});

import React from "react";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
// import Multiselect from "multiselect-react-dropdown";
import allActions from "../../../store/index";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router";
import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

// Function to generate options based on data and selected values
const generateOptions = (data, selectedValues, excludedValues) => {
  if (!data) {
    return [];
  }

  // Filter out selected values and excluded values from the options
  const filteredOptions = data.filter((item) => !selectedValues.includes(item) && !excludedValues.includes(item));

  return filteredOptions.map((item) => (
    <Select.Option key={item} value={item} className="custom-tooltip-option" data-tooltip={item}>
      {item}
    </Select.Option>
  ));
};

const AddChartModal = ({ showAddChartModal, setShowAddChartModal, currentSlideId, callingQuestionsOnReducersSuccess, }) => {

  const dispatch = useDispatch();
  const { id, model_id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const createChartReducer = useSelector((state) => state.addChartReducer);
  const combinedColumnsReducer = useSelector((state) => state.combinedColumnsReducer);
  const userChartsDataReducer = useSelector((state) => state.userChartsDataReducer);
  const getFiltersReducer = useSelector((state) => state.getFiltersReducer);
  const availableProducts = getFiltersReducer?.filters?.data?.products || [];
  const retailers = getFiltersReducer?.filters?.data?.retailers || [];
  const brands = getFiltersReducer?.filters?.data?.brands || [];

  const [xAxisDataPoint, setXAxisDataPoint] = React.useState([]);
  const [yAxisDataPoint, setYAxisDataPoint] = React.useState([]);
  const [xAxisOptions, setXAxisOptions] = React.useState([]);
  const [yAxisOptions, setYAxisOptions] = React.useState([]);

  const handleClose = () => {
    setShowAddChartModal(false);
  };

  const [chart, setChart] = React.useState({
    model_id: model_id,
    slide_id: currentSlideId,
    chart_name: "",
    chart_json: [],
    chart_type: "",
    chart_type_Weeaks: "",
    Aggregation: "",
    x_axis_label: "",
    x_axis_data_point: "",
    y_axis_label: "",
    y_axis_data_point: "",
    chart_data_type: "",
  });

  const handleChange = (e) => {
    setChart({ ...chart, ['chart_type']: e });
  };

  const createChart = () => {
    setIsLoading(true);
    dispatch(
      allActions.userChartsDataAction.fetchUserChartsData({
        project_id: id,
        model_id: model_id,
        columns: [...xAxisDataPoint, ...yAxisDataPoint],
        retailers: retailers,
        products: availableProducts,
        brands: brands,
      })
    );
  };

  React.useEffect(() => {
    if (userChartsDataReducer.success) {
      dispatch(
        allActions.addChartAction.addChart({
          ...chart,
          chart_json: userChartsDataReducer?.data?.data,
          x_axis_data_point: JSON.stringify(xAxisDataPoint),
          y_axis_data_point: JSON.stringify(yAxisDataPoint),
        })
      );
      delete userChartsDataReducer.success;
    }
  }, [userChartsDataReducer]);

  React.useEffect(() => {
    setChart({ ...chart, slide_id: currentSlideId });
  }, [currentSlideId]);

  React.useEffect(() => {
    if (createChartReducer.success) {
      callingQuestionsOnReducersSuccess(createChartReducer);
      delete createChartReducer.success;
      setIsLoading(false);
      handleClose();
    }
  }, [createChartReducer]);

  React.useEffect(() => {
    // Generate options for X Axis Select, excluding Y Axis selections and previously selected X Axis values
    setXAxisOptions(generateOptions(combinedColumnsReducer?.columns?.data, yAxisDataPoint, xAxisDataPoint));

    // Generate options for Y Axis Select, excluding X Axis selections and previously selected Y Axis values
    setYAxisOptions(generateOptions(combinedColumnsReducer?.columns?.data, xAxisDataPoint, yAxisDataPoint));
  }, [combinedColumnsReducer?.columns?.data, xAxisDataPoint, yAxisDataPoint]);

  // Chart Type
  const optionsChart = [
    { value: "linechart", label: "Line Chart", name: "linechart" },
    { value: "barchart", label: "Bar Chart" },
    { value: "scatterchart", label: "Scatter Chart" },
    { value: "radarchart", label: "Radar Chart" },
  ];

  // Aggregrate
  const optionsAggregrate = [
    { value: "summation", label: "Summation" },
    { value: "average", label: "Average" },
    { value: "minimum", label: "Minimum" },
    { value: "maximum", label: "Maximum" },
    { value: "count", label: "Count" },
  ];

  // Select Period
  const optionsPeriod = [
    { value: "quarterly", label: "Quarterly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  const handleChangePeriod = (value) => {
    console.log(`selected ${value}`);
  };

  // Select Year 
  const currentYear = new Date().getFullYear();
  const optionsYear = [];
  for (let i = currentYear; i > currentYear - 5; i--) {
    optionsYear.push({
      label: i.toString(),
      value: i.toString(),
    });
  }

  const handleChangeYear = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Modal show={showAddChartModal} onHide={handleClose} centered scrollable>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Add Chart</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflow: "auto" }}>
        <div className="nla_modal_banenr">
          <img
            src={require("../../../assets/images/create-new-model-intro-image.png")}
            alt="placeholder"
            className="img-fluid"
          />
        </div>
        <div className="nla-add-heading-block">
          <form>
            <div className="input-wrapper rounded border">
              <i className="fa-solid fa-chart-simple icon-absolute"></i>
              {/* <select
                className="form-select"
                aria-label="Default select example"
                name="chart_type"
                value={chart.chart_type}
                onChange={handleChange}
              >
                <option disabled value="">
                  Select Chart Type
                </option>
                <option value="Histogram">Histogram</option>
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="scatter">Scatter Chart</option>
                <option value="radar">Radar Chart</option>
                <option value="Pie Chart">Pie Chart</option>
                <option value="Waterfall">Waterfall</option>
              </select> */}
              <Select
                allowClear
                style={{
                  width: '100%',
                }}
                name="chart_type"
                className="filtered-accordion-ant-select"
                placeholder="Select Chart Type"
                onChange={handleChange}
                options={optionsChart}
              />
            </div>
            <div className="input-wrapper rounded border">
              <i className="fa-regular fa-calendar-plus icon-absolute"></i>
              <Select
                allowClear
                style={{
                  width: '100%',
                }}
                className="filtered-accordion-ant-select"
                placeholder="Select Period"
                // defaultValue={['Monthly']}
                onChange={handleChangePeriod}
                options={optionsPeriod}
              />
            </div>
            <div className="input-wrapper rounded border">
              <i className="fa-regular fa-calendar-days icon-absolute"></i>
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: '100%',
                }}
                className="filtered-accordion-ant-select"
                placeholder="Select Year"
                // defaultValue={['2024']}
                onChange={handleChangeYear}
                options={optionsYear}
              />
            </div>
            <div className="nla-add-heading-fiend-group inp">
              <i className="fa-regular fa-x icon-absolute"></i>
              <input
                type="text"
                className="form-control"
                placeholder="X Axis Label"
                name="x_axis_label"
                value={chart.x_axis_label}
                onChange={handleChange}
              />
            </div>
            <div className="input-wrapper">
              <i className="fa-regular fa-x icon-absolute"></i>
              <Select
                // mode="multiple"
                placeholder="Select X Axis Data Points"
                prefixIcon={<SearchOutlined />}
                value={xAxisDataPoint}
                onChange={(values) => { setXAxisDataPoint([values]); }}
                style={{ width: "100%", }}
                className="filtered-accordion-ant-select show-show"
                showSearch
              >
                {xAxisOptions}
              </Select>
            </div>
            <div className="nla-add-heading-fiend-group inp">
              <i className="fa-regular fa-y icon-absolute"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Y Axis Label"
                name="y_axis_label"
                value={chart.y_axis_label}
                onChange={handleChange}
              />
            </div>
            <div className="two-element-one-row">
              <div className="input-wrapper">
                <i className="fa-regular fa-y icon-absolute"></i>
                <Select
                  mode="multiple"
                  placeholder="Select Y Axis Data Points"
                  prefixIcon={<SearchOutlined />}
                  value={yAxisDataPoint}
                  onChange={(values) => {
                    // setYAxisDataPoint(values);
                    setYAxisDataPoint(values);
                  }}
                  style={{ width: "100%", }}
                  className="filtered-accordion-ant-select"
                >
                  {yAxisOptions}
                </Select>
              </div>
              <div className="input-wrapper rounded border">
                <i className="fa-solid fa-object-group icon-absolute"></i>
                {/* <select
                  className="form-select"
                  aria-label="Default select example"
                  name="Aggregation"
                  value={chart.Aggregation}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Select Aggregate
                  </option>
                  <option value="sum">Summation</option>
                  <option value="avg">Average</option>
                  <option value="min">Minimum</option>
                  <option value="max">Maximum</option>
                  <option value="count">Count</option>
                </select> */}
                <Select
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  className="filtered-accordion-ant-select"
                  placeholder="Select Aggregrate"
                  onChange={handleChange}
                  options={optionsAggregrate}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={handleClose}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={() => createChart()}>
          {isLoading ? (
            <>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              Loading...
            </>
          ) : (
            "Add"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChartModal;

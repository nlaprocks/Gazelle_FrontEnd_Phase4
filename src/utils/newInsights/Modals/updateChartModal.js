import React from "react";
import "./modal.css";
import Multiselect from "multiselect-react-dropdown";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../store/index";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router";
import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

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

const UpdateChartModal = ({ showUpdateChartModal, setShowUpdateChartModal, updateChartData, setUpdateChartData, callingQuestionsOnReducersSuccess, }) => {

  // console.log("updateChartData::: ", updateChartData);
  const dispatch = useDispatch();
  const { id, model_id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  // const createChartReducer = useSelector((state) => state.addChartReducer);
  const editChartReducer = useSelector((state) => state.editChartDataReducer);
  const combinedColumnsReducer = useSelector((state) => state.combinedColumnsReducer);
  // const userChartsDataReducer = useSelector((state) => state.userChartsDataReducer);
  const getFiltersReducer = useSelector((state) => state.getFiltersReducer);
  const [xAxisDataPoint, setXAxisDataPoint] = React.useState([]);
  const [yAxisDataPoint, setYAxisDataPoint] = React.useState([]);
  const [xAxisOptions, setXAxisOptions] = React.useState([]);
  const [yAxisOptions, setYAxisOptions] = React.useState([]);
  const [userChartsData, setUserChartsData] = React.useState({ loading: false, data: [], success: false });

  const handleClose = () => {
    setShowUpdateChartModal(false);
  };

  const [chart, setChart] = React.useState({
    model_id: model_id,
    // slide_id: updateChartData?.slide_id,
    chart_name: "",
    chart_json: [],
    chart_type: "",
    x_axis_label: "",
    x_axis_data_point: "",
    y_axis_label: "",
    y_axis_data_point: "",
    chart_data_type: "",
  });

  // console.log("chart::: ", chart);

  // const inputDataCombinationReducer = useSelector((state) => state.inputDataCombinationReducer);
  // const outputDataCombinationReducer = useSelector((state) => state.outputDataCombinationReducer);

  const handleChange = (e) => {
    setChart({ ...chart, [e.target.name]: e.target.value });
  };

  const editChart = () => {
    setIsLoading(true);
    // dispatch(
    //   allActions.userChartsDataAction.fetchUserChartsData({
    //     project_id: 511,
    //     model_id: 566,
    //     columns: [...xAxisDataPoint, ...yAxisDataPoint],
    //   })
    // );

    async function fetchUserChartsData() {
      setUserChartsData({ ...userChartsData, loading: true });
      try {
        const project_id = id;
        const model_id1 = model_id;
        const columns = [...xAxisDataPoint, ...yAxisDataPoint];

        let api = `${process.env.REACT_APP_NGROK}/insights/user-charts/columns-data?project_id=${encodeURIComponent(
          project_id
        )}&model_id=${encodeURIComponent(model_id1)}`;

        const productsToUse =
          updateChartData?.filters_list?.products.length > 0
            ? updateChartData?.filters_list?.products
            : getFiltersReducer?.filters?.data?.products || [];

        const retailersToUse =
          updateChartData?.filters_list?.retailers.length > 0
            ? updateChartData?.filters_list?.retailers
            : getFiltersReducer?.filters?.data?.retailers || [];

        // Add products to the API URL if the array is not empty
        if (productsToUse.length > 0) {
          const productParam = productsToUse
            .map((product) => encodeURIComponent(product))
            .join(encodeURIComponent(","));
          api += `&Product=${productParam}`;
        }

        if (getFiltersReducer?.filters?.data?.brands.length > 0) {
          const productParam = getFiltersReducer?.filters?.data?.brands
            ?.map((product) => encodeURIComponent(product))
            .join(encodeURIComponent(","));
          api += `&Brand=${productParam}`;
        }

        // Add retailers to the API URL if the array is not empty
        if (retailersToUse.length > 0) {
          const retailerParam = retailersToUse
            .map((retailer) => encodeURIComponent(retailer))
            .join(encodeURIComponent(","));
          api += `&Retailer=${retailerParam}`;
        }

        var formdata = new FormData();
        formdata.append("cols_required", columns.join("|"));

        const res = await axios.post(api, formdata);
        const { data } = res;

        if (data) {
          setUserChartsData({ ...userChartsData, loading: false, success: true, data: data.data });
        }
      } catch (error) {
        setUserChartsData({ ...userChartsData, loading: false, success: false });
      }
    }
    fetchUserChartsData();
  };

  React.useEffect(() => {
    if (userChartsData.success) {
      dispatch(
        allActions.editChartDataAction.editChartData({
          ...chart,
          chart_json: userChartsData?.data,
          x_axis_data_point: JSON.stringify(xAxisDataPoint),
          y_axis_data_point: JSON.stringify(yAxisDataPoint),
        })
      );
      setUserChartsData({ ...userChartsData, loading: false, success: false });
    }
  }, [userChartsData]);

  React.useEffect(() => {
    setChart({
      ...chart,
      slide_id: updateChartData?.slide_id,
      chart_type: updateChartData?.chart_type,
      x_axis_label: updateChartData?.x_axis_label,
      x_axis_data_point: JSON.parse(updateChartData?.x_axis_data_point),
      y_axis_label: updateChartData?.y_axis_label,
      y_axis_data_point: JSON.parse(updateChartData?.y_axis_data_point),
      chart_id: updateChartData?.id,
    });
    setXAxisDataPoint(JSON.parse(updateChartData?.x_axis_data_point));
    setYAxisDataPoint(JSON.parse(updateChartData?.y_axis_data_point));
  }, [updateChartData]);

  React.useEffect(() => {
    if (editChartReducer.success) {
      callingQuestionsOnReducersSuccess(editChartReducer);
      delete editChartReducer.success;
      setIsLoading(false);
      handleClose();
    }
  }, [editChartReducer]);

  React.useEffect(() => {
    // Generate options for X Axis Select, excluding Y Axis selections and previously selected X Axis values
    setXAxisOptions(generateOptions(combinedColumnsReducer?.columns?.data, yAxisDataPoint, xAxisDataPoint));

    // Generate options for Y Axis Select, excluding X Axis selections and previously selected Y Axis values
    setYAxisOptions(generateOptions(combinedColumnsReducer?.columns?.data, xAxisDataPoint, yAxisDataPoint));
  }, [combinedColumnsReducer?.columns?.data, xAxisDataPoint, yAxisDataPoint]);

  return (
    <Modal show={showUpdateChartModal} onHide={handleClose} centered scrollable>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Update Chart</h5>
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
            <div className="nla-add-heading-fiend-group">
              <i className="fa-solid fa-chart-simple icon-absolute"></i>
              <select
                className="form-select"
                aria-label="Default select example"
                name="chart_type"
                value={chart.chart_type}
                onChange={handleChange}
              >
                <option disabled value="">
                  Select Chart Type
                </option>
                {/* <option value="Histogram">Histogram</option> */}
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="scatter">Scatter Chart</option>
                <option value="radar">Radar Chart</option>

                {/* <option value="Pie Chart">Pie Chart</option> */}
                {/* <option value="Waterfall">Waterfall</option> */}
              </select>
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
                onChange={(values) => {
                  setXAxisDataPoint([values]);
                }}
                style={{
                  width: "100%",
                }}
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
                style={{
                  width: "100%",
                }}
                className="filtered-accordion-ant-select"
              >
                {yAxisOptions}
              </Select>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={handleClose}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={() => editChart()}>
          {isLoading ? (
            <>
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              Loading...
            </>
          ) : (
            "Edit"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateChartModal;

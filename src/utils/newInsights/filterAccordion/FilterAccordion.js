import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import { Select, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./filterAccordion.css";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../../store";
import { useParams } from "react-router";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Spinner } from "react-bootstrap";
import ApplyFilterModal from "../Modals/applyFilters"


dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const dateFormat = "MM/DD/YYYY";

const FilterAccordion = ({ InsightsBlock }) => {

  const [showApplyFilterModal, setShowApplyFilterModal] = useState(true);
  const { model_id } = useParams();
  const dispatch = useDispatch();
  const [retailerBrandsProducts, setRetailersBrandsProducts] = React.useState(null);
  const getFiltersReducer = useSelector((state) => state.getFiltersReducer);
  const addFiltersReducer = useSelector((state) => state.addFiltersReducer);
  const resetFiltersReducer = useSelector((state) => state.resetFiltersReducer);
  const retailerBrandsProductsReducer = useSelector((state) => state.retailerBrandsProductsReducer);
  const [selectedRetailers, setSelectedRetailers] = React.useState([]);
  const [selectedBrands, setSelectedBrands] = React.useState([]);
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [filterApplyStatus, setFilterApplyStatus] = React.useState(true);

  function formatDateToMMDDYYYY(isoDateString) {
    if (!isoDateString) { return null; }
    const dateObject = new Date(isoDateString);
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    const formattedDate = `${month}/${day}/${dateObject.getFullYear()}`;
    return formattedDate;
  }

  const [dateRange, setDateRange] = React.useState({
    startDate: null,
    endDate: null,
  });

  const { startDate, endDate } = dateRange;

  const resetFilters = () => {
    // console.log("useEffect resetFilters ")
    dispatch(allActions.resetFiltersAction.resetFilters(model_id));
    // setFilterApplyStatus(true);
  };

  const applyFilters = () => {
    // console.log("useEffect applyFilters ")
    setFilterApplyStatus(false);
    dispatch(
      allActions.addFiltersAction.saveFilters({
        model_id: model_id,
        retailers: selectedRetailers,
        brands: selectedBrands,
        products: selectedProducts,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
    );
  };

  React.useEffect(() => {
    if (getFiltersReducer?.filters?.data) {
      // console.log("useEffect getFiltersReducer?.filters?.data ")
      if (filterApplyStatus) {
        const startIsoDateString = getFiltersReducer?.filters?.data?.startDate;
        const endIsoDateString = getFiltersReducer?.filters?.data?.endDate;
        setSelectedRetailers(getFiltersReducer?.filters?.data?.retailers);
        setSelectedProducts(getFiltersReducer?.filters?.data?.products);
        setSelectedBrands(getFiltersReducer?.filters?.data?.brands);
        setDateRange({
          startDate: formatDateToMMDDYYYY(startIsoDateString),
          endDate: formatDateToMMDDYYYY(endIsoDateString),
        });
      }
    }
  }, [getFiltersReducer?.filters?.data]);

  React.useEffect(() => {
    if (addFiltersReducer.success) {
      // console.log("useEffect addFiltersReducer  1")
      dispatch(allActions.getFiltersAction.fetchFilters({ model_id: model_id }));
      delete addFiltersReducer.success;
    }
  }, [addFiltersReducer]);

  React.useEffect(() => {
    if (resetFiltersReducer.success) {
      // console.log("useEffect resetFiltersReducer ")

      dispatch(allActions.getFiltersAction.fetchFilters({ model_id: model_id }));
      delete resetFiltersReducer.success;
    }
  }, [resetFiltersReducer]);

  React.useEffect(() => {
    // console.log("useEffect retailerBrandsProductsReducer ")

    if (retailerBrandsProductsReducer?.data?.data) {
      setRetailersBrandsProducts(retailerBrandsProductsReducer.data.data);
    }
  }, [retailerBrandsProductsReducer]);

  const allPossibleBrands = new Set();
  const allPossibleProducts = new Set();

  if (selectedBrands.length > 0) {
    selectedBrands.forEach((brand) => {
      selectedRetailers.forEach((retailer) => {
        if (retailerBrandsProducts && retailerBrandsProducts[retailer] && retailerBrandsProducts[retailer][brand]) {
          retailerBrandsProducts[retailer][brand].forEach((product) => {
            allPossibleProducts.add(product);
          });
        }
      });
    });
  } else {
    selectedRetailers.forEach((retailer) => {
      if (retailerBrandsProducts && retailerBrandsProducts[retailer]) {
        Object.keys(retailerBrandsProducts[retailer]).forEach((brand) => {
          retailerBrandsProducts[retailer][brand].forEach((product) => {
            allPossibleProducts.add(product);
          });
        });
      }
    });
  }

  selectedRetailers.forEach((retailer) => {
    if (retailerBrandsProducts && retailerBrandsProducts[retailer]) {
      Object.keys(retailerBrandsProducts[retailer]).forEach((brand) => {
        allPossibleBrands.add(brand);
      });
    }
  });

  // React.useEffect(() => {
  //   const filterProducts = () => {
  //     const filteredProducts = [];

  //     selectedRetailers.forEach((retailer) => {
  //       selectedBrands.forEach((brand) => {
  //         const productsForBrand = retailerBrandsProducts?.[retailer]?.[brand];
  //         if (productsForBrand) {
  //           // Add products for the current brand that are not already in the filtered list
  //           productsForBrand.forEach((product) => {
  //             if (!filteredProducts.includes(product)) {
  //               filteredProducts.push(product);
  //             }
  //           });
  //         }
  //       });
  //     });

  //     setSelectedProducts(filteredProducts);
  //   };

  //   if (retailerBrandsProducts) {
  //     filterProducts();
  //   }
  // }, [selectedRetailers, selectedBrands, retailerBrandsProducts]);


  return (
    <>
      <div className="tab-content w-100">
        <Card defaultActiveKey="10" className="border-0 bg-transparent">
          <div className="max-w-lg">
            <h4>Apply Filters</h4>
            {/* <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying.</p> */}
          </div>
          <Card.Body eventKey="0">
            <div className="filter-accordion-row-wrapper">
              <div className="filter-accordion-left-wrapper">
                <div className="input-wrapper rounded">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <Select
                    mode="multiple"
                    placeholder="Select Retailer"
                    prefixIcon={<SearchOutlined />}
                    value={selectedRetailers}
                    onChange={(values) => {
                      if (values.includes("selectAll")) {
                        if (selectedRetailers.length === Object.keys(retailerBrandsProducts).length) {
                          setSelectedRetailers([]);
                          setSelectedBrands([]);
                          setSelectedProducts([]);
                        } else {
                          setSelectedRetailers([...Object.keys(retailerBrandsProducts).sort()]);
                        }
                      } else {
                        // setSelectedRetailers(values);
                        const updatedSelectedBrands = selectedBrands.filter((brand) => {
                          // Check if any of the remaining selected retailers have the brand
                          return values.some(
                            (retailer) =>
                              retailerBrandsProducts &&
                              retailerBrandsProducts[retailer] &&
                              retailerBrandsProducts[retailer][brand]
                          );
                        });
                        setSelectedRetailers(values);
                        setSelectedBrands(updatedSelectedBrands);
                      }
                    }}
                    style={{
                      width: "100%",
                    }}
                    className="filtered-accordion-ant-select"
                    maxTagCount="responsive"
                  >
                    <Select.Option key="selectAll" value="selectAll" className="custom-tooltip-option">
                      {retailerBrandsProducts
                        ? selectedRetailers.length === Object.keys(retailerBrandsProducts).length
                          ? "Deselect All"
                          : "Select All"
                        : null}
                    </Select.Option>
                    {retailerBrandsProducts
                      ? Object.keys(retailerBrandsProducts)
                        .sort()
                        // .filter((retailer) => !selectedRetailers.includes(retailer))
                        .map((retailer) => (
                          <Select.Option
                            key={retailer}
                            value={retailer}
                            className="custom-tooltip-option"
                            data-tooltip={retailer}
                          >
                            {retailer}
                          </Select.Option>
                        ))
                      : null}
                  </Select>
                </div>
                <div className="input-wrapper rounded">
                  <i className="fa-solid fa-file"></i>
                  <Select
                    mode="multiple"
                    placeholder="Select Brand"
                    prefixIcon={<SearchOutlined />}
                    value={selectedBrands}
                    // onChange={setSelectedBrands}
                    onChange={(values) => {
                      if (values.includes("selectAll")) {
                        if (selectedBrands.length === [...allPossibleBrands].length) {
                          setSelectedBrands([]);
                        } else {
                          setSelectedBrands([...allPossibleBrands]);
                        }
                      } else {
                        setSelectedBrands(values);
                      }
                    }}
                    style={{
                      width: "100%",
                    }}
                    className="filtered-accordion-ant-select"
                    maxTagCount="responsive"
                  >
                    <Select.Option key="selectAll" value="selectAll" className="custom-tooltip-option">
                      {selectedBrands.length === [...allPossibleBrands].length ? "Deselect All" : "Select All"}
                    </Select.Option>
                    {[...allPossibleBrands]
                      // .filter((brand) => !selectedBrands.includes(brand))
                      .sort()
                      .map((brand) => (
                        <Select.Option key={brand} value={brand} className="custom-tooltip-option" data-tooltip={brand}>
                          {brand}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
                <div className="input-wrapper rounded">
                  <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                  <Select
                    mode="multiple"
                    placeholder="Select Products"
                    prefixIcon={<SearchOutlined />}
                    value={selectedProducts}
                    // onChange={setSelectedProducts}
                    onChange={(values) => {
                      if (values.includes("selectAll")) {
                        if (selectedProducts.length === [...allPossibleProducts].length) {
                          setSelectedProducts([]);
                        } else {
                          setSelectedProducts([...allPossibleProducts]);
                        }
                      } else {
                        setSelectedProducts(values);
                      }
                    }}
                    style={{
                      width: "100%",
                    }}
                    className="filtered-accordion-ant-select"
                    maxTagCount="responsive"
                  >
                    <Select.Option key="selectAll" value="selectAll" className="custom-tooltip-option">
                      {selectedProducts.length === [...allPossibleProducts].length ? "Deselect All" : "Select All"}
                    </Select.Option>
                    {[...allPossibleProducts]
                      // .filter((product) => !selectedProducts.includes(product))
                      .sort()
                      .map((product) => (

                        <Select.Option
                          key={product}
                          value={product}
                          className="custom-tooltip-option"
                          data-tooltip={product}
                        >
                          {/* {product} */}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
                {/* <div className="input-wrapper rounded">
                  <RangePicker
                    className="filtered-accordion-range-picker"
                    value={[
                      startDate ? dayjs(startDate, dateFormat) : null,
                      endDate ? dayjs(endDate, dateFormat) : null,
                    ]}
                    format={dateFormat}
                    onChange={(dates) => {
                      if (!dates) {
                        setDateRange({
                          startDate: null,
                          endDate: null,
                        });
                      } else {
                        const [startMoment, endMoment] = dates;
                        const sDate = startMoment ? startMoment.format(dateFormat) : null;
                        const eDate = endMoment ? endMoment.format(dateFormat) : null;

                        setDateRange({
                          startDate: sDate,
                          endDate: eDate,
                        });
                      }
                    }}
                  />
                </div> */}
              </div>
              <div className="filter-accordion-right-wrapper">
                <button
                  className="btn btn-outline-primary reset-button"
                  onClick={() => {
                    resetFilters();
                  }}
                >
                  {resetFiltersReducer.loading ? (
                    <>
                      <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                      Loading...
                    </>
                  ) : (
                    "Reset Filter"
                  )}
                </button>
                <button
                  className="btn btn-primary filter-button"
                  onClick={() => {
                    applyFilters();
                    InsightsBlock();
                  }}
                >
                  {addFiltersReducer.loading ? (
                    <div className="d-flex align-items-center gap-1">
                      <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                      <span className="flex-1">Loading...</span>
                    </div>
                  ) : (
                    "Apply Filter"
                  )}
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      <ApplyFilterModal
        InsightsBlock={InsightsBlock}
        showApplyFilterModal={showApplyFilterModal}
        setShowApplyFilterModal={setShowApplyFilterModal}
      />
    </>
  );
};

export default FilterAccordion;

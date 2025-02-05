import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import { Select, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
// import allActions from "../../../store";
import { useParams } from "react-router";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Spinner } from "react-bootstrap";
// import ApplyFilterModal from "../Modals/applyFilters"


dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "MM/DD/YYYY";

const FilterAccordion = ({ InsightsBlock }) => {
    //   const [showApplyFilterModal, setShowApplyFilterModal] = useState(true);
    const { model_id } = useParams();
    const dispatch = useDispatch();
    const [totalVolume, setTotalVolume] = useState("");
    const [incrementalProfit, setIncrementalProfit] = useState("");
    const [retailerBrandsProducts, setRetailersBrandsProducts] = React.useState(null);
    const getFiltersReducer = useSelector((state) => state.getFiltersReducer);
    const addFiltersReducer = useSelector((state) => state.addFiltersReducer);
    const resetFiltersReducer = useSelector((state) => state.resetFiltersReducer);
    const retailerBrandsProductsReducer = useSelector((state) => state.retailerBrandsProductsReducer);
    const [selectedRetailers, setSelectedRetailers] = React.useState([]);
    const [selectedBrands, setSelectedBrands] = React.useState([]);
    const [selectedProducts, setSelectedProducts] = React.useState([]);
    function formatDateToMMDDYYYY(isoDateString) {
        if (!isoDateString) {
            return null;
        }
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
    //   const resetFilters = () => {
    //     dispatch(allActions.resetFiltersAction.resetFilters(model_id));
    //   };
    //   const applyFilters = () => {
    //     dispatch(
    //       allActions.addFiltersAction.saveFilters({
    //         model_id: model_id,
    //         retailers: selectedRetailers,
    //         brands: selectedBrands,
    //         products: selectedProducts,
    //         startDate: dateRange.startDate,
    //         endDate: dateRange.endDate,
    //       })
    //     );
    //   };
    React.useEffect(() => {
        if (getFiltersReducer?.filters?.data) {
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
    }, [getFiltersReducer?.filters?.data]);
    //   React.useEffect(() => {
    //     if (addFiltersReducer.success) {
    //       dispatch(allActions.getFiltersAction.fetchFilters({ model_id: model_id }));
    //       delete addFiltersReducer.success;
    //     }
    //   }, [addFiltersReducer]);
    //   React.useEffect(() => {
    //     if (resetFiltersReducer.success) {
    //       dispatch(allActions.getFiltersAction.fetchFilters({ model_id: model_id }));
    //       delete resetFiltersReducer.success;
    //     }
    //   }, [resetFiltersReducer]);
    React.useEffect(() => {
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

    React.useEffect(() => {
        const filterProducts = () => {
            const filteredProducts = [];

            selectedRetailers.forEach((retailer) => {
                selectedBrands.forEach((brand) => {
                    const productsForBrand = retailerBrandsProducts?.[retailer]?.[brand];
                    if (productsForBrand) {
                        // Add products for the current brand that are not already in the filtered list
                        productsForBrand.forEach((product) => {
                            if (!filteredProducts.includes(product)) {
                                filteredProducts.push(product);
                            }
                        });
                    }
                });
            });

            setSelectedProducts(filteredProducts);
        };

        if (retailerBrandsProducts) {
            filterProducts();
        }
    }, [selectedRetailers, selectedBrands, retailerBrandsProducts]);

    return (
        <>
            <div className="tab-content w-100 mt-20">
                <Card defaultActiveKey="10" className="border-0 bg-transparent">
                    <div className="max-w-lg">
                        <h4>Apply Filters</h4>
                        {/* <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying.</p> */}
                    </div>
                    <Card.Body eventKey="0" className="p-0">
                        <div className="filter-accordion-row-wrapper">
                            <div className="filter-accordion-left-wrapper">
                                <div className="input-wrapper rounded">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <Select
                                        placeholder="Select event types"
                                        prefixIcon={<SearchOutlined />}
                                        style={{
                                            width: "100%",
                                            height: "49px",
                                        }}
                                        className="filtered-accordion-ant-select"
                                        maxTagCount="responsive"
                                    >
                                        <Select.Option key="eventTypes1" value="Event types 1">
                                            Event types 1
                                        </Select.Option>
                                        <Select.Option key="eventTypes2" value="Event types 2">
                                            Event types 2
                                        </Select.Option>
                                    </Select>
                                </div>
                                <div className="input-wrapper rounded">
                                    <input
                                        type="number"
                                        value={totalVolume}
                                        onChange={(e) => setTotalVolume(e.target.value)}
                                        placeholder="Total volume"
                                        className="form-control mb-0"
                                        required
                                    />
                                </div>
                                <div className="input-wrapper rounded">
                                    <input
                                        type="number"
                                        value={incrementalProfit}
                                        onChange={(e) => setIncrementalProfit(e.target.value)}
                                        placeholder="Incremental profit"
                                        className="form-control mb-0"
                                        required
                                    />
                                </div>
                                <div className="input-wrapper rounded">

                                </div>
                            </div>
                            <div className="filter-accordion-right-wrapper">
                                <button className="btn btn-outline-primary reset-button">Rese tFilter</button>
                                <button className="btn btn-primary filter-button">Apply Filter
                                </button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            {/* <ApplyFilterModal
        InsightsBlock={InsightsBlock}
        showApplyFilterModal={showApplyFilterModal}
        setShowApplyFilterModal={setShowApplyFilterModal}
      /> */}
        </>
    );
};

export default FilterAccordion;

import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router";
import allActions from "../../store/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Spinner } from "react-bootstrap";
import axios from "axios";

const FilterDropDown = ({ chartData, role, callingQuestionsOnReducersSuccess, setFilterDropDown, setClickedIndex }) => {
  const { model_id, id } = useParams();
  const getFiltersReducer = useSelector((state) => state.getFiltersReducer);
  const dispatch = useDispatch();
  const localChartFilter = useSelector((state) => state.filterChartReducer);
  const [retailerBrandsProducts, setRetailersBrandsProducts] = React.useState(null);
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [selectedRetailers, setSelectedRetailers] = React.useState([]);
  const [selectedBrands, setSelectedBrands] = React.useState([]);
  const [sFProducts, setSFProducts] = React.useState([]);
  const retailerBrandsProductsReducer = useSelector((state) => state.retailerBrandsProductsReducer);
  const [userChartsData, setUserChartsData] = React.useState({ loading: false, data: [], success: false });

  const applyFilter = () => {
    if (role === "admin") {
      dispatch(
        allActions.filterChartAction.applyFilterToChart({
          filterData: {
            chart_id: chartData[0]?.id,
            data: {
              is_admin_question: true,
              filters_list: {
                retailers: selectedRetailers,
                products: selectedProducts,
                brands: selectedBrands,
              },
            },
          },
          role: role,
        })
      );
      setClickedIndex(null);
      setSFProducts(selectedProducts);
    } else {
      dispatch(
        allActions.filterChartAction.applyFilterToChart({
          filterData: {
            chart_id: chartData[0]?.id,
            data: {
              is_admin_question: false,
              filters_list: {
                retailers: selectedRetailers,
                products: selectedProducts,
                brands: selectedBrands,
              },
            },
          },
          role: role,
        })
      );
      setClickedIndex(null);
      setSFProducts(selectedProducts);

    }
  };
  // Determine if we should show all retailers or filter based on getFiltersReducer
  const showAllRetailers =
    !getFiltersReducer?.filters?.data?.retailers || getFiltersReducer.filters.data.retailers.length === 0;

  const allPossibleProducts = new Set();
  const allPossibleBrands = new Set();

  if (getFiltersReducer?.filters?.data?.brands.length > 0) {
    getFiltersReducer?.filters?.data?.brands.forEach((brand) => {
      selectedRetailers.forEach((retailer) => {
        if (
          retailerBrandsProductsReducer.data.data &&
          retailerBrandsProductsReducer.data.data[retailer] &&
          retailerBrandsProductsReducer.data.data[retailer][brand]
        ) {
          retailerBrandsProductsReducer.data.data[retailer][brand].forEach((product) => {
            // Only add the product if it's in getFiltersReducer?.filters?.data?.products
            if (getFiltersReducer?.filters?.data?.products.includes(product)) {
              allPossibleProducts.add(product);
            }
          });
          allPossibleBrands.add(brand)
        }
      });
    });
  } else {
    selectedRetailers.forEach((retailer) => {
      if (retailerBrandsProductsReducer.data.data && retailerBrandsProductsReducer.data.data[retailer]) {
        Object.keys(retailerBrandsProductsReducer.data.data[retailer]).forEach((brand) => {
          retailerBrandsProductsReducer.data.data[retailer][brand].forEach((product) => {
            allPossibleProducts.add(product);
          });
          allPossibleBrands.add(brand);
        });
      }
    });
  }
  // console.log("chartData::: ", chartData);

  React.useEffect(() => {
    if (localChartFilter.success && localChartFilter.role === "users") {
      // ! In this case, The action is behaving unappropriatly
      // allActions.userChartsDataAction.fetchUserChartsData({
      //   project_id: 511,
      //   model_id: 566,
      //   columns: [...JSON.parse(chartData[0].x_axis_data_point), ...JSON.parse(chartData[0].y_axis_data_point)],
      // });
      async function fetchUserChartsData() {
        setUserChartsData({ ...userChartsData, loading: true });
        try {
          const project_id = id;
          const model_id1 = model_id;
          const columns = [
            ...JSON.parse(chartData[0].x_axis_data_point),
            ...JSON.parse(chartData[0].y_axis_data_point),
          ];

          let api = `${process.env.REACT_APP_NGROK}/insights/user-charts/columns-data?project_id=${encodeURIComponent(
            project_id
          )}&model_id=${encodeURIComponent(model_id1)}`;
          // Add products to the API URL if the array is not empty
          if (selectedProducts && selectedProducts.length > 0) {
            const productParam = selectedProducts
              .map((product) => encodeURIComponent(product))
              .join(encodeURIComponent(","));
            api += `&Product=${productParam}`;
          }

          if (selectedBrands && selectedBrands.length > 0) { 
            const brandParam = selectedBrands
              .map((brand) => encodeURIComponent(brand))
              .join(encodeURIComponent(","));
            api += `&Brand=${brandParam}`;
          }

          if (getFiltersReducer?.filters?.data?.brands.length > 0) {
            const productParam = getFiltersReducer?.filters?.data?.brands
              ?.map((product) => encodeURIComponent(product))
              .join(encodeURIComponent(","));
            api += `&Brand=${productParam}`;
          }

          // Add retailers to the API URL if the array is not empty
          if (selectedRetailers && selectedRetailers.length > 0) {
            const retailerParam = selectedRetailers
              .map((retailer) => encodeURIComponent(retailer))
              .join(encodeURIComponent(","));
            api += `&Retailer=${retailerParam}`;
          }
          var formdata = new FormData();
          formdata.append("cols_required", columns.join("|"));

          const res = await axios.post(api, formdata);
          const { data } = res;
          // console.log("datagggg::: ", data);
          if (data) {
            setUserChartsData({ ...userChartsData, loading: false, success: true, data: data.data });
          }
        } catch (error) {
          setUserChartsData({ ...userChartsData, loading: false, success: false });
        }
      }
      fetchUserChartsData();
      setFilterDropDown(false);
      setClickedIndex(null);
      delete localChartFilter.success;
      delete localChartFilter.role;
    }
  }, [chartData, localChartFilter, userChartsData]);
  // console.log("chartData::: ", chartData);
  const editChartReducer = useSelector((state) => state.editChartDataReducer);

  React.useEffect(() => {
    if (userChartsData.success) {
      dispatch(
        allActions.editChartDataAction.editChartData({
          model_id: model_id,
          chart_id: chartData[0].id,
          ...chartData[0],
          chart_json: userChartsData?.data,
        })
      );
      setUserChartsData({ ...userChartsData, loading: false, success: false });
    }
  }, [userChartsData]);
  React.useEffect(() => {
    if (editChartReducer.success) {
      callingQuestionsOnReducersSuccess(editChartReducer);
      // delete editChartReducer.success;
    }
  }, [editChartReducer]);

  React.useEffect(() => {
    if (retailerBrandsProductsReducer?.data?.data) {
      setRetailersBrandsProducts(retailerBrandsProductsReducer.data.data);
    }
  }, [retailerBrandsProductsReducer]);

  React.useEffect(() => {
    if (chartData) {
      setSFProducts(chartData[0]?.filters_list?.products)
      setSelectedRetailers(chartData[0]?.filters_list?.retailers);
      setSelectedProducts(chartData[0]?.filters_list?.products);
      setSelectedBrands(chartData[0]?.filters_list?.brands || []); 
    }
  }, [chartData]);

  
  React.useEffect(() => {
    const filterProducts = () => {
      const filteredProducts = [];

      selectedRetailers.forEach((retailer) => {
        selectedBrands.forEach((brand) => {
          const productsForBrand = retailerBrandsProducts?.[retailer]?.[brand];
          if (productsForBrand) {
            productsForBrand.forEach((product) => {
              if (!filteredProducts.includes(product)) {
                filteredProducts.push(product);
              }
            });
          }
        });
      });
      if (sFProducts?.length > 0){
        setSelectedProducts(sFProducts)
      }else{
        setSelectedProducts(filteredProducts);
      }
    };

    if (retailerBrandsProducts) {
      filterProducts();
    }
  }, [selectedRetailers, selectedBrands, retailerBrandsProducts]);

  console.log(sFProducts,'sFProducts')
  console.log(selectedProducts,'selectedProducts')

  // console.log("retailerBrandsProductsReducer.data.data::: ", retailerBrandsProductsReducer.data.data);
  // console.log("getFiltersReducer?.filters?.data::: ", getFiltersReducer?.filters?.data);

  return (
    <div className="nla_graph-filter-dropdown-menu-wrapper shadow mb-5 bg-body rounded" style={{ display: "block" }}>
      <div className="heading">
        <h5>Values</h5>
      </div>
      <div>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Retailers</Accordion.Header>
            <Accordion.Body>
              <div className="nla_custom-checkbox">
                <div className="input-wrapper">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <Select
                    mode="multiple"
                    placeholder="Search by Retailer"
                    value={selectedRetailers}
                    // onChange={setSelectedRetailers}
                    onChange={(values) => {
                      if (values.includes("selectAll")) {
                        // setSFProducts([]);
                        if (getFiltersReducer?.filters?.data?.retailers.length > 0) {
                          setSelectedRetailers(getFiltersReducer?.filters?.data?.retailers);
                        } else {
                          if (
                            selectedRetailers.length === Object.keys(retailerBrandsProductsReducer.data.data).length
                          ) {
                            setSelectedRetailers([]);
                          } else {
                            setSelectedRetailers([...Object.keys(retailerBrandsProductsReducer.data.data).sort()]);
                          }
                        }
                      } else if (values.includes("deselectAll")) {
                        setSelectedRetailers([]);
                        // setSFProducts([]);
                      } else {
                        // Filter out "selectAll" and "deselectAll" before setting the selected retailers
                        const filteredValues = values.filter(
                          (value) => value !== "selectAll" && value !== "deselectAll"
                        );
                        setSelectedRetailers(filteredValues);
                        // setSFProducts([]);
                      }
                    }}
                    style={{
                      width: "100%",
                    }}
                    className="filtered-accordion-ant-select"
                    maxTagCount="responsive"
                  >
                    <Select.Option
                      key="selectAll"
                      value={
                        getFiltersReducer?.filters?.data?.retailers.length > 0
                          ? selectedRetailers.length === getFiltersReducer?.filters?.data?.retailers.length
                            ? "deselectAll"
                            : "selectAll"
                          : retailerBrandsProductsReducer.data.data
                          ? selectedRetailers.length === Object.keys(retailerBrandsProductsReducer.data.data).length
                            ? "deselectAll"
                            : "selectAll"
                          : null
                      }
                      className="custom-tooltip-option"
                    >
                      {getFiltersReducer?.filters?.data?.retailers.length > 0
                        ? selectedRetailers.length === getFiltersReducer?.filters?.data?.retailers.length
                          ? "Deselect All"
                          : "Select All"
                        : retailerBrandsProductsReducer.data.data
                        ? selectedRetailers.length === Object.keys(retailerBrandsProductsReducer.data.data).length
                          ? "Deselect All"
                          : "Select All"
                        : null}
                    </Select.Option>
                    {retailerBrandsProductsReducer?.data?.data
                      ? Object.keys(retailerBrandsProductsReducer?.data?.data)
                          .sort()
                          .filter((retailer) =>
                            showAllRetailers
                              ? true
                              : Array.isArray(getFiltersReducer?.filters?.data?.retailers) &&
                                getFiltersReducer?.filters?.data?.retailers.includes(retailer)
                          )
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
                {/* <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="calSelectAll" />
                  <label className="form-check-label" htmlFor="calSelectAll">
                    Select All
                  </label>
                </div> */}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2"> 
            <Accordion.Header>Brands</Accordion.Header>
            <Accordion.Body>
              <div className="nla_custom-checkbox">
                <div className="input-wrapper">
                  <i className="fa-solid fa-tags"></i>
                  <Select
                    mode="multiple"
                    placeholder="Search by Brands"
                    value={selectedBrands} 
                    onChange={(values) => {
                      if (values.includes("selectAll")) {
                        setSFProducts([]);
                        if (selectedBrands.length === [...allPossibleBrands].length) {
                          setSelectedBrands([]);
                        } else {
                          setSelectedBrands([...allPossibleBrands]);
                        }
                      } else {
                        setSelectedBrands(values);
                        setSFProducts([]);

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
                      .sort()
                      .map((brand) => (
                        <Select.Option
                          key={brand}
                          value={brand}
                          className="custom-tooltip-option"
                          data-tooltip={brand}
                        >
                          {brand}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Products</Accordion.Header>
            <Accordion.Body>
              <div className="nla_custom-checkbox">
                <div className="input-wrapper">
                  <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                  <Select
                    mode="multiple"
                    placeholder="Search by Products"
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
                          {product}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="nla_btn-wrapper text-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              applyFilter();
            }}
          >
            {localChartFilter.loading ? (
              <>
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                Loading...
              </>
            ) : (
              "Apply"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDropDown;

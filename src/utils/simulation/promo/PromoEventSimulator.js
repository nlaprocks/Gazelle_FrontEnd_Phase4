import React, { usestate } from "react";
import ApexCharts from "react-apexcharts";
import ReactEcharts from "echarts-for-react";
import { Select } from "antd";
import Financials from "./Financials";
import { Download, ZoomIn } from "lucide-react";
import { fontSize, width } from "@mui/system";
import { Zoom } from "@mui/material";

export default function PromoEventSimulator({
  retailers,
  brands,
  products,
  selectedRetailer,
  selectedBrand,
  selectedProduct,
  promoEventPriceValues,
  promoSimulationData,
  promoEventChartData,
  isPriceSimulationLoading,
  handleRetailerChange,
  handleBrandChange,
  handleProductChange,
  handlePromoEventPriceInputChange,
  discount,
  lift,
  units,
  dollars,
}) {
  // console.log(products, "products1");
  // console.log(brands, "brands");

  const [chartType, setChartType] = React.useState("bar");
  const [isStacked, setIsStacked] = React.useState(false);

  const echartsReactRef = React.useRef(null);
  const productName = promoSimulationData[0]?.Product ?? "";

  // console.log(promoSimulationData,"promosimulationdata");

  // console.log(promoSimulationData, discount, lift, units, dollars,"########");
  // console.log(productName,"productname")
  //   let summary = Object.values(lift).map((i, value) => {
  //     return {
  //       name: "TPR",
  //       lift: value.toFixed(2),
  //       units: Object.values(units)[i].toFixed(2),
  //       dollars: Object.values(dollars)[i].toFixed(2),
  //     };
  //   });

  console.log(promoEventChartData, "promoeventchartdata");
  // console.log(promoSimulationData, "promosimulations");

  // const getApexOptions = (data) => {
  //   // console.log(data);
  //   return {

  //     chart: {
  //       type: chartType,
  //       zoom: {
  //         enable: true,
  //       },


  //       toolbar: {
  //         show: true,
  //         tools: {
  //           download: true,
  //           selection: true,
  //           zoom: true,
  //           zoomin:true,
  //           zoomout:true,


  //           customIcons: [
  //             {
  //               icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,29V7H32V29Z"></path><path d="M 7 10 L 13 10 L 13 26 L 11.4 26 L 11.4 11.6 L 8.6 11.6 L 8.6 26 L 7 26 Z" class="clr-i-outline clr-i-outline-path-2"></path><path d="M 15 19 L 21 19 L 21 26 L 19.4 26 L 19.4 20.6 L 16.6 20.6 L 16.6 26 L 15 26 Z" class="clr-i-outline clr-i-outline-path-3"></path><path d="M 23 16 L 29 16 L 29 26 L 27.4 26 L 27.4 17.6 L 24.6 17.6 L 24.6 26 L 23 26 Z" class="clr-i-outline clr-i-outline-path-4"></path><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
  //               title: "Switch to Bar Chart",
  //               class: "custom-icon-bar",
  //               index: -1,
  //               click: () => setChartType("bar"),
  //             },
  //             {
  //               icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M 32 5 L 4 5 C 2.895 5 2 5.895 2 7 L 2 29 C 2 30.105 2.895 31 4 31 L 32 31 C 33.105 31 34 30.105 34 29 L 34 7 C 34 5.895 33.105 5 32 5 Z M 4 29 L 4 7 L 32 7 L 32 29 Z"></path><polygon points="15.62 15.222 9.602 23.968 5.55 20.384 6.61 19.186 9.308 21.572 15.634 12.38 22.384 22.395 29.138 13.47 30.414 14.436 22.308 25.145" class="clr-i-outline clr-i-outline-path-2"></polygon><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
  //               title: "Switch to Line Chart",
  //               class: "custom-icon-line",
  //               index: -1,
  //               click: () => setChartType("line"),
  //             },
  //             {
  //               icon: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 8.04144L12 3.99999L5 8.04145V9.7735L12 13.8149L19 9.7735V8.04144ZM6.5 8.90747L12 5.73204L17.5 8.90747L12 12.0829L6.5 8.90747Z" fill="#1F2328"/><path d="M19 14.1789V15.911L12 19.9524L5 15.911V14.1789L12 18.2204L19 14.1789Z" fill="#1F2328"/><path d="M19 11.1765V12.9086L12 16.95L5 12.9086V11.1765L12 15.218L19 11.1765Z" fill="#1F2328"/></svg>`,
  //               title: isStacked ? "Tile" : "Stack",
  //               class: "custom-icon-line",
  //               index: -1,
  //               click: () => setIsStacked(isStacked ? false : true),
  //             },
  //           ],
  //         },
  //       },
  //       stroke: {
  //         curve: 'smooth', // To make the line smooth, can use 'straight' for straight lines
  //         width: 2, // Thickness of the line
  //       },
  //       // zoom: {
  //       //   enabled: true,

  //       // },
  //       plotOptions: {
  //         chartType: {
  //           markers: {
  //             size: 5, // Size of the markers (dots)
  //             colors: ['#FF4560'], // Color of the markers
  //             strokeColors: 'black', // Stroke color of the markers
  //             strokeWidth: 2, // Stroke width of the markers
  //             hover: {
  //               size: 30, // Size of the markers on hover
  //             },
  //           },
  //         },
  //       },



  //     },

  //     // plotOptions: {
  //     //   chartType: {
  //     //     markers: {
  //     //       size: 5, // Size of the markers (dots)
  //     //       colors: ['#FF4560'], // Color of the markers
  //     //       strokeColors: 'black', // Stroke color of the markers
  //     //       strokeWidth: 2, // Stroke width of the markers
  //     //       hover: {
  //     //         size: 30, // Size of the markers on hover
  //     //       },
  //     //     },
  //     //   },
  //     // },

  //     xaxis: {
  //       categories: data?.data?.labels,
  //       title: {
  //         text: data?.xAxisTitle,
  //       },
  //       // crosshairs: {
  //       //   show: true, // Show crosshair
  //       //   position: 'back', // Position the crosshair behind the series
  //       //   stroke: {
  //       //     color: '#000', // Color of the crosshair
  //       //     width: 1, // Width of the crosshair
  //       //     dashArray: 1, // Style of the crosshair (0 for solid, 5 for dashed, etc.)
  //       //   },
  //       // },

  //     },
  //     yaxis: {
  //       title: {
  //         text: data?.leftyAxisTitle,

  //         style: {
  //           fontWeight: "bold",

  //         },
  //       },
  //       labels: {
  //         formatter: (val) => isNaN(val) ? '-' : `${val} `,
  //       },
  //       crosshairs: {
  //         show: true, // Show crosshair
  //         position: 'back', // Position the crosshair behind the series
  //         stroke: {
  //           color: '#000', // Color of the crosshair
  //           width: 1, // Width of the crosshair
  //           dashArray: 1, // Style of the crosshair (0 for solid, 5 for dashed, etc.)
  //         },
  //       },
  //     },
  //     legend: {
  //       position: "top",
  //       horizontalAlign: "center",
  //     },
  //     tooltip: {
  //       enabled: true,
  //       shared: true,
  //       intersect: false,

  //       // trigger: "axis",
  //       // x: {
  //       //   show: true, // Show crosshair on x-axis
  //       // },
  //       // y: {
  //       //   show: true, // Show crosshair on y-axis
  //       // },


  //       // axisPointer: {
  //       //   type: "cross", // Use crosshair for both axes
  //       // },
  //     },
  //     dataLabels: {
  //       enabled: true,
  //       formatter: function (val) {
  //         // Check if the value is NaN, if so, return an empty string
  //         return isNaN(val) ? '' : val;
  //       },
  //       style: {
  //         colors: ['#000000'], // Set global data labels color to black
  //       },
  //     },
  //     grid: {
  //       borderColor: "#f1f1f1",
  //     },
  //   };
  // };

  // const getApexSeries = (data) => {
  //   // console.log(data?.data?.datasets)
  //   //  data?.data?.datasets?.map((item) => ( console.log(item) ));

  //   return data?.data?.datasets?.filter((_, index) => index !== 0).map((dataset,index) => ({
  //     name: dataset.label,
  //     datas:dataset.backgroundColor,
  //     data: dataset.data || [], // Ensure data is an array or provide an empty array as a fallback
  //     type: dataset.type || chartType,
  //     dataLabels: {
  //       enabled: true, // Enable data labels
  //       style: {
  //         colors: ['#000000'], // Set data labels color to black
  //       }
  //     }

  //   }));
  // };

  const getApexOptions = (data) => {
    return {
      chart: {
        type: chartType,
        // zoom: {
        //   enable: true,
        // },
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            customIcons: [
              {
                icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,29V7H32V29Z"></path><path d="M 7 10 L 13 10 L 13 26 L 11.4 26 L 11.4 11.6 L 8.6 11.6 L 8.6 26 L 7 26 Z" class="clr-i-outline clr-i-outline-path-2"></path><path d="M 15 19 L 21 19 L 21 26 L 19.4 26 L 19.4 20.6 L 16.6 20.6 L 16.6 26 L 15 26 Z" class="clr-i-outline clr-i-outline-path-3"></path><path d="M 23 16 L 29 16 L 29 26 L 27.4 26 L 27.4 17.6 L 24.6 17.6 L 24.6 26 L 23 26 Z" class="clr-i-outline clr-i-outline-path-4"></path><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
                title: "Switch to Bar Chart",
                class: "custom-icon-bar",
                index: -1,
                click: () => setChartType("bar"),
              },
              {
                icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M 32 5 L 4 5 C 2.895 5 2 5.895 2 7 L 2 29 C 2 30.105 2.895 31 4 31 L 32 31 C 33.105 31 34 30.105 34 29 L 34 7 C 34 5.895 33.105 5 32 5 Z M 4 29 L 4 7 L 32 7 L 32 29 Z"></path><polygon points="15.62 15.222 9.602 23.968 5.55 20.384 6.61 19.186 9.308 21.572 15.634 12.38 22.384 22.395 29.138 13.47 30.414 14.436 22.308 25.145" class="clr-i-outline clr-i-outline-path-2"></polygon><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
                title: "Switch to Line Chart",
                class: "custom-icon-line",
                index: -1,
                click: () => setChartType("line"),
              },
              {
                icon: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 8.04144L12 3.99999L5 8.04145V9.7735L12 13.8149L19 9.7735V8.04144ZM6.5 8.90747L12 5.73204L17.5 8.90747L12 12.0829L6.5 8.90747Z" fill="#1F2328"/><path d="M19 14.1789V15.911L12 19.9524L5 15.911V14.1789L12 18.2204L19 14.1789Z" fill="#1F2328"/><path d="M19 11.1765V12.9086L12 16.95L5 12.9086V11.1765L12 15.218L19 11.1765Z" fill="#1F2328"/></svg>`,
                title: isStacked ? "Tile" : "Stack",
                class: "custom-icon-line",
                index: -1,
                click: () => setIsStacked(isStacked ? false : true),
              },
            ],
          },
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        zoom: {
          enabled: true,
        },
      },
      // plotOptions: {
      //   bar: {
      //     columnWidth: '100px', // Adjust this value to control bar width
      //     // columnWidth: '100%' // Adjust this value to control bar width
      //     barHeight: '70%',   // Use this if it's a horizontal bar chart
      //     distributed: true,  // Distribute bars evenly if needed
      //   }
      // },
      xaxis: {
        categories: data?.data?.labels,
        title: {
          text: data?.xAxisTitle,
        },
      },
      yaxis: {
        title: {
          text: data?.leftyAxisTitle,
          style: {
            fontWeight: "bold",
          },
        },
        labels: {
          formatter: (val) => isNaN(val) ? '-' : `${val} `,
        },
        crosshairs: {
          show: true,
          position: 'back',
          stroke: {
            color: '#000',
            width: 1,
            dashArray: 1,
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
      },
      tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return isNaN(val) ? '' : val;
        },
        style: {
          colors: ['#000000'],
        },
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    };
  };

  const getApexSeries = (data) => {
    // console.log(data?.data?.datasets)
    //  data?.data?.datasets?.map((item) => ( console.log(item) ));

    return data?.data?.datasets?.filter((_, index) => index !== 0).map((dataset, index) => ({
      name: dataset.label,
      data: dataset.data || [],
      type: dataset.type || chartType,
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#000000'],
        }
      }
    }));
  };

  return (
    <div className="simluation_db">
      <div className="container-fluid">
        <div className="sim_retailer_main mb-4">
          <div className="row">
            <div className="dropdown_box_select sim_drop col-lg-4 mx-3">
              <div>
                <Select
                  showSearch
                  placeholder="Select Retailer"
                  onChange={handleRetailerChange}
                  style={{
                    width: "90%",
                  }}
                  className="filtered-accordion-ant-select"
                  maxTagCount="responsive"
                >
                  {retailers?.map((item) => (
                    <Select.Option
                      key={item}
                      value={item}
                      className="custom-tooltip-option"
                      data-tooltip={item}
                    >
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="dropdown_box_select sim_drop col-lg-4">
              <Select
                showSearch
                placeholder="Select Brand"
                onChange={handleBrandChange}
                disabled={!selectedRetailer}
                style={{
                  width: "90%",
                }}
                className="filtered-accordion-ant-select"
                maxTagCount="responsive"
              >
                {brands?.map((item) => (
                  <Select.Option
                    key={item}
                    value={item}
                    className="custom-tooltip-option"
                    data-tooltip={item}
                  >
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="dropdown_box_select sim_drop col-lg-4">
              <Select
                showSearch
                placeholder="Select Product"
                onChange={handleProductChange}
                disabled={!selectedBrand}
                style={{
                  width: "90%",
                }}
                className="filtered-accordion-ant-select"
                maxTagCount="responsive"
              >
                {products?.map((item) => (
                  <Select.Option
                    key={item}
                    value={item}
                    className="custom-tooltip-option"
                    data-tooltip={item}
                  >
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="text-end">
            <div className="row">
              <div className="col-lg-8">
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                ></input>
              </div>
              <div className=" col-lg-4">
                <a href="" className="btn btn-primary btn-retailer">
                  Upload Event File{" "}
                </a>
              </div>
            </div>
          </div>
        </div>

        {isPriceSimulationLoading ? (
          <div>
            <p>Please wait, while we are fetching the data for you . . .</p>
          </div>
        ) : (
          <div className="animate__animated animate__fadeInUp">
            {/* <!-- Best price --> */}
            <div className="best_price_row mb-4">
              <div>
                {promoEventChartData?.length > 0 &&
                  promoEventChartData?.map((val, i) => (
                    <ApexCharts
                      key={i}
                      options={getApexOptions(val)}
                      series={getApexSeries(val)}
                      type={chartType}
                      height={400}
                      style={{
                        marginBottom:
                          i !== promoEventChartData.length - 1 ? "50px" : "0",
                        width: "100%",
                      }}
                    />
                  ))}{" "}
                {!promoEventChartData?.length && (
                  <div>Loading or no data available</div>
                )}
              </div>
              <div className="left_best_price shadow-none">
                <table
                  className="best_pr_table"
                //   style={{ height: "30vh", width: "25vh" }}
                >
                  <thead>
                    <tr>
                      <th
                        colSpan="2"
                        style={{ backgroundColor: "#174F73", color: "#fff" }}
                      >
                        Event
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <p>Base Price</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="basePrice"
                            value={
                              promoEventPriceValues?.basePrice
                                ? typeof promoEventPriceValues?.basePrice ===
                                  "number"
                                  ? promoEventPriceValues?.basePrice.toFixed(2)
                                  : promoEventPriceValues?.basePrice
                                : 0
                            }
                            onChange={handlePromoEventPriceInputChange}
                          ></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Promo Price</p>
                      </td>
                      <td>
                        <div className="sim_input_fild">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="promoPrice"
                            value={promoEventPriceValues.promoPrice}
                            onChange={handlePromoEventPriceInputChange}
                            min={0}
                          ></input>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p>Discount %</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="discount"
                            value={
                              promoEventPriceValues?.promoPrice &&
                              discount.toFixed(2)
                            }
                            onChange={handlePromoEventPriceInputChange}
                            readOnly
                          ></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Units</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="total_units_sum"
                            value={
                              promoEventPriceValues?.total_units_sum
                                ? typeof promoEventPriceValues?.total_units_sum ===
                                  "number"
                                  ? promoEventPriceValues?.total_units_sum.toFixed(
                                    2
                                  )
                                  : promoEventPriceValues?.total_units_sum
                                : 0
                            }
                            onChange={handlePromoEventPriceInputChange}
                          ></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>% TPR ACV</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="tprDist"
                            value={promoEventPriceValues.tprDist}
                            onChange={handlePromoEventPriceInputChange}
                            min={0}
                          ></input>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p>% Display Only ACV</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="doDist"
                            value={promoEventPriceValues?.doDist}
                            onChange={handlePromoEventPriceInputChange}
                          ></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>% Feature Only ACV</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="foDist"
                            value={promoEventPriceValues?.foDist}
                            onChange={handlePromoEventPriceInputChange}
                          ></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>% Feature and Display ACV</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="fdDist"
                            value={promoEventPriceValues?.fdDist}
                            onChange={handlePromoEventPriceInputChange}
                          ></input>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Product display row */}
            <div className="sim_retailer_row1 width_td mb-4 ">
              <div>
                <div className="left_best_price col-lg-12">
                  <table className="best_pr_table">
                    <thead>
                      <tr>
                        <th>Promotion </th>
                        <th>% ACV </th>
                        <th>% Lift</th>
                        <th>Units</th>
                        <th>Dollars</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lift &&
                        dollars &&
                        units &&
                        promoEventPriceValues &&
                        Object.values(lift).map((value, i) => {
                          return (
                            <tr>
                              <td>
                                <p>
                                  {i === 0
                                    ? "TPR"
                                    : i === 1
                                      ? "Feature Only"
                                      : i === 2
                                        ? "Display Only"
                                        : "Feature and Display"}
                                </p>
                              </td>
                              <td>
                                <p>
                                  {i === 0
                                    ? promoEventPriceValues.tprDist
                                      ? promoEventPriceValues.tprDist
                                      : "-"
                                    : i === 1
                                      ? promoEventPriceValues.foDist
                                        ? promoEventPriceValues.foDist
                                        : "-"
                                      : i === 2
                                        ? promoEventPriceValues.doDist
                                          ? promoEventPriceValues.doDist
                                          : "-"
                                        : promoEventPriceValues.fdDist
                                          ? promoEventPriceValues.fdDist
                                          : "-"}
                                </p>
                              </td>
                              <td>
                                <p>{value ? value.toFixed(2) : "-"}</p>
                              </td>
                              <td>
                                <p>
                                  {i === 0
                                    ? units.tprUnits
                                      ? units.tprUnits.toFixed(2)
                                      : "-"
                                    : i === 1
                                      ? units.foUnits
                                        ? units.foUnits.toFixed(2)
                                        : "-"
                                      : i === 2
                                        ? units.doUnits
                                          ? units.doUnits.toFixed(2)
                                          : "-"
                                        : units.fdUnits
                                          ? units.fdUnits.toFixed(2)
                                          : "-"}
                                </p>
                              </td>
                              <td>
                                <p>
                                  {i === 0
                                    ? dollars.tprDollars
                                      ? dollars.tprDollars.toFixed(2)
                                      : "-"
                                    : i === 1
                                      ? dollars.foDollars
                                        ? dollars.foDollars.toFixed(2)
                                        : "-"
                                      : i === 2
                                        ? dollars.doDollars
                                          ? dollars.doDollars.toFixed(2)
                                          : "-"
                                        : dollars.fdDollars
                                          ? dollars.fdDollars.toFixed(2)
                                          : "-"}
                                </p>
                              </td>
                            </tr>
                          );
                        })}

                      <tr>
                        <td colSpan={2} style={{ textAlign: "center" }}>
                          <p>Event Increamental</p>
                        </td>
                        <td>
                          <p>
                            {lift
                              ? !isNaN(
                                lift.tprLift +
                                lift.foLift +
                                lift.doLift +
                                lift.fdLift
                              ) &&
                                lift.tprLift +
                                lift.foLift +
                                lift.doLift +
                                lift.fdLift !==
                                0
                                ? (
                                  lift.tprLift +
                                  lift.foLift +
                                  lift.doLift +
                                  lift.fdLift
                                ).toFixed(2)
                                : "-"
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {units
                              ? !isNaN(
                                units.tprUnits +
                                units.foUnits +
                                units.doUnits +
                                units.fdUnits
                              ) &&
                                units.tprUnits +
                                units.foUnits +
                                units.doUnits +
                                units.fdUnits !==
                                0
                                ? (
                                  units.tprUnits +
                                  units.foUnits +
                                  units.doUnits +
                                  units.fdUnits
                                ).toFixed(2)
                                : "-"
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {dollars
                              ? !isNaN(
                                dollars.tprDollars +
                                dollars.foDollars +
                                dollars.doDollars +
                                dollars.fdDollars
                              ) &&
                                dollars.tprDollars +
                                dollars.foDollars +
                                dollars.doDollars +
                                dollars.fdDollars !==
                                0
                                ? (
                                  dollars.tprDollars +
                                  dollars.foDollars +
                                  dollars.doDollars +
                                  dollars.fdDollars
                                ).toFixed(2)
                                : "-"
                              : "-"}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} style={{ textAlign: "center" }}>
                          <p>Event Total</p>
                        </td>
                        <td>
                          <p>
                            {lift
                              ? !isNaN(
                                lift.tprLift +
                                lift.foLift +
                                lift.doLift +
                                lift.fdLift
                              ) &&
                                lift.tprLift +
                                lift.foLift +
                                lift.doLift +
                                lift.fdLift !==
                                0
                                ? (
                                  lift.tprLift +
                                  lift.foLift +
                                  lift.doLift +
                                  lift.fdLift +
                                  100
                                ).toFixed(2)
                                : "-"
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {units && promoEventPriceValues?.total_units_sum
                              ? !isNaN(
                                units.tprUnits +
                                units.foUnits +
                                units.doUnits +
                                units.fdUnits
                              ) &&
                                units.tprUnits +
                                units.foUnits +
                                units.doUnits +
                                units.fdUnits !==
                                0
                                ? (
                                  units.tprUnits +
                                  units.foUnits +
                                  units.doUnits +
                                  units.fdUnits +
                                  parseInt(
                                    promoEventPriceValues?.total_units_sum
                                  )
                                ).toFixed(2)
                                : "-"
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {dollars &&
                              promoEventPriceValues?.total_units_sum &&
                              promoEventPriceValues?.promoPrice
                              ? !isNaN(
                                dollars.tprDollars +
                                dollars.foDollars +
                                dollars.doDollars +
                                dollars.fdDollars
                              ) &&
                                dollars.tprDollars +
                                dollars.foDollars +
                                dollars.doDollars +
                                dollars.fdDollars !==
                                0
                                ? (
                                  dollars.tprDollars +
                                  dollars.foDollars +
                                  dollars.doDollars +
                                  dollars.fdDollars +
                                  promoEventPriceValues?.total_units_sum *
                                  promoEventPriceValues?.promoPrice
                                ).toFixed(2)
                                : "-"
                              : "-"}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {!isNaN(
              units.tprUnits + units.foUnits + units.doUnits + units.fdUnits
            ) ? (
              <Financials
                basePrice={promoEventPriceValues.basePrice}
                promotedPrice={promoEventPriceValues.promoPrice}
                isPriceSimulationLoading={isPriceSimulationLoading}
                units={
                  units.tprUnits +
                  units.foUnits +
                  units.doUnits +
                  units.fdUnits +
                  promoEventPriceValues?.total_units_sum
                }
                increamentalUnits={
                  units.tprUnits + units.foUnits + units.doUnits + units.fdUnits
                }
              />
            ) : (
              <p>Enter event data to view Financial</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
















// import React from "react";
// import ReactEcharts from "echarts-for-react";
// import { Select } from "antd";
// import Financials from "./Financials";

// export default function PromoEventSimulator({
//   retailers,
//   brands,
//   products,
//   selectedRetailer,
//   selectedBrand,
//   selectedProduct,
//   promoEventPriceValues,
//   promoSimulationData,
//   promoEventChartData,
//   isPriceSimulationLoading,
//   handleRetailerChange,
//   handleBrandChange,
//   handleProductChange,
//   handlePromoEventPriceInputChange,
//   discount,
//   lift,
//   units,
//   dollars,
// }) {
//   console.log(products,"products1");
//   console.log(brands,"brands")

//   const echartsReactRef = React.useRef(null);
//   const productName = promoSimulationData[0]?.Product ?? "";
//   // console.log(promoSimulationData,"promosimulationdata");

//   // console.log(promoSimulationData, discount, lift, units, dollars,"########");
//   // console.log(productName,"productname")
//   //   let summary = Object.values(lift).map((i, value) => {
//   //     return {
//   //       name: "TPR",
//   //       lift: value.toFixed(2),
//   //       units: Object.values(units)[i].toFixed(2),
//   //       dollars: Object.values(dollars)[i].toFixed(2),
//   //     };
//   //   });
//   const getOption = (data) => {
//     const { Product, Retailer, xAxisTitle, leftyAxisTitle, rightyAxisTitle, data: chartData } = data;
//     const datasets = chartData.datasets;
//     const labels = chartData.labels;
//     return {
//       tooltip: {
//         trigger: "axis",
//         axisPointer: {
//           type: "cross", // Use crosshair for both axes
//         },
//       },
//       legend: {
//         data: datasets.map((dataset) => dataset.label),
//         top: -5,
//       },
//       grid: {
//         left: 50,
//         right: 110,
//         bottom: 50,
//         top: 50,
//         containLabel: true,
//       },
//       dataZoom: [
//         {
//           type: "slider", // The type of data zoom, 'slider' for a slider bar
//           xAxisIndex: [0], // Enable data zoom for the first X axis (index 0)
//           start: 0, // The start position of the data zoom, 0% in this case
//           end: 100, // The end position of the data zoom, 100% in this case
//           // bottom: -30,
//         },
//         {
//           type: "slider", // The type of data zoom, 'slider' for a slider bar
//           yAxisIndex: [0], // Enable data zoom for the first Y axis (index 0)
//           start: 0, // The start position of the data zoom, 0% in this case
//           end: 100, // The end position of the data zoom, 100% in this case
//           right: 50,
//         },
//       ],
//       toolbox: {
//         show: true,
//         orient: "horizontal",
//         left: "left",
//         top: "top",
//         feature: {
//           mark: { show: true },
//           dataView: { show: true, readOnly: true },
//           magicType: {
//             show: true,
//             type: ["line", "bar", "stack"],
//           },

//           restore: { show: true },
//           saveAsImage: { show: true },
//         },
//       },
//       xAxis: {
//         type: "category",
//         splitLine: { show: false },
//         boundaryGap: true,
//         data: labels,
//         interval: 0,
//         name: xAxisTitle,
//         axisLabel: {
//           rotate: 45, // Rotate the labels by 45 degrees
//           fontSize: 10,
//         },
//         nameLocation: "middle",
//         nameGap: 70,
//         nameTextStyle: {
//           fontWeight: "bold", // Set font to bold
//         },
//       },
//       yAxis: [
//         {
//           type: "value",
//           name: leftyAxisTitle,
//           position: "left",
//           axisLabel: {
//             formatter: "{value} %",
//           },
//           splitLine: {
//             show: false, // Hide horizontal grid lines
//           },
//           nameLocation: "middle",
//           nameGap: 60,
//           nameTextStyle: {
//             fontWeight: "bold", // Set font to bold
//           },
//           show: true,
//         },
//       ],
//       series: datasets?.map((dataset, i) => {
//         return i === 0
//           ? {
//               name: dataset.label,
//               type: "bar",
//               stack: "Total",
//               itemStyle: {
//                 normal: {
//                   barBorderColor: "rgba(0,0,0,0)",
//                   color: "rgba(0,0,0,0)",
//                 },
//                 emphasis: {
//                   barBorderColor: "rgba(0,0,0,0)",
//                   color: "rgba(0,0,0,0)",
//                 },
//               },
//               data: dataset.data,
//               yAxisIndex: dataset.yAxisID === "right-y-axis" ? 1 : 0,
//               borderColor: dataset.borderColor,
//               backgroundColor: dataset.backgroundColor,
//               smooth: true,
//               barGap: "20%",
//               barCategoryGap: "40%",
//             }
//           : {
//               name: dataset.label,
//               type: "bar",
//               stack: "Total",
//               data: dataset.data,
//               yAxisIndex: dataset.yAxisID === "right-y-axis" ? 1 : 0,
//               borderColor: dataset.borderColor,
//               backgroundColor: dataset.backgroundColor,
//               smooth: true,
//               barGap: "20%",
//               barCategoryGap: "40%",
//               label: {
//                 show: true,
//                 position: "top",
//               },
//             };
//       }),
//       graphic: [
//         {
//           type: "rect",
//           position: [100, 100], // Initial position
//           shape: {
//             width: 0,
//             height: 0,
//           },
//           draggable: false, // Allow dragging
//           ondrag: (params) => {
//             // Handle drag event
//             const { echarts } = echartsReactRef.current;
//             const chart = echarts.getInstanceByDom(echartsReactRef.current.getEchartsInstance().getDom());

//             // Calculate new position based on params.event.offsetX and params.event.offsetY
//             const newPosition = chart.convertFromPixel("grid", [params.event.offsetX, params.event.offsetY]);

//             // Update the position of the draggable element
//             chart.setOption({
//               graphic: {
//                 id: params.target.id,
//                 position: newPosition,
//               },
//             });
//           },
//         },
//       ],
//     };
//   };

//   return (
//     <div className="simluation_db">
//       <div className="container-fluid">
//         <div className="sim_retailer_main mb-4">
//           <div className="row">
//             <div className="dropdown_box_select sim_drop col-lg-4 mx-3">
//               <div>
//                 <Select
//                   showSearch
//                   placeholder="Select Retailer"
//                   onChange={handleRetailerChange}
//                   style={{
//                     width: "90%",
//                   }}
//                   className="filtered-accordion-ant-select"
//                   maxTagCount="responsive"
//                 >
//                   {retailers?.map((item) => (
//                     <Select.Option key={item} value={item} className="custom-tooltip-option" data-tooltip={item}>
//                       {item}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </div>
//             </div>
//             <div className="dropdown_box_select sim_drop col-lg-4">
//               <Select
//                 showSearch
//                 placeholder="Select Brand"
//                 onChange={handleBrandChange}
//                 disabled={!selectedRetailer}
//                 style={{
//                   width: "90%",
//                 }}
//                 className="filtered-accordion-ant-select"
//                 maxTagCount="responsive"
//               >
//                 {brands?.map((item) => (
//                   <Select.Option key={item} value={item} className="custom-tooltip-option" data-tooltip={item}>
//                     {item}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </div>
//             <div className="dropdown_box_select sim_drop col-lg-4">
//               <Select
//                 showSearch
//                 placeholder="Select Product"
//                 onChange={handleProductChange}
//                 disabled={!selectedBrand}
//                 style={{
//                   width: "90%",
//                 }}
//                 className="filtered-accordion-ant-select"
//                 maxTagCount="responsive"
//               >
//                 {products?.map((item) => (
//                   <Select.Option key={item} value={item} className="custom-tooltip-option" data-tooltip={item}>
//                     {item}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </div>
//           </div>

//           <div className="text-end">
//             <div className="row">
//               <div className="col-lg-8">
//                 <input className="form-control form-control-sm" id="formFileSm" type="file"></input>
//               </div>
//               <div className=" col-lg-4">
//                 <a href="" className="btn btn-primary btn-retailer">
//                   Upload Event File{" "}
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {isPriceSimulationLoading ? (
//           <div>
//             <p>Please wait, while we are fetching the data for you . . .</p>
//           </div>
//         ) : (
//           <div className="animate__animated animate__fadeInUp">
//             {/* <!-- Best price --> */}
//             <div className="best_price_row mb-4">
//               <div>
//                 {promoEventChartData.map((val, i) => {
//                   return (
//                     <ReactEcharts
//                       key={i}
//                       ref={echartsReactRef}
//                       option={getOption(val)}
//                       style={{
//                         marginBottom: i !== promoEventChartData.length - 1 ? "50px" : "0",
//                         height: "400px",
//                         width: "100%",
//                       }}
//                     />
//                   );
//                 })}
//               </div>
//               <div className="left_best_price shadow-none">
//                 <table
//                   className="best_pr_table"
//                   //   style={{ height: "30vh", width: "25vh" }}
//                 >
//                   <thead>
//                     <tr>
//                       <th colSpan="2" style={{ backgroundColor: "#174F73", color: "#fff" }}>
//                         Event
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>
//                         <p>Base Price</p>
//                       </td>
//                       <td>
//                         <div className="sim_input_fild border-0">
//                           <input
//                             type="number"
//                             placeholder="Enter the value"
//                             className="margin_simu_input"
//                             name="basePrice"
//                             value={
//                               promoEventPriceValues?.basePrice
//                                 ? typeof promoEventPriceValues?.basePrice === "number"
//                                   ? promoEventPriceValues?.basePrice.toFixed(2)
//                                   : promoEventPriceValues?.basePrice
//                                 : 0
//                             }
//                             onChange={handlePromoEventPriceInputChange}
//                           ></input>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <p>Promo Price</p>
//                       </td>
//                       <td>
//                         <div className="sim_input_fild">
//                           <input
//                             type="number"
//                             placeholder="Enter the value"
//                             className="margin_simu_input"
//                             name="promoPrice"
//                             value={promoEventPriceValues.promoPrice}
//                             onChange={handlePromoEventPriceInputChange}
//                             min={0}
//                           ></input>
//                         </div>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>
//                         <p>Discount %</p>
//                       </td>
//                       <td>
//                         <div className="sim_input_fild border-0">
//                           <input
//                             type="number"
//                             placeholder="Enter the value"
//                             className="margin_simu_input"
//                             name="discount"
//                             value={promoEventPriceValues?.promoPrice && discount.toFixed(2)}
//                             onChange={handlePromoEventPriceInputChange}
//                             readOnly
//                           ></input>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <p>Units</p>
//                       </td>
//                       <td>
//                         <div className="sim_input_fild border-0">
//                           <input
//                             type="number"
//                             placeholder="Enter the value"
//                             className="margin_simu_input"
//                             name="total_units_sum"
//                             value={
//                               promoEventPriceValues?.total_units_sum
//                                 ? typeof promoEventPriceValues?.total_units_sum === "number"
//                                   ? promoEventPriceValues?.total_units_sum.toFixed(2)
//                                   : promoEventPriceValues?.total_units_sum
//                                 : 0
//                             }
//                             onChange={handlePromoEventPriceInputChange}
//                           ></input>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <p>% TPR ACV</p>
//                       </td>
//                       <td>
//                         <div className="sim_input_fild border-0">
//                           <input
//                             type="number"
//                             placeholder="Enter the value"
//                             className="margin_simu_input"
//                             name="tprDist"
//                             value={promoEventPriceValues.tprDist}
//                             onChange={handlePromoEventPriceInputChange}
//                             min={0}
//                           ></input>
//                         </div>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td>
//                         <p>% Display Only ACV</p>
//                       </td>
//                       <td>
//                         <div className="sim_input_fild border-0">
//                           <input
//                             type="number"
//                             placeholder="Enter the value"
//                             className="margin_simu_input"
//                             name="doDist"
//                             value={promoEventPriceValues?.doDist}
//                             onChange={handlePromoEventPriceInputChange}
//                           ></input>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <p>% Feature Only ACV</p>
//                       </td>
//                       <td>
//                         <div className="sim_input_fild border-0">
//                           <input
//                             type="number"
//                             placeholder="Enter the value"
//                             className="margin_simu_input"
//                             name="foDist"
//                             value={promoEventPriceValues?.foDist}
//                             onChange={handlePromoEventPriceInputChange}
//                           ></input>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <p>% Feature and Display ACV</p>
//                       </td>
//                       <td>
//                         <div className="sim_input_fild border-0">
//                           <input
//                             type="number"
//                             placeholder="Enter the value"
//                             className="margin_simu_input"
//                             name="fdDist"
//                             value={promoEventPriceValues?.fdDist}
//                             onChange={handlePromoEventPriceInputChange}
//                           ></input>
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             {/* Product display row */}
//             <div className="sim_retailer_row1 width_td mb-4 ">
//               <div>
//                 <div className="left_best_price col-lg-12">
//                   <table className="best_pr_table">
//                     <thead>
//                       <tr>
//                         <th>Promotion </th>
//                         <th>% ACV </th>
//                         <th>% Lift</th>
//                         <th>Units</th>
//                         <th>Dollars</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {lift &&
//                         dollars &&
//                         units &&
//                         promoEventPriceValues &&
//                         Object.values(lift).map((value, i) => {
//                           return (
//                             <tr>
//                               <td>
//                                 <p>
//                                   {i === 0
//                                     ? "TPR"
//                                     : i === 1
//                                     ? "Feature Only"
//                                     : i === 2
//                                     ? "Display Only"
//                                     : "Feature and Display"}
//                                 </p>
//                               </td>
//                               <td>
//                                 <p>
//                                   {i === 0
//                                     ? promoEventPriceValues.tprDist
//                                       ? promoEventPriceValues.tprDist
//                                       : "-"
//                                     : i === 1
//                                     ? promoEventPriceValues.foDist
//                                       ? promoEventPriceValues.foDist
//                                       : "-"
//                                     : i === 2
//                                     ? promoEventPriceValues.doDist
//                                       ? promoEventPriceValues.doDist
//                                       : "-"
//                                     : promoEventPriceValues.fdDist
//                                     ? promoEventPriceValues.fdDist
//                                     : "-"}
//                                 </p>
//                               </td>
//                               <td>
//                                 <p>{value ? value.toFixed(2) : "-"}</p>
//                               </td>
//                               <td>
//                                 <p>
//                                   {i === 0
//                                     ? units.tprUnits
//                                       ? units.tprUnits.toFixed(2)
//                                       : "-"
//                                     : i === 1
//                                     ? units.foUnits
//                                       ? units.foUnits.toFixed(2)
//                                       : "-"
//                                     : i === 2
//                                     ? units.doUnits
//                                       ? units.doUnits.toFixed(2)
//                                       : "-"
//                                     : units.fdUnits
//                                     ? units.fdUnits.toFixed(2)
//                                     : "-"}
//                                 </p>
//                               </td>
//                               <td>
//                                 <p>
//                                   {i === 0
//                                     ? dollars.tprDollars
//                                       ? dollars.tprDollars.toFixed(2)
//                                       : "-"
//                                     : i === 1
//                                     ? dollars.foDollars
//                                       ? dollars.foDollars.toFixed(2)
//                                       : "-"
//                                     : i === 2
//                                     ? dollars.doDollars
//                                       ? dollars.doDollars.toFixed(2)
//                                       : "-"
//                                     : dollars.fdDollars
//                                     ? dollars.fdDollars.toFixed(2)
//                                     : "-"}
//                                 </p>
//                               </td>
//                             </tr>
//                           );
//                         })}

//                       <tr>
//                         <td colSpan={2} style={{ textAlign: "center" }}>
//                           <p>Event Increamental</p>
//                         </td>
//                         <td>
//                           <p>
//                             {lift
//                               ? !isNaN(lift.tprLift + lift.foLift + lift.doLift + lift.fdLift) &&
//                                 lift.tprLift + lift.foLift + lift.doLift + lift.fdLift !== 0
//                                 ? (lift.tprLift + lift.foLift + lift.doLift + lift.fdLift).toFixed(2)
//                                 : "-"
//                               : "-"}
//                           </p>
//                         </td>
//                         <td>
//                           <p>
//                             {units
//                               ? !isNaN(units.tprUnits + units.foUnits + units.doUnits + units.fdUnits) &&
//                                 units.tprUnits + units.foUnits + units.doUnits + units.fdUnits !== 0
//                                 ? (units.tprUnits + units.foUnits + units.doUnits + units.fdUnits).toFixed(2)
//                                 : "-"
//                               : "-"}
//                           </p>
//                         </td>
//                         <td>
//                           <p>
//                             {dollars
//                               ? !isNaN(
//                                   dollars.tprDollars + dollars.foDollars + dollars.doDollars + dollars.fdDollars
//                                 ) &&
//                                 dollars.tprDollars + dollars.foDollars + dollars.doDollars + dollars.fdDollars !== 0
//                                 ? (
//                                     dollars.tprDollars +
//                                     dollars.foDollars +
//                                     dollars.doDollars +
//                                     dollars.fdDollars
//                                   ).toFixed(2)
//                                 : "-"
//                               : "-"}
//                           </p>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td colSpan={2} style={{ textAlign: "center" }}>
//                           <p>Event Total</p>
//                         </td>
//                         <td>
//                           <p>
//                             {lift
//                               ? !isNaN(lift.tprLift + lift.foLift + lift.doLift + lift.fdLift) &&
//                                 lift.tprLift + lift.foLift + lift.doLift + lift.fdLift !== 0
//                                 ? (lift.tprLift + lift.foLift + lift.doLift + lift.fdLift + 100).toFixed(2)
//                                 : "-"
//                               : "-"}
//                           </p>
//                         </td>
//                         <td>
//                           <p>
//                             {units && promoEventPriceValues?.total_units_sum
//                               ? !isNaN(units.tprUnits + units.foUnits + units.doUnits + units.fdUnits) &&
//                                 units.tprUnits + units.foUnits + units.doUnits + units.fdUnits !== 0
//                                 ? (
//                                     units.tprUnits +
//                                     units.foUnits +
//                                     units.doUnits +
//                                     units.fdUnits +
//                                     parseInt(promoEventPriceValues?.total_units_sum)
//                                   ).toFixed(2)
//                                 : "-"
//                               : "-"}
//                           </p>
//                         </td>
//                         <td>
//                           <p>
//                             {dollars && promoEventPriceValues?.total_units_sum && promoEventPriceValues?.promoPrice
//                               ? !isNaN(
//                                   dollars.tprDollars + dollars.foDollars + dollars.doDollars + dollars.fdDollars
//                                 ) &&
//                                 dollars.tprDollars + dollars.foDollars + dollars.doDollars + dollars.fdDollars !== 0
//                                 ? (
//                                     dollars.tprDollars +
//                                     dollars.foDollars +
//                                     dollars.doDollars +
//                                     dollars.fdDollars +
//                                     promoEventPriceValues?.total_units_sum * promoEventPriceValues?.promoPrice
//                                   ).toFixed(2)
//                                 : "-"
//                               : "-"}
//                           </p>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//             {!isNaN(units.tprUnits + units.foUnits + units.doUnits + units.fdUnits) ? (
//               <Financials
//                 basePrice={promoEventPriceValues.basePrice}
//                 promotedPrice={promoEventPriceValues.promoPrice}
//                 isPriceSimulationLoading={isPriceSimulationLoading}
//                 units={
//                   units.tprUnits +
//                   units.foUnits +
//                   units.doUnits +
//                   units.fdUnits +
//                   promoEventPriceValues?.total_units_sum
//                 }
//                 increamentalUnits={units.tprUnits + units.foUnits + units.doUnits + units.fdUnits}
//               />
//             ) : (
//               <p>Enter event data to view Financial</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

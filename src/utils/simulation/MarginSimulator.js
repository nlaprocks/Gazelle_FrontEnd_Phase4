import React from "react";
import ReactEcharts from "echarts-for-react";
import ApexCharts from "react-apexcharts";

import { Select } from "antd";

export default function MarginSimulator({
  retailers,
  brands,
  products,
  selectedRetailer,
  selectedBrand,
  selectedProduct,
  marginPriceValues,
  marginSimulationData,
  marginChartData,
  isPriceSimulationLoading,
  handleRetailerChange,
  handleBrandChange,
  handleProductChange,
  handleMarginPriceInputChange,
}) {

  const echartsReactRef = React.useRef(null);
  const productName = marginSimulationData[0]?.Product ?? "";
  const netUnitPrice = marginPriceValues?.listPrice - marginPriceValues?.edlpSpend;
  const manufacturerMargin = ((netUnitPrice - marginPriceValues?.cogs) / marginPriceValues?.listPrice) * 100;
  const retailerMargin = ((marginPriceValues?.basePrice - netUnitPrice) / marginPriceValues?.basePrice) * 100;

  const getOption = (data) => {
    const { Product, Retailer, xAxisTitle, leftyAxisTitle, rightyAxisTitle, data: chartData } = data;
    const datasets = chartData.datasets;
    const labels = chartData.labels;
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross", // Use crosshair for both axes
        },
      },
      legend: {
        data: datasets.map((dataset) => dataset.label),
        top: 10,
      },
      grid: {
        left: 30,
        right: 110,
        bottom: 70,
        top: 50,
        containLabel: true,
      },
      dataZoom: [
        {
          type: "slider", // The type of data zoom, 'slider' for a slider bar
          xAxisIndex: [0], // Enable data zoom for the first X axis (index 0)
          start: 0, // The start position of the data zoom, 0% in this case
          end: 100, // The end position of the data zoom, 100% in this case
          // bottom: -30,
        },
        {
          type: "slider", // The type of data zoom, 'slider' for a slider bar
          yAxisIndex: [0], // Enable data zoom for the first Y axis (index 0)
          start: 0, // The start position of the data zoom, 0% in this case
          end: 100, // The end position of the data zoom, 100% in this case
          right: 50,
        },
      ],
      toolbox: {
        show: true,
        orient: "horizontal",
        left: "left",
        top: "top",
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: true },
          magicType: {
            show: true,
            type: ["line", "bar", "stack"],
          },

          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: labels,
        interval: 0,
        name: xAxisTitle,
        axisLabel: {
          rotate: 45, // Rotate the labels by 45 degrees
          fontSize: 10,
        },
        nameLocation: "middle",
        nameGap: 50,
        nameTextStyle: {
          fontWeight: "bold", // Set font to bold
        },
      },
      yAxis: [
        {
          type: "value",
          name: leftyAxisTitle,
          position: "left",
          axisLabel: {
            formatter: "{value}",
          },
          splitLine: {
            show: false, // Hide horizontal grid lines
          },
          nameLocation: "middle",
          nameGap: 60,
          nameTextStyle: {
            fontWeight: "bold", // Set font to bold
          },
          show: true,
        },
        {
          nameRotate: 270,
          type: "value",
          name: rightyAxisTitle,
          position: "right",
          axisLabel: {
            formatter: "${value}",
          },
          nameLocation: "middle",
          nameGap: 60,
          nameTextStyle: {
            fontWeight: "bold",
          },
          show: true,
        },
      ],
      series: datasets.map((dataset) => ({
        name: dataset.label,
        type: "line",
        data: dataset.data,
        yAxisIndex: dataset.yAxisID === "right-y-axis" ? 1 : 0,
        borderColor: dataset.borderColor,
        backgroundColor: dataset.backgroundColor,
        smooth: true,
      })),
      graphic: [
        {
          type: "rect",
          position: [100, 100], // Initial position
          shape: {
            width: 0,
            height: 0,
          },
          draggable: false, // Allow dragging
          ondrag: (params) => {
            // Handle drag event
            const { echarts } = echartsReactRef.current;
            const chart = echarts.getInstanceByDom(echartsReactRef.current.getEchartsInstance().getDom());

            // Calculate new position based on params.event.offsetX and params.event.offsetY
            const newPosition = chart.convertFromPixel("grid", [params.event.offsetX, params.event.offsetY]);

            // Update the position of the draggable element
            chart.setOption({
              graphic: {
                id: params.target.id,
                position: newPosition,
              },
            });
          },
        },
      ],
    };
  };

  const MarginSimulationChart = [
    {
      xAxisTitle: "% Change in Price",
      leftyAxisTitle: "Manufacturer Profit ($)",
      rightyAxisTitle: "Annual Profit ($)",
      multiAxes: true,
      data: {
        labels: [
          "-25.00 %",
          "-24.00 %",
          "-23.00 %",
          "-22.00 %",
          "-21.00 %",
          "-20.00 %",
          "-19.00 %",
          "-18.00 %",
          "-17.00 %",
          "-16.00 %",
          "-15.00 %",
          "-14.00 %",
          "-13.00 %",
          "-12.00 %",
          "-11.00 %",
          "-10.00 %",
          "-9.00 %",
          "-8.00 %",
          "-7.00 %",
          "-6.00 %",
          "-5.00 %",
          "-4.00 %",
          "-3.00 %",
          "-2.00 %",
          "-1.00 %",
          "0.00 %",
          "1.00 %",
          "2.00 %",
          "3.00 %",
          "4.00 %",
          "5.00 %",
          "6.00 %",
          "7.00 %",
          "8.00 %",
          "9.00 %",
          "10.00 %",
          "11.00 %",
          "12.00 %",
          "13.00 %",
          "14.00 %",
          "15.00 %",
          "16.00 %",
          "17.00 %",
          "18.00 %",
          "19.00 %",
          "20.00 %",
          "21.00 %",
          "22.00 %",
          "23.00 %",
          "24.00 %",
          "25.00 %",
        ],
        datasets: [
          {
            label: "Manufacturer Profit ($)",
            data: marginChartData?.manufacturerProfit,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgb(75, 192, 192,0.5)",
            yAxisID: "left-y-axis",
          },
          {
            label: "Annual Sales ($)",
            data: marginChartData?.annualProfit,
            borderColor: "rgb(136, 97, 102)",
            backgroundColor: "rgb(136, 97, 102,0.5)",
            yAxisID: "right-y-axis",
          },
        ],
      },
    },
  ];

  // new Code By Devendra Kashyap
  // var options = {
  //   chart: {
  //     type: 'bar'
  //   },
  //   title: {
  //     text: "Effects of Change In Price",
  //     align: 'center',
  //     margin: 10,
  //     offsetX: 0,
  //     offsetY: 0,
  //     style: {
  //       fontSize: '16px',
  //     },
  //   },
  //   xaxis: {
  //     title: {
  //       text: "% Change in Price",
  //     },
  //     categories: [
  //       "-25.00 %",
  //       "-24.00 %",
  //       "-23.00 %",
  //       "-22.00 %",
  //       "-21.00 %",
  //       "-20.00 %",
  //       "-19.00 %",
  //       "-18.00 %",
  //       "-17.00 %",
  //       "-16.00 %",
  //       "-15.00 %",
  //       "-14.00 %",
  //       "-13.00 %",
  //       "-12.00 %",
  //       "-11.00 %",
  //       "-10.00 %",
  //       "-9.00 %",
  //       "-8.00 %",
  //       "-7.00 %",
  //       "-6.00 %",
  //       "-5.00 %",
  //       "-4.00 %",
  //       "-3.00 %",
  //       "-2.00 %",
  //       "-1.00 %",
  //       "0.00 %",
  //       "1.00 %",
  //       "2.00 %",
  //       "3.00 %",
  //       "4.00 %",
  //       "5.00 %",
  //       "6.00 %",
  //       "7.00 %",
  //       "8.00 %",
  //       "9.00 %",
  //       "10.00 %",
  //       "11.00 %",
  //       "12.00 %",
  //       "13.00 %",
  //       "14.00 %",
  //       "15.00 %",
  //       "16.00 %",
  //       "17.00 %",
  //       "18.00 %",
  //       "19.00 %",
  //       "20.00 %",
  //       "21.00 %",
  //       "22.00 %",
  //       "23.00 %",
  //       "24.00 %",
  //       "25.00 %",
  //     ]
  //   },
  //   yaxis: {
  //     title: {
  //       text: "Annual Profit ($)",
  //     },
  //     // labels: {
  //     //   formatter: (value) => value.toFixed(0),
  //     // },
  //     axisBorder: {
  //       show: true,
  //       color: '#000000',
  //       offsetX: 0,
  //       offsetY: 0,
  //     },
  //   },
  // }

  const getChartOptions = (data) => ({
    chart: {
      type: 'bar'
    },
    title: {
      text: "Effects of Change In Price",
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: '16px',
      },
    },
    xaxis: {
      title: {
        text: "% Change in Price",
      },
      categories: [
        "-25.00 %",
        "-24.00 %",
        "-23.00 %",
        "-22.00 %",
        "-21.00 %",
        "-20.00 %",
        "-19.00 %",
        "-18.00 %",
        "-17.00 %",
        "-16.00 %",
        "-15.00 %",
        "-14.00 %",
        "-13.00 %",
        "-12.00 %",
        "-11.00 %",
        "-10.00 %",
        "-9.00 %",
        "-8.00 %",
        "-7.00 %",
        "-6.00 %",
        "-5.00 %",
        "-4.00 %",
        "-3.00 %",
        "-2.00 %",
        "-1.00 %",
        "0.00 %",
        "1.00 %",
        "2.00 %",
        "3.00 %",
        "4.00 %",
        "5.00 %",
        "6.00 %",
        "7.00 %",
        "8.00 %",
        "9.00 %",
        "10.00 %",
        "11.00 %",
        "12.00 %",
        "13.00 %",
        "14.00 %",
        "15.00 %",
        "16.00 %",
        "17.00 %",
        "18.00 %",
        "19.00 %",
        "20.00 %",
        "21.00 %",
        "22.00 %",
        "23.00 %",
        "24.00 %",
        "25.00 %",
      ]
    },
    yaxis: {
      title: {
        text: "Annual Profit ($)",
      },
      // labels: {
      //   formatter: (value) => value.toFixed(0),
      // },
      axisBorder: {
        show: true,
        color: '#000000',
        offsetX: 0,
        offsetY: 0,
      },
    },
  });

  // latest data
  const series = [
    {
      name: 'Manufacturer Profit',
      data: marginChartData?.manufacturerProfit
    },
    {
      name: 'Annual Profit',
      data: marginChartData?.annualProfit
    }
  ];

  const options = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: "Effects of Change In Price",
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: '16px',
      },
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // Alternating row colors
        opacity: 0.5
      }
    },
    xaxis: {
      title: {
        text: "% Change in Price",
      },
      categories: [
        "-25.00 %",
        "-24.00 %",
        "-23.00 %",
        "-22.00 %",
        "-21.00 %",
        "-20.00 %",
        "-19.00 %",
        "-18.00 %",
        "-17.00 %",
        "-16.00 %",
        "-15.00 %",
        "-14.00 %",
        "-13.00 %",
        "-12.00 %",
        "-11.00 %",
        "-10.00 %",
        "-9.00 %",
        "-8.00 %",
        "-7.00 %",
        "-6.00 %",
        "-5.00 %",
        "-4.00 %",
        "-3.00 %",
        "-2.00 %",
        "-1.00 %",
        "0.00 %",
        "1.00 %",
        "2.00 %",
        "3.00 %",
        "4.00 %",
        "5.00 %",
        "6.00 %",
        "7.00 %",
        "8.00 %",
        "9.00 %",
        "10.00 %",
        "11.00 %",
        "12.00 %",
        "13.00 %",
        "14.00 %",
        "15.00 %",
        "16.00 %",
        "17.00 %",
        "18.00 %",
        "19.00 %",
        "20.00 %",
        "21.00 %",
        "22.00 %",
        "23.00 %",
        "24.00 %",
        "25.00 %",
      ]
      // categories: marginChartData.manufacturerProfit.map((_, index) => `Month ${index + 1}`)
    },
    yaxis: {
      title: {
        text: "Annual Profit ($)",
      },
    },
    legend: {
      position: 'top'
    }
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
                    <Select.Option key={item} value={item} className="custom-tooltip-option" data-tooltip={item}>
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
                  <Select.Option key={item} value={item} className="custom-tooltip-option" data-tooltip={item}>
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
                  <Select.Option key={item} value={item} className="custom-tooltip-option" data-tooltip={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="text-end">
            <div className="row">
              <div className="col-lg-8">
                <input className="form-control form-control-sm" id="formFileSm" type="file"></input>
              </div>
              <div className=" col-lg-4">
                <a href="" className="btn btn-primary btn-retailer">
                  Upload Margin{" "}
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
                {/* // new code By Dev */}
                <ApexCharts
                  options={options}
                  series={series}
                  // options={options}
                  // series={[
                  //   {
                  //     name: "Annual Sales ($)",
                  //     data: [10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000]
                  //   },
                  // ]}
                  // type={chartType}
                  height={500}
                  width="100%"
                />
                {/* // old code */}
                {/* {MarginSimulationChart.map((val, i) => {
                  return (
                    <ReactEcharts
                      key={i}
                      ref={echartsReactRef}
                      option={getOption(val)}
                      style={{
                        marginBottom: i !== MarginSimulationChart.length - 1 ? "50px" : "0",
                        height: "500px",
                        width: "100%",
                      }}
                    />
                  );
                })} */}
              </div>
              <div className="left_best_price">
                <table className="best_pr_table">
                  <thead>
                    <tr>
                      <th colSpan="2" style={{ backgroundColor: "#174F73", color: "#fff" }}>
                        Best price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <p>List Price</p>
                      </td>
                      <td>
                        <div className="sim_input_fild">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="listPrice"
                            value={marginPriceValues.listPrice}
                            onChange={handleMarginPriceInputChange}
                            min={0}
                          ></input>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p>EDLP Spend</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="edlpSpend"
                            value={marginPriceValues.edlpSpend}
                            onChange={handleMarginPriceInputChange}
                            min={0}
                          ></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Net Unit Price</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="netUnitPrice"
                            value={netUnitPrice}
                            onChange={handleMarginPriceInputChange}
                            readOnly
                          ></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>COGS</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="cogs"
                            value={marginPriceValues.cogs}
                            onChange={handleMarginPriceInputChange}
                          ></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Base Price Elasticity</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="basePriceElasticity"
                            value={
                              marginPriceValues?.basePriceElasticity
                                ? marginPriceValues?.basePriceElasticity?.toFixed(2)
                                : 0
                            }
                            onChange={handleMarginPriceInputChange}
                          ></input>
                        </div>
                      </td>
                    </tr>
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
                            value={marginPriceValues?.basePrice ? marginPriceValues?.basePrice?.toFixed(2) : 0}
                            onChange={handleMarginPriceInputChange}
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
                        <th>Product Name </th>
                        <th>Net Unit Price($) </th>
                        <th>Total EDLP Spend($)</th>
                        <th>Manufacturer Margin %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p>{productName}</p>
                        </td>
                        <td>
                          <p>{netUnitPrice}</p>
                        </td>
                        <td>
                          <p>{marginPriceValues?.edlpSpend}</p>
                        </td>
                        <td>
                          <p>{manufacturerMargin ? manufacturerMargin.toFixed(2) : "-"}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div className="left_best_price col-lg-12">
                  <table className="best_pr_table">
                    <thead>
                      <tr>
                        <th>Product Name </th>
                        <th>Net Unit Price($) </th>
                        <th>Base Price($)</th>
                        <th>Retailer Margin %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p>{productName}</p>
                        </td>
                        <td>
                          <p>{netUnitPrice ? netUnitPrice.toFixed(2) : "-"}</p>
                        </td>
                        <td>
                          <p>{marginPriceValues?.basePrice ? marginPriceValues?.basePrice.toFixed(2) : "-"}</p>
                        </td>
                        <td>
                          <p>{retailerMargin ? retailerMargin.toFixed(2) : "-"}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

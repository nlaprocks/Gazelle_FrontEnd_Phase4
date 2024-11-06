import React from "react";
import ReactEcharts from "echarts-for-react";
import { Select } from "antd";
import Financials from "./Financials";
import ReactApexChart from "react-apexcharts";

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
  const echartsReactRef = React.useRef(null);
  const productName = promoSimulationData[0]?.Product ?? "";
  console.log(promoSimulationData, discount, lift, units, dollars);
  //   let summary = Object.values(lift).map((i, value) => {
  //     return {
  //       name: "TPR",
  //       lift: value.toFixed(2),
  //       units: Object.values(units)[i].toFixed(2),
  //       dollars: Object.values(dollars)[i].toFixed(2),
  //     };
  //   });
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
        top: -5,
      },
      grid: {
        left: 50,
        right: 110,
        bottom: 50,
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
        splitLine: { show: false },
        boundaryGap: true,
        data: labels,
        interval: 0,
        name: xAxisTitle,
        axisLabel: {
          rotate: 45, // Rotate the labels by 45 degrees
          fontSize: 10,
        },
        nameLocation: "middle",
        nameGap: 70,
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
            formatter: "{value} %",
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
      ],
      series: datasets?.map((dataset, i) => {
        return i === 0
          ? {
              name: dataset.label,
              type: "bar",
              stack: "Total",
              itemStyle: {
                normal: {
                  barBorderColor: "rgba(0,0,0,0)",
                  color: "rgba(0,0,0,0)",
                },
                emphasis: {
                  barBorderColor: "rgba(0,0,0,0)",
                  color: "rgba(0,0,0,0)",
                },
              },
              data: dataset.data,
              yAxisIndex: dataset.yAxisID === "right-y-axis" ? 1 : 0,
              borderColor: dataset.borderColor,
              backgroundColor: dataset.backgroundColor,
              smooth: true,
              barGap: "20%",
              barCategoryGap: "40%",
            }
          : {
              name: dataset.label,
              type: "bar",
              stack: "Total",
              data: dataset.data,
              yAxisIndex: dataset.yAxisID === "right-y-axis" ? 1 : 0,
              borderColor: dataset.borderColor,
              backgroundColor: dataset.backgroundColor,
              smooth: true,
              barGap: "20%",
              barCategoryGap: "40%",
              label: {
                show: true,
                position: "top",
              },
            };
      }),
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
                {promoEventChartData.map((val, i) => {
                  return (
                    <ReactEcharts
                      key={i}
                      ref={echartsReactRef}
                      option={getOption(val)}
                      style={{
                        marginBottom: i !== promoEventChartData.length - 1 ? "50px" : "0",
                        height: "400px",
                        width: "100%",
                      }}
                    />
                  );
                })}
              </div>
              <div className="left_best_price shadow-none">
                <table
                  className="best_pr_table"
                  //   style={{ height: "30vh", width: "25vh" }}
                >
                  <thead>
                    <tr>
                      <th colSpan="2" style={{ backgroundColor: "#174F73", color: "#fff" }}>
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
                                ? typeof promoEventPriceValues?.basePrice === "number"
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
                            value={promoEventPriceValues?.promoPrice && discount.toFixed(2)}
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
                                ? typeof promoEventPriceValues?.total_units_sum === "number"
                                  ? promoEventPriceValues?.total_units_sum.toFixed(2)
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
                              ? !isNaN(lift.tprLift + lift.foLift + lift.doLift + lift.fdLift) &&
                                lift.tprLift + lift.foLift + lift.doLift + lift.fdLift !== 0
                                ? (lift.tprLift + lift.foLift + lift.doLift + lift.fdLift).toFixed(2)
                                : "-"
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {units
                              ? !isNaN(units.tprUnits + units.foUnits + units.doUnits + units.fdUnits) &&
                                units.tprUnits + units.foUnits + units.doUnits + units.fdUnits !== 0
                                ? (units.tprUnits + units.foUnits + units.doUnits + units.fdUnits).toFixed(2)
                                : "-"
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {dollars
                              ? !isNaN(
                                  dollars.tprDollars + dollars.foDollars + dollars.doDollars + dollars.fdDollars
                                ) &&
                                dollars.tprDollars + dollars.foDollars + dollars.doDollars + dollars.fdDollars !== 0
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
                              ? !isNaN(lift.tprLift + lift.foLift + lift.doLift + lift.fdLift) &&
                                lift.tprLift + lift.foLift + lift.doLift + lift.fdLift !== 0
                                ? (lift.tprLift + lift.foLift + lift.doLift + lift.fdLift + 100).toFixed(2)
                                : "-"
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {units && promoEventPriceValues?.total_units_sum
                              ? !isNaN(units.tprUnits + units.foUnits + units.doUnits + units.fdUnits) &&
                                units.tprUnits + units.foUnits + units.doUnits + units.fdUnits !== 0
                                ? (
                                    units.tprUnits +
                                    units.foUnits +
                                    units.doUnits +
                                    units.fdUnits +
                                    parseInt(promoEventPriceValues?.total_units_sum)
                                  ).toFixed(2)
                                : "-"
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {dollars && promoEventPriceValues?.total_units_sum && promoEventPriceValues?.promoPrice
                              ? !isNaN(
                                  dollars.tprDollars + dollars.foDollars + dollars.doDollars + dollars.fdDollars
                                ) &&
                                dollars.tprDollars + dollars.foDollars + dollars.doDollars + dollars.fdDollars !== 0
                                ? (
                                    dollars.tprDollars +
                                    dollars.foDollars +
                                    dollars.doDollars +
                                    dollars.fdDollars +
                                    promoEventPriceValues?.total_units_sum * promoEventPriceValues?.promoPrice
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
            {!isNaN(units.tprUnits + units.foUnits + units.doUnits + units.fdUnits) ? (
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
                increamentalUnits={units.tprUnits + units.foUnits + units.doUnits + units.fdUnits}
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

import React from "react";
import ReactEcharts from "echarts-for-react";

export default function Financials({ promotedPrice, units, increamentalUnits, basePrice, isPriceSimulationLoading }) {
  const echartsReactRef = React.useRef(null);
  const [eventResults, setEventResults] = React.useState([]);
  const [financialsChartData, setFinancialsChartData] = React.useState([]);
  const [financialPriceValues, setFinancialPriceValues] = React.useState({
    listPrice: "",
    edlpPerUnitRate: "",
    promoPerUnitRate: "",
    fixedFee: "",
  });
  const handleFinancialPriceInputChange = (event) => {
    const { name, value } = event.target;
    setFinancialPriceValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };
  React.useEffect(() => {
    let grossRevenue = units * promotedPrice;
    let variableSpend =
      (parseFloat(financialPriceValues.edlpPerUnitRate) + parseFloat(financialPriceValues.promoPerUnitRate)) * units;
    let totalSpend = financialPriceValues.fixedFee
      ? parseFloat(financialPriceValues.fixedFee) + variableSpend
      : variableSpend;
    // console.log(variableSpend, totalSpend, financialPriceValues);
    let increamentalRevenue = increamentalUnits * promotedPrice;
    let variableContributionMargin = parseFloat(financialPriceValues.vcm);
    let increamentalProfit = increamentalUnits * variableContributionMargin - totalSpend;
    let percentageROI = (increamentalProfit / totalSpend) * 100;
    let retailerEverydayMargin = ((basePrice - financialPriceValues?.listPrice) / basePrice) * 100;
    let netCost =
      financialPriceValues.listPrice -
      financialPriceValues.edlpPerUnitRate -
      financialPriceValues.promoPerUnitRate -
      financialPriceValues.fixedFee / units;
    let retailerPromoMargin = ((promotedPrice - netCost) / promotedPrice) * 100;
    let retailerProfit = units * promotedPrice - netCost * units;
    setEventResults([
      {
        name: "Gross Revenue",
        value: !isNaN(grossRevenue) && parseFloat(grossRevenue) !== 0 ? grossRevenue.toFixed(2) + "$" : "-",
      },
      {
        name: "Total Spend",
        value: !isNaN(totalSpend) ? totalSpend.toFixed(2) + "$" : "-",
      },
      {
        name: "Incremental Revenue",
        value:
          !isNaN(increamentalRevenue) && parseFloat(increamentalRevenue) !== 0
            ? increamentalRevenue.toFixed(2) + "$"
            : "-",
      },
      {
        name: "Incremental Profit",
        value: !isNaN(increamentalProfit) ? increamentalProfit.toFixed(2) + "$" : "-",
      },
      {
        name: "Sales ROI",
        value: !isNaN(percentageROI) ? percentageROI.toFixed(2) + "%" : "-",
      },
      {
        name: "Retail Promo Margin %",
        value: !isNaN(retailerPromoMargin) ? retailerPromoMargin.toFixed(2) + "%" : "-",
      },
      {
        name: "Retail Everyday Margin %",
        value: !isNaN(retailerEverydayMargin) && promotedPrice ? retailerEverydayMargin.toFixed(2) + "%" : "-",
      },
      {
        name: "Retail Profit",
        value: !isNaN(retailerProfit) && parseFloat(retailerProfit) !== 0 ? retailerProfit.toFixed(2) + "$" : "-",
      },
    ]);
    setFinancialsChartData([
      {
        xAxisTitle: "% Change in Price",
        leftyAxisTitle: "Dollars",
        rightyAxisTitle: "Percent ROI and Margin",
        multiAxes: true,
        data: {
          labels: ["Gross Revenue", "Incremental Revenue", "Incremental Profit", "Sales ROI", "Retail Promo Margin %"],
          datasets: [
            {
              label: "Gross Revenue",
              data: [grossRevenue.toFixed(2), "-", "-", "-", "-"],
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(75, 192, 192,0.5)",
              yAxisID: "left-y-axis",
            },
            {
              label: "Incremental Revenue",
              data: ["-", increamentalRevenue.toFixed(2), "-", "-", "-"],
              borderColor: "rgb(136, 97, 102)",
              backgroundColor: "rgb(136, 97, 102,0.5)",
              yAxisID: "left-y-axis",
            },
            {
              label: "Incremental Profit",
              data: ["-", "-", increamentalProfit.toFixed(2), "-", "-"],
              borderColor: "rgb(136, 97, 102)",
              backgroundColor: "rgb(136, 97, 102,0.5)",
              yAxisID: "left-y-axis",
            },
            {
              label: "Sales ROI",
              data: ["-", "-", "-", percentageROI.toFixed(2), "-"],
              borderColor: "rgb(136, 97, 102)",
              backgroundColor: "rgb(136, 97, 102,0.5)",
              yAxisID: "right-y-axis",
            },
            {
              label: "Retail Promo Margin %",
              data: ["-", "-", "-", "-", retailerPromoMargin.toFixed(2)],
              borderColor: "rgb(136, 97, 102)",
              backgroundColor: "rgb(136, 97, 102,0.5)",
              yAxisID: "right-y-axis",
            },
          ],
        },
      },
    ]);
  }, [financialPriceValues, units, promotedPrice, basePrice]);

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
        showTitle: false,
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
        nameGap: 80,
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
            formatter: "{value} $",
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
            formatter: "{value} %",
          },
          nameLocation: "middle",
          nameGap: 50,
          nameTextStyle: {
            fontWeight: "bold",
          },
          show: true,
        },
      ],
      series: datasets?.map((dataset, i) => {
        return {
          name: dataset.label,
          type: "bar",
          //   stack: "Total",
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

  // console.log(eventResults);

  return (
    <div className="simluation_db">
      <div className="container-fluid">
        <div className="sim_retailer_main mb-4" style={{ gridTemplateColumns: "auto" }}>
          <p>Financial Analysis</p>
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
                {financialsChartData.map((val, i) => {
                  return (
                    <ReactEcharts
                      key={i}
                      ref={echartsReactRef}
                      option={getOption(val)}
                      style={{
                        marginBottom: i !== financialsChartData.length - 1 ? "50px" : "0",
                        height: "500px",
                        width: "65vw",
                      }}
                    />
                  );
                })}
              </div>
              <div className="left_best_price">
                <table className="best_pr_table">
                  <thead>
                    <tr>
                      <th colSpan="2" style={{ backgroundColor: "#174F73", color: "#fff" }}>
                        Financials
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
                            value={financialPriceValues.listPrice}
                            onChange={handleFinancialPriceInputChange}
                            min={0}
                          ></input>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p>EDLP Per Unit Rate</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="edlpPerUnitRate"
                            value={financialPriceValues.edlpPerUnitRate}
                            onChange={handleFinancialPriceInputChange}
                            min={0}
                          ></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Promo Per Unit Rate</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="promoPerUnitRate"
                            value={financialPriceValues.promoPerUnitRate}
                            onChange={handleFinancialPriceInputChange}
                          ></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>VCM</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="vcm"
                            value={financialPriceValues.vcm}
                            onChange={handleFinancialPriceInputChange}
                          ></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Fixed Fees</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="fixedFee"
                            value={financialPriceValues.fixedFee}
                            onChange={handleFinancialPriceInputChange}
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
                        <th colSpan={2}>Event Results </th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventResults &&
                        eventResults.map((ele) => (
                          <tr>
                            <td>
                              <p>{ele.name}</p>
                            </td>

                            <td>
                              <p>{ele.value ? ele.value : "-"}</p>
                            </td>
                          </tr>
                        ))}
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

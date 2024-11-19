import React, { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";

const ElasticityStratagyChart = ({ isLoading }) => {
  const [chartData, setChartData] = useState([]);
  const chart9Reducer = useSelector((state) => state.chart9Reducer);
  const chartDataMap = {};
  React.useEffect(() => {
    if (chart9Reducer && chart9Reducer.chart9Data) {
      const newData = transformData(chart9Reducer.chart9Data.data);
      setChartData(newData);
    }
  }, [chart9Reducer]);

  const transformData = (data) => {
    const chartDataMap = {};

    data.forEach((item) => {
      const retailer = item.Retailer;
      if (!chartDataMap[retailer]) {
        chartDataMap[retailer] = {
          Retailer: retailer,
          multiAxes: false,
          xycoordinated: false,
          xAxisTitle: "Base Price Elasticity",
          yAxisTitle: "Promo Price Elasticity",
          data: {
            datasets: [],
          },
        };
      }

      chartDataMap[retailer].data.datasets.push({
        label: item.Product,
        data: [
          {
            x: item.Base_Price_Elasticity,
            y: item.Promo_Price_Elasticity,
          },
        ],
        borderColor: "rgb(60,146,109)",
        backgroundColor: "rgba(60,146,109, 0.5)",
        pointRadius: 15,
        pointHoverRadius: 20,
      });
    });

    // Convert the map into an array
    return Object.values(chartDataMap);
  };

  // Convert the map into an array
  const transformedChartData = Object.values(chartDataMap);

  const getDataOption = (chartData) => {
    const datasets = chartData?.data?.datasets?.filter(dataset => dataset !== undefined);

    // console.log(chartData,"chartdata")
    // const datasets = chartData.data.datasets;
    // console.log(datasets,"datasets");


    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;

    // Loop through datasets and their data to find min and max values
    datasets.forEach((dataset) => {
      // console.log(datasets)
      dataset.data.forEach((point) => {
        const { x, y } = point;

        if (x > maxX) {
          maxX = x;
        }
        if (x < minX) {
          minX = x;
        }

        if (y > maxY) {
          maxY = y;
        }
        if (y < minY) {
          minY = y;
        }
      });
    });

    // Calculate the absolute maximum value from min and max
    const absMax = Math.max(Math.abs(minX), Math.abs(maxX), Math.abs(minY), Math.abs(maxY));

    // Set axis min and max values with a buffer (e.g., 10%)
    const buffer = 0.1;
    const max = absMax + absMax * buffer;
    const min = -max;

    const xAxisFormatter = (value) => {
      return value.toFixed(2); // Limit to 2 decimal places if values exist after the decimal point
    };

    const yAxisFormatter = (value) => {
      return value.toFixed(2); // Limit to 2 decimal places if values exist after the decimal point
    };

    return {
      title: {
        text: `${chartData.Retailer}`,
        left: "center",
        top: 0,
        textStyle: {
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "shadow",
        },
        formatter: (params) => {
          const datasetIndex = params.seriesIndex
          console.log(chartData.data, "datasetindex")


          if (!chartData?.data?.datasets || !chartData.data.datasets[datasetIndex]?.data) {
            return <></>;
          }

          const dataItem = chartData.data.datasets[datasetIndex].data[params.dataIndex];
          const originalX = dataItem.x.toFixed(2); // Inverse the transformation
          const originalY = dataItem.y.toFixed(2); // Inverse the transformation

          // const originalX = (dataItem.x != null && dataItem.x !== '') ? dataItem.x.toFixed(2) : '0.00';
          // const originalY = (dataItem.y != null && dataItem.y !== '') ? dataItem.y.toFixed(2) : '0.00';
          console.log(originalX, "originalx");
          console.log(originalY, "originaly");



          return `${chartData.data.datasets[datasetIndex].label}<br />Base Price Elasticity: ${originalX}<br />Promo Price Elasticity: ${originalY}`;
        },


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
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          saveAsImage: { show: true },
        },
      },
      grid: {
        right: 100,
        containLabel: true,
      },
      xAxis: {
        type: "value",
        name: chartData.xAxisTitle,
        boundaryGap: false,
        axisTick: {
          show: false, // Hide the small ticks at the top of the x-axis
        },
        splitLine: {
          show: true, // Show y-axis grid lines
        },
        nameLocation: "middle",
        nameGap: 25,
        nameTextStyle: {
          fontWeight: "bold", // Set font to bold
        },
        inverse: true,
        max: 0,
        min: -4,
        // max,
        // min,
        axisLabel: {
          formatter: xAxisFormatter, // Apply the formatter to x-axis labels
        },
      },
      yAxis: {
        type: "value",
        name: chartData.yAxisTitle,
        splitLine: {
          show: true,
        },
        axisTick: {
          show: false, // Hide the small ticks at the top of the x-axis
        },
        axisLabel: {
          rotate: 90, // Rotate labels by 90 degrees
          align: "center", // Align labels to the center
          formatter: yAxisFormatter,
        },
        nameLocation: "middle",
        nameRotate: 90,
        nameGap: 40,
        nameTextStyle: {
          fontWeight: "bold",
        },
        inverse: true,
        // max,
        // min,
        max: 0,
        min: -4,
        offset: 10,
      },
      series: chartData.data.datasets.map((dataset) => ({
        name: dataset.label,
        data: dataset.data.filter((dataset) => dataset !== undefined).map((point) => [point.x, point.y]),
        type: "scatter",
        symbolSize: 20,
        itemStyle: {
          borderColor: dataset.borderColor,
          backgroundColor: dataset.backgroundColor,
        },
        emphasis: {
          focus: "series",
        },
        markLine: {
          data: [
            {
              xAxis: -2,
              name: "Your Markline Name",
              label: {
                show: false,
              },
              lineStyle: {
                color: "#93969E",
                type: "solid",
                width: 1,
              },
              emphasis: {
                label: {
                  show: false,
                },
                lineStyle: {
                  width: 1,
                },
              },
              tooltip: {
                show: false,
              },
            },
            {
              yAxis: -2,
              name: "Your Markline Name",
              label: {
                show: false,
              },
              lineStyle: {
                color: "#93969E",
                type: "solid",
                width: 1,
              },
              emphasis: {
                label: {
                  show: false,
                },
                lineStyle: {
                  width: 1,
                },
              },
              tooltip: {
                show: false,
              },
            },
          ],
          symbol: ["none", "none"],
        },
      })),

      // series: chartData.data.datasets
      // .filter((dataset) => dataset !== undefined && Array.isArray(dataset.data)) // Ensure dataset and data array exist
      // .map((dataset) => ({
      //   name: dataset.label,
      //   data: dataset.data, // Keep valid points only
      //   type: "scatter",
      //   symbolSize: 20,
      //   itemStyle: {
      //     borderColor: dataset.borderColor,
      //     backgroundColor: dataset.backgroundColor,
      //   },
      //   emphasis: {
      //     focus: "series",
      //   },
      //   markLine: {
      //     data: [
      //       {
      //         xAxis: -2,
      //         name: "Your Markline Name",
      //         label: {
      //           show: false,
      //         },
      //         lineStyle: {
      //           color: "#93969E",
      //           type: "solid",
      //           width: 1,
      //         },
      //         emphasis: {
      //           label: {
      //             show: false,
      //           },
      //           lineStyle: {
      //             width: 1,
      //           },
      //         },
      //         tooltip: {
      //           show: false,
      //         },
      //       },
      //       {
      //         yAxis: -2,
      //         name: "Your Markline Name",
      //         label: {
      //           show: false,
      //         },
      //         lineStyle: {
      //           color: "#93969E",
      //           type: "solid",
      //           width: 1,
      //         },
      //         emphasis: {
      //           label: {
      //             show: false,
      //           },
      //           lineStyle: {
      //             width: 1,
      //           },
      //         },
      //         tooltip: {
      //           show: false,
      //         },
      //       },
      //     ],
      //     symbol: ["none", "none"],
      //   },
      // })) ,



      graphic: [
        {
          type: "text",
          left: "14%",
          top: "14%",
          style: {
            text: "Hi-Lo",
            fill: "rgb(255, 205, 86)", // Text color
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        {
          type: "text",
          right: "14%",
          top: "14%",
          style: {
            text: "Price Disruptor",
            fill: "rgb(75, 192, 192)", // Text color
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        {
          type: "text",
          left: "14%",
          bottom: "18%",
          style: {
            text: "Margin Builder",
            fill: "rgb(153, 102, 255)", // Text color
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        {
          type: "text",
          right: "14%",
          bottom: "18%",
          style: {
            text: "EDLP",
            fill: "rgb(54, 162, 235)", // Text color
            fontSize: 16,
            fontWeight: "bold",
          },
        },
      ],
    };
  };
  const chartRef = useRef(null);
  useEffect(() => {
    // if (chartRef.current && chartRef.current.getEchartsInstance) {
    //   const chartInstance = chartRef.current.getEchartsInstance();
    //   chartInstance.clear();
    //   if (chartInstance) {
    //     // chartInstance.setOption(getDataOption(chartData));
    //   }
    // }
    if (chartRef.current && chartRef.current.getEchartsInstance) {
      const chartInstance = chartRef.current.getEchartsInstance();
      chartInstance.clear();
      if (chartInstance) {
        chartData.forEach((val, i) => {
          chartInstance.setOption(getDataOption(val));
        });
      }
    }
  }, [chartData]);

  return (
    <div>
      {chartData.map((val, i) => {
        return (
          <ReactECharts
            key={i}
            option={getDataOption(val) || []}
            showLoading={isLoading}
            style={{
              width: "100%",
              height: "500px",
              marginBottom: i !== transformedChartData.length - 1 ? "50px" : "0",
            }}
            ref={chartRef}
          />
        );
      })}
    </div>
  );
};

export default ElasticityStratagyChart;

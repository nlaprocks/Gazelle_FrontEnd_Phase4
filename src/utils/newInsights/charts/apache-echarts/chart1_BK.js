import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactECharts from "echarts-for-react";

const Bar = ({ isLoading }) => {
  const chart1Reducer = useSelector((state) => state.chart1Reducer);

  // Create an empty object to store the grouped data
  const groupedData = {};

  // Iterate through the data and group it by "Retailer"
  chart1Reducer?.chart1Data?.data?.forEach((item) => {
    const retailer = item.Retailer;
    console.log("item: ", chart1Reducer?.chart1Data?.data.length)

    // Check if the retailer key exists in the groupedData object
    if (!groupedData[retailer]) {
      // If it doesn't exist, create a new object for the retailer
      groupedData[retailer] = {
        label: retailer,
        data: [],
        borderColor: getRandomColor(),
        backgroundColor: getRandomColor(),
      };
    }

    // Add the data point for the retailer
    groupedData[retailer].data.push({
      y: item.Price_avg_last_4_weeks?.toFixed(2),
      x: item.Product,
    });
  });

  // Convert the groupedData object to an array of objects
  const newData = Object.values(groupedData);

  // Function to generate random colors
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const chartRef = useRef(null),
    rotate = 90,
    align = "left",
    verticalAlign = "middle",
    position = "insideBottom",
    distance = 15;
  const allXAxisLabels = Array.from(
    new Set(newData.reduce((labels, retailer) => labels.concat(retailer.data.map((item) => item.x)), []))
  );

  useEffect(() => {
    const labelOption = {
      show: false,
      position: position,
      distance: distance,
      align: align,
      verticalAlign: verticalAlign,
      rotate: rotate,
      formatter: "{c}",
      fontSize: 8,
      rich: {
        name: {},
      },
    };
    const seriesData = newData.map((retailer) => {
      const data = allXAxisLabels.map((label) => {
        const dataPoint = retailer.data.find((item) => item.x === label);
        return {
          value: dataPoint ? dataPoint.y : 0,
          label: {
            // show: true,
            position: "top",
            formatter: "{c}",
          },
        };
      });

      return {
        name: retailer.label,
        type: "bar",
        barGap: 0,
        label: {
          ...labelOption,
          formatter: "{c}",
        },
        emphasis: {
          focus: "series",
        },
        data,
        itemStyle: {
          borderColor: retailer.borderColor,
          backgroundColor: retailer.backgroundColor,
        },
        force: { friction: 0.1 },
      };
    });
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: newData?.map((datasetItem) => datasetItem.label), // Update to use newData
      },
      grid: {
        bottom: 300,
        left: 200,
      },
      dataZoom: [
        {
          type: "slider",
          xAxisIndex: [0],
          start: 0,
          end: chart1Reducer?.chart1Data?.data?.length > 15 ? 10 : 100,
        },
        {
          type: "slider",
          yAxisIndex: [0],
          start: 0,
          end: 100,
          right: 50,
        },
      ],
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar", "stack"] },
          saveAsImage: { show: true },
        },
      },
      xAxis: [
        {
          triggerEvent: true,
          type: "category",
          axisTick: { show: false },
          data: allXAxisLabels,
          name: "Product",
          show: true,
          axisLabel: {
            formatter: (value) => {
              const maxLabelLength = 42;
              if (value.length > maxLabelLength) {
                return value.substring(0, maxLabelLength - 3) + "...";
              }
              return value;
            },
            interval: 0,
            rotate: 45,
            textStyle: {
              fontSize: 10,
            },
          },
          axisPointer: {
            show: true,
            label: {
              show: false,
            },
            handle: {
              show: false,
            },
          },
          splitLine: {
            show: false,
          },
          boundaryGap: true,
          nameLocation: "middle",
          nameGap: 200,
          nameTextStyle: {
            fontWeight: "bold",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "Price Mean",
          axisLine: {
            show: true,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            // rotate: 90,
            align: "center",
            // formatter: "{value}%",
            textStyle: {
              fontSize: 10,
            },
          },
          nameLocation: "middle",
          nameRotate: 90,
          nameGap: 30,
          nameTextStyle: {
            fontWeight: "bold",
          },
          boundaryGap: true,
        },
      ],
      series: seriesData,
    };

    if (chartRef.current) {
      chartRef.current.getEchartsInstance().setOption(option);
    }
    if (chart1Reducer.success) {
      const chartInstance = chartRef.current.getEchartsInstance();
      chartInstance.clear();
      chartInstance.setOption(option);
      delete chart1Reducer.success;
    }
  }, [rotate, align, verticalAlign, position, distance, newData, chart1Reducer.success]); // Include newData in the dependency array
  return (
    <div style={{ position: "relative" }}>
      <ReactECharts ref={chartRef} option={{}} style={{ height: "800px" }} showLoading={isLoading} />
    </div>
  );
};

export default Bar;

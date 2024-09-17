import React from "react";
import ReactECharts from "echarts-for-react";
const BarChartUser = ({ data }) => {
  const chartRef = React.useRef(null);
  const xAxisDataPoints = JSON.parse(data.x_axis_data_point);
  const yAxisDataPoints = JSON.parse(data.y_axis_data_point);
  const groupedData = data?.chart_json?.reduce((acc, item) => {
    const xAxisCategory = item[xAxisDataPoints]; // Modify this line to use xAxisDataPoints
    if (!acc[xAxisCategory]) {
      acc[xAxisCategory] = {};
      yAxisDataPoints.forEach((yAxisPoint) => {
        acc[xAxisCategory][yAxisPoint] = 0; // Initialize each yAxisPoint to 0
      });
    }
    yAxisDataPoints.forEach((yAxisPoint) => {
      acc[xAxisCategory][yAxisPoint] += item[yAxisPoint];
    });
    return acc;
  }, {});

  // Extract names and their corresponding data
  const names = Object.keys(groupedData);
  const chartData = yAxisDataPoints.map((yAxisPoint) => {
    const seriesData = names.map((val) => {
      const value = groupedData[val][yAxisPoint];
      return parseFloat(value.toFixed(2)); // Add two decimal places
    });

    // Check if the chart type is scatter and adjust the size property
    const seriesConfig = {
      name: yAxisPoint,
      type: data?.chart_type,
      data: seriesData,
    };

    if (data?.chart_type === "scatter") {
      seriesConfig.symbolSize = function (value) {
        // Adjusting the logic here for determining the size based on the value
        return value * 5; // Adjusting the multiplier as needed
      };
    }

    return seriesConfig;
  });

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      bottom: 300,
      left: 180,
    },

    dataZoom: [
      {
        type: "slider",
        xAxisIndex: [0],
        start: 0,
        end: 100,
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
        type: "category",
        axisTick: { show: false },
        data: names,
        name: data?.x_axis_label,
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
        nameLocation: "middle",
        nameGap: 200,
        nameTextStyle: {
          fontWeight: "bold",
        },
      },
    ],
    yAxis: [
      {
        axisLine: {
          show: true,
        },
        splitLine: {
          show: false,
        },
        type: "value",
        name: data?.y_axis_label,
        position: "left",
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            fontSize: 10,
          },
        },
        nameLocation: "middle",
        nameGap: 35,
        nameTextStyle: {
          fontWeight: "bold",
        },
        show: true,
      },
    ],
    legend: {
      data: yAxisDataPoints, // Add legend data here
    },
    series: chartData,
  };
  React.useEffect(() => {
    if (data) {
      const chartInstance = chartRef.current.getEchartsInstance();
      chartInstance.clear();
      chartInstance.setOption(option);
    }
  }, [data]);
  return (
    <div style={{ marginTop: "20px" }}>
      <ReactECharts option={option} style={{ height: "600px" }} ref={chartRef} />
    </div>
  );
};

export default BarChartUser;

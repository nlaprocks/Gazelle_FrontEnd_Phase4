import React from "react";
import ReactECharts from "echarts-for-react";

const RadarChart = ({ data }) => {
  console.log("radaruser")
  console.log("data::: ", data);
  const chartRef = React.useRef(null);

  const xAxisDataPoint = JSON.parse(data.x_axis_data_point);
  const yAxisDataPoints = JSON.parse(data.y_axis_data_point);

  // Extract unique retailers and products
  const retailers = [...new Set(data.chart_json.map((entry) => entry.Retailer))];
  const products = [...new Set(data.chart_json.map((entry) => entry.Product))];

  // Generate radar series data
  const radarSeriesData = retailers.map((retailer) => {
    const values = products.map((product) => {
      const item = data.chart_json.find((entry) => entry.Retailer === retailer && entry.Product === product);

      // Check if item is defined before accessing properties
      if (item) {
        return yAxisDataPoints.map((dataPoint) => item[dataPoint]);
      }

      // If item is undefined, return an array of 0 values for the radar chart
      return yAxisDataPoints.map(() => 0);
    });

    return {
      name: retailer,
      type: "radar",
      data: values,
    };
  });
  const uniqueValues = Array.from(new Set(data.chart_json.map((entry) => entry[xAxisDataPoint])));
  const indicator = uniqueValues.map((val) => ({ name: val }));
  const radarOption = {
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "shadow",
      },
    },
    radar: {
      indicator: indicator,
    },
    legend: {
      data: retailers,
    },
    series: radarSeriesData,
  };

  React.useEffect(() => {
    if (data) {
      const chartInstance = chartRef.current.getEchartsInstance();
      chartInstance.clear();
      chartInstance.setOption(radarOption);
    }
  }, [data]);
  return (
    <div style={{ marginTop: "20px" }}>
      <ReactECharts option={radarOption} style={{ height: "600px" }} ref={chartRef} />
    </div>
  );
};

export default RadarChart;

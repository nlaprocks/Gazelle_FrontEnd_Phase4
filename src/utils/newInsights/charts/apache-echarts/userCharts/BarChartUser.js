
import React from "react";
import ReactECharts from "echarts-for-react";
const BarChartUser = ({ data }) => {
  console.log("baruser")
  console.log(data,"data")
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
      return parseFloat(value); // Add two decimal places
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









// import React, { useState } from "react";

// import ApexCharts from "react-apexcharts";


// const BarChartUser= ({ data }) => {
//   console.log(data,"data")
//   console.log(data.chart_json)
//   const [chartType, setChartType] = useState('bar');
// const [isStacked, setIsStacked] = useState(false);
//   if (!data || !data.chart_json || data.chart_json.length === 0) {
//     console.log("console")
//     return <div>No Data Available</div>;
//   }

//   const xAxisDataPoints = JSON.parse(data.x_axis_data_point);
//   const yAxisDataPoints = JSON.parse(data.y_axis_data_point);

//   const groupedData = data?.chart_json?.reduce((acc, item) => {
//     console.log(acc)
//     console.log(item)
//     const xAxisCategory = item[xAxisDataPoints];
//     if (!acc[xAxisCategory]) {
//       acc[xAxisCategory] = {};
//       yAxisDataPoints.forEach((yAxisPoint) => {
//         acc[xAxisCategory][yAxisPoint] = 0;
//       });
//     }
//     yAxisDataPoints.forEach((yAxisPoint) => {
//       acc[xAxisCategory][yAxisPoint] += item[yAxisPoint];
//     });
//     return acc;
//   }, {});

//   const names = Object.keys(groupedData);
//   const chartData = yAxisDataPoints.map((yAxisPoint) => ({
//     name: yAxisPoint,
//     type: data?.chart_type || "bar",
//     data: names.map((val) => {
//       const value = groupedData[val][yAxisPoint];
//       return parseFloat(value);
//     }),
//   }));
//   console.log(groupedData,"chartdata")

//   const chartOptions = {
//     chart: {
//       type: data?.chart_type || "bar",
//       toolbar: {
//         show: true,
//         tools: {
//           download: true,
//           selection: true,
//           zoom: false,
//           zoomin: false,
//           zoomout: false,
//           pan: false,
//           reset: true,
//           customIcons: [
//             {
//               icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,29V7H32V29Z"></path><path d="M 7 10 L 13 10 L 13 26 L 11.4 26 L 11.4 11.6 L 8.6 11.6 L 8.6 26 L 7 26 Z" class="clr-i-outline clr-i-outline-path-2"></path><path d="M 15 19 L 21 19 L 21 26 L 19.4 26 L 19.4 20.6 L 16.6 20.6 L 16.6 26 L 15 26 Z" class="clr-i-outline clr-i-outline-path-3"></path><path d="M 23 16 L 29 16 L 29 26 L 27.4 26 L 27.4 17.6 L 24.6 17.6 L 24.6 26 L 23 26 Z" class="clr-i-outline clr-i-outline-path-4"></path><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
//               title: 'Switch to Bar Chart',
//               class: 'custom-icon-bar',
//               index: -1,
//               click: () => setChartType('bar')
//             },
//             {
//               icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M 32 5 L 4 5 C 2.895 5 2 5.895 2 7 L 2 29 C 2 30.105 2.895 31 4 31 L 32 31 C 33.105 31 34 30.105 34 29 L 34 7 C 34 5.895 33.105 5 32 5 Z M 4 29 L 4 7 L 32 7 L 32 29 Z"></path><polygon points="15.62 15.222 9.602 23.968 5.55 20.384 6.61 19.186 9.308 21.572 15.634 12.38 22.384 22.395 29.138 13.47 30.414 14.436 22.308 25.145" class="clr-i-outline clr-i-outline-path-2"></polygon><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
//               title: 'Switch to Line Chart',
//               class: 'custom-icon-line',
//               index: -1,
//               click: () => setChartType('line')
//             },
//             {
//               icon: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 8.04144L12 3.99999L5 8.04145V9.7735L12 13.8149L19 9.7735V8.04144ZM6.5 8.90747L12 5.73204L17.5 8.90747L12 12.0829L6.5 8.90747Z" fill="#1F2328"/><path d="M19 14.1789V15.911L12 19.9524L5 15.911V14.1789L12 18.2204L19 14.1789Z" fill="#1F2328"/><path d="M19 11.1765V12.9086L12 16.95L5 12.9086V11.1765L12 15.218L19 11.1765Z" fill="#1F2328"/></svg>`,
//               title: isStacked ? "Tile" : "Stack",
//               class: 'custom-icon-line',
//               index: -1,
//               click: () => setIsStacked(isStacked ? false : true)
//             },
//           ]
//         },
//       },
//     },
//     xaxis: {
//       categories: names,
//       title: {
//         text: data?.x_axis_label,
//       },
//       labels: {
//         rotate: -45,
//         style: {
//           fontSize: "10px",
//         },
//       },
//     },
//     yaxis: {
//       title: {
//         text: data?.y_axis_label,
//       },
//       labels: {
//         formatter: (value) =>
//           value.toLocaleString("en-US", {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2,
//           }),
//       },
//     },
//     tooltip: {
//       enabled: true,
//       y: {
//         formatter: (val) =>
//           `$${val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     grid: {
//       show: true,
//       borderColor: '#90A4AE',
//       strokeDashArray: 4,
//     },
//     legend: {
//       position: "top",
//     },
//     series: chartData,
//   };

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <ApexCharts
//         options={chartOptions}
//         series={chartData}
//         type={data?.chart_type || "bar"}
//         height={600}
//       />
//     </div>
//   );
// };

// export default BarChartUser;


// import React from "react";
// import Chart from "react-apexcharts";

// const BarChartUser = ({ data }) => {
//   const xAxisDataPoints = JSON.parse(data.x_axis_data_point);
//   const yAxisDataPoints = JSON.parse(data.y_axis_data_point);

//   const groupedData = data?.chart_json?.reduce((acc, item) => {
//     const xAxisCategory = item[xAxisDataPoints];
//     if (!acc[xAxisCategory]) {
//       acc[xAxisCategory] = {};
//       yAxisDataPoints.forEach((yAxisPoint) => {
//         acc[xAxisCategory][yAxisPoint] = 0;
//       });
//     }
//     yAxisDataPoints.forEach((yAxisPoint) => {
//       acc[xAxisCategory][yAxisPoint] += item[yAxisPoint];
//     });
//     return acc;
//   }, {});

//   const names = Object.keys(groupedData);
//   // console.log(names,"names")
//   const chartData = yAxisDataPoints.map((yAxisPoint) => {
//     return {
//       name: yAxisPoint,
//       // data: names.map((val) => parseFloat(groupedData[val][yAxisPoint])),
//     };
//   });

//   const options = {
//     chart: {
//       type: data?.chart_type,
//       height: 600,
//     },
//     xaxis: {
//       // categories: names,
//       labels: {
//         formatter: (value) => {
//           const maxLabelLength = 42;
//           return value> maxLabelLength ? value.substring(0, maxLabelLength - 3) + "..." : value;
//         },
//       },
//     },
//     tooltip: {
//       shared: true,
//       intersect: false,
//     },
//     legend: {
//       position: 'top',
//     },
//   };

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <Chart options={options} series={chartData} type={data?.chart_type} height={600} />
//     </div>
//   );
// };

// export default BarChartUser;













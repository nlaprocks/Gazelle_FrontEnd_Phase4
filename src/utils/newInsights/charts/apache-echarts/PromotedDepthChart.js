import React from "react";
import ApexCharts from "react-apexcharts";
import { useSelector } from "react-redux";

const PromotedDepthChart = ({ isLoading }) => {
  const chart6Reducer = useSelector((state) => state.chart6Reducer);
  const chart6Data = chart6Reducer?.chart6Data?.data;
  const [isStacked, setIsStacked] = React.useState(false);
  const [chartType, setChartType] = React.useState('bar');
  const [chartType2, setChartType2] = React.useState('line');
  const retailers = {}; // Create an object to store data by retailer

  // Loop through the chart6Data and group data by retailer
  chart6Data?.forEach((item) => {
    const retailer = item.Retailer;

    // If the retailer object doesn't exist, create it
    if (!retailers[retailer]) {
      retailers[retailer] = {
        Retailer: retailer,
        xAxisTitle: "Products",
        yAxisTitle: "Promo Price Elasticity",
        y1AxisTitle: "Average Discount Depth",
        data: {
          categories: [],
          series: [
            {
              name: "Average Discount Depth",
              type: chartType2,
              data: [],
            },
            {
              name: "Promo Price Elasticity",
              type: chartType,
              data: [],
            },
          ],
        },
      };
    }

    // Add data to the retailer object
    retailers[retailer].data.categories.push(item.Product);
    retailers[retailer].data.series[0].data.push(item.Average_discount_depth);
    retailers[retailer].data.series[1].data.push(item.Promo_Price_Elasticity);
  });

  // Convert the retailers object into an array
  const restructuredData = Object.values(retailers);

  // chartNumber 6
  const getChartOptions = (data) => ({
    chart: {
      // type: 'line',
      // height: 500,
      stacked: isStacked,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: true,
          reset: true,
          customIcons: [
            {
              icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,29V7H32V29Z"></path><path d="M 7 10 L 13 10 L 13 26 L 11.4 26 L 11.4 11.6 L 8.6 11.6 L 8.6 26 L 7 26 Z" class="clr-i-outline clr-i-outline-path-2"></path><path d="M 15 19 L 21 19 L 21 26 L 19.4 26 L 19.4 20.6 L 16.6 20.6 L 16.6 26 L 15 26 Z" class="clr-i-outline clr-i-outline-path-3"></path><path d="M 23 16 L 29 16 L 29 26 L 27.4 26 L 27.4 17.6 L 24.6 17.6 L 24.6 26 L 23 26 Z" class="clr-i-outline clr-i-outline-path-4"></path><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
              title: 'Switch to Bar Chart',
              class: 'custom-icon-bar',
              index: -1,
              click: () => { setChartType('bar'); setChartType2("bar") }
            },
            {
              icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M 32 5 L 4 5 C 2.895 5 2 5.895 2 7 L 2 29 C 2 30.105 2.895 31 4 31 L 32 31 C 33.105 31 34 30.105 34 29 L 34 7 C 34 5.895 33.105 5 32 5 Z M 4 29 L 4 7 L 32 7 L 32 29 Z"></path><polygon points="15.62 15.222 9.602 23.968 5.55 20.384 6.61 19.186 9.308 21.572 15.634 12.38 22.384 22.395 29.138 13.47 30.414 14.436 22.308 25.145" class="clr-i-outline clr-i-outline-path-2"></polygon><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
              title: 'Switch to Line Chart',
              class: 'custom-icon-line',
              index: -1,
              click: () => { setChartType('line'); setChartType2('line') }
            },
            {
              icon: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 8.04144L12 3.99999L5 8.04145V9.7735L12 13.8149L19 9.7735V8.04144ZM6.5 8.90747L12 5.73204L17.5 8.90747L12 12.0829L6.5 8.90747Z" fill="#1F2328"/><path d="M19 14.1789V15.911L12 19.9524L5 15.911V14.1789L12 18.2204L19 14.1789Z" fill="#1F2328"/><path d="M19 11.1765V12.9086L12 16.95L5 12.9086V11.1765L12 15.218L19 11.1765Z" fill="#1F2328"/></svg>`,
              title: isStacked ? "Tile" : "Stack",
              class: 'custom-icon-line',
              index: -1,
              click: () => setIsStacked(isStacked ? false : true)
            },
          ]
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '40%', // Adjust this percentage to make the bars thinner or thicker
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      // x: {
      //   formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
      //     // console.log(value)
      //     console.log(data?.data?.categories)
      //     return data?.data?.categories[value]
      //     // return data?.data?.categories[value - 1]
      //   }
      // }
      x: {
        // Correctly map the x-axis category based on the value
        formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
          // Access the category label for the corresponding data point
          return data?.data?.categories[dataPointIndex] || value;
        }
      },
      y: {
        // If needed, format the y-axis value
        formatter: function (value) {
          return value.toFixed(2); // Format to 2 decimal places
        }
      },
    },
    legend: {
      show: true,
      position: 'top'
    },
    xaxis: {
      categories: data.data.categories,
      labels: {
        rotate: -45,
        style: {
          fontSize: '10px',
        },
        formatter: function (value) {
          const maxLabelLength = 10;
          if (value?.length > maxLabelLength) {
            return value.substring(0, maxLabelLength - 3) + "...";
          }
          return value;
        }
      },
      axisBorder: {
        show: true,
        color: '#000000',
        height: 1,
        width: '100%',
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: [
      {
        title: {
          text: data.y1AxisTitle,
        },
        opposite: false,
        axisBorder: {
          show: true,
          color: '#000000',
          offsetX: 0,
          offsetY: 0,
        },
        labels: {
          formatter: (value) => value.toFixed(2),

        },
      },
      {
        title: {
          text: data.yAxisTitle,
        },
        opposite: true,
        max: 0,
        reversed: true,
        labels: {
          formatter: (value) => value.toFixed(2),

        },
      },

    ],
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5,
      // strokeColors:["#ff6384","#36a2eb"],
      // strokeWidth: 1,
      shape: ["circle"],
      hover: {
        size: 6,
      },
    },
    stroke: {
      curve: 'straight',
      width: 4
    },
    colors: ["#eb974e", "#2c99f4"],
    grid: {
      show: false,
      borderColor: '#e7e7e7',
    },
  });

  return (
    <div>
      {restructuredData.map((data, index) => (
        <div
          key={index}
          style={{
            marginBottom: index !== restructuredData.length - 1 ? "50px" : "0",
            position: "relative",
          }}
        >
          <h6 style={{ textAlign: "center" }}>{data?.Retailer}</h6>
          <ApexCharts
            options={getChartOptions(data)}
            series={data.data.series}
            // type={chartType}
            height={500}
            width="100%"
          />
        </div>
      ))}
    </div>
  );
};

export default PromotedDepthChart;

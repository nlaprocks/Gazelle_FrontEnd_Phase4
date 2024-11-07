import React from "react";
import ApexCharts from "react-apexcharts";
import { useSelector } from "react-redux";
import Pagination from "./pagination/Pagination";

const LiftChart = ({ isLoading }) => {
  const chart8Reducer = useSelector((state) => state.chart8Reducer);
  // console.log(chart8Reducer,"liftchar1");

  const chartData = chart8Reducer?.chart8Data?.data;
  // console.log(chartData,"chartdata");

  const [isStacked, setIsStacked] = React.useState(false);
  const [chartType, setChartType] = React.useState('line');

  // Transform the data
  const transformedData = chartData?.map((item) => {
    const transformedItem = {
      Retailer: item.Retailer,
      Product: item.Product,
      xAxisTitle: "% Discount",
      yAxisTitle: "% Volume Lift",
      data: {
        categories: [], // Initialize categories array
        series: [],
      },
    };

    // Create a mapping to group series by label name
    const seriesMapping = {};

    // Iterate through the original data properties to dynamically populate categories and series
    for (const key in item) {
      if (key.includes("%_")) {
        const originalLabel = key.split("_")[1];
        const label = getRenamedLabel(originalLabel); // Get the renamed label
        const percentage = parseFloat(key.match(/\d+/)[0]); // Extract the numeric value before %

        transformedItem.data.categories.push(`${percentage}%`); // Push the extracted percentage value
        if (!seriesMapping[label]) {
          seriesMapping[label] = {
            name: label,
            data: [],
          };
        }
        seriesMapping[label].data.push(item[key]);
      }
    }

    // Populate series with grouped data
    for (const label in seriesMapping) {
      transformedItem.data.series.push({
        name: seriesMapping[label].name,
        data: seriesMapping[label].data,
        ...seriesMapping[label].marker,
      });
    }

    return transformedItem;
  });


  // Function to rename label names
  function getRenamedLabel(originalLabel) {
    switch (originalLabel) {
      case "FO":
        return "Feature Only";
      case "DO":
        return "Display Only";
      case "FD":
        return "Feature and Display";
      case "TPR":
      default:
        return originalLabel;
    }
  }

  const getChartOptions = (data) => ({
    chart: {
      // type: 'line',
      // height: 400,
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
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: [
            {
              icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,29V7H32V29Z"></path><path d="M 7 10 L 13 10 L 13 26 L 11.4 26 L 11.4 11.6 L 8.6 11.6 L 8.6 26 L 7 26 Z" class="clr-i-outline clr-i-outline-path-2"></path><path d="M 15 19 L 21 19 L 21 26 L 19.4 26 L 19.4 20.6 L 16.6 20.6 L 16.6 26 L 15 26 Z" class="clr-i-outline clr-i-outline-path-3"></path><path d="M 23 16 L 29 16 L 29 26 L 27.4 26 L 27.4 17.6 L 24.6 17.6 L 24.6 26 L 23 26 Z" class="clr-i-outline clr-i-outline-path-4"></path><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
              title: 'Switch to Bar Chart',
              class: 'custom-icon-bar',
              index: -1,
              click: () => setChartType('bar')
            },
            {
              icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M 32 5 L 4 5 C 2.895 5 2 5.895 2 7 L 2 29 C 2 30.105 2.895 31 4 31 L 32 31 C 33.105 31 34 30.105 34 29 L 34 7 C 34 5.895 33.105 5 32 5 Z M 4 29 L 4 7 L 32 7 L 32 29 Z"></path><polygon points="15.62 15.222 9.602 23.968 5.55 20.384 6.61 19.186 9.308 21.572 15.634 12.38 22.384 22.395 29.138 13.47 30.414 14.436 22.308 25.145" class="clr-i-outline clr-i-outline-path-2"></polygon><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
              title: 'Switch to Line Chart',
              class: 'custom-icon-line',
              index: -1,
              click: () => setChartType('line')
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
    title: {
      text: `${data.Retailer} - ${data.Product}`,
      align: 'center',
      margin: 10,
      style: {
        fontSize: '14px',
      },
    },
    xaxis: {
      categories: data.data.categories,
      title: {
        text: data.xAxisTitle,
      },
    },
    yaxis: {
      title: {
        text: data.yAxisTitle,
      },
      labels: {
        formatter: (value) => value.toFixed(0),

      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => value.toFixed(2),
      },
    },
    markers: {
      size: 5,
      // strokeColors:["#ff6384","#36a2eb"],
      // strokeWidth: 1,
      shape: ["triangle", "rect", "circle"],
      hover: {
        size: 6,
      },
    },
    stroke: {
      curve: 'straight',
      width: 4,
      // colors:["#ea580c","#14532d","#ef4444","#0ea5e9"]
      colors: ["#2c99f4", "#fa518a", "#f9be56", "#b386e1"],
    },
    colors: ["#2c99f4", "#fa518a", "#f9be56", "#b386e1"],
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
      borderColor: '#e7e7e7',
      

    },
  });

  const itemsPerPage = 5; // Define the number of items per page
  const [currentPage, setCurrentPage] = React.useState(1); // Initialize current page state

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the data to display for the current page
  const visibleChartData = transformedData?.slice(startIndex, endIndex) || [];

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {visibleChartData?.map((data, index) => (
        <div
          key={index}
          style={{
            marginBottom: index !== transformedData.length - 1 ? "50px" : "0",
          }}
        >
          <ApexCharts
            options={getChartOptions(data)}
            series={data.data.series}
            type={chartType}
            height={400}
            width="100%"
          />
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalItems={transformedData?.length || 0}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default LiftChart;

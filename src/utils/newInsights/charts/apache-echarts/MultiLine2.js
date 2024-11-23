import React from "react";
import ApexCharts from "react-apexcharts";
import { useSelector } from "react-redux";
import Pagination from "./pagination/Pagination";
import dayjs from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

const MultiLine2 = ({ isLoading }) => {

  const chart5Reducer = useSelector((state) => state.chart5Reducer);
  const chart5Data = chart5Reducer?.chart5Data?.data || [];
  const [isStacked, setIsStacked] = React.useState(false);
  const [chartType, setChartType] = React.useState('line');

  const transformedData = {};

  dayjs.extend(isoWeek);
  // old code data show by according to weeks
  // const groupByWeek = (data) => {
  //   // console.log(data,"data")
  //   const weeklyData = {};

  //   data.forEach((item) => {
  //     const weekYear = dayjs(item?.WeekEnding).format('YYYY-[W]W');  // Format to Week-Year
  //     console.log(weekYear)
  //     const product = item.Product;
  //     const retailer = item.Retailer;
  //     const key = `${product}-${retailer}`;

  //     if (!weeklyData[key]) { weeklyData[key] = {}; }

  //     if (!weeklyData[key][weekYear]) {
  //       weeklyData[key][weekYear] = { totalPrice: 0, totalUnits: 0, count: 0, Retailer: item.Retailer };
  //     }

  //     // Accumulate data for averaging
  //     weeklyData[key][weekYear].totalPrice += item.Price;
  //     weeklyData[key][weekYear].totalUnits += item.Total_Volume;
  //     weeklyData[key][weekYear].count += 1;
  //   });

  //   return weeklyData;
  // };

  // New code data show by according to date
  const groupByWeek = (data) => {
    // console.log(data,"datas")
    const weeklyData = {};

    data.forEach((item) => {

      const weekEnding = item?.WeekEnding;
      const product = item.Product;
      const retailer = item.Retailer;
      const key = `${product}-${retailer}`;

      if (!weeklyData[key]) {
        weeklyData[key] = {};
      }

      if (!weeklyData[key][weekEnding]) {
        weeklyData[key][weekEnding] = { totalPrice: 0, totalUnits: 0, count: 0, Retailer: item.Retailer };
      }

      weeklyData[key][weekEnding].totalPrice += item.Price;
      weeklyData[key][weekEnding].totalUnits += item.Total_Volume;
      weeklyData[key][weekEnding].count += 1;
    });

    return weeklyData;
  };


  // Group data by week and calculate the averages
  const groupedData = groupByWeek(chart5Data);

  Object.keys(groupedData).forEach((key) => {
    transformedData[key] = {
      Retailer: key.split('-')[2],
      Product: key.split('-')[0] + "-" + key.split('-')[1],
      xAxisTitle: "Week-Year",
      leftyAxisTitle: "Units",
      rightyAxisTitle: "Price ($)",
      data: {
        categories: [],
        series: [
          {
            name: "Units",
            data: [],
          },
          {
            name: "Price",
            data: [],
          },
        ],
      },
    };

    Object.keys(groupedData[key]).forEach((weekYear) => {
      const { totalPrice, totalUnits, count } = groupedData[key][weekYear];
      // Calculate averages
      const avgPrice = totalPrice / count;
      const avgUnits = totalUnits / count;

      // Add to the transformed data
      transformedData[key].data.categories.push(weekYear);
      transformedData[key].data.series[0].data.push(avgUnits);
      transformedData[key].data.series[1].data.push(avgPrice);
    });
  });

  const transformedChartData = Object.values(transformedData);


  //  old code dont touch

  // Helper function to group data by month and calculate averages
  // const groupByMonth = (data) => {
  //   // console.log(data)
  //   const monthlyData = {};

  //   data.forEach((item) => {
  //     // const monthYear = dayjs(item.WeekEnding).format('MMMM-YYYY'); // Format to Month-Year
  //     const monthYear = dayjs(item?.WeekEnding).format('YYYY-[W]W');  // Format to weak

  //     console.log(monthYear)
  //     const product = item.Product;
  //     const retailer = item.Retailer;
  //     const key = `${product}-${retailer}`;

  //     if (!monthlyData[key]) { monthlyData[key] = {}; }

  //     if (!monthlyData[key][monthYear]) {
  //       monthlyData[key][monthYear] = { totalPrice: 0, totalUnits: 0, count: 0, Retailer: item.Retailer };
  //     }

  //     // Accumulate data for averaging
  //     monthlyData[key][monthYear].totalPrice += item.Price;
  //     monthlyData[key][monthYear].totalUnits += item.Total_Volume;
  //     monthlyData[key][monthYear].count += 1;
  //   });

  //   return monthlyData;
  // };

  // // Group data by month-year and calculate the averages
  // const groupedData = groupByMonth(chart5Data);

  // Object.keys(groupedData).forEach((key) => {
  //   transformedData[key] = {
  //     Retailer: key.split('-')[2],
  //     Product: key.split('-')[0] + "-" + key.split('-')[1],
  //     xAxisTitle: "Month-Year",
  //     leftyAxisTitle: "Units",
  //     rightyAxisTitle: "Price ($)",
  //     data: {
  //       categories: [],
  //       series: [
  //         {
  //           name: "Units",
  //           data: [],
  //         },
  //         {
  //           name: "Price",
  //           data: [],
  //         },
  //       ],
  //     },
  //   };

  //   Object.keys(groupedData[key]).forEach((monthYear) => {
  //     const { totalPrice, totalUnits, count } = groupedData[key][monthYear];
  //     // Calculate averages
  //     const avgPrice = totalPrice / count;
  //     const avgUnits = totalUnits / count;

  //     // Add to the transformed data
  //     transformedData[key].data.categories.push(monthYear);
  //     transformedData[key].data.series[0].data.push(avgUnits);
  //     transformedData[key].data.series[1].data.push(avgPrice);
  //   });
  // });

  // const transformedChartData = Object.values(transformedData);

  // old code ending for year wise data 

  function getEvenIndexElements(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (i % 2 === 0) {
        result.push(arr[i]);
      } else {
        result.push('')
      }
    }
    return result;
  }

  // chartNumber 5

  const getChartOptions = (data) => ({
    chart: {
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
              click: () => setChartType('bar'),
            },
            {
              icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M 32 5 L 4 5 C 2.895 5 2 5.895 2 7 L 2 29 C 2 30.105 2.895 31 4 31 L 32 31 C 33.105 31 34 30.105 34 29 L 34 7 C 34 5.895 33.105 5 32 5 Z M 4 29 L 4 7 L 32 7 L 32 29 Z"></path><polygon points="15.62 15.222 9.602 23.968 5.55 20.384 6.61 19.186 9.308 21.572 15.634 12.38 22.384 22.395 29.138 13.47 30.414 14.436 22.308 25.145" class="clr-i-outline clr-i-outline-path-2"></polygon><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
              title: 'Switch to Line Chart',
              class: 'custom-icon-line',
              index: -1,
              click: () => setChartType('line'),
            },
            {
              icon: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 8.04144L12 3.99999L5 8.04145V9.7735L12 13.8149L19 9.7735V8.04144ZM6.5 8.90747L12 5.73204L17.5 8.90747L12 12.0829L6.5 8.90747Z" fill="#1F2328"/><path d="M19 14.1789V15.911L12 19.9524L5 15.911V14.1789L12 18.2204L19 14.1789Z" fill="#1F2328"/><path d="M19 11.1765V12.9086L12 16.95L5 12.9086V11.1765L12 15.218L19 11.1765Z" fill="#1F2328"/></svg>`,
              title: isStacked ? "Tile" : "Stack",
              class: 'custom-icon-line',
              index: -1,
              click: () => setIsStacked(!isStacked),
            },
          ],
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
      categories: data?.data?.categories && getEvenIndexElements(data.data.categories),
      // categories: data.data.categories,
      title: {
        text: data.xAxisTitle,
      },
      axisBorder: {
        show: true,
        color: '#000000',
        height: 1,
      },
      axisTicks: {
        show: true,
        color: '#000000',
        height: 6,
      },
      labels: {
        rotate: -45,
        style: {
          fontSize: '10px',
        },
      },
    },
    yaxis: [
      {
        title: {
          text: data.leftyAxisTitle,
        },
        labels: {
          formatter: (value) => value.toFixed(0),
        },
        axisBorder: {
          show: true,
          color: '#000000',
        },
      },
      {
        opposite: true,
        title: {
          text: data.rightyAxisTitle,
        },
        labels: {
          formatter: (value) => `$${value.toFixed(2)}`,
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => value.toFixed(2),
        // formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
        //   return data.data.categories[dataPointIndex];
        //   // return allXAxisLabels[value - 1]
        // }
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 3,
      hover: {
        size: 4,
      },
    },
    stroke: {
      curve: 'straight',
      width: 4,
      colors: ["#14532d", "#0ea5e9", "#ef4444", "#ea580c"],
    },
    grid: {
      show: false,
    },
    colors: ["#14532d", "#0ea5e9", "#ef4444", "#ea580c"],
    series: data.data.series.map((series) => ({
      name: series.name,
      data: series.data,
    })),
  });

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = React.useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleChartData = transformedChartData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //  console.log(chart5Data,"chartdata5")
  return (
    <div>
      {visibleChartData?.map((val, i) => (
        // console.log(val),
        <div
          key={i}
          style={{
            marginBottom: i !== transformedChartData.length - 1 ? "50px" : "0",
          }}
        >
          {/* <h6 style={{ textAlign: "center" }}>this is line Chart</h6> */}
          <ApexCharts
            options={getChartOptions(val)}
            series={val.data.series}
            type={chartType}
            height={500}
            width="100%"
          />
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalItems={transformedChartData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MultiLine2;

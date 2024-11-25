import React, { useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { useSelector } from "react-redux";
import Pagination from "./pagination/Pagination";
import { width } from "@mui/system";

const MyChart = ({ isLoading }) => {
  const chart3Reducer = useSelector((state) => state.chart3Reducer);
  const chart3Data = chart3Reducer?.chart3Data?.data;
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = React.useState(1);
  const [chartType, setChartType] = React.useState('bar');
  // const [isStacked, setIsStacked] = React.useState(false);


  // Create a dictionary to store grouped product data
  const productDataDict = {};

  // Iterate through chart3Data and group by product name

  // useEffect(() => {
  if (chart3Data) {
    chart3Data.forEach((item) => {
      const productName = item.Product;

      if (!productDataDict[productName]) {
        productDataDict[productName] = {
          Product: productName,
          multiAxes: true,
          leftyAxisTitle: "Base Price Elasticity",
          rightyAxisTitle: "Sale Revenue (L52 weeks)",
          series: [
            {
              name: "Base Price Elasticity",
              type: "line",
              data: [],
              yAxisIndex: 0,
              color: "#fa518a", // Line color
              marker: {
                size: 10,
                colors: "#fa518a",
              },
            },
            {
              name: "Total Sales (last 52 weeks)",
              type: chartType,
              data: [],
              yAxisIndex: 1,
              color: "#2c99f4", // Bar color
            },
          ],
        };
      }

      productDataDict[productName].series[0].data.push({
        x: item.Retailer,
        y: item.Base_Price_Elasticity?.toFixed(2),
      });

      productDataDict[productName].series[1].data.push({
        x: item.Retailer,
        y: `${item.Dollar_sales_last_52_weeks?.toFixed(2)}` + "$",
        // y: item.Dollar_sales_last_52_weeks?.toFixed(2) 

        // y: item.Dollar_sales_last_52_weeks ? Number(item.Dollar_sales_last_52_weeks.toFixed(2)) : null
        //       y: item.Dollar_sales_last_52_weeks
        //       ? Number(item.Dollar_sales_last_52_weeks).toLocaleString('en-IN', {
        //           minimumFractionDigits: 2,  
        // maximumFractionDigits: 4,  
        // minimumIntegerDigits: 3,  
        //         })
        //       : null
      });

    });



  }
  // }, [chart3Data, chartType])

  const transformedData = Object.values(productDataDict);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = transformedData.slice(startIndex, endIndex);
  const showPagination = transformedData.length > itemsPerPage;
  // console.log(chart3Data,"chartdata")

  // chartNumber 3
  const getDataOption = (data) => ({
    chart: {
      height: 500,
      width: "200%",
      zoom: {
        enabled: false,
      },

      // type: "bar",
      // stacked: isStacked,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
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
            // {
            //   icon: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 8.04144L12 3.99999L5 8.04145V9.7735L12 13.8149L19 9.7735V8.04144ZM6.5 8.90747L12 5.73204L17.5 8.90747L12 12.0829L6.5 8.90747Z" fill="#1F2328"/><path d="M19 14.1789V15.911L12 19.9524L5 15.911V14.1789L12 18.2204L19 14.1789Z" fill="#1F2328"/><path d="M19 11.1765V12.9086L12 16.95L5 12.9086V11.1765L12 15.218L19 11.1765Z" fill="#1F2328"/></svg>`,
            //   title: isStacked ? "Tile" : "Stack",
            //   class: 'custom-icon-line',
            //   index: -1,
            //   click: () => setIsStacked(isStacked ? false : true)
            // },
          ]
        },
      },
    },
    tooltip: {
      shared: false,
      intersect: true,
      y: {
        formatter: function (value) {
          // return value.toLocaleString('en-US', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });
          return value
        }
      }
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'top',
      markers: {
        size: 7,
        shape: 'circle',
        strokeWidth: 0,

      },
    },
    xaxis: {
      categories: data?.series[0]?.data?.map((item) => item.x),
      labels: {
        style: {
          fontSize: "10px",
        },
        rotate: -45,
        rotateAlways: true,
        formatter: function (value) {
          console.log(value, value?.length);
          const maxLabelLength = 15;
          if (value?.length > maxLabelLength) {
            return value.substring(0, maxLabelLength - 3) + "...";
          } else {
            return value;
          }
        },
      },
      
    },

    // yaxis: [
    //   {
    //     title: {
    //       text: data?.leftyAxisTitle,
    //     },
    //     opposite: false,
    //     reversed: true,
    //   },
    //   {
    //     title: {
    //       text: data?.rightyAxisTitle 
    //         ? Number(data.rightyAxisTitle).toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
    //         : ''
    //     },
    //     opposite: true,
    //   },
    // ],
    yaxis: [
      {
        title: {
          text: data?.leftyAxisTitle || "Base Price Elasticity",
        },
        opposite: false,
        reversed: true,
        labels: {
          formatter: function (value) {
            return `${Number(value).toLocaleString('en-US')}`;
          },
        },
      },
      {
        title: {
          text: data?.rightyAxisTitle || "Sale Revenue (L52 weeks)",
        },
        opposite: true,
        labels: {
          formatter: function (value) {
            return `$${Number(value).toLocaleString('en-US')}`;
          },
        },
      },
    ],

    // series: () => { return data?.series},
    series: data?.series || [],
    grid: {
      show: false,
      borderColor: '#e7e7e7',
      // row: {
      //   colors: ['#f3f3f3', 'transparent'], // Takes an array of colors to alternate between
      //   opacity: 0.5,
      // },
    },
    markers: {
      size: 5,
      // colors: "#e0e0e0",
      strokeColors: '#000',
      strokeWidth: 1,
      strokeOpacity: 0.7,
      strokeDashArray: 0,
      fillOpacity: 0.8,
      shape: "square",
      showNullDataPoints: true,
      hover: {
        size: 6,
        sizeOffset: 1
      }
    },
    stroke: {
      width: 2
    },
    noData: {
      text: "No Data Available To Show",
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        // color: undefined,
        fontSize: '14px',
        // fontFamily: undefined
      }
    },
  });
  //  console.log(chart3Reducer,"chartreducer")
  return (
    <div>
      {visibleData.map((data, index) => (

        <div
          key={index}
          style={{
            marginBottom: index !== visibleData.length - 1 ? "50px" : "0",
          }}
        >
          <h6 style={{ textAlign: "center" }}>{data?.Product}</h6>
          <ApexCharts
            options={getDataOption(data)}
            series={getDataOption(data).series}
            // type='line'
            height={500}
            width="100%"
          />
        </div>
      ))}
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalItems={transformedData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MyChart;

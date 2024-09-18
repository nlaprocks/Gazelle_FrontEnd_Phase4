//new  updated code 


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactApexCharts from "react-apexcharts";

const Bar = ({ isLoading }) => {
  const chart1Reducer = useSelector((state) => state.chart1Reducer);
  const [chartDataArray, setChartDataArray] = useState({
    brandDataArray: [],
    retailerDataArray: [],
  });
  const [chartType, setChartType] = useState("bar");
  const [isStacked, setIsStacked] = useState(false);
  const [selectedChart, setSelectedChart] = useState("brand");

  useEffect(() => {
    if (!chart1Reducer?.chart1Data?.data) {
      return;
    }
  
    const groupedData = {};
    const groupedData2 = {};
  
    chart1Reducer.chart1Data.data.forEach((item) => {
      const brand = item.Brand;
      const retailer = item.Retailer;
  
      if (!groupedData[brand]) {
        groupedData[brand] = {};
      }
  
      if (!groupedData[brand][retailer]) {
        groupedData[brand][retailer] = {
          label: retailer,
          data: [],
        };
      }
  
      groupedData[brand][retailer].data.push({
        y: parseFloat(item.Price_avg_last_4_weeks?.toFixed(2)),
        x: item.Product,
      });
  
      // Handle retailer data for the second chart
      if (!groupedData2[retailer]) {
        groupedData2[retailer] = {
          label: retailer,
          data: [],  // Directly store the data points here
        };
      }
  
      groupedData2[retailer].data.push({
        y: parseFloat(item.Price_avg_last_4_weeks?.toFixed(2)),
        x: item.Product,
      });
    });
  
    const brandDataArray = Object.entries(groupedData).map(([brand, retailers]) => ({
      brand,
      retailers: Object.values(retailers),
    }));
  
    const retailerDataArray = Object.entries(groupedData2).map(([retailer, data]) => ({
      retailer,
      retailers: [data],  // Ensure retailers field is an array for consistency
    }));
  
    setChartDataArray({ brandDataArray, retailerDataArray });
  }, [chart1Reducer]);

  
  const renderChart = (data) => {
    if (!data || data.length === 0) {
      return <p>No data available</p>;
    }

    return data.map((chartData, index) => {
      if (!chartData.retailers) {
        return null; 
      }

      const allXAxisLabels = Array.from(
        new Set(chartData.retailers?.reduce((labels, retailer) => labels.concat(retailer.data.map((item) => item.x)), []))
      );

      const seriesData = chartData.retailers.map((retailer) => {
        const data = allXAxisLabels.map((label) => {
          const dataPoint = retailer.data.find((item) => item.x === label);
          return dataPoint ? dataPoint.y : 0;
        });

        return {
          name: retailer.label,
          type: chartType,
          data: data,
        };
      });

      const options = {
        chart: {
          height: 500,
          stacked: isStacked,
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
            customIcons: [
              {
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M21 3H3v18h18V3zm-2 16H5V5h14v14z"/><path d="M8 8h8v2H8zM8 12h8v2H8zM8 16h8v2H8z"/></svg>', // Bar icon SVG
                title: "Switch to Bar Chart",
                class: "custom-icon-bar",
                click: () => setChartType("bar"),
              },
              {
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M21 3H3v18h18V3zm-2 16H5V5h14v14z"/><path d="M12 8v8l6-4z"/></svg>', // Line icon SVG
                title: "Switch to Line Chart",
                class: "custom-icon-line",
                click: () => setChartType("line"),
              },
              {
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12h2c0-4.42 3.58-8 8-8V2zm-1 9.06V4.06c-3.32.35-6 3.17-6 6.94s2.68 6.59 6 6.94v-5.18l3.11 3.11c.47-.84.79-1.78.79-2.88 0-2.75-2.25-5-5-5zm7.93-.58L20 10h-5v5l1.52-1.52c1.27-1.27 2.11-3.04 2.41-5.02zm-.38-5.66l-1.41 1.41C18.68 6.93 18.68 9 17 9v2c2.21 0 4-1.79 4-4v-2h-2v.32z"/></svg>', // Stack icon SVG
                title: isStacked ? "Tile" : "Stack",
                class: "custom-icon-stack",
                click: () => setIsStacked(!isStacked),
              },
            ],
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 0.0,
        },
        xaxis: {
          categories: allXAxisLabels,
          labels: {
            rotate: -45,
            maxHeight: '120px',
            style: {
              fontSize: '10px',
            },
            formatter: function (value) {
              const maxLabelLength = 10;
              if (value?.length > maxLabelLength) {
                return value.substring(0, maxLabelLength - 3) + '...';
              }
              return value;
            },
          },
          title: {
            text: 'Product',
            style: {
              fontWeight: 'bold',
            },
          },
          axisBorder: {
            show: true,
            color: '#000000',
            height: 1,
            width: '100%',
          },
        },
        yaxis: {
          title: {
            text: 'Price Mean',
          },
        },
        fill: {
          opacity: 1,
        },
        colors: ['#2a97f2', '#40d68e', '#ea580c', '#ef4444'],
      };
      

      return<ReactApexCharts key={index} options={options} series={seriesData} type={chartType} height={500} />;
    });
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            value="brand"
            checked={selectedChart === "brand"}
            onChange={() => setSelectedChart("brand")}
          />
          Brand Charts
        </label>
        <label>
          <input
            type="radio"
            value="retailer"
            checked={selectedChart === "retailer"}
            onChange={() => setSelectedChart("retailer")}
          />
          Retailer Charts
        </label>
      </div>

      {selectedChart === "brand"
        ?  renderChart(chartDataArray.brandDataArray)
        :renderChart(chartDataArray.retailerDataArray)}
       
        
    </div>
  );
};

export default Bar;




















// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import ReactApexCharts from 'react-apexcharts';

// const Bar = ({ isLoading }) => {

//   const chart1Reducer = useSelector((state) => state.chart1Reducer);
//   const [chartDataArray, setChartDataArray] = useState([]);
//   const [chartType, setChartType] = useState('bar');
//   const [isStacked, setIsStacked] = useState(false);
//   // retailer chart
//   const [bgColor, setBgColor] = useState([])
//   const [borderColor, setBorderColor] = useState([])
//   const [sData, setSData] = useState([])

//   useEffect(() => {
//     const groupedData = {};

//     chart1Reducer?.chart1Data?.data?.forEach((item) => {
//       const brand = item.Brand;
//       const retailer = item.Retailer;

//       if (!groupedData[brand]) {
//         groupedData[brand] = {};
//       }

//       if (!groupedData[brand][retailer]) {
//         groupedData[brand][retailer] = {
//           label: retailer,
//           data: [],
//         };
//       }

//       groupedData[brand][retailer].data.push({
//         y: parseFloat(item.Price_avg_last_4_weeks?.toFixed(2)),
//         x: item.Product,
//       });
//     });

//     const newDataArray = Object.entries(groupedData).map(([brand, retailers]) => ({
//       brand,
//       retailers: Object.values(retailers),
//     }));

//     setChartDataArray(newDataArray);
//   }, [chart1Reducer]);

  
//   return (
//     <div>
//       {chartDataArray.map((chartData, index) => {
//         const allXAxisLabels = Array.from(
//           new Set(chartData.retailers?.reduce((labels, retailer) => labels.concat(retailer.data.map((item) => item.x)), []))
//         );

//         const seriesData = chartData.retailers.map((retailer) => {
//           const data = allXAxisLabels.map((label) => {
//             const dataPoint = retailer.data.find((item) => item.x === label);
//             return dataPoint ? dataPoint.y : 0;
//           });

//           return {
//             name: retailer.label ,
//             type: chartType,
//             data: data,
//           };
//         });

//         const options = {
//           chart: {
//             height: 450,
//             stacked: isStacked,
//             toolbar: {
//               tools: {
//                 download: true,
//                 selection: true,
//                 zoom: true,
//                 zoomin: true,
//                 zoomout: true,
//                 pan: true,
//                 reset: true | '<img src="/static/icons/reset.png" width="20">',
//                 customIcons: [
//                   {
//                     icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,29V7H32V29Z"></path><path d="M 7 10 L 13 10 L 13 26 L 11.4 26 L 11.4 11.6 L 8.6 11.6 L 8.6 26 L 7 26 Z" class="clr-i-outline clr-i-outline-path-2"></path><path d="M 15 19 L 21 19 L 21 26 L 19.4 26 L 19.4 20.6 L 16.6 20.6 L 16.6 26 L 15 26 Z" class="clr-i-outline clr-i-outline-path-3"></path><path d="M 23 16 L 29 16 L 29 26 L 27.4 26 L 27.4 17.6 L 24.6 17.6 L 24.6 26 L 23 26 Z" class="clr-i-outline clr-i-outline-path-4"></path><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
//                     title: 'Switch to Bar Chart',
//                     class: 'custom-icon-bar',
//                     index: -1,
//                     click: () => setChartType('bar')
//                   },
//                   {
//                     icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M 32 5 L 4 5 C 2.895 5 2 5.895 2 7 L 2 29 C 2 30.105 2.895 31 4 31 L 32 31 C 33.105 31 34 30.105 34 29 L 34 7 C 34 5.895 33.105 5 32 5 Z M 4 29 L 4 7 L 32 7 L 32 29 Z"></path><polygon points="15.62 15.222 9.602 23.968 5.55 20.384 6.61 19.186 9.308 21.572 15.634 12.38 22.384 22.395 29.138 13.47 30.414 14.436 22.308 25.145" class="clr-i-outline clr-i-outline-path-2"></polygon><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
//                     title: 'Switch to Line Chart',
//                     class: 'custom-icon-line',
//                     index: -1,
//                     click: () => setChartType('line')
//                   },
//                   {
//                     icon: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 8.04144L12 3.99999L5 8.04145V9.7735L12 13.8149L19 9.7735V8.04144ZM6.5 8.90747L12 5.73204L17.5 8.90747L12 12.0829L6.5 8.90747Z" fill="#1F2328"/><path d="M19 14.1789V15.911L12 19.9524L5 15.911V14.1789L12 18.2204L19 14.1789Z" fill="#1F2328"/><path d="M19 11.1765V12.9086L12 16.95L5 12.9086V11.1765L12 15.218L19 11.1765Z" fill="#1F2328"/></svg>`,
//                     title: isStacked ? "Tile" : "Stack",
//                     class: 'custom-icon-line',
//                     index: -1,
//                     click: () => setIsStacked(isStacked ? false : true)
//                   },
//                 ]
//               },
//             }
//           },
//           dataLabels: {
//             enabled: false
//           },
//           stroke: {
//             show: true,
//             width: 1,
//             colors: ["#2a97f2", "#40d68e", "#ea580c", "#ef4444"]
//           },
//           xaxis: {
//             categories: allXAxisLabels,

//             labels: {
//               rotate: -45,
//               maxHeight: '120px',
//               style: {
//                 fontSize: '10px'
//               },
//               formatter: function (value) {
//                 const maxLabelLength = 10;
//                 if (value?.length > maxLabelLength) {
//                   return value.substring(0, maxLabelLength - 3) + "...";
//                 }
//                 return value;
//               }
//             },
//             title: {
//               text: 'Product',
//               style: {
//                 fontWeight: 'bold'
//               }
//             },
//             axisBorder: {
//               show: true,
//               color: '#000000',
//               height: 1,
//               width: '100%',
//               offsetX: 0,
//               offsetY: 0
//             },
//           },
//           yaxis: {
//             title: {
//               text: 'Price Mean',
//               offsetX: -5,
//               offsetY: 0,
//               style: {
//                 fontWeight: 'bold',
//               }
//             },
//             labels: {
//               maxWidth: '160px',
//               offsetX: 0,
//               offsetY: 0,
//               style: {
//                 fontSize: '10px'
//               },
//             },
//             axisBorder: {
//               show: true,
//               color: '#000000',
//               offsetX: 0,
//               offsetY: 0
//             },
//           },
//           fill: {
//             opacity: 1,
//             type: 'solid',
//           },
//           tooltip: {
//             trigger: "axis",
//             axisPointer: {
//               type: "shadow",
//             },
//             x: {
//               formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
//                 return allXAxisLabels[value - 1]
//               }
//             }
//           },
//           legend: { position: 'top' },
//           grid: {
//             show: false,
//             borderColor: '#e7e7e7',
//             row: {
//               colors: ['#f3f3f3', 'transparent'],
//               opacity: 0.5,
//             },
//           },
//           noData: {
//             text: "No Data Available To Show",
//             align: 'center',
//             verticalAlign: 'middle',
//             offsetX: 0,
//             offsetY: 0,
//             style: {
//               fontSize: '14px',
//             }
//           },
//           markers: {
//             size: 4,
//             shape: ["circle"],
//             hover: {
//               size: 5,
//             },
//           },
//           colors: ["#2a97f2", "#40d68e", "#ea580c", "#ef4444"]
//         };


//   const RetailerchartData = {
//     options: {
//       chart: {
//         // type: 'bar',
//         height: 450,
//         stacked: isStacked,
//         toolbar: {
//           tools: {
//             download: true,
//             selection: true,
//             zoom: true,
//             zoomin: true,
//             zoomout: true,
//             pan: true,
//             reset: true | '<img src="/static/icons/reset.png" width="20">',
//             customIcons: [
//               {
//                 icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,29V7H32V29Z"></path><path d="M 7 10 L 13 10 L 13 26 L 11.4 26 L 11.4 11.6 L 8.6 11.6 L 8.6 26 L 7 26 Z" class="clr-i-outline clr-i-outline-path-2"></path><path d="M 15 19 L 21 19 L 21 26 L 19.4 26 L 19.4 20.6 L 16.6 20.6 L 16.6 26 L 15 26 Z" class="clr-i-outline clr-i-outline-path-3"></path><path d="M 23 16 L 29 16 L 29 26 L 27.4 26 L 27.4 17.6 L 24.6 17.6 L 24.6 26 L 23 26 Z" class="clr-i-outline clr-i-outline-path-4"></path><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
//                 title: 'Switch to Bar Chart',
//                 class: 'custom-icon-bar',
//                 index: -1,
//                 click: () => setChartType('bar')
//               },
//               {
//                 icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M 32 5 L 4 5 C 2.895 5 2 5.895 2 7 L 2 29 C 2 30.105 2.895 31 4 31 L 32 31 C 33.105 31 34 30.105 34 29 L 34 7 C 34 5.895 33.105 5 32 5 Z M 4 29 L 4 7 L 32 7 L 32 29 Z"></path><polygon points="15.62 15.222 9.602 23.968 5.55 20.384 6.61 19.186 9.308 21.572 15.634 12.38 22.384 22.395 29.138 13.47 30.414 14.436 22.308 25.145" class="clr-i-outline clr-i-outline-path-2"></polygon><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
//                 title: 'Switch to Line Chart',
//                 class: 'custom-icon-line',
//                 index: -1,
//                 click: () => setChartType('line')
//               },
//               {
//                 icon: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 8.04144L12 3.99999L5 8.04145V9.7735L12 13.8149L19 9.7735V8.04144ZM6.5 8.90747L12 5.73204L17.5 8.90747L12 12.0829L6.5 8.90747Z" fill="#1F2328"/><path d="M19 14.1789V15.911L12 19.9524L5 15.911V14.1789L12 18.2204L19 14.1789Z" fill="#1F2328"/><path d="M19 11.1765V12.9086L12 16.95L5 12.9086V11.1765L12 15.218L19 11.1765Z" fill="#1F2328"/></svg>`,
//                 title: isStacked ? "Tile" : "Stack",
//                 class: 'custom-icon-line',
//                 index: -1,
//                 click: () => setIsStacked(isStacked ? false : true)
//               },
//             ]
//           },
//         }
//       },
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         show: true,
//         width: 0.0,
//         // colors: [...new Set(borderColor)].slice(0, 2),
//         // colors:["#ea580c","#ef4444","#2a97f2","#40d68e"]
//       },
//       xaxis: {
//         categories: allXAxisLabels,

//         labels: {
//           rotate: -45,
//           maxHeight: '120px',
//           style: {
//             fontSize: '10px'
//           },
//           formatter: function (value) {
//             const maxLabelLength = 10;
//             if (value?.length > maxLabelLength) {
//               return value.substring(0, maxLabelLength - 3) + "...";
//             }
//             return value;
//           }
//         },
//         title: {
//           text: 'Product',
//           // offsetY: 100,
//           style: {
//             fontWeight: 'bold'
//           }
//         },
//         axisBorder: {
//           show: true,
//           color: '#000000',
//           height: 1,
//           width: '100%',
//           offsetX: 0,
//           offsetY: 0
//         },
//       },
//       yaxis: {
//         title: {
//           text: 'Price Mean',
//           offsetX: -5,
//           offsetY: 0,
//           style: {
//             fontWeight: 'bold',
//             // fontFamily: 'Helvetica, Arial, sans-serif',
//           }
//         },
//         labels: {
//           maxWidth: '160px',
//           offsetX: 0,
//           offsetY: 0,
//           style: {
//             fontSize: '10px'
//           },
//           // formatter: function (value) {
//           //   return value.toFixed(0); // Remove decimal places
//           // }
//         },
//         axisBorder: {
//           show: true,
//           color: '#000000', 
//           offsetX: 0,
//           offsetY: 0
//         },
//       },
//       fill: {
//         opacity: 1,
//         type: 'solid',
//         // colors: ['#1A73E8', '#B32824']
//       },
//       tooltip: {
//         trigger: "axis",
//         axisPointer: {
//           type: "shadow",
//         },
//         x: {
//           formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
//             return allXAxisLabels[value-1]  
//           }
//         }
//       },
//       legend: {
//         position: 'top'
//       },
//       grid: {
//         show: false,
//         borderColor: '#e7e7e7',
//         row: {
//           colors: ['#f3f3f3', 'transparent'], // Takes an array of colors to alternate between
//           opacity: 0.5,
//         },
//       },
//       noData: {
//         text: "No Data Available To Show",
//         align: 'center',
//         verticalAlign: 'middle',
//         offsetX: 0,
//         offsetY: 0,
//         style: {
//           // color: undefined,
//           fontSize: '14px',
//           // fontFamily: undefined
//         }
//       },
//       markers: {
//         size: 4,
//         // strokeColors:["#ff6384","#36a2eb"],
//         // strokeWidth: 1,
//         shape: ["circle"],
//         hover: {
//           size: 5,
//         },
//       },
//       // colors: [...new Set(bgColor)].slice(0, 2)
//       colors:["#2a97f2","#40d68e","#ea580c","#ef4444"]

//     },
//     series: sData
//   };

//         return (
//           <div key={index} style={{ marginBottom: '50px' }}>
//             <h6 style={{textAlign:"center"}}>{chartData.brand}</h6>
//             <ReactApexCharts
//               options={options}
//               series={seriesData}
//               height={450}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Bar;





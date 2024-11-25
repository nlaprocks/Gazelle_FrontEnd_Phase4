import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { useSelector } from "react-redux";
import Pagination from "./pagination/Pagination";

const StackedLineChart = ({ isLoading }) => {
  
  const chart4Reducer = useSelector((state) => state.chart4Reducer);
  const chart4Data = chart4Reducer?.chart4Data?.data;
  const [chart4TransformedData, setChart4TransformedData] = useState([]);
  const [chartType, setChartType] = React.useState('line');
  const [isStacked, setIsStacked] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (chart4Data) {
      const transformedData = [];
      chart4Data.forEach((item) => {
        const retailer = item.Retailer;
        const product = item.Product;
        const existingItem = transformedData.find(
          (dataItem) => dataItem.Retailer === retailer && dataItem.Product === product
        );
        if (existingItem) {
          for (let i = -10; i <= 10; i += 2) {
            const keyVolume = `${i}%_BPE_Volume_Impact`;
            existingItem.data.datasets[0].data.push(item[keyVolume]);
          }
          for (let i = -10; i <= 10; i += 2) {
            const keyDollar = `${i}%_BPE_Dollar_Impact`;
            existingItem.data.datasets[1].data.push(item[keyDollar]);
          }
        } else {
          const newItem = {
            multiAxes: false,
            xycoordinated: false,
            quadrant: true,
            Retailer: retailer,
            Product: product,
            xAxisTitle: "Price Change %",
            yAxisTitle: "Volume/Dollar Impact",
            data: {
              labels: ["-10%", "-8%", "-6%", "-4%", "-2%", "0%", "2%", "4%", "6%", "8%", "10%"],
              datasets: [
                {
                  label: "% Volume",
                  data: [],
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                  pointStyle: "circle",
                  pointRadius: 8,
                  pointHoverRadius: 15,
                },
                {
                  label: "% Dollar",
                  data: [],
                  borderColor: "rgb(54, 162, 235)",
                  backgroundColor: "rgba(54, 162, 235, 0.5)",
                  pointStyle: "triangle",
                  pointRadius: 8,
                  pointHoverRadius: 15,
                },
              ],
            },
          };
          for (let i = -10; i <= 10; i += 2) {
            const keyVolume = `${i}%_BPE_Volume_Impact`;
            const keyDollar = `${i}%_BPE_Dollar_Impact`;
            newItem.data.datasets[0].data.push(item[keyVolume]);
            newItem.data.datasets[1].data.push(item[keyDollar]);
          }
          transformedData.push(newItem);
        }
      });
      setChart4TransformedData(transformedData);
    }
  }, [chart4Data]);

  const getApexOptions = (data) => ({
    chart: {
      type: chartType,
      height: 450,
      stacked: isStacked,
      zoom: {
        enabled: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        type: 'xy',
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          // zoom: true,
          // zoomin: true,
          // zoomout: true,
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
      margin: 20,
      offsetX: 0,
      offsetY: 10,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    xaxis: {
      type: 'category',
      categories: data.data.labels,
      title: {
        text: data.xAxisTitle,
        style: {
          fontWeight: 'bold',
        },
      },
      tickAmount: 11,
      axisBorder: {
        show: true,
        color: '#000000',
        height: 1,
      },
    },
    yaxis: {
      title: {
        text: `${data.yAxisTitle} ( % )`,
        style: {
          fontWeight: 'bold',
        },
      },
      axisBorder: {
        show: true,
        color: '#000000',
      },
      labels: {   // Old Code
        // formatter: (value) => `${value}%`,
        
        formatter: (value) => `${value.toFixed(2)*100}%`,

            // New Code
        // formatter: (value) => {
        //   // Check if value is close to zero
        //   if (Math.abs(value) < 0.001) {
        //     return `0.00%`;
        //   }
          
        //   return `${value.toFixed(2)}%`;
        // }
      },
    },
    annotations: {
      yaxis: [{
        y: 0,
        borderColor: '#000000',
        strokeDashArray: 0,

      }]
    },
    series: data.data.datasets.map((dataset) => ({
      name: dataset.label,
      data: dataset.data,
     
    })),
    legend: {
      show: true,
      position: 'top',
      markers: {
        size: 7,
        shape: ["circle", "triangle"],
        strokeWidth: 0,
      },
    },
    grid: {
      show: false,
      borderColor: '#e7e7e7',
      

    },
    markers: {
      size: 6,
      strokeColors: ["#ff6384", "#36a2eb"],
      strokeWidth: 1,
      shape: ["circle", "triangle"],
      hover: {
        size: 7,
      },
    },
    stroke: {
      curve: 'straight',
      width: 4
    },
    tooltip: {
      shared: true,
      intersect: false,
             // Old Code
      // y: {
      //   formatter: (value) => `${value.toFixed(2)}%`,
      // },

        //New Code      
      y: {
        formatter: (value) => {
          if (value < 1) {
            // console.log(value,"values")
            return `${(value * 100).toFixed(2)}%`; 
          }                                       
          return `${value.toFixed(2)}%`;
        },
      }
      
      
    },
    colors: ["#2c99f4", "#40d68e"]
  });

  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleChartData = chart4TransformedData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
// console.log(chart4Reducer,"chartreducers")
  return (
    <>
      {visibleChartData.map((chartData, index) => (
        // console.log(chartData),
        <div key={index} style={{ marginBottom: index !== chart4TransformedData.length - 1 ? "50px" : "0" }}>
          <ApexCharts
            options={getApexOptions(chartData)}
            series={getApexOptions(chartData).series}
            type={chartType}
            height={450}
          />
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalItems={chart4TransformedData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default StackedLineChart;

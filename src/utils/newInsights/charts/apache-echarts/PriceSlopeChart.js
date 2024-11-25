import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { useSelector } from "react-redux";
import Pagination from "./pagination/Pagination";

const PriceSlopeChart = ({ isLoading }) => {

  const chart2Reducer = useSelector((state) => state.chart2Reducer);
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = React.useState('scatter');
  const [isStacked, setIsStacked] = React.useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of charts to display per page


  useEffect(() => {
    if (chart2Reducer.success && chart2Reducer.chart2Data) {
      const transformedData = transformData(chart2Reducer.chart2Data.data);
      setChartData(transformedData);
    }
  }, [chart2Reducer, chartType]);

  const transformData = (data) => {
    const chartDataMap = {};

    data.forEach((item) => {
      const retailerBrandKey = `${item.Retailer} - ${item.Brand}`;
      const product = item.Product;
      const commonLabel = product.match(/^(.*?)\d+\s*OZ/)[1];

      if (!chartDataMap[retailerBrandKey]) {
        chartDataMap[retailerBrandKey] = {
          RetailerBrand: retailerBrandKey,
          xAxisTitle: "Ounces(OZ)",
          yAxisTitle: "Price/OZ",
          data: {
            datasets: [],
          },
        };
      }

      const seriesIndex = chartDataMap[retailerBrandKey].data.datasets.findIndex(
        (series) => series.label === commonLabel
      );

      if (seriesIndex === -1) {
        chartDataMap[retailerBrandKey].data.datasets.push({
          label: commonLabel,
          data: [
            {
              x: parseFloat(item.Ounces),
              y: parseFloat(item.Price_per_ounce),
            },
          ],
          borderColor: "rgb(60,146,109)",
          backgroundColor: "rgba(60,146,109, 0.5)",
          pointRadius: 10,
          pointHoverRadius: 15,
        });
      } else {
        chartDataMap[retailerBrandKey].data.datasets[seriesIndex].data.push({
          x: parseFloat(item.Ounces),
          y: parseFloat(item.Price_per_ounce),
        });
      }
    });

    return Object.values(chartDataMap);
  };

  const getDataOption = (chartData) => {
    return {
      chart: {
        type: chartType,
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
                title: `Switch to ${chartType == "line" ? "scatter" : 'line'} Chart`,
                class: 'custom-icon-line',
                index: -1,
                click: () => setChartType(chartType == "line" ? "scatter" : 'line')
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
        zoom: {
          enabled: false, // Disable zoom on scroll
        },
      },
      title: {
        text: chartData.RetailerBrand,
        align: 'center',
        margin: 20,
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
        },
      },
      xaxis: {
        type: 'numeric',
        title: {
          text: chartData.xAxisTitle,
          style: {
            fontWeight: "bold",
          },
          offsetX: 0,
          offsetY: 0,
        },
        labels: {
          formatter: (value) => `${value.toFixed(2)}Oz`,
          showDuplicates: false,
        },
        axisBorder: {
          show: true,
          color: '#000000',
          height: 1,
          width: '100%',
          offsetX: 0,
          offsetY: 0,
        },
        min: 0,
      },
      yaxis: {
        title: {
          text: chartData.yAxisTitle,
          style: {
            fontWeight: "bold",
          },
        },
        labels: {
          formatter: (value) => `${value}`,
        },
        axisBorder: {
          show: true,
          color: '#000000',
          offsetX: 0,
          offsetY: 0,
        },
      },
      series: chartData?.data?.datasets?.map((dataset) => ({
        name: dataset?.label,
        data: dataset?.data?.map((point) => [point.x, point.y]),
      })),
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const dataItem = chartData.data.datasets[seriesIndex].data[dataPointIndex];
          const originalX = dataItem.x.toFixed(2);
          const originalY = dataItem.y.toFixed(2);
          return `
            <div style="border: 1px solid grey; padding: 10px; background-color: white;">
              ${w.globals.seriesNames[seriesIndex]}<br />
              Ounces: ${originalX}<br />
              Price/OZ: ${originalY}
            </div>
          `;
        },
      },
      grid: {
        show: false,
        borderColor: '#e7e7e7',
      },
      legend: {
        show: false,
      },
      markers: {
        size: 8,
      },
      dataLabels: {
        enabled: false,
      },
      noData: {
        text: "No Data Available To Show",
        align: 'center',
        verticalAlign: 'middle',
        style: {
          fontSize: '14px',
        },
      },
    };
  };

  const paginate = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };
  
  const paginatedData = paginate(chartData, currentPage, itemsPerPage);
  const showPagination = chartData.length > itemsPerPage;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div >
      <h6 style={{ textAlign: "center" }}>Price Slope chart</h6>
      {paginatedData.map((val, i) => (
        <div
          // class="chart-container"
          id="chart"
          key={i}
          style={{
            position: "relative",
            marginBottom: i !== paginatedData.length - 1 ? "50px" : "0"
          }}
        >
          <ApexCharts
            options={getDataOption(val)}
            series={getDataOption(val).series}
            type={chartType}
            height={450}
          />
        </div>
      ))
      }
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalItems={chartData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div >
  );
};

export default PriceSlopeChart;
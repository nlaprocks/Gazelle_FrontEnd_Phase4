import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactApexCharts from 'react-apexcharts';
import Pagination from "./pagination/Pagination";

const Bar = ({ isLoading, chartModel, setChartModel }) => {

  const chart1Reducer = useSelector((state) => state.chart1Reducer);
  const [chartDataArray, setChartDataArray] = useState([]);
  const [chartType, setChartType] = useState('bar');
  const [isStacked, setIsStacked] = useState(false);
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = React.useState(1);

  useEffect(() => {
    const groupedData = {};

    chart1Reducer?.chart1Data?.data?.forEach((item) => {
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
        y: item.Price_avg_last_4_weeks,
        x: item.Product,
      });
    });

    const newDataArray = Object.entries(groupedData).map(([brand, retailers]) => ({
      brand,
      retailers: Object.values(retailers),
    }));

    setChartDataArray(newDataArray);
  }, [chart1Reducer]);

  // chartNumber 1

  // Pagination states
  const paginate = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const paginatedData = paginate(chartDataArray, currentPage, itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showPagination = chartDataArray.length > itemsPerPage;

  return (
    <div>
      {paginatedData.map((chartData, index) => {
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
            stacked: false,
            toolbar: {
              tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true | '<img src="/static/icons/reset.png" width="20">',
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
            zoom: {
              enabled: false,
              type: 'x',
              resetIcon: {
                offsetX: -10,
                offsetY: 0,
                fillColor: '#fff',
                strokeColor: '#37474F'
              },

            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 1,
            colors: [
              "#0e7490",
              "#65a30d",
              "#0891b2",
              "#f97316",
              "#ef4444",
              "#0284c7",
              "#3b82f6",
              "#8b5cf6",
              "#d946ef",
              "#f43f5e",
              "#d5ffb6",
              "#e5b8ff",
              "#ff8ac0",
              "#fff6a9",
              "#a3e0ff",
              "#6d618c",
              "#255972",
              "#2c7787",
              "#3184bc",
              "#dcf0ff",
              "#ec8580",
              "#ffab70",
              "#efce80",
              "#acd98d",
              "#7cbb92",
              "#334155",
              "#FF0000",
              "#008000",
              "#0000FF",
              "#FFFF00",
              "#00FFFF",
              "#FF00FF",
              "#000000",
              "#FFFFFF",
              "#808080",
              "#FFA500",
              "#800080",
              "#FFC0CB",
              "#A52A2A",
              "#F5F5DC",
              "#E6E6FA",
              "#008080",
              "#800000",
              "#808000",
              "#000080",
              "#FFD700",
              "#C0C0C0",
              "#FF7F50",
              "#40E0D0",
              "#4B0082",
              "#EE82EE",
              "#DC143C",
              "#50C878",
              "#0F52BA",
              "#FFBF00",
              "#FFDAB9",
              "#98FF98",
              "#FA8072",
              "#DDA0DD",
              "#F0E68C",
              "#36454F",
              "#7FFFD4",
              "#D2B48C",
              "#FFFFF0",
              "#FFF0F5",
              "#DA70D6",
              "#4682B4",
              "#FFE4E1",
              "#F0FFF0",
              "#FFFACD",
              "#F5DEB3",
              "#708090",
              "#483D8B",
              "#2E8B57",
              "#C71585",
              "#F08080",
              "#B22222",
              "#228B22",
              "#00BFFF",
              "#00FF7F",
              "#D2691E",
              "#B8860B",
              "#98FB98",
              "#FFEFD5",
              "#FF00FF",
              "#20B2AA",
              "#FF6347",
              "#1E90FF",
              "#BA55D3",
              "#FAF0E6",
              "#FAEBD7",
              "#3CB371",
              "#9932CC",
              "#7B68EE",
              "#BC8F8F",
              "#FFB6C1",
              "#FFFFE0",
              "#CD853F",
              "#6A5ACD",
              "#B0C4DE",
              "#48D1CC",
              "#E9967A",
              "#DCDCDC",
              "#6B8E23",
              "#FAFAD2",
              "#6495ED",
              "#5F9EA0",
              "#BDB76B",
              "#ADD8E6",
              "#FDF5E6",
              "#FFF8DC",
              "#D8BFD8",
              "#FF007F",
              "#00FF00",
              "#8A2BE2",
              "#E0B0FF",
              "#F4A460",
              "#FFA07A",
              "#AFEEEE",
              "#00FA9A",
              "#778899",
              "#556B2F",
              "#CD5C5C",
              "#0000CD",
              "#006B3F",
              "#1C39BB",
              "#007BA7",
              "#2F4F4F",
            ],
          },
          xaxis: {
            categories: allXAxisLabels,
            labels: {
              rotate: -45,
              maxHeight: '120px',
              style: {
                fontSize: '10px'
              },
              formatter: function (value) {
                const maxLabelLength = 15;
                if (value?.length > maxLabelLength) {
                  return value.substring(0, maxLabelLength - 3) + "...";
                }
              }
            },
            title: {
              text: 'Product',
              style: {
                fontWeight: 'bold'
              }
            },
            axisBorder: {
              show: true,
              color: '#000000',
              height: 1,
              width: '100%',
              offsetX: 0,
              offsetY: 0
            },
          },
          yaxis: {
            showForNullSeries: false,
            title: {
              text: 'Price Mean',
              offsetX: -5,
              offsetY: 0,
              style: {
                fontWeight: 'bold',
              }
            },
            labels: {
              formatter: function (value) {
                return `$${value.toFixed(2)}`; // Format Y-axis as currency
              },
              maxWidth: '160px',
              offsetX: 0,
              offsetY: 0,
              style: {
                fontSize: '10px'
              },
            },
            axisBorder: {
              show: true,
              color: '#000000',
              offsetX: 0,
              offsetY: 0
            },
          },
          fill: {
            opacity: 1,
            type: 'solid',
          },
          tooltip: {
            trigger: "axis",
            intersect: true,
            shared: false,
            axisPointer: {
              type: "shadow",
            },
            x: {
              formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                return allXAxisLabels[dataPointIndex];
                // return allXAxisLabels[value - 1]
              }
            },
            marker: {
              show: true,
            },

            fixed: {
              enabled: false,
              position: 'topRight',
              offsetX: 0,
              offsetY: 0,
            },
          },
          legend: { position: 'top' },
          grid: {
            show: false,
            borderColor: '#e7e7e7',

          },
          noData: {
            text: "No Data Available To Show",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              fontSize: '14px',
            }
          },
          markers: {
            size: 4,
            shape: ["circle"],
            hover: {
              size: 5,
            },
          },
          colors: [
            "#0e7490",
            "#65a30d",
            "#0891b2",
            "#f97316",
            "#ef4444",
            "#0284c7",
            "#3b82f6",
            "#8b5cf6",
            "#d946ef",
            "#f43f5e",
            "#d5ffb6",
            "#e5b8ff",
            "#ff8ac0",
            "#fff6a9",
            "#a3e0ff",
            "#6d618c",
            "#255972",
            "#2c7787",
            "#3184bc",
            "#dcf0ff",
            "#ec8580",
            "#ffab70",
            "#efce80",
            "#acd98d",
            "#7cbb92",
            "#334155",
            "#FF0000",
            "#008000",
            "#0000FF",
            "#FFFF00",
            "#00FFFF",
            "#FF00FF",
            "#000000",
            "#FFFFFF",
            "#808080",
            "#FFA500",
            "#800080",
            "#FFC0CB",
            "#A52A2A",
            "#F5F5DC",
            "#E6E6FA",
            "#008080",
            "#800000",
            "#808000",
            "#000080",
            "#FFD700",
            "#C0C0C0",
            "#FF7F50",
            "#40E0D0",
            "#4B0082",
            "#EE82EE",
            "#DC143C",
            "#50C878",
            "#0F52BA",
            "#FFBF00",
            "#FFDAB9",
            "#98FF98",
            "#FA8072",
            "#DDA0DD",
            "#F0E68C",
            "#36454F",
            "#7FFFD4",
            "#D2B48C",
            "#FFFFF0",
            "#FFF0F5",
            "#DA70D6",
            "#4682B4",
            "#FFE4E1",
            "#F0FFF0",
            "#FFFACD",
            "#F5DEB3",
            "#708090",
            "#483D8B",
            "#2E8B57",
            "#C71585",
            "#F08080",
            "#B22222",
            "#228B22",
            "#00BFFF",
            "#00FF7F",
            "#D2691E",
            "#B8860B",
            "#98FB98",
            "#FFEFD5",
            "#FF00FF",
            "#20B2AA",
            "#FF6347",
            "#1E90FF",
            "#BA55D3",
            "#FAF0E6",
            "#FAEBD7",
            "#3CB371",
            "#9932CC",
            "#7B68EE",
            "#BC8F8F",
            "#FFB6C1",
            "#FFFFE0",
            "#CD853F",
            "#6A5ACD",
            "#B0C4DE",
            "#48D1CC",
            "#E9967A",
            "#DCDCDC",
            "#6B8E23",
            "#FAFAD2",
            "#6495ED",
            "#5F9EA0",
            "#BDB76B",
            "#ADD8E6",
            "#FDF5E6",
            "#FFF8DC",
            "#D8BFD8",
            "#FF007F",
            "#00FF00",
            "#8A2BE2",
            "#E0B0FF",
            "#F4A460",
            "#FFA07A",
            "#AFEEEE",
            "#00FA9A",
            "#778899",
            "#556B2F",
            "#CD5C5C",
            "#0000CD",
            "#006B3F",
            "#1C39BB",
            "#007BA7",
            "#2F4F4F",
          ],
          plotOptions: {
            bar: {
              columnWidth: '40%', // Adjust this percentage to make the bars thinner or thicker
            }
          },
        };

        return (
          <div key={index} style={{ marginBottom: '50px' }}>
            <div className="d-flex justify-content-center">
              <label className="mx-2 mb-3 text-bold">
                <input
                  type="radio"
                  value="Brand"
                  className="mx-1 "
                  checked={chartModel === "Brand"}
                  onChange={() => setChartModel("Brand")}
                />
                Brand View
              </label>
              <label className="mx-2 mb-3">
                <input
                  type="radio"
                  value="retailer"
                  className="mx-1 "
                  checked={chartModel === "retailer"}
                  onChange={() => setChartModel("retailer")}
                />
                Retailer View
              </label>
            </div>
            <h6 style={{ textAlign: "center" }}>{chartData.brand}</h6>

            <ReactApexCharts
              options={options}
              series={seriesData}
              height={450}
            />
          </div>
        );
      })}
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalItems={chartDataArray.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Bar;

import { width } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "react-apexcharts";
import { useSelector } from "react-redux";


const ElasticityStratagyChart = ({ isLoading }) => {
  const [chartData, setChartData] = useState([]);
  const chart9Reducer = useSelector((state) => state.chart9Reducer);

  React.useEffect(() => {
    if (chart9Reducer && chart9Reducer.chart9Data) {
      const newData = transformData(chart9Reducer.chart9Data.data);
      setChartData(newData);
    }
  }, [chart9Reducer]);

  const transformData = (data) => {
    const chartDataMap = {};

    data.forEach((item) => {
      const retailer = item.Retailer;
      if (!chartDataMap[retailer]) {
        chartDataMap[retailer] = {
          Retailer: retailer,
          multiAxes: false,
          xycoordinated: false,
          xAxisTitle: "Base Price Elasticity",
          yAxisTitle: "Promo Price Elasticity",
          data: {
            datasets: [],
          },
        };
      }

      chartDataMap[retailer].data.datasets.push({
        label: item.Product,
        data: [
          {
            x: item.Base_Price_Elasticity,
            y: item.Promo_Price_Elasticity,
          },
        ],
        borderColor: "rgb(60,146,109)",
        backgroundColor: "rgba(60,146,109, 0.5)",
        pointRadius: 15,
        pointHoverRadius: 20,
      });
    });

    // Convert the map into an array
    return Object.values(chartDataMap);
  };

  const getDataOption = (chartData) => {
    const datasets = chartData.data.datasets;
    // console.log(datasets, 'data')
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;

    datasets.forEach((dataset) => {
      dataset.data.forEach((point) => {
        const { x, y } = point;

        if (x > maxX) {
          maxX = x;
        }
        if (x < minX) {
          minX = x;
        }

        if (y > maxY) {
          maxY = y;
        }
        if (y < minY) {
          minY = y;
        }
      });
    });

    const absMax = Math.max(Math.abs(minX), Math.abs(maxX), Math.abs(minY), Math.abs(maxY));

    const buffer = 0.1;
    const max = absMax + absMax * buffer;
    const min = -max;

    const xAxisFormatter = (value) => value.toFixed(2);
    const yAxisFormatter = (value) => value.toFixed(2);

    return {
      chart: {
        type: 'scatter',
        height: 500,
         offsetX: 30,
        // offsetX: 50,
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
        },
      },
      title: {
        text: chartData.Retailer,
        align: 'center',
        margin: 20,
        style: {
          fontSize: '16px'
        }
      },
      xaxis: {
        title: {
          text: chartData.xAxisTitle
        },
        labels: {
          formatter: xAxisFormatter
        },
        reversed: true,
        min: -3,
        max: 0,
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
        title: {
          text: chartData.yAxisTitle,
          offsetX: 0,
        },
        labels: {
          formatter: yAxisFormatter,
          rotate: 90,
          offsetX: 0,
          offsetY: 0,

        },
        reversed: true,
        // min: -3,
        max: 0,
        axisBorder: {
          show: true,
          color: '#000000',
          offsetX: -5,
          offsetY: 0
        },
      },
      series: datasets.map((dataset) => ({
        name: dataset.label,
        data: dataset.data.map((point) => [point.x, point.y]),
        // color: dataset.backgroundColor
      })),
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const dataItem = chartData.data.datasets[seriesIndex].data[dataPointIndex];
          const originalX = dataItem.x.toFixed(2);
          const originalY = dataItem.y.toFixed(2);
          return `
      <div style="border: 1px solid grey; padding: 10px; background-color: white;">
        ${w.globals.seriesNames[seriesIndex]}<br />
        Base Price Elasticity: ${originalX}<br />
        Promo Price Elasticity: ${originalY}
      </div>
    `;
        },
        x: {
          show: false,
        },

      },
      annotations: {
        yaxis: [
          {
            y: -1.5,
            borderColor: '#93969E',
            strokeDashArray: 0,
            // label: {
            //   text: 'Your Markline Name'
            // }
          }
        ],
        xaxis: [
          {
            x: -1,
            borderColor: '#93969E',
            strokeDashArray: 0,

            // label: {
            //   text: 'Your Markline Name',
            //   style: {
            //     color: '#93969E'
            //   }
            // }
          }
        ]
      },
      grid: {
        show: false,
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // Takes an array of colors to alternate between
          opacity: 0.5,
        },
      },
      legend: {
        show: false,
      },

      markers: {
        size: 10,
        strokeWidth: 1, 
        strokeColors: 'rgb(60,146,109)', 
      },
      stroke: {
        show: true,
        width:0
      },
      dataLabels: {
        enabled: false
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
    };
  };

  return (
    <div>
      {chartData.map((val, i) => (
        <div key={i} style={{ position: "relative", marginBottom: i !== chartData.length - 1 ? "50px" : "0" }}>
          <ApexCharts
            options={getDataOption(val)}
            series={getDataOption(val).series}
            type="scatter"
            height={500}
          />
          <div style={{ position: "absolute", top: "16%", left: "12%", color: "rgb(255, 205, 86)", fontWeight: "bold" }}>
            Hi-Lo
          </div>
          <div style={{ position: "absolute", top: "16%", right: "14%", color: "rgb(75, 192, 192)", fontWeight: "bold" }}>
            Price Disruptor
          </div>
          <div style={{ position: "absolute", bottom: "16%", left: "12%", color: "rgb(153, 102, 255)", fontWeight: "bold" }}>
            Margin Builder
          </div>
          <div style={{ position: "absolute", bottom: "16%", right: "14%", color: "rgb(54, 162, 235)", fontWeight: "bold" }}>
            EDLP
          </div>
        </div>
      ))}
    </div>
  );
};

export default ElasticityStratagyChart;

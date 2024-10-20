import React from "react";
import ApexCharts from "react-apexcharts";
import { ProfitCurvesChartData } from "./data";

const ProfitCurvesChart = () => {
  const [chartType, setChartType] = React.useState('line');
  const [isStacked, setIsStacked] = React.useState(false);

  const getOptions = (data) => {
    const {
      xAxisTitle,
      leftyAxisTitle,
      rightyAxisTitle,
      data: chartData,
    } = data;
    const datasets = chartData.datasets;
    const labels = chartData.labels;

    return {
      chart: {
        id: 'profit-curves-chart',
        type: chartType,
        stacked: isStacked,
        zoom: {
          enabled: false,
        },
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
      tooltip: {
        shared: true,
        intersect: false,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },
      grid: {
        show: false,
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // Takes an array of colors to alternate between
          opacity: 0.5,
        },
  
      },
      xaxis: {
        categories: labels,
        title: {
          text: xAxisTitle,
        },
        labels: {
          rotate: -45, 
          style: {
            fontSize: '10px',
          },
        },
      },
      stroke: {
        curve: 'straight',
        width: 4
      },
      colors:["#2c99f4","#40d68e"],
      markers: {
        size: 3,
        strokeColors:["#0ea5e9","#14532d"],
        strokeWidth: 1,
        shape:"circle",
        fillOpacity: 1,
        hover: {
          size: 4,
        },
      },
      yaxis: [
        {
          title: {
            text: leftyAxisTitle,
          },
          labels: {
            formatter: (value) => value,
          },
        },
        {
          opposite: true,
          title: {
            text: rightyAxisTitle,
          },
          labels: {
            formatter: (value) => `$${value}`,
          },
        },
      ],
      series: datasets?.map((dataset) => ({
        name: dataset.label,
        data: dataset.data,
      })),
    };
  };

  return (
    <div>
      {ProfitCurvesChartData?.map((val, i) => (
        <ApexCharts
          key={i}
          options={getOptions(val)}
          series={getOptions(val).series}
          type={chartType}
          height={500}
          style={{
            marginBottom: i !== ProfitCurvesChartData.length - 1 ? "50px" : "0",
          }}
        />
      ))}
    </div>
  );
};

export default ProfitCurvesChart;

// import React from "react";
// import ReactEcharts from "echarts-for-react";
// import ApexCharts from "react-apexcharts";

// import { Select } from "antd";

// export default function MarginSimulator({
//   retailers,
//   brands,
//   products,
//   selectedRetailer,
//   selectedBrand,
//   selectedProduct,
//   marginPriceValues,
//   marginSimulationData,
//   marginChartData,
//   isPriceSimulationLoading,
//   handleRetailerChange,
//   handleBrandChange,
//   handleProductChange,
//   handleMarginPriceInputChange,
// }) {

//   const echartsReactRef = React.useRef(null);
//   const productName = marginSimulationData[0]?.Product ?? "";
//   const netUnitPrice = marginPriceValues?.listPrice - marginPriceValues?.edlpSpend;
//   const manufacturerMargin = ((netUnitPrice - marginPriceValues?.cogs) / marginPriceValues?.listPrice) * 100;
//   const retailerMargin = ((marginPriceValues?.basePrice - netUnitPrice) / marginPriceValues?.basePrice) * 100;

//   const getOption = (data) => {
//     const { Product, Retailer, xAxisTitle, leftyAxisTitle, rightyAxisTitle, data: chartData } = data;
//     const datasets = chartData.datasets;
//     const labels = chartData.labels;
//     return {
//       tooltip: {
//         trigger: "axis",
//         axisPointer: {
//           type: "cross", // Use crosshair for both axes
//         },
//       },
//       legend: {
//         data: datasets.map((dataset) => dataset.label),
//         top: 10,
//       },
//       grid: {
//         left: 30,
//         right: 110,
//         bottom: 70,
//         top: 50,
//         containLabel: true,
//       },
//       dataZoom: [
//         {
//           type: "slider", // The type of data zoom, 'slider' for a slider bar
//           xAxisIndex: [0], // Enable data zoom for the first X axis (index 0)
//           start: 0, // The start position of the data zoom, 0% in this case
//           end: 100, // The end position of the data zoom, 100% in this case
//           // bottom: -30,
//         },
//         {
//           type: "slider", // The type of data zoom, 'slider' for a slider bar
//           yAxisIndex: [0], // Enable data zoom for the first Y axis (index 0)
//           start: 0, // The start position of the data zoom, 0% in this case
//           end: 100, // The end position of the data zoom, 100% in this case
//           right: 50,
//         },
//       ],
//       toolbox: {
//         show: true,
//         zoom: false,
//         zoomin: false,
//         zoomout: false,
//         orient: "horizontal",
//         left: "left",
//         top: "top",
//         feature: {
//           mark: { show: true },
//           dataView: { show: true, readOnly: true },
//           magicType: {
//             show: true,
//             type: ["line", "bar", "stack"],
//           },

//           restore: { show: true },
//           saveAsImage: { show: true },
//         },
//       },
//       xAxis: {
//         type: "category",
//         boundaryGap: false,
//         data: labels,
//         interval: 0,
//         name: xAxisTitle,
//         axisLabel: {
//           rotate: 45, // Rotate the labels by 45 degrees
//           fontSize: 10,
//         },
//         nameLocation: "middle",
//         nameGap: 50,
//         nameTextStyle: {
//           fontWeight: "bold", // Set font to bold
//         },
//       },
//       yAxis: [
//         {
//           type: "value",
//           name: leftyAxisTitle,
//           position: "left",
//           axisLabel: {
//             formatter: "{value}",
//           },
//           splitLine: {
//             show: false, // Hide horizontal grid lines
//           },
//           nameLocation: "middle",
//           nameGap: 60,
//           nameTextStyle: {
//             fontWeight: "bold", // Set font to bold
//           },
//           show: true,
//         },
//         {
//           nameRotate: 270,
//           type: "value",
//           name: rightyAxisTitle,
//           position: "right",
//           axisLabel: {
//             formatter: "${value}",
//           },
//           nameLocation: "middle",
//           nameGap: 60,
//           nameTextStyle: {
//             fontWeight: "bold",
//           },
//           show: true,
//         },
//       ],
//       series: datasets.map((dataset) => ({
//         name: dataset.label,
//         type: "line",
//         data: dataset.data,
//         yAxisIndex: dataset.yAxisID === "right-y-axis" ? 1 : 0,
//         borderColor: dataset.borderColor,
//         backgroundColor: dataset.backgroundColor,
//         smooth: true,
//       })),
//       graphic: [
//         {
//           type: "rect",
//           position: [100, 100], // Initial position
//           shape: {
//             width: 0,
//             height: 0,
//           },
//           draggable: false, // Allow dragging
//           ondrag: (params) => {
//             // Handle drag event
//             const { echarts } = echartsReactRef.current;
//             const chart = echarts.getInstanceByDom(echartsReactRef.current.getEchartsInstance().getDom());

//             // Calculate new position based on params.event.offsetX and params.event.offsetY
//             const newPosition = chart.convertFromPixel("grid", [params.event.offsetX, params.event.offsetY]);

//             // Update the position of the draggable element
//             chart.setOption({
//               graphic: {
//                 id: params.target.id,
//                 position: newPosition,
//               },
//             });
//           },
//         },
//       ],
//     };
//   };

//   const MarginSimulationChart = [
//     {
//       xAxisTitle: "% Change in Price",
//       leftyAxisTitle: "Manufacturer Profit ($)",
//       rightyAxisTitle: "Annual Profit ($)",
//       multiAxes: true,
//       data: {
//         labels: [
//           "-25%",
//           "-24%",
//           "-23%",
//           "-22%",
//           "-21%",
//           "-20%",
//           "-19%",
//           "-18%",
//           "-17%",
//           "-16%",
//           "-15%",
//           "-14%",
//           "-13%",
//           "-12%",
//           "-11%",
//           "-10%",
//           "-9%",
//           "-8%",
//           "-7%",
//           "-6%",
//           "-5%",
//           "-4%",
//           "-3%",
//           "-2%",
//           "-1%",
//           "0%",
//           "1%",
//           "2%",
//           "3%",
//           "4%",
//           "5%",
//           "6%",
//           "7%",
//           "8%",
//           "9%",
//           "10%",
//           "11%",
//           "12%",
//           "13%",
//           "14%",
//           "15%",
//           "16%",
//           "17%",
//           "18%",
//           "19%",
//           "20%",
//           "21%",
//           "22%",
//           "23%",
//           "24%",
//           "25%",
//         ],
//         datasets: [
//           {
//             label: "Manufacturer Profit ($)",
//             data: marginChartData?.manufacturerProfit,
//             borderColor: "rgb(75, 192, 192)",
//             backgroundColor: "rgb(75, 192, 192,0.5)",
//             yAxisID: "left-y-axis",
//           },
//           {
//             label: "Annual Sales ($)",
//             data: marginChartData?.annualProfit,
//             borderColor: "rgb(136, 97, 102)",
//             backgroundColor: "rgb(136, 97, 102,0.5)",
//             yAxisID: "right-y-axis",
//           },
//         ],
//       },
//     },
//   ];

//   // new Code By Devendra Kashyap
//   // var options = {
//   //   chart: {
//   //     type: 'bar'
//   //   },
//   //   title: {
//   //     text: "Effects of Change In Price",
//   //     align: 'center',
//   //     margin: 10,
//   //     offsetX: 0,
//   //     offsetY: 0,
//   //     style: {
//   //       fontSize: '16px',
//   //     },
//   //   },
//   //   xaxis: {
//   //     title: {
//   //       text: "% Change in Price",
//   //     },
//   //     categories: [
//   //       "-25.00 %",
//   //       "-24.00 %",
//   //       "-23.00 %",
//   //       "-22.00 %",
//   //       "-21.00 %",
//   //       "-20.00 %",
//   //       "-19.00 %",
//   //       "-18.00 %",
//   //       "-17.00 %",
//   //       "-16.00 %",
//   //       "-15.00 %",
//   //       "-14.00 %",
//   //       "-13.00 %",
//   //       "-12.00 %",
//   //       "-11.00 %",
//   //       "-10.00 %",
//   //       "-9.00 %",
//   //       "-8.00 %",
//   //       "-7.00 %",
//   //       "-6.00 %",
//   //       "-5.00 %",
//   //       "-4.00 %",
//   //       "-3.00 %",
//   //       "-2.00 %",
//   //       "-1.00 %",
//   //       "0.00 %",
//   //       "1.00 %",
//   //       "2.00 %",
//   //       "3.00 %",
//   //       "4.00 %",
//   //       "5.00 %",
//   //       "6.00 %",
//   //       "7.00 %",
//   //       "8.00 %",
//   //       "9.00 %",
//   //       "10.00 %",
//   //       "11.00 %",
//   //       "12.00 %",
//   //       "13.00 %",
//   //       "14.00 %",
//   //       "15.00 %",
//   //       "16.00 %",
//   //       "17.00 %",
//   //       "18.00 %",
//   //       "19.00 %",
//   //       "20.00 %",
//   //       "21.00 %",
//   //       "22.00 %",
//   //       "23.00 %",
//   //       "24.00 %",
//   //       "25.00 %",
//   //     ]
//   //   },
//   //   yaxis: {
//   //     title: {
//   //       text: "Annual Profit ($)",
//   //     },
//   //     // labels: {
//   //     //   formatter: (value) => value.toFixed(0),
//   //     // },
//   //     axisBorder: {
//   //       show: true,
//   //       color: '#000000',
//   //       offsetX: 0,
//   //       offsetY: 0,
//   //     },
//   //   },
//   // }

//   const getChartOptions = (data) => ({
//     chart: {
//       type: 'bar'
//     },
//     zoom:{
//     enabled:false
//     },
//     title: {
//       text: "Effects of Change In Price",
//       align: 'center',
//       margin: 10,
//       offsetX: 0,
//       offsetY: 0,
//       style: {
//         fontSize: '16px',
//       },
//     },
//     xaxis: {
//       title: {
//         text: "% Change in Price",
//       },
//       categories: [
//         "-25.00 %",
//         "-24.00 %",
//         "-23.00 %",
//         "-22.00 %",
//         "-21.00 %",
//         "-20.00 %",
//         "-19.00 %",
//         "-18.00 %",
//         "-17.00 %",
//         "-16.00 %",
//         "-15.00 %",
//         "-14.00 %",
//         "-13.00 %",
//         "-12.00 %",
//         "-11.00 %",
//         "-10.00 %",
//         "-9.00 %",
//         "-8.00 %",
//         "-7.00 %",
//         "-6.00 %",
//         "-5.00 %",
//         "-4.00 %",
//         "-3.00 %",
//         "-2.00 %",
//         "-1.00 %",
//         "0.00 %",
//         "1.00 %",
//         "2.00 %",
//         "3.00 %",
//         "4.00 %",
//         "5.00 %",
//         "6.00 %",
//         "7.00 %",
//         "8.00 %",
//         "9.00 %",
//         "10.00 %",
//         "11.00 %",
//         "12.00 %",
//         "13.00 %",
//         "14.00 %",
//         "15.00 %",
//         "16.00 %",
//         "17.00 %",
//         "18.00 %",
//         "19.00 %",
//         "20.00 %",
//         "21.00 %",
//         "22.00 %",
//         "23.00 %",
//         "24.00 %",
//         "25.00 %",
//       ]
//     },
//     yaxis: {
//       title: {
//         text: "Annual Profit ($)",
//       },
//       // labels: {
//       //   formatter: (value) => value.toFixed(0),
//       // },
//       axisBorder: {
//         show: true,
//         color: '#000000',
//         offsetX: 0,
//         offsetY: 0,
//       },
//     },
//   });

//   // latest code By Devendra kashyap
//   const series = [
//     {
//       name: 'Manufacturer Profit',
//       data: marginChartData?.manufacturerProfit
//     },
//     {
//       name: 'Annual Profit',
//       data: marginChartData?.annualProfit
//     }
//   ];

//   const options = {
//     chart: {
//       type: 'line',
//       zoom: {
//         enabled: false
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       curve: 'smooth'
//     },
//     title: {
//       text: "Effects of Change In Price",
//       align: 'center',
//       margin: 10,
//       offsetX: 0,
//       offsetY: 0,
//       style: {
//         fontSize: '16px',
//       },
//     },
//     grid: {
//       row: {
//         colors: ['#f3f3f3', 'transparent'], // Alternating row colors
//         opacity: 0.5
//       }
//     },
//     xaxis: {
//       title: {
//         text: "% Change in Price",
//       },
//       categories: [
//         "-25.00 %",
//         "-24.00 %",
//         "-23.00 %",
//         "-22.00 %",
//         "-21.00 %",
//         "-20.00 %",
//         "-19.00 %",
//         "-18.00 %",
//         "-17.00 %",
//         "-16.00 %",
//         "-15.00 %",
//         "-14.00 %",
//         "-13.00 %",
//         "-12.00 %",
//         "-11.00 %",
//         "-10.00 %",
//         "-9.00 %",
//         "-8.00 %",
//         "-7.00 %",
//         "-6.00 %",
//         "-5.00 %",
//         "-4.00 %",
//         "-3.00 %",
//         "-2.00 %",
//         "-1.00 %",
//         "0.00 %",
//         "1.00 %",
//         "2.00 %",
//         "3.00 %",
//         "4.00 %",
//         "5.00 %",
//         "6.00 %",
//         "7.00 %",
//         "8.00 %",
//         "9.00 %",
//         "10.00 %",
//         "11.00 %",
//         "12.00 %",
//         "13.00 %",
//         "14.00 %",
//         "15.00 %",
//         "16.00 %",
//         "17.00 %",
//         "18.00 %",
//         "19.00 %",
//         "20.00 %",
//         "21.00 %",
//         "22.00 %",
//         "23.00 %",
//         "24.00 %",
//         "25.00 %",
//       ]
//       // categories: marginChartData.manufacturerProfit.map((_, index) => `Month ${index + 1}`)
//     },
//     yaxis: {
//       title: {
//         text: "Annual Profit ($)",
//       },
//     },
//     legend: {
//       position: 'top'
//     }
//   };

//   // 17-09-2024
//   const data = {
//     manufacturerProfit: marginChartData?.manufacturerProfit,
//     annualProfit: marginChartData?.annualProfit,
//     changeInPrice: [
//       "-25%",
//       "-24%",
//       "-23%",
//       "-22%",
//       "-21%",
//       "-20%",
//       "-19%",
//       "-18%",
//       "-17%",
//       "-16%",
//       "-15%",
//       "-14%",
//       "-13%",
//       "-12%",
//       "-11%",
//       "-10%",
//       "-9%",
//       "-8%",
//       "-7%",
//       "-6%",
//       "-5%",
//       "-4%",
//       "-3%",
//       "-2%",
//       "-1%",
//       "0%",
//       "1%",
//       "2%",
//       "3%",
//       "4%",
//       "5%",
//       "6%",
//       "7%",
//       "8%",
//       "9%",
//       "10%",
//       "11%",
//       "12%",
//       "13%",
//       "14%",
//       "15%",
//       "16%",
//       "17%",
//       "18%",
//       "19%",
//       "20%",
//       "21%",
//       "22%",
//       "23%",
//       "24%",
//       "25%",
//     ]
//   }

//   const option45s = {
//     chart: {
//       type: 'line',

//       zoom: {
//         enable: false,
//       },
//       zoom: false,
//       zoomin: false,
//       zoomout: false,
    
//     // zoom: {
//     //   enable: true,
//     // },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       curve: 'smooth'
//     },
//   },
//     title: {
//       text: "Effects of Change In Price",
//       align: 'center',
//       margin: 10,
//       offsetX: 0,
//       offsetY: 0,
//       style: {
//         fontSize: '16px',
//       },
//     },
//     grid: {
//       row: {
//         colors: ['#f3f3f3', 'transparent'], // Alternating row colors
//         opacity: 0.5
//       }
//     },
//     xaxis: {
//       title: {
//         text: "% Change in Price",
//       },
//       categories: [
//         "-25%",
//         "-24%",
//         "-23%",
//         "-22%",
//         "-21%",
//         "-20%",
//         "-19%",
//         "-18%",
//         "-17%",
//         "-16%",
//         "-15%",
//         "-14%",
//         "-13%",
//         "-12%",
//         "-11%",
//         "-10%",
//         "-9%",
//         "-8%",
//         "-7%",
//         "-6%",
//         "-5%",
//         "-4%",
//         "-3%",
//         "-2%",
//         "-1%",
//         "0%",
//         "1%",
//         "2%",
//         "3%",
//         "4%",
//         "5%",
//         "6%",
//         "7%",
//         "8%",
//         "9%",
//         "10%",
//         "11%",
//         "12%",
//         "13%",
//         "14%",
//         "15%",
//         "16%",
//         "17%",
//         "18%",
//         "19%",
//         "20%",
//         "21%",
//         "22%",
//         "23%",
//         "24%",
//         "25%",
//       ],
//     },
//     yaxis: [
//       {
//         title: {
//           text: "Annual Profit ($)",
//         },
//       },
//       {
//         opposite: true,
//         title: {
//           text: 'Manufacturer Profit',
//         },
//       },
//     ],
//     series: [
//       {
//         name: 'Manufacturer Profit',
//         data: data.manufacturerProfit && formatArrayToTwoDecimals(data.manufacturerProfit),
//       },
//       {
//         name: 'Annual Profit',
//         // data: data.annualProfit.concat(new Array(data.changeInPrice.length - data.annualProfit.length).fill(null)),
//         data: data.annualProfit && formatArrayToTwoDecimals(data.annualProfit),
//       },
//       // {
//       //   name: 'Change in Price',
//       //   data: data.changeInPrice.map(value => parseFloat(value)),
//       //   yaxisIndex: 1,
//       // },
//     ],
//     tooltip: {
//       shared: true,
//       intersect: false,
//       zoom:{
//         enable:true,
//       },
//       zoom: false,
//       zoomin: false,
//       zoomout: false,
//     },
//     legend: {
//       position: 'top'
//     }
//   };

//   function formatArrayToTwoDecimals(arr) {
//     // console.log(arr)
//     return arr.map(num => Math.floor(num * 100) / 100);
//   }

//   function formatNumbersUsingToFixed(data) {
//     const formattedData = {};
//     for (const key in data) {
//       formattedData[key] = data[key].map(num => parseFloat(num.toFixed(2)));
//     }
//     return formattedData;
//   }

//   return (
//     <div className="simluation_db">
//       <div className="container-fluid">
//         <div className="sim_retailer_main mb-4">
//           <div className="row">
//             <div className="dropdown_box_select sim_drop col-lg-4 mx-3">
//               <div>
//                 <Select
//                   showSearch
//                   placeholder="Select Retailer"
//                   onChange={handleRetailerChange}
//                   style={{
//                     width: "90%",
//                   }}
//                   className="filtered-accordion-ant-select"
//                   maxTagCount="responsive"
//                 >
//                   {retailers?.map((item) => (
//                     <Select.Option key={item} value={item} className="custom-tooltip-option" data-tooltip={item}>
//                       {item}
//                     </Select.Option>
//                   ))}
//                 </Select>
//               </div>
//             </div>
//             <div className="dropdown_box_select sim_drop col-lg-4">
//               <Select
//                 showSearch
//                 placeholder="Select Brand"
//                 onChange={handleBrandChange}
//                 disabled={!selectedRetailer}
//                 style={{
//                   width: "90%",
//                 }}
//                 className="filtered-accordion-ant-select"
//                 maxTagCount="responsive"
//               >
//                 {brands?.map((item) => (
//                   <Select.Option key={item} value={item} className="custom-tooltip-option" data-tooltip={item}>
//                     {item}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </div>
//             <div className="dropdown_box_select sim_drop col-lg-4">
//               <Select
//                 showSearch
//                 placeholder="Select Product"
//                 onChange={handleProductChange}
//                 disabled={!selectedBrand}
//                 style={{
//                   width: "90%",
//                 }}
//                 className="filtered-accordion-ant-select"
//                 maxTagCount="responsive"
//               >
//                 {products?.map((item) => (
//                   <Select.Option key={item} value={item} className="custom-tooltip-option" data-tooltip={item}>
//                     {item}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </div>
//           </div>
//           <div className="text-end">
//             <div className="row">
//               <div className="col-lg-8">
//                 <input className="form-control form-control-sm" id="formFileSm" type="file"></input>
//               </div>
//               <div className=" col-lg-4">
//                 <a href="" className="btn btn-primary btn-retailer">
//                   Upload Margin{" "}
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {isPriceSimulationLoading ? (
//           <div>
//             <p>Please wait, while we are fetching the data for you . . .</p>
//           </div>
//         ) : (
//           <div className="animate__animated animate__fadeInUp">
//             {/* <!-- Best price --> */}
//             <div className="best_price_row mb-4">
//               <div>
//                 {/* // latests code By Dev */}
//                 <ApexCharts
//                   options={option45s}
//                   series={option45s.series}
//                   height={500}
//                   width="100%"
//                 />
//                 {/* // new code By Dev
//                 <ApexCharts
//                   options={options}
//                   series={series}
//                   height={500}
//                   width="100%"
//                 /> */}
//                 {/* // old code */}
//                 {/* {MarginSimulationChart.map((val, i) => {
//                   return (
//                     <ReactEcharts
//                       key={i}
//                       ref={echartsReactRef}
//                       option={getOption(val)}
//                       style={{
//                         marginBottom: i !== MarginSimulationChart.length - 1 ? "50px" : "0",
//                         height: "500px",
//                         width: "100%",
//                       }}
//                     />
//                   );
//                 })} */}
//               </div>
//               <div className="left_best_price">
//                 <table className="best_pr_table">
//                   <thead>
//                     <tr>
//                       <th colSpan="2" style={{ backgroundColor: "#174F73", color: "#fff" }}>
//                         Best price
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>
//                         <p>List Price</p>
//                       </td>
//                       <td>
//                         <div className="sim_input_fild">
//                           <input
//                             type="number"
//                             placeholder="Enter the value"
//                             className="margin_simu_input"
//                             name="listPrice"
//                             value={marginPriceValues.listPrice}
//                             onChange={handleMarginPriceInputChange}
//                             min={0}
//                           ></input>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <p>EDLP Spend</p>
//                       </td>
//                       <td>
//                         <div className="sim_input_fild border-0">
//                           <input
//                             type="number"
//                             placeholder="Enter the value"
//                             className="margin_simu_input"
//                             name="edlpSpend"
//                             value={marginPriceValues.edlpSpend}
//                             onChange={handleMarginPriceInputChange}
//                             min={0}
//                           ></input>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <p>Net Unit Price</p>
//                       </td>
//                       <td>
//                         <div className="sim_input_fild border-0">
//                           <input
//                             type="number"
//                             placeholder="Enter the value"
//                             className="margin_simu_input"
//                             name="netUnitPrice"
//                             value={netUnitPrice}
//                             onChange={handleMarginPriceInputChange}
//                             readOnly
//                           ></input>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <p>COGS</p>
//                       </td>
//                       <td>
//                         <div className="sim_input_fild border-0">
//                           <input
//                             type="number"
//                             placeholder="Enter the value"
//                             className="margin_simu_input"
//                             name="cogs"
//                             value={marginPriceValues.cogs}
//                             onChange={handleMarginPriceInputChange}
//                           ></input>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <p>Base Price Elasticity</p>
//                       </td>
//                       <td>
//                         <div className="sim_input_fild border-0">
//                           <input
//                             type="number"
//                             placeholder="Enter the value"
//                             className="margin_simu_input"
//                             name="basePriceElasticity"
//                             value={
//                               marginPriceValues?.basePriceElasticity
//                                 ? marginPriceValues?.basePriceElasticity?.toFixed(2)
//                                 : 0
//                             }
//                             onChange={handleMarginPriceInputChange}
//                           ></input>
//                         </div>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>
//                         <p>Base Price</p>
//                       </td>
//                       <td>
//                         <div className="sim_input_fild border-0">
//                           <input
//                             type="number"
//                             placeholder="Enter the value"
//                             className="margin_simu_input"
//                             name="basePrice"
//                             value={marginPriceValues?.basePrice ? marginPriceValues?.basePrice?.toFixed(2) : 0}
//                             onChange={handleMarginPriceInputChange}
//                           ></input>
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             {/* Product display row */}
//             <div className="sim_retailer_row1 width_td mb-4 ">
//               <div>
//                 <div className="left_best_price col-lg-12">
//                   <table className="best_pr_table">
//                     <thead>
//                       <tr>
//                         <th>Product Name </th>
//                         <th>Net Unit Price($) </th>
//                         <th>Total EDLP Spend($)</th>
//                         <th>Manufacturer Margin %</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>
//                           <p>{productName}</p>
//                         </td>
//                         <td>
//                           <p>{netUnitPrice}</p>
//                         </td>
//                         <td>
//                           <p>{marginPriceValues?.edlpSpend}</p>
//                         </td>
//                         <td>
//                           <p>{manufacturerMargin ? manufacturerMargin.toFixed(2) : "-"}</p>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               <div>
//                 <div className="left_best_price col-lg-12">
//                   <table className="best_pr_table">
//                     <thead>
//                       <tr>
//                         <th>Product Name </th>
//                         <th>Net Unit Price($) </th>
//                         <th>Base Price($)</th>
//                         <th>Retailer Margin %</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>
//                           <p>{productName}</p>
//                         </td>
//                         <td>
//                           <p>{netUnitPrice ? netUnitPrice.toFixed(2) : "-"}</p>
//                         </td>
//                         <td>
//                           <p>{marginPriceValues?.basePrice ? marginPriceValues?.basePrice.toFixed(2) : "-"}</p>
//                         </td>
//                         <td>
//                           <p>{retailerMargin ? retailerMargin.toFixed(2) : "-"}</p>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





import React,{useState} from "react";
import ReactEcharts from "echarts-for-react";
import ApexCharts from "react-apexcharts";

import { Select } from "antd";

export default function MarginSimulator({
  retailers,
  brands,
  products,
  selectedRetailer,
  selectedBrand,
  selectedProduct,
  marginPriceValues,
  marginSimulationData,
  marginChartData,
  isPriceSimulationLoading,
  handleRetailerChange,
  handleBrandChange,
  handleProductChange,
  handleMarginPriceInputChange,
}) {
  const echartsReactRef = React.useRef(null);
  const [chartType, setChartType] = useState('bar');
  const [isStacked, setIsStacked] = useState(false);
  const productName = marginSimulationData[0]?.Product ?? "";
  const netUnitPrice =
    marginPriceValues?.listPrice - marginPriceValues?.edlpSpend;
  const manufacturerMargin =
    ((netUnitPrice - marginPriceValues?.cogs) / marginPriceValues?.listPrice) *
    100;
  const retailerMargin =
    ((marginPriceValues?.basePrice - netUnitPrice) /
      marginPriceValues?.basePrice) *
    100;

  const getOption = (data) => {
    const {
      Product,
      Retailer,
      xAxisTitle,
      leftyAxisTitle,
      rightyAxisTitle,
      data: chartData,
    } = data;
    const datasets = chartData.datasets;
    const labels = chartData.labels;
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross", // Use crosshair for both axes
        },
      },
      legend: {
        data: datasets.map((dataset) => dataset.label),
        top: 10,
      },
      grid: {
        left: 30,
        right: 110,
        bottom: 70,
        top: 50,
        containLabel: true,
      },
      dataZoom: [
        {
          type: "slider", // The type of data zoom, 'slider' for a slider bar
          xAxisIndex: [0], // Enable data zoom for the first X axis (index 0)
          start: 0, // The start position of the data zoom, 0% in this case
          end: 100, // The end position of the data zoom, 100% in this case
          // bottom: -30,
        },
        {
          type: "slider", // The type of data zoom, 'slider' for a slider bar
          yAxisIndex: [0], // Enable data zoom for the first Y axis (index 0)
          start: 0, // The start position of the data zoom, 0% in this case
          end: 100, // The end position of the data zoom, 100% in this case
          right: 50,
        },
      ],
      toolbox: {
        show: true,
        orient: "horizontal",
        left: "left",
        top: "top",
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: true },
          magicType: {
            show: true,
            type: ["line", "bar", "stack"],
          },

          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: labels,
        interval: 0,
        name: xAxisTitle,
        axisLabel: {
          rotate: 45, // Rotate the labels by 45 degrees
          fontSize: 10,
        },
        nameLocation: "middle",
        nameGap: 50,
        nameTextStyle: {
          fontWeight: "bold", // Set font to bold
        },
      },
      yAxis: [
        {
          type: "value",
          name: leftyAxisTitle,
          position: "left",
          axisLabel: {
            formatter: "{value}",
          },
          splitLine: {
            show: false, // Hide horizontal grid lines
          },
          nameLocation: "middle",
          nameGap: 60,
          nameTextStyle: {
            fontWeight: "bold", // Set font to bold
          },
          show: true,
        },
        {
          nameRotate: 270,
          type: "value",
          name: rightyAxisTitle,
          position: "right",
          axisLabel: {
            formatter: "${value}",
          },
          nameLocation: "middle",
          nameGap: 60,
          nameTextStyle: {
            fontWeight: "bold",
          },
          show: true,
        },
      ],
      series: datasets.map((dataset) => ({
        name: dataset.label,
        type: "line",
        data: dataset.data,
        yAxisIndex: dataset.yAxisID === "right-y-axis" ? 1 : 0,
        borderColor: dataset.borderColor,
        backgroundColor: dataset.backgroundColor,
        smooth: true,
      })),
      graphic: [
        {
          type: "rect",
          position: [100, 100], // Initial position
          shape: {
            width: 0,
            height: 0,
          },
          draggable: false, // Allow dragging
          ondrag: (params) => {
            // Handle drag event
            const { echarts } = echartsReactRef.current;
            const chart = echarts.getInstanceByDom(
              echartsReactRef.current.getEchartsInstance().getDom()
            );

            // Calculate new position based on params.event.offsetX and params.event.offsetY
            const newPosition = chart.convertFromPixel("grid", [
              params.event.offsetX,
              params.event.offsetY,
            ]);

            // Update the position of the draggable element
            chart.setOption({
              graphic: {
                id: params.target.id,
                position: newPosition,
              },
            });
          },
        },
      ],
    };
  };

  const MarginSimulationChart = [
    {
      xAxisTitle: "% Change in Price",
      leftyAxisTitle: "Manufacturer Profit ($)",
      rightyAxisTitle: "Annual Dollar Sales($)",
      multiAxes: true,
      data: {
        labels: [
          "-25%",
          "-24%",
          "-23%",
          "-22%",
          "-21%",
          "-20%",
          "-19%",
          "-18%",
          "-17%",
          "-16%",
          "-15%",
          "-14%",
          "-13%",
          "-12%",
          "-11%",
          "-10%",
          "-9%",
          "-8%",
          "-7%",
          "-6%",
          "-5%",
          "-4%",
          "-3%",
          "-2%",
          "-1%",
          "0%",
          "1%",
          "2%",
          "3%",
          "4%",
          "5%",
          "6%",
          "7%",
          "8%",
          "9%",
          "10%",
          "11%",
          "12%",
          "13%",
          "14%",
          "15%",
          "16%",
          "17%",
          "18%",
          "19%",
          "20%",
          "21%",
          "22%",
          "23%",
          "24%",
          "25%",
        ],
        datasets: [
          {
            label: "Manufacturer Profit ($)",
            data: marginChartData?.manufacturerProfit,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgb(75, 192, 192,0.5)",
            yAxisID: "left-y-axis",
          },
          {
            label: "Annual Sales ($)",
            data: marginChartData?.annualProfit,
            borderColor: "rgb(136, 97, 102)",
            backgroundColor: "rgb(136, 97, 102,0.5)",
            yAxisID: "right-y-axis",
          },
        ],
      },
    },
  ];

  // new Code By Devendra Kashyap
  // var options = {
  //   chart: {
  //     type: 'bar'
  //   },
  //   title: {
  //     text: "Effects of Change In Price",
  //     align: 'center',
  //     margin: 10,
  //     offsetX: 0,
  //     offsetY: 0,
  //     style: {
  //       fontSize: '16px',
  //     },
  //   },
  //   xaxis: {
  //     title: {
  //       text: "% Change in Price",
  //     },
  //     categories: [
  //       "-25.00 %",
  //       "-24.00 %",
  //       "-23.00 %",
  //       "-22.00 %",
  //       "-21.00 %",
  //       "-20.00 %",
  //       "-19.00 %",
  //       "-18.00 %",
  //       "-17.00 %",
  //       "-16.00 %",
  //       "-15.00 %",
  //       "-14.00 %",
  //       "-13.00 %",
  //       "-12.00 %",
  //       "-11.00 %",
  //       "-10.00 %",
  //       "-9.00 %",
  //       "-8.00 %",
  //       "-7.00 %",
  //       "-6.00 %",
  //       "-5.00 %",
  //       "-4.00 %",
  //       "-3.00 %",
  //       "-2.00 %",
  //       "-1.00 %",
  //       "0.00 %",
  //       "1.00 %",
  //       "2.00 %",
  //       "3.00 %",
  //       "4.00 %",
  //       "5.00 %",
  //       "6.00 %",
  //       "7.00 %",
  //       "8.00 %",
  //       "9.00 %",
  //       "10.00 %",
  //       "11.00 %",
  //       "12.00 %",
  //       "13.00 %",
  //       "14.00 %",
  //       "15.00 %",
  //       "16.00 %",
  //       "17.00 %",
  //       "18.00 %",
  //       "19.00 %",
  //       "20.00 %",
  //       "21.00 %",
  //       "22.00 %",
  //       "23.00 %",
  //       "24.00 %",
  //       "25.00 %",
  //     ]
  //   },
  //   yaxis: {
  //     title: {
  //       text: "Annual Profit ($)",
  //     },
  //     // labels: {
  //     //   formatter: (value) => value.toFixed(0),
  //     // },
  //     axisBorder: {
  //       show: true,
  //       color: '#000000',
  //       offsetX: 0,
  //       offsetY: 0,
  //     },
  //   },
  // }

  const getChartOptions = (data) => ({
    chart: {
      type: "bar",
    },
    title: {
      text: "Effects of Change In Price",
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: "16px",
      },
    },
    xaxis: {
      title: {
        text: "% Change in Price",
      },
      categories: [
        "-25.00 %",
        "-24.00 %",
        "-23.00 %",
        "-22.00 %",
        "-21.00 %",
        "-20.00 %",
        "-19.00 %",
        "-18.00 %",
        "-17.00 %",
        "-16.00 %",
        "-15.00 %",
        "-14.00 %",
        "-13.00 %",
        "-12.00 %",
        "-11.00 %",
        "-10.00 %",
        "-9.00 %",
        "-8.00 %",
        "-7.00 %",
        "-6.00 %",
        "-5.00 %",
        "-4.00 %",
        "-3.00 %",
        "-2.00 %",
        "-1.00 %",
        "0.00 %",
        "1.00 %",
        "2.00 %",
        "3.00 %",
        "4.00 %",
        "5.00 %",
        "6.00 %",
        "7.00 %",
        "8.00 %",
        "9.00 %",
        "10.00 %",
        "11.00 %",
        "12.00 %",
        "13.00 %",
        "14.00 %",
        "15.00 %",
        "16.00 %",
        "17.00 %",
        "18.00 %",
        "19.00 %",
        "20.00 %",
        "21.00 %",
        "22.00 %",
        "23.00 %",
        "24.00 %",
        "25.00 %",
      ],
    },
    yaxis: {
      title: {
        text: "Annual Profit ($)",
      },
      // labels: {
      //   formatter: (value) => value.toFixed(0),
      // },
      axisBorder: {
        show: true,
        color: "#000000",
        offsetX: 0,
        offsetY: 0,
      },
    },
  });

  // latest code By Devendra kashyap
  const series = [
    {
      name: "Manufacturer Profit",
      data: marginChartData?.manufacturerProfit,
    },
    {
      name: "Annual Profit",
      data: marginChartData?.annualProfit,
    },
  ];

  const options = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Effects of Change In Price",
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: "16px",
      },
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // Alternating row colors
        opacity: 0.5,
      },
    },
    xaxis: {
      title: {
        text: "% Change in Price",
      },
      categories: [
        "-25.00 %",
        "-24.00 %",
        "-23.00 %",
        "-22.00 %",
        "-21.00 %",
        "-20.00 %",
        "-19.00 %",
        "-18.00 %",
        "-17.00 %",
        "-16.00 %",
        "-15.00 %",
        "-14.00 %",
        "-13.00 %",
        "-12.00 %",
        "-11.00 %",
        "-10.00 %",
        "-9.00 %",
        "-8.00 %",
        "-7.00 %",
        "-6.00 %",
        "-5.00 %",
        "-4.00 %",
        "-3.00 %",
        "-2.00 %",
        "-1.00 %",
        "0.00 %",
        "1.00 %",
        "2.00 %",
        "3.00 %",
        "4.00 %",
        "5.00 %",
        "6.00 %",
        "7.00 %",
        "8.00 %",
        "9.00 %",
        "10.00 %",
        "11.00 %",
        "12.00 %",
        "13.00 %",
        "14.00 %",
        "15.00 %",
        "16.00 %",
        "17.00 %",
        "18.00 %",
        "19.00 %",
        "20.00 %",
        "21.00 %",
        "22.00 %",
        "23.00 %",
        "24.00 %",
        "25.00 %",
      ],
      // categories: marginChartData.manufacturerProfit.map((_, index) => `Month ${index + 1}`)
    },
    yaxis: {
      title: {
        text: "Annual Profit ($)",
      },
    },
    legend: {
      position: "top",
    },
  };

  // 17-09-2024
  const data = {
    manufacturerProfit: marginChartData?.manufacturerProfit,
    annualProfit: marginChartData?.annualProfit,
    changeInPrice: [
      "-25%",
      "-24%",
      "-23%",
      "-22%",
      "-21%",
      "-20%",
      "-19%",
      "-18%",
      "-17%",
      "-16%",
      "-15%",
      "-14%",
      "-13%",
      "-12%",
      "-11%",
      "-10%",
      "-9%",
      "-8%",
      "-7%",
      "-6%",
      "-5%",
      "-4%",
      "-3%",
      "-2%",
      "-1%",
      "0%",
      "1%",
      "2%",
      "3%",
      "4%",
      "5%",
      "6%",
      "7%",
      "8%",
      "9%",
      "10%",
      "11%",
      "12%",
      "13%",
      "14%",
      "15%",
      "16%",
      "17%",
      "18%",
      "19%",
      "20%",
      "21%",
      "22%",
      "23%",
      "24%",
      "25%",
    ],
  };

  // const option45s = {
  //   chart: {
  //     type: "line",
  //     zoom:false,
      

  //     zoom: {
  //       enable: false,
  //     },
  //     zoom: false,
  //     zoomin: false,
  //     zoomout: false,
  //     zoom:{
  //       enable:false
  //     },
  //     height: 350,
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     curve: "smooth",
  //   },
  //   title: {
  //     text: "Effects of Change In Price",
  //     align: "center",
  //     margin: 10,
  //     offsetX: 0,
  //     offsetY: 0,
  //     style: {
  //       fontSize: "16px",
  //     },
  //   },
  //   grid: {
  //     row: {
  //       colors: ["#f3f3f3", "transparent"], // Alternating row colors
  //       opacity: 0.5,
  //     },
  //   },
  //   xaxis: {
  //     title: {
  //       text: "% Change in Price",
  //     },
  //     categories: [
  //       "-25%",
  //       "-24%",
  //       "-23%",
  //       "-22%",
  //       "-21%",
  //       "-20%",
  //       "-19%",
  //       "-18%",
  //       "-17%",
  //       "-16%",
  //       "-15%",
  //       "-14%",
  //       "-13%",
  //       "-12%",
  //       "-11%",
  //       "-10%",
  //       "-9%",
  //       "-8%",
  //       "-7%",
  //       "-6%",
  //       "-5%",
  //       "-4%",
  //       "-3%",
  //       "-2%",
  //       "-1%",
  //       "0%",
  //       "1%",
  //       "2%",
  //       "3%",
  //       "4%",
  //       "5%",
  //       "6%",
  //       "7%",
  //       "8%",
  //       "9%",
  //       "10%",
  //       "11%",
  //       "12%",
  //       "13%",
  //       "14%",
  //       "15%",
  //       "16%",
  //       "17%",
  //       "18%",
  //       "19%",
  //       "20%",
  //       "21%",
  //       "22%",
  //       "23%",
  //       "24%",
  //       "25%",
  //     ],
  //   },
  //   yaxis: [
  //     {
  //       title: {
  //         text: "Annual Profit ($)",
  //       },
  //     },
  //     {
  //       opposite: true,
  //       title: {
  //         text: "Manufacturer Profit ($)",
  //       },
  //     },
  //   ],
  //   series: [
  //     {
  //       name: "Manufacturer Profit",
  //       data:
  //         data.manufacturerProfit &&
  //         formatArrayToTwoDecimals(data.manufacturerProfit),
  //     },
  //     {
  //       name: "Annual Profit",
  //       // data: data.annualProfit.concat(new Array(data.changeInPrice.length - data.annualProfit.length).fill(null)),
  //       data: data.annualProfit && formatArrayToTwoDecimals(data.annualProfit),
  //     },
  //     // {
  //     //   name: 'Change in Price',
  //     //   data: data.changeInPrice.map(value => parseFloat(value)),
  //     //   yaxisIndex: 1,
  //     // },
  //   ],
  //   tooltip: {
  //     shared: true,
  //     intersect: false,
  //   },
  //   legend: {
  //     position: "top",
  //   },
  // };
  const option45s = {
    chart: {
      type: 'line',
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
        enable: false,
      },
      zoom: false,
      zoomin: false,
      zoomout: false,
    
    // zoom: {
    //   enable: true,
    // },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
  },
    title: {
      text: "Effects of Change In Price",
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: '16px',
      },
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // Alternating row colors
        opacity: 0.5
      }
    },
    xaxis: {
      title: {
        text: "% Change in Price",
      },
      categories: [
        "-25%",
        "-24%",
        "-23%",
        "-22%",
        "-21%",
        "-20%",
        "-19%",
        "-18%",
        "-17%",
        "-16%",
        "-15%",
        "-14%",
        "-13%",
        "-12%",
        "-11%",
        "-10%",
        "-9%",
        "-8%",
        "-7%",
        "-6%",
        "-5%",
        "-4%",
        "-3%",
        "-2%",
        "-1%",
        "0%",
        "1%",
        "2%",
        "3%",
        "4%",
        "5%",
        "6%",
        "7%",
        "8%",
        "9%",
        "10%",
        "11%",
        "12%",
        "13%",
        "14%",
        "15%",
        "16%",
        "17%",
        "18%",
        "19%",
        "20%",
        "21%",
        "22%",
        "23%",
        "24%",
        "25%",
      ],
    },
    yaxis: [
      {
        title: {
          text: "Annual Dollar Sales ($)",
        },
      },
      {
        opposite: true,
        title: {
          text: 'Manufacturer Profit',
        },
      },
    ],
    series: [
      {
        name: 'Manufacturer Profit',
        data: data.manufacturerProfit && formatArrayToTwoDecimals(data.manufacturerProfit),
      },
      {
        name: 'Annual Dollar Sales',
        // data: data.annualProfit.concat(new Array(data.changeInPrice.length - data.annualProfit.length).fill(null)),
        data: data.annualProfit && formatArrayToTwoDecimals(data.annualProfit),
      },
      // {
      //   name: 'Change in Price',
      //   data: data.changeInPrice.map(value => parseFloat(value)),
      //   yaxisIndex: 1,
      // },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      zoom:{
        enable:true,
      },
      zoom: false,
      zoomin: false,
      zoomout: false,
    },
    legend: {
      position: 'top'
    }
  };
  function formatArrayToTwoDecimals(arr) {
    console.log(arr);
    return arr.map((num) => Math.floor(num * 100) / 100);
  }

  function formatNumbersUsingToFixed(data) {
    const formattedData = {};
    for (const key in data) {
      formattedData[key] = data[key].map((num) => parseFloat(num.toFixed(2)));
    }
    return formattedData;
  }

  return (
    <div className="simluation_db">
      <div className="container-fluid">
        <div className="sim_retailer_main mb-4">
          <div className="row">
            <div className="dropdown_box_select sim_drop col-lg-4 mx-3">
              <div>
                <Select
                  showSearch
                  placeholder="Select Retailer"
                  onChange={handleRetailerChange}
                  style={{
                    width: "90%",
                  }}
                  className="filtered-accordion-ant-select"
                  maxTagCount="responsive">
                  {retailers?.map((item) => (
                    <Select.Option
                      key={item}
                      value={item}
                      className="custom-tooltip-option"
                      data-tooltip={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="dropdown_box_select sim_drop col-lg-4">
              <Select
                showSearch
                placeholder="Select Brand"
                onChange={handleBrandChange}
                disabled={!selectedRetailer}
                style={{
                  width: "90%",
                }}
                className="filtered-accordion-ant-select"
                maxTagCount="responsive">
                {brands?.map((item) => (
                  <Select.Option
                    key={item}
                    value={item}
                    className="custom-tooltip-option"
                    data-tooltip={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="dropdown_box_select sim_drop col-lg-4">
              <Select
                showSearch
                placeholder="Select Product"
                onChange={handleProductChange}
                disabled={!selectedBrand}
                style={{
                  width: "90%",
                }}
                className="filtered-accordion-ant-select"
                maxTagCount="responsive">
                {products?.map((item) => (
                  <Select.Option
                    key={item}
                    value={item}
                    className="custom-tooltip-option"
                    data-tooltip={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="text-end">
            <div className="row">
              <div className="col-lg-8">
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"></input>
              </div>
              {/* <div className=" col-lg-4">
                <a href="" className="btn btn-primary btn-retailer">
                  Upload Margin{" "}
                </a>
              </div> */}
            </div>
          </div>
        </div>
        {isPriceSimulationLoading ? (
          <div>
            <p>Please wait, while we are fetching the data for you . . .</p>
          </div>
        ) : (
          <div className="animate__animated animate__fadeInUp">
            {/* <!-- Best price --> */}
            <div className="best_price_row mb-4">
              <div>
                {/* // latests code By Dev */}
                <ApexCharts
                  options={option45s}
                  series={option45s.series}
                  height={500}
                  width="100%"
                />
                {/* // new code By Dev
                <ApexCharts
                  options={options}
                  series={series}
                  height={500}
                  width="100%"
                /> */}
                {/* // old code */}
                {/* {MarginSimulationChart.map((val, i) => {
                  return (
                    <ReactEcharts
                      key={i}
                      ref={echartsReactRef}
                      option={getOption(val)}
                      style={{
                        marginBottom: i !== MarginSimulationChart.length - 1 ? "50px" : "0",
                        height: "500px",
                        width: "100%",
                      }}
                    />
                  );
                })} */}
              </div>
              <div className="left_best_price">
                <table className="best_pr_table">
                  <thead>
                    <tr>
                      <th
                        colSpan="2"
                        style={{ backgroundColor: "#174F73", color: "#fff" }}>
                        Best price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <p>List Price</p>
                      </td>
                      <td>
                        <div className="sim_input_fild">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="listPrice"
                            value={marginPriceValues.listPrice}
                            onChange={handleMarginPriceInputChange}
                            min={0}></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>EDLP Spend</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="edlpSpend"
                            value={marginPriceValues.edlpSpend}
                            onChange={handleMarginPriceInputChange}
                            min={0}></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Net Unit Price</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="netUnitPrice"
                            value={netUnitPrice}
                            onChange={handleMarginPriceInputChange}
                            readOnly></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>COGS</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="cogs"
                            value={marginPriceValues.cogs}
                            onChange={handleMarginPriceInputChange}></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Base Price Elasticity</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="basePriceElasticity"
                            value={
                              marginPriceValues?.basePriceElasticity
                                ? marginPriceValues?.basePriceElasticity?.toFixed(
                                    2
                                  )
                                : 0
                            }
                            onChange={handleMarginPriceInputChange}></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Base Price</p>
                      </td>
                      <td>
                        <div className="sim_input_fild border-0">
                          <input
                            type="number"
                            placeholder="Enter the value"
                            className="margin_simu_input"
                            name="basePrice"
                            value={
                              marginPriceValues?.basePrice
                                ? marginPriceValues?.basePrice?.toFixed(2)
                                : 0
                            }
                            onChange={handleMarginPriceInputChange}></input>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Product display row */}
            <div className="sim_retailer_row1 width_td mb-4 ">
              <div>
                <div className="left_best_price col-lg-12">
                  <table className="best_pr_table">
                    <thead>
                      <tr>
                        <th>Product Name </th>
                        <th>Net Unit Price($) </th>
                        <th>Total EDLP Spend($)</th>
                        <th>Manufacturer Margin %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p>{productName}</p>
                        </td>
                        <td>
                          <p>$ {netUnitPrice}</p>
                        </td>
                        <td>
                          <p>$ {marginPriceValues?.edlpSpend}</p>
                        </td>
                        <td>
                          <p>
                            {manufacturerMargin
                              ? manufacturerMargin.toFixed(2)
                              : "-"}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div className="left_best_price col-lg-12">
                  <table className="best_pr_table">
                    <thead>
                      <tr>
                        <th>Product Name </th>
                        <th>Net Unit Price($) </th>
                        <th>Base Price($)</th>
                        <th>Retailer Margin %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p>{productName}</p>
                        </td>
                        <td>
                          <p>
                            {netUnitPrice
                              ? "$ " + netUnitPrice.toFixed(2)
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {marginPriceValues?.basePrice
                              ? "$ " + marginPriceValues?.basePrice.toFixed(2)
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p>
                            {retailerMargin ? retailerMargin.toFixed(2) : "-"}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
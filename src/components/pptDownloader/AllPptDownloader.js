import React from "react";
import pptxgen from "pptxgenjs";
import Logo from "../../assets/images/darkLogo.png";
import { useSelector } from "react-redux";
import download from "../../assets/newIcons/icon-download.svg";
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const generateCommonUIElements = (slide, value, pptx) => {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.19,
    y: 0.49,
    w: 13,
    h: 6.85,
    line: "cccccc",
    fill: {
      color: "ffffff",
    },
  });
  slide.addText(value.question, {
    x: 0.2,
    y: 0.5,
    w: 13,
    h: 0.35,
    fontSize: 14,
    fill: {
      color: "F3F9FA",
    },
  });

  slide.addText(value?.SlideNames[0]?.slide_title ? value?.SlideNames[0]?.slide_title : "", {
    x: 0.2,
    y: 1,
    w: 12,
    h: 0.35,
    fontSize: 14,
    bold: true,
  });
  slide.addImage({
    x: 0.3,
    y: "85%",
    w: 1.4,
    h: 0.9,
    path: Logo,
    objectName: "Company Logo",
  });

  if (value?.Notes?.length > 0) {
    slide.addText("Note:", {
      x: 4,
      y: "85%",
      w: 0.8,
      h: 1,
      fontFace: "Arial",
      fontSize: 16,
      color: "000000", // Black color
      bold: true,
    });
    slide.addText(value?.Notes[0]?.notes, {
      x: 4.6,
      y: "85%",
      w: 4.4,
      h: 1,
      fontFace: "Arial",
      fontSize: 16,
      color: "000000", // Black color
    });
  }

  slide.addImage({
    x: 12.25,
    y: "85%",
    w: 0.9,
    h: 0.9,
    path: "https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg",
    objectName: "animated gif",
  });
};

const AllPptDownloader = () => {
  
  // loader
  const [presentationGenerated, setPresentationGenerated] = React.useState(false);
  // console.log("presentationGenerated::: ", presentationGenerated);
  const adminQuestionsReducer = useSelector((state) => state.getAdminQuestionByModelIdReducer);
  // console.log("adminQuestionsReducer?.question?.data::: ", adminQuestionsReducer?.question?.data);

  const chart1Reducer = useSelector((state) => state.chart1Reducer);
  const chart2Reducer = useSelector((state) => state.chart2Reducer);
  const chart3Reducer = useSelector((state) => state.chart3Reducer);
  const chart4Reducer = useSelector((state) => state.chart4Reducer);
  const chart5Reducer = useSelector((state) => state.chart5Reducer);
  const chart6Reducer = useSelector((state) => state.chart6Reducer);
  const chart7Reducer = useSelector((state) => state.chart7Reducer);
  const chart8Reducer = useSelector((state) => state.chart8Reducer);
  const chart9Reducer = useSelector((state) => state.chart9Reducer);

  // console.log("chart8Reducer::: "  , chart8Reducer?.chart8Data?.data);

  const generateFirstSlide = (slide, pptx) => {
    return new Promise((resolve) => {
      if (adminQuestionsReducer?.question?.data && adminQuestionsReducer?.question?.data[0]) {
        const chartData = [];

        const retailers = {}; // To store unique retailers

        chart1Reducer?.chart1Data?.data.forEach((item) => {
          const retailer = item.Retailer;
          const product = item.Product;
          const price = item.Price_avg_last_4_weeks;

          // Check if the retailer exists in the retailers object
          if (!retailers[retailer]) {
            // Add the retailer as a new data series
            retailers[retailer] = true;
            chartData.push({
              name: retailer,
              labels: [],
              values: [],
            });
          }

          // Add the product as a label and price as a value
          chartData.forEach((series) => {
            if (series.name === retailer) {
              series.labels.push(product);
              series.values.push(price);
            }
          });
        });
        generateCommonUIElements(slide, adminQuestionsReducer?.question?.data[0], pptx);
        slide.addChart(pptx.charts.BAR, chartData, {
          x: 0.35,
          y: 1.0,
          w: "95%",
          h: 5.3,
          showGridlines: false,
          valGridLine: { color: "cc6699", style: "none", size: 1 },
          catAxisTitle: "Product",
          valAxisTitle: "Price Mean",
          showCatAxisTitle: true,
          showValAxisTitle: true,
          showLegend: true,
            legendPos: "t",
        });
        resolve();
      } else {
        console.log("Condition for first slide not met.");
        // Reject the promise when condition is not met
        // eslint-disable-next-line no-undef
        reject("Condition for first slide not met");
      }
    });
  };

  const generateSecondSlide = (slide, pptx) => {
    return new Promise((resolve) => {
      if (adminQuestionsReducer?.question?.data && adminQuestionsReducer?.question?.data[1]) {
        const chart2Data = chart2Reducer?.chart2Data?.data;

        const transformedData = {};

        // Iterate through the chart2Data and group it by Retailer
        if (chart2Data) {
          chart2Data.forEach((item) => {
            const retailer = item.Retailer;
            const product = item.Product;

            // Extract the common part of the label before numeric values
            const commonLabel = product.match(/^(.*?)\d+\s*OZ/)[1];

            // Check if the retailer key already exists in transformedData
            if (!transformedData[retailer]) {
              transformedData[retailer] = {
                multiAxes: false,
                xycoordinated: true,
                quadrant: false,
                Retailer: retailer,
                xAxisTitle: "Ounces(OZ)",
                yAxisTitle: "Price/OZ",
                data: {
                  datasets: [],
                },
              };
            }

            // Check if the dataset label already exists in the retailer's datasets
            const datasetIndex = transformedData[retailer].data.datasets.findIndex(
              (dataset) => dataset.label === commonLabel
            );

            if (datasetIndex === -1) {
              // If the dataset doesn't exist, create it
              transformedData[retailer].data.datasets.push({
                label: commonLabel,
                data: [
                  {
                    x: parseFloat(item.Ounces), // Parse the Ounces as a float
                    y: item.Price_avg_last_4_weeks?.toFixed(2),
                  },
                ],
                borderColor: getRandomColor(), // You can define this function to get random colors
                backgroundColor: getRandomColor(),
                pointRadius: 8,
                pointHoverRadius: 20,
              });
            } else {
              // If the dataset exists, push the data point to it
              transformedData[retailer].data.datasets[datasetIndex].data.push({
                x: parseFloat(item.Ounces),
                y: item.Price_avg_last_4_weeks?.toFixed(2),
              });
            }
          });
        }
        function getRandomColor() {
          const letters = "0123456789ABCDEF";
          let color = "#";
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }

        // Convert the object values into an array
        const formattedChartData = Object.values(transformedData);
        formattedChartData.forEach((retailer, index) => {
          // Create a new slide for each chart (except the first one)
          if (index > 0) {
            pptx.layout = "LAYOUT_WIDE";
            pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: {
                color: "FFFFFF",
              },
              objects: [
                {
                  rect: {
                    x: 0,
                    y: 0,
                    w: "100%",
                    h: 0.35,
                    fill: {
                      color: "174F73",
                    },
                  },
                },
                {
                  text: {
                    text: "North Light Analytics Report",
                    options: {
                      x: 0,
                      y: 0,
                      w: 6,
                      h: 0.35,
                      fontSize: 15,
                      color: "FFFFFF",
                    },
                  },
                },
              ],
              slideNumber: {
                x: 13,
                y: 0,
                color: "ffffff",
                fontSize: 15,
              },
            });
            pptx.addSlide({
              masterName: "PLACEHOLDER_SLIDE",
            });
          }

          // Add chart to the slide
          slide = pptx.slides[pptx.slides.length - 1];
          // Assuming you have a function to generate common UI elements
          generateCommonUIElements(slide, adminQuestionsReducer?.question?.data[1], pptx);
          const datasets = retailer.data.datasets.map((dataset) => {
            const dataPoints = dataset.data.map((point) => ({
              x: point.x,
              y: point.y,
            }));

            return {
              name: dataset.label,
              labels: [],
              values: dataPoints.map((point) => point.y),
              // categoryLabels: dataPoints.map((point) => point.x.toString()),
            };
          });

          const chartOptions = {
            x: 0.35,
            y: 1.0,
            w: "95%",
            h: 5.3,
            showGridlines: false,
            catAxisLabelColor: "494949",
            catAxisLabelFontFace: "Arial",
            catAxisLabelFontSize: 10,
            catAxisOrientation: "minMax",
            showTitle: true,
            titleFontFace: "Calibri Light",
            titleFontSize: 14,
            title: `${retailer.Retailer}`,
            catAxisTitle: "Ounces(0Z)",
            valAxisTitle: "Price/OZ",
            showCatAxisTitle: true,
            showValAxisTitle: true,
          };
          slide.addChart(pptx.charts.LINE, datasets, chartOptions);
        });
        resolve();
      } else {
        // If the condition for the second slide is not met, resolve immediately
        resolve();
      }
    });
  };

  const generateThirdSlide = (slide, pptx) => {
    return new Promise((resolve) => {
      if (adminQuestionsReducer?.question?.data && adminQuestionsReducer?.question?.data[2]) {
        const productData = chart3Reducer?.chart3Data?.data;

        // Create an object to store data for each product
        const productChartData = {};

        // Iterate through the data and group it by product
        productData.forEach((item) => {
          const product = item.Product;
          if (!productChartData[product]) {
            productChartData[product] = {
              labels: [],
              dollarSales: [],
              priceElasticity: [],
            };
          }
          productChartData[product].labels.push(item.Retailer);
          productChartData[product].dollarSales.push(item.Dollar_sales_last_52_weeks);
          productChartData[product].priceElasticity.push(item.Base_Price_Elasticity);
        });

        // Create slides for each product
        Object.keys(productChartData).forEach((product, index) => {
          const productProps = {
            x: 0.35,
            y: 1.0,
            w: "95%",
            h: 5.3,
            showGridlines: false,
            barDir: "col",
            barGrouping: "stacked",
            catAxisLabelColor: "494949",
            catAxisLabelFontFace: "Arial",
            catAxisLabelFontSize: 10,
            catAxisOrientation: "maxMin",
            showLegend: true,
            legendPos: "t",
            showTitle: true,
            titleFontFace: "Calibri Light",
            titleFontSize: 14,
            title: `${product}`,
            valAxes: [
              {
                showValAxisTitle: true,
                valAxisTitle: "Sale Revenue (L52 weeks)",
                valAxisTitleColor: "6E7079",
                valAxisLabelColor: "6E7079",
                valGridLine: { style: "none" },
                valAxisOrientation: "minMax",
              },
              {
                showValAxisTitle: true,
                valAxisTitle: "Base Price Elasticity",
                valAxisTitleColor: "6E7079",
                valAxisLabelColor: "6E7079",
                valGridLine: { style: "none" },
                valAxisOrientation: "maxMin",
              },
            ],
            catAxes: [{ catAxisTitle: "Retailer" }, { catAxisHidden: true }],
          };

          const productComboTypes = [
            {
              type: pptx.charts.BAR,
              data: [
                {
                  name: "Dollar Sales",
                  labels: productChartData[product].labels,
                  values: productChartData[product].dollarSales,
                },
              ],
              options: { chartColors: ["75BEFF"], barGrouping: "stacked" },
            },
            {
              type: pptx.charts.LINE,
              data: [
                {
                  name: "Price Elasticity",
                  labels: productChartData[product].labels,
                  values: productChartData[product].priceElasticity,
                },
              ],
              options: { chartColors: ["FF6384"], secondaryValAxis: true, secondaryCatAxis: true },
            },
          ];

          // Create a new slide for each chart (except the first one)
          if (index > 0) {
            pptx.layout = "LAYOUT_WIDE";
            pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: {
                color: "FFFFFF",
              },
              objects: [
                {
                  rect: {
                    x: 0,
                    y: 0,
                    w: "100%",
                    h: 0.35,
                    fill: {
                      color: "174F73",
                    },
                  },
                },
                {
                  text: {
                    text: "North Light Analytics Report",
                    options: {
                      x: 0,
                      y: 0,
                      w: 6,
                      h: 0.35,
                      fontSize: 15,
                      color: "FFFFFF",
                    },
                  },
                },
              ],
              slideNumber: {
                x: 13,
                y: 0,
                color: "ffffff",
                fontSize: 15,
              },
            });
            pptx.addSlide({
              masterName: "PLACEHOLDER_SLIDE",
            });
          }

          slide = pptx.slides[pptx.slides.length - 1];
          // Generate common UI elements
          generateCommonUIElements(slide, adminQuestionsReducer?.question?.data[2], pptx);

          slide.addChart(productComboTypes, productProps);
        });
        resolve();
      } else {
        console.log("Condition for first slide not met.");
        // Reject the promise when condition is not met
        // eslint-disable-next-line no-undef
        reject("Condition for first slide not met");
      }
    });
  };

  const generateFourthSlide = (slide, pptx) => {
    return new Promise((resolve) => {
      if (adminQuestionsReducer?.question?.data && adminQuestionsReducer?.question?.data[3]) {
        const chartData = chart4Reducer?.chart4Data?.data;
        const productRetailerMap = {};
        chartData.forEach((item) => {
          const product = item.Product;
          const retailer = item.Retailer;

          // Create a key that includes both the product and retailer
          const key = `${product} - ${retailer}`;

          // Check if the key exists in the map; if not, create an array to store data
          if (!productRetailerMap[key]) {
            productRetailerMap[key] = [];
          }

          // Add the data to the array
          productRetailerMap[key].push(item);
        });
        Object.keys(productRetailerMap).forEach((ddd, index) => {
          const productRetailer = ddd.split(" - ");
          const productChartData = productRetailerMap[ddd];

          const chartProps = {
            x: 0.35,
            y: 1.0,
            w: "95%",
            h: 5.3,
            showGridlines: false,
            catAxisLabelColor: "6E7079",
            catAxisLabelFontFace: "Arial",
            catAxisLabelFontSize: 10,
            catAxisOrientation: "minMax",
            showLegend: true,
            legendPos: "t",
            showTitle: true,
            titleFontFace: "Calibri Light",
            titleFontSize: 14,
            title: `${productRetailer[2]} - ${productRetailer[0]} - ${productRetailer[1]}`,
            chartColors: ["5C7BD9", "9FE080"],
            catAxisTitle: "Price Change %",
            showCatAxisTitle: true,
            catAxisTitleColor: "6E7079",
            valAxes: [
              {
                showValAxisTitle: true,
                valAxisTitle: "Volume/Dollar Impact",
                valAxisTitleColor: "6E7079",
                valAxisLabelColor: "6E7079",
                valAxisOrientation: "minMax",
                valGridLine: { style: "none" },
              },
            ],
            catAxes: [{ catAxisTitle: "Price Change %" }],
          };

          // Extract unique change values from the data
          const uniqueChanges = Array.from(
            new Set(
              chartData.reduce((acc, item) => {
                const changes = Object.keys(item)
                  .filter((key) => key.endsWith("_BPE_Volume_Impact"))
                  .map((key) => key.replace("_BPE_Volume_Impact", ""));
                return acc.concat(changes);
              }, [])
            )
          );

          // Map unique change values to their corresponding values
          const volumeLabels = uniqueChanges;
          const volumeValues = uniqueChanges.map((change) => {
            const correspondingValue = chartData.find((item) =>
              Object.keys(item).includes(`${change}_BPE_Volume_Impact`)
            );
            const value = correspondingValue ? parseFloat(correspondingValue[`${change}_BPE_Volume_Impact`]) : null;
            return value !== null ? parseFloat(value.toFixed(2)) : null;
            // return correspondingValue ? correspondingValue[`${change}_BPE_Volume_Impact`] : null;
          });

          const volumeData = {
            name: "Volume Impact",
            labels: volumeLabels,
            values: volumeValues,
            catAxisGroup: 1,
            // color: "5C7BD9",
            options: { chartColors: ["5C7BD9"] },
          };

          // Extract unique change values for Dollar Impact from the data
          const dollarChangeValues = Array.from(
            new Set(
              productChartData.reduce((acc, item) => {
                const changes = Object.keys(item)
                  .filter((key) => key.endsWith("_BPE_Dollar_Impact"))
                  .map((key) => key.replace("_BPE_Dollar_Impact", ""));
                return acc.concat(changes);
              }, [])
            )
          );

          // Map unique change values to their corresponding values for Dollar Impact
          const dollarLabels = dollarChangeValues;
          const dollarValues = dollarChangeValues.map((change) => {
            const correspondingValue = productChartData.find((item) =>
              Object.keys(item).includes(`${change}_BPE_Dollar_Impact`)
            );
            const value = correspondingValue ? parseFloat(correspondingValue[`${change}_BPE_Dollar_Impact`]) : null;
            return value !== null ? parseFloat(value.toFixed(2)) : null;
            // return correspondingValue ? correspondingValue[`${change}_BPE_Dollar_Impact`] : null;
          });

          const dollarData = {
            name: "Dollar Impact",
            labels: dollarLabels,
            values: dollarValues,
            catAxisGroup: 1,
            // color: "9FE080",
            options: { chartColors: ["9FE080"] },
          };

          const chartDataArray = [volumeData, dollarData];
          // console.log("chartDataArray::: ", chartDataArray);

          // Create a new slide for each chart except the first one
          if (index > 0) {
            pptx.layout = "LAYOUT_WIDE";
            pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: {
                color: "FFFFFF",
              },
              objects: [
                {
                  rect: {
                    x: 0,
                    y: 0,
                    w: "100%",
                    h: 0.35,
                    fill: {
                      color: "174F73",
                    },
                  },
                },
                {
                  text: {
                    text: "North Light Analytics Report",
                    options: {
                      x: 0,
                      y: 0,
                      w: 6,
                      h: 0.35,
                      fontSize: 15,
                      color: "FFFFFF",
                    },
                  },
                },
              ],
              slideNumber: {
                x: 13,
                y: 0,
                color: "ffffff",
                fontSize: 15,
              },
            });
            pptx.addSlide({
              masterName: "PLACEHOLDER_SLIDE",
            });
          }

          slide = pptx.slides[pptx.slides.length - 1];
          generateCommonUIElements(slide, adminQuestionsReducer?.question?.data[3], pptx);
          slide.addChart(pptx.charts.LINE, chartDataArray, chartProps);
        });
        resolve();
      } else {
        console.log("Condition for first slide not met.");
        // Reject the promise when condition is not met
        // eslint-disable-next-line no-undef
        reject("Condition for first slide not met");
      }
    });
  };

  const generateFifthSlide = (slide, pptx) => {
    return new Promise((resolve) => {
      if (adminQuestionsReducer?.question?.data && adminQuestionsReducer?.question?.data[4]) {
        const chart5Data = chart5Reducer?.chart5Data?.data || [];
        const transformedData = {};

        // Restructure the data
        chart5Data.forEach((item) => {
          const product = item.Product;
          const retailer = item.Retailer;
          const key = `${product} - ${retailer}`; // Create a unique key based on both Product and Retailer

          if (!transformedData[key]) {
            transformedData[key] = {
              Retailer: item.Retailer,
              Product: item.Product,
              data: {
                labels: [],
                units: [],
                dollars: [],
              },
            };
          }

          // Add data to the "Units" and "Dollars" arrays
          const dollars = item.Price;
          const units = item.Total_Volume;
          const weekEnding = item.WeekEnding;

          transformedData[key].data.labels.push(weekEnding);
          transformedData[key].data.units.push(units);
          transformedData[key].data.dollars.push(dollars);
        });
        Object.keys(transformedData).forEach((key, index) => {
          const chartData = transformedData[key];
          const retailer = chartData.Retailer;
          const product = chartData.Product;
          const labels = chartData.data.labels;
          const units = chartData.data.units;
          const dollars = chartData.data.dollars;

          const chartProps = {
            x: 0.35,
            y: 1.0,
            w: "95%",
            h: 5.3,
            showGridlines: false,
            catAxisLabelColor: "6E7079",
            catAxisLabelFontFace: "Arial",
            catAxisLabelFontSize: 10,
            catAxisOrientation: "minMax",
            showLegend: true,
            legendPos: "t",
            showTitle: true,
            titleFontFace: "Calibri Light",
            titleFontSize: 14,
            title: `${retailer} - ${product}`, // Replace with your retailer and product names
            chartColors: ["5C7BD9", "9FE080"],
            catAxisTitle: " ",
            showCatAxisTitle: true,
            valAxes: [
              {
                showValAxisTitle: true,
                valAxisTitle: "Units",
                valAxisTitleColor: "6E7079",
                valAxisLabelColor: "6E7079",
                valAxisOrientation: "minMax",
                valGridLine: { style: "none" },
              },
              {
                showValAxisTitle: true,
                valAxisTitle: "Price ($)",
                valAxisTitleColor: "6E7079",
                valAxisLabelColor: "6E7079",
                valAxisOrientation: "minMax",
                valGridLine: { style: "none" },
                // secondaryValAxis: true,
              },
            ],
            catAxes: [{ catAxisTitle: "Weeks" }, { catAxisHidden: true }],
          };

          const volumeData = {
            type: pptx.charts.LINE,
            data: [{ name: "Units", labels: labels, values: units }],
            catAxisGroup: 1,
            options: { chartColors: ["5C7BD9"] },
          };

          const dollarData = {
            type: pptx.charts.LINE,
            data: [{ name: "Price", labels: labels, values: dollars }],
            catAxisGroup: 1,
            options: { chartColors: ["9FE080"], secondaryValAxis: true, secondaryCatAxis: true },
          };
          const chartDataArray = [volumeData, dollarData];
          if (index > 0) {
            pptx.layout = "LAYOUT_WIDE";
            pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: {
                color: "FFFFFF",
              },
              objects: [
                {
                  rect: {
                    x: 0,
                    y: 0,
                    w: "100%",
                    h: 0.35,
                    fill: {
                      color: "174F73",
                    },
                  },
                },
                {
                  text: {
                    text: "North Light Analytics Report",
                    options: {
                      x: 0,
                      y: 0,
                      w: 6,
                      h: 0.35,
                      fontSize: 15,
                      color: "FFFFFF",
                    },
                  },
                },
              ],
              slideNumber: {
                x: 13,
                y: 0,
                color: "ffffff",
                fontSize: 15,
              },
            });
            pptx.addSlide({
              masterName: "PLACEHOLDER_SLIDE",
            });
          }

          slide = pptx.slides[pptx.slides.length - 1];
          generateCommonUIElements(slide, adminQuestionsReducer?.question?.data[4], pptx);
          slide.addChart(chartDataArray, chartProps);
        });
        resolve();
      } else {
        console.log("Condition for first slide not met.");
        // Reject the promise when condition is not met
        // eslint-disable-next-line no-undef
        reject("Condition for first slide not met");
      }
    });
  };

  const generateSixthSlide = (slide, pptx) => {
    return new Promise((resolve) => {
      if (adminQuestionsReducer?.question?.data && adminQuestionsReducer?.question?.data[5]) {
        const chart6Data = chart6Reducer?.chart6Data?.data || [];
        const retailers = {};

        chart6Data.forEach((item) => {
          const retailer = item.Retailer;

          if (!retailers[retailer]) {
            retailers[retailer] = {
              Product: [],
              Promo_Price_Elasticity: [],
              Average_discount_depth: [],
            };
          }

          retailers[retailer].Product.push(item.Product);
          retailers[retailer].Promo_Price_Elasticity.push(item.Promo_Price_Elasticity);
          retailers[retailer].Average_discount_depth.push(item.Average_discount_depth);
        });

        Object.keys(retailers).forEach((retailer, index) => {
          const retailerData = retailers[retailer];

          const chartProps = {
            x: 0.35,
            y: 1.0,
            w: "95%",
            h: 5.3,
            showGridlines: false,
            catAxisLabelColor: "494949",
            catAxisLabelFontFace: "Arial",
            catAxisLabelFontSize: 10,
            catAxisOrientation: "minMax",
            showLegend: true,
            legendPos: "t",
            showTitle: true,
            titleFontFace: "Calibri Light",
            titleFontSize: 14,
            title: `${retailer}`,
            chartColors: ["5C7BD9", "9FE080"],
            valAxes: [
              {
                showValAxisTitle: true,
                valAxisTitle: "Promo Price Elasticity",
                valAxisTitleColor: "6E7079",
                valAxisLabelColor: "6E7079",
                valAxisOrientation: "maxMin",
                valGridLine: { style: "none" },
              },
              {
                showValAxisTitle: true,
                valAxisTitle: "Average Discount Depth",
                valAxisTitleColor: "6E7079",
                valAxisLabelColor: "6E7079",
                valAxisOrientation: "minMax",
                valGridLine: { style: "none" },
                secondaryValAxis: true,
              },
            ],
            catAxes: [{ catAxisTitle: "Change", catAxisTickLabelPosition: "high" }, { catAxisHidden: true }],
          };

          const promoPriceElasticityData = {
            type: pptx.charts.BAR,
            data: [
              {
                name: "Promo Price Elasticity",
                labels: retailerData.Product,
                values: retailerData.Promo_Price_Elasticity,
                dataLabelPosition: "b",
              },
            ],
            catAxisGroup: 1,
            options: { chartColors: ["9FE080"] },
          };

          const avgDiscountDepthData = {
            type: pptx.charts.LINE,
            data: [
              {
                name: "Average Discount Depth",
                labels: retailerData.Product,
                values: retailerData.Average_discount_depth,
                dataLabelPosition: "b",
              },
            ],
            catAxisGroup: 1,
            options: { chartColors: ["5C7BD9"], secondaryValAxis: true, secondaryCatAxis: true },
          };

          const chartDataArray = [promoPriceElasticityData, avgDiscountDepthData];

          if (index > 0) {
            pptx.layout = "LAYOUT_WIDE";
            pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: {
                color: "FFFFFF",
              },
              objects: [
                {
                  rect: {
                    x: 0,
                    y: 0,
                    w: "100%",
                    h: 0.35,
                    fill: {
                      color: "174F73",
                    },
                  },
                },
                {
                  text: {
                    text: "North Light Analytics Report",
                    options: {
                      x: 0,
                      y: 0,
                      w: 6,
                      h: 0.35,
                      fontSize: 15,
                      color: "FFFFFF",
                    },
                  },
                },
              ],
              slideNumber: {
                x: 13,
                y: 0,
                color: "ffffff",
                fontSize: 15,
              },
            });
            pptx.addSlide({
              masterName: "PLACEHOLDER_SLIDE",
            });
          }

          slide = pptx.slides[pptx.slides.length - 1];
          generateCommonUIElements(slide, adminQuestionsReducer?.question?.data[5], pptx);
          slide.addChart(chartDataArray, chartProps);
        });
        resolve();
      } else {
        console.log("Condition for first slide not met.");
        // Reject the promise when condition is not met
        // eslint-disable-next-line no-undef
        reject("Condition for first slide not met");
      }
    });
  };

  const generateSeventhSlide = (slide, pptx) => {
    return new Promise((resolve) => {
      if (adminQuestionsReducer?.question?.data && adminQuestionsReducer?.question?.data[6]) {
        const chart7Data = chart7Reducer?.chart7Data?.data || [];
        const retailers = {};

        chart7Data.forEach((item) => {
          const retailer = item.Retailer;

          if (!retailers[retailer]) {
            retailers[retailer] = {
              data: {
                labels: [],
                datasets: [
                  {
                    label: "TPR",
                    data: [],
                  },
                  {
                    label: "Feature Only",
                    data: [],
                  },
                  {
                    label: "Display Only",
                    data: [],
                  },
                  {
                    label: "Feature and Display",
                    data: [],
                  },
                ],
              },
            };
          }

          retailers[retailer].data.labels.push(item.Product);
          retailers[retailer].data.datasets[0].data.push(item.tpr_avg || 0);
          retailers[retailer].data.datasets[1].data.push(item.fo_avg || 0);
          retailers[retailer].data.datasets[2].data.push(item.do_avg || 0);
          retailers[retailer].data.datasets[3].data.push(item.fd_avg || 0);
        });

        Object.keys(retailers).forEach((retailer, index) => {
          const retailerData = retailers[retailer];

          // Define chart properties
          const chartProps = {
            x: 0.35,
            y: 1.0,
            w: "95%",
            h: 5.3,
            showGridlines: false,
            catAxisLabelColor: "494949",
            catAxisLabelFontFace: "Arial",
            catAxisLabelFontSize: 10,
            catAxisOrientation: "minMax",
            showLegend: true,
            legendPos: "t",
            showTitle: true,
            titleFontFace: "Calibri Light",
            titleFontSize: 14,
            title: `${retailer}`,
            chartColors: ["5C7BD9", "9FE080"],
            valAxes: [
              {
                showValAxisTitle: true,
                valAxisTitle: "Promotional Lifts",
                valAxisTitleColor: "6E7079",
                valAxisLabelColor: "6E7079",
                // valAxisOrientation: "maxMin",
                valGridLine: { style: "none" },
              },
            ],
            catAxes: [{ catAxisTitle: "Change" }],
          };
          const chartDataArray = [
            {
              type: pptx.charts.BAR,
              data: retailerData.data.datasets.map((dataset, datasetIndex) => ({
                name: dataset.label,
                labels: retailerData.data.labels,
                values: dataset.data,
                dataLabelPosition: "b",
              })),
              catAxisGroup: 1,
              options: {
                chartColors: [
                  "#5470C6", // Color ---> TPR
                  "#91CC75", // Color ---> Feature Only
                  "#FAC858", // Color ---> Display Only
                  "#EE6666", // Color ---> Feature and Display
                ],
              },
            },
          ];
          if (index > 0) {
            pptx.layout = "LAYOUT_WIDE";
            pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: {
                color: "FFFFFF",
              },
              objects: [
                {
                  rect: {
                    x: 0,
                    y: 0,
                    w: "100%",
                    h: 0.35,
                    fill: {
                      color: "174F73",
                    },
                  },
                },
                {
                  text: {
                    text: "North Light Analytics Report",
                    options: {
                      x: 0,
                      y: 0,
                      w: 6,
                      h: 0.35,
                      fontSize: 15,
                      color: "FFFFFF",
                    },
                  },
                },
              ],
              slideNumber: {
                x: 13,
                y: 0,
                color: "ffffff",
                fontSize: 15,
              },
            });
            pptx.addSlide({
              masterName: "PLACEHOLDER_SLIDE",
            });
          }

          slide = pptx.slides[pptx.slides.length - 1];
          generateCommonUIElements(slide, adminQuestionsReducer?.question?.data[6], pptx);
          slide.addChart(chartDataArray, chartProps);
        });
        resolve();
      } else {
        console.log("Condition for first slide not met.");
        // Reject the promise when condition is not met
        // eslint-disable-next-line no-undef
        reject("Condition for first slide not met");
      }
    });
  };

  const generateEightSlide = (slide, pptx) => {
    return new Promise((resolve) => {
      if (adminQuestionsReducer?.question?.data && adminQuestionsReducer?.question?.data[7]) {
        const chart8Data = chart8Reducer?.chart8Data?.data || [];

        chart8Data.forEach((item, index) => {
          const transformedItem = {
            multiAxes: false,
            xycoordinated: false,
            quadrant: false,
            Retailer: item.Retailer,
            Product: item.Product,
            xAxisTitle: "% Discount",
            yAxisTitle: "% Volume Lift",
            data: {
              labels: [],
              datasets: [],
            },
          };
          const chartProps = {
            x: 0.35,
            y: 1.0,
            w: "95%",
            h: 5.3,
            showGridlines: false,
            catAxisLabelColor: "494949",
            catAxisLabelFontFace: "Arial",
            catAxisLabelFontSize: 10,
            catAxisOrientation: "minMax",
            showLegend: true,
            legendPos: "t",
            showTitle: true,
            titleFontFace: "Calibri Light",
            titleFontSize: 14,
            title: `${transformedItem.Retailer} - ${transformedItem.Product}`,
            chartColors: ["5C7BD9", "9FE080"],
            showCatAxisTitle: true,
            valAxes: [
              {
                showValAxisTitle: true,
                valAxisTitle: "% Volume Lift",
                valAxisTitleColor: "6E7079",
                valAxisLabelColor: "6E7079",
                // valAxisOrientation: "maxMin",
                valGridLine: { style: "none" },
              },
            ],
            catAxes: [{ catAxisTitle: "% Discount" }],
          };

          // Create a mapping to group datasets by label name
          const datasetMapping = {};

          // Iterate through the original data properties to dynamically populate labels and datasets
          for (const key in item) {
            if (key.includes("%_")) {
              const originalLabel = key.split("_")[1];
              const label = getRenamedLabel(originalLabel); // Get the renamed label
              const percentage = parseFloat(key.match(/\d+/)[0]); // Extract the numeric value before %

              transformedItem.data.labels.push(`${percentage}%`); // Push the extracted percentage value
              if (!datasetMapping[label]) {
                datasetMapping[label] = {
                  label: label,
                  data: [],
                  pointStyle: getPointStyle(label),
                };
              }
              datasetMapping[label].data.push(item[key]);
            }
          }

          // Add non-repetitive baseLabel data
          transformedItem.data.labels = [...new Set(transformedItem.data.labels)];

          // Populate datasets with grouped data
          for (const label in datasetMapping) {
            transformedItem.data.datasets.push({
              label: datasetMapping[label].label,
              data: datasetMapping[label].data,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              pointStyle: datasetMapping[label].pointStyle,
              pointRadius: 10,
              pointHoverRadius: 15,
            });
          }

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

          // Function to determine point style based on label
          function getPointStyle(label) {
            switch (label) {
              case "Feature Only":
                return "triangle";
              case "Display Only":
                return "rectRot";
              case "Feature and Display":
                return "crossRot";
              case "TPR":
              default:
                return "circle";
            }
          }

          if (index > 0) {
            pptx.layout = "LAYOUT_WIDE";
            pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: {
                color: "FFFFFF",
              },
              objects: [
                {
                  rect: {
                    x: 0,
                    y: 0,
                    w: "100%",
                    h: 0.35,
                    fill: {
                      color: "174F73",
                    },
                  },
                },
                {
                  text: {
                    text: "North Light Analytics Report",
                    options: {
                      x: 0,
                      y: 0,
                      w: 6,
                      h: 0.35,
                      fontSize: 15,
                      color: "FFFFFF",
                    },
                  },
                },
              ],
              slideNumber: {
                x: 13,
                y: 0,
                color: "ffffff",
                fontSize: 15,
              },
            });
            pptx.addSlide({
              masterName: "PLACEHOLDER_SLIDE",
            });
          }
          const slide = pptx.slides[pptx.slides.length - 1];
          const chartDataArray = [
            {
              type: pptx.charts.LINE,
              data: transformedItem.data.datasets.map((dataset) => ({
                name: dataset.label,
                labels: transformedItem.data.labels,
                values: dataset.data,
              })),
              options: {
                title: `${transformedItem.Retailer} - ${transformedItem.Product}`,
                chartColors: ["#5470C6", "#91CC75", "#FAC858", "#ee6666"],
              },
            },
          ];
          generateCommonUIElements(slide, adminQuestionsReducer?.question?.data[7], pptx);
          slide.addChart(chartDataArray, chartProps);
          // console.log('chartDataArray::: ', chartDataArray);
        });
        resolve();
      } else {
        console.log("Condition for first slide not met.");
        // Reject the promise when condition is not met
        // eslint-disable-next-line no-undef
        reject("Condition for first slide not met");
      }
    });
  };

  const generateNingthSlide = (slide, pptx) => {
    return new Promise((resolve) => {
      if (adminQuestionsReducer?.question?.data && adminQuestionsReducer?.question?.data[8]) {
        // const chart9Reducer = useSelector((state) => state.chart9Reducer);

        const chartDataMap = {};

        chart9Reducer?.chart9Data?.data?.forEach((item, index) => {
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

        const transformedChartData = Object.values(chartDataMap);

        transformedChartData.forEach((retailerData, index) => {
          const chartData = [];

          // First object with 'X-Axis' containing only x values
          chartData.push({
            name: "X-Axis",
            values: retailerData?.data?.datasets
              ?.map((val) => {
                return val.data.map((point) => point.x).flat();
              })
              .flat(),
          });

          // Subsequent objects with 'labels' and 'values' structure
          retailerData.data.datasets.slice(1).forEach((val, index) => {
            const labels = retailerData?.data?.datasets.map((dataset) => dataset.data.map((point) => point.x)).flat();

            const values = new Array(labels[0].length).fill(null);
            values[index] = val.data[0].y;

            chartData.push({
              name: val.label,
              labels: labels,
              values: values,
            });
          });

          const chartProps = {
            x: 0.35,
            y: 1.0,
            w: "95%",
            h: 5.3,
            showValAxisTitle: false,
            lineSize: 0,
            // catAxisTitle: "Base Price Elasticity",
            catAxisTitleColor: "428442",
            catAxisTitleFontSize: 14,
            catAxisOrientation: "maxMin",
            catAxisMinVal: -2,
            catAxisMaxVal: 0,
            showCatAxisTitle: false,
            showLabel: false, // Must be set to true or labels will not be shown
            dataLabelPosition: "b",
            valAxisMinVal: -3, // Set minimum value for y-axis
            valAxisMaxVal: 0, // Set maximum value for y-axis
            valAxisMajorUnit: 1,
            valAxisOrientation: "maxMin",
            // catAxisTitle: "Product",
            valAxisTitle: "Price Mean",
            // showCatAxisTitle: true,
            // showValAxisTitle: true,
          };
          const combinedChartProps = { ...chartProps };
          if (index > 0) {
            pptx.layout = "LAYOUT_WIDE";
            pptx.defineSlideMaster({
              title: "PLACEHOLDER_SLIDE",
              background: {
                color: "FFFFFF",
              },
              objects: [
                {
                  rect: {
                    x: 0,
                    y: 0,
                    w: "100%",
                    h: 0.35,
                    fill: {
                      color: "174F73",
                    },
                  },
                },
                {
                  text: {
                    text: "North Light Analytics Report",
                    options: {
                      x: 0,
                      y: 0,
                      w: 6,
                      h: 0.35,
                      fontSize: 15,
                      color: "FFFFFF",
                    },
                  },
                },
              ],
              slideNumber: {
                x: 13,
                y: 0,
                color: "ffffff",
                fontSize: 15,
              },
            });
            pptx.addSlide({
              masterName: "PLACEHOLDER_SLIDE",
            });
          }

          slide = pptx.slides[pptx.slides.length - 1];
          generateCommonUIElements(slide, adminQuestionsReducer?.question?.data[8], pptx);
          slide.addChart(pptx.charts.SCATTER, chartData, combinedChartProps);
        });
        resolve();
      } else {
        console.log("Condition for first slide not met.");
        // Reject the promise when condition is not met
        // eslint-disable-next-line no-undef
        reject("Condition for first slide not met");
      }
    });
  };

  const RunDemo = async () => {
    try {
      setPresentationGenerated(true);
      let pptx = new pptxgen();
      pptx.layout = "LAYOUT_WIDE";
      pptx.defineSlideMaster({
        title: "PLACEHOLDER_SLIDE",
        background: {
          color: "FFFFFF",
        },
        objects: [
          {
            rect: {
              x: 0,
              y: 0,
              w: "100%",
              h: 0.35,
              fill: {
                color: "174F73",
              },
            },
          },
          {
            text: {
              text: "North Light Analytics Report",
              options: {
                x: 0,
                y: 0,
                w: 6,
                h: 0.35,
                fontSize: 15,
                color: "FFFFFF",
              },
            },
          },
        ],
        slideNumber: {
          x: 13,
          y: 0,
          color: "ffffff",
          fontSize: 15,
        },
      });
      let slide = pptx.addSlide({
        masterName: "PLACEHOLDER_SLIDE",
      });

      slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.19,
        y: 0.49,
        w: 13,
        h: 6.85,
        line: "cccccc",
        fill: {
          color: "ffffff",
        },
      });

      await generateFirstSlide(slide, pptx);
      let slide2 = pptx.addSlide();
      await generateSecondSlide(slide2, pptx);
      let slide3 = pptx.addSlide();
      await generateThirdSlide(slide3, pptx);
      let slide4 = pptx.addSlide();
      await generateFourthSlide(slide4, pptx);
      let slide5 = pptx.addSlide();
      await generateFifthSlide(slide5, pptx);
      let slide6 = pptx.addSlide();
      await generateSixthSlide(slide6, pptx);
      let slide7 = pptx.addSlide();
      await generateSeventhSlide(slide7, pptx);
      let slide8 = pptx.addSlide();
      await generateEightSlide(slide8, pptx);
      let slide9 = pptx.addSlide();
      await generateNingthSlide(slide9, pptx);

      slide.addImage({
        x: 12.25,
        y: "85%",
        w: 0.9,
        h: 0.9,
        path: "https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg",
        objectName: "animated gif",
      });
      // slide.addNotes("This is my favorite slide!");
      await pptx.writeFile({ fileName: `All Slides.pptx` });
      toast("Download Start");
    } catch (e) {
      //   console.error("e::: ", e);
      setPresentationGenerated(false);
    } finally {
      // Set the state back to false when the process is complete
      setPresentationGenerated(false);
        
    }
  };

//  const disabled = {
//     pointer-events: none;
//     cursor: default;
//   }

  const mystyle = {
    PointerEvent:'none',
    cursor:'not-allowed'
  };

  const mystyleTrue = {
    PointerEvent:'',
    cursor:''
  };

  return (
    <>
      {/* Your component JSX */}
      {/* <button
        onClick={(e) => {
          e.stopPropagation();
          RunDemo();
        }}
        style={{ backgroundColor: "transparent" }}
      >
        Download
      </button> */}
      <a
        // disabled={true}
        style={presentationGenerated ?  mystyle : mystyleTrue}
        href="#!"
        className="btn btn-outline-primary d-inline-flex items-center gap-3"
        onClick={() => {  RunDemo();}}
      >
        Download 
        <i className="fa-solid fa-file-export ms-0"></i>
        {/* <img src={download} alt="Download" /> */}
      </a>
      <ToastContainer/>
    </>
  );
};

export default AllPptDownloader;

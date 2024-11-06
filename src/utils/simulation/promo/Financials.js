import React from "react";
import ApexCharts from "react-apexcharts";

export default function Financials({ promotedPrice, units, increamentalUnits, basePrice, isPriceSimulationLoading }) {
    const echartsReactRef = React.useRef(null);
    const [eventResults, setEventResults] = React.useState([]);
    const [chartType, setChartType] = React.useState("rangeArea");
    const [isStacked, setIsStacked] = React.useState(false);
    const [financialsChartData, setFinancialsChartData] = React.useState([]);
    const [financialPriceValues, setFinancialPriceValues] = React.useState({
        listPrice: "",
        edlpPerUnitRate: "",
        promoPerUnitRate: "",
        fixedFee: "",
    });
    const handleFinancialPriceInputChange = (event) => {
        const { name, value } = event.target;
        setFinancialPriceValues((prevInputValues) => ({
            ...prevInputValues,
            [name]: value,
        }));
    };
    React.useEffect(() => {
        let grossRevenue = units * promotedPrice;
        let variableSpend =
            (parseFloat(financialPriceValues.edlpPerUnitRate) + parseFloat(financialPriceValues.promoPerUnitRate)) * units;
        let totalSpend = financialPriceValues.fixedFee
            ? parseFloat(financialPriceValues.fixedFee) + variableSpend
            : variableSpend;
        // console.log(variableSpend, totalSpend, financialPriceValues);
        let increamentalRevenue = increamentalUnits * promotedPrice;
        let variableContributionMargin = parseFloat(financialPriceValues.vcm);
        let increamentalProfit = increamentalUnits * variableContributionMargin - totalSpend;
        let percentageROI = (increamentalProfit / totalSpend) * 100;
        let retailerEverydayMargin = ((basePrice - financialPriceValues?.listPrice) / basePrice) * 100;
        let netCost =
            financialPriceValues.listPrice -
            financialPriceValues.edlpPerUnitRate -
            financialPriceValues.promoPerUnitRate -
            financialPriceValues.fixedFee / units;
        let retailerPromoMargin = ((promotedPrice - netCost) / promotedPrice) * 100;
        let retailerProfit = units * promotedPrice - netCost * units;
        setEventResults([
            {
                name: "Gross Revenue",
                value: !isNaN(grossRevenue) && parseFloat(grossRevenue) !== 0 ? grossRevenue.toFixed(2) + "$" : "-",
            },
            {
                name: "Total Spend",
                value: !isNaN(totalSpend) ? totalSpend.toFixed(2) + "$" : "-",
            },
            {
                name: "Incremental Revenue",
                value:
                    !isNaN(increamentalRevenue) && parseFloat(increamentalRevenue) !== 0
                        ? increamentalRevenue.toFixed(2) + "$"
                        : "-",
            },
            {
                name: "Incremental Profit",
                value: !isNaN(increamentalProfit) ? increamentalProfit.toFixed(2) + "$" : "-",
            },
            {
                name: "Sales ROI",
                value: !isNaN(percentageROI) ? percentageROI.toFixed(2) + "%" : "-",
            },
            {
                name: "Retail Promo Margin %",
                value: !isNaN(retailerPromoMargin) ? retailerPromoMargin.toFixed(2) + "%" : "-",
            },
            {
                name: "Retail Everyday Margin %",
                value: !isNaN(retailerEverydayMargin) && promotedPrice ? retailerEverydayMargin.toFixed(2) + "%" : "-",
            },
            {
                name: "Retail Profit",
                value: !isNaN(retailerProfit) && parseFloat(retailerProfit) !== 0 ? retailerProfit.toFixed(2) + "$" : "-",
            },
        ]);
        setFinancialsChartData([{
            xAxisTitle: "% Change in Price",
            leftyAxisTitle: "Dollars",
            rightyAxisTitle: "Percent ROI and Margin",
            data: {
                labels: ["Gross Revenue", "Incremental Revenue", "Incremental Profit", "Sales ROI", "Retail Promo Margin %"],
                datasets: [
                    {
                        name: "Gross Revenue",
                        data: [grossRevenue || 0, null, null, null, null],
                        type: 'column',
                    },
                    {
                        name: "Incremental Revenue",
                        data: [null, increamentalRevenue || 0, null, null, null],
                        type: 'column',
                    },
                    {
                        name: "Incremental Profit",
                        data: [null, null, increamentalProfit || 0, null, null],
                        type: 'column',
                    },
                    {
                        name: "Sales ROI",
                        data: [null, null, null, percentageROI || 0, null],
                        type: 'column',
                    },
                    {
                        name: "Retail Promo Margin %",
                        data: [null, null, null, null, retailerPromoMargin || 0],
                        type: 'column',
                    }
                ],
            },
        }]);

    }, [financialPriceValues, units, promotedPrice, basePrice]);


    const getApexOptions = (chartData) => {
        const { xAxisTitle, leftyAxisTitle, rightyAxisTitle, data } = chartData;

        // Find min and max values for left y-axis series (first 3 datasets)
        const leftAxisData = data.datasets
            .slice(0, 3)  // Gross Revenue, Incremental Revenue, Incremental Profit
            .flatMap(dataset => dataset.data)
            .filter(val => val !== null && val !== undefined && !isNaN(val));

        const minValue = Math.min(...leftAxisData);
        const maxValue = Math.max(...leftAxisData);
        const padding = Math.abs(maxValue - minValue) * 0; // 10% padding

        return {
            chart: {
                type: chartType, // Default chart type
                // zoom: {
                //     enable: false,
                // },
                // zoomin: false,
                // zoomout: false,

                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        customIcons: [
                            {
                                icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,29V7H32V29Z"></path><path d="M 7 10 L 13 10 L 13 26 L 11.4 26 L 11.4 11.6 L 8.6 11.6 L 8.6 26 L 7 26 Z" class="clr-i-outline clr-i-outline-path-2"></path><path d="M 15 19 L 21 19 L 21 26 L 19.4 26 L 19.4 20.6 L 16.6 20.6 L 16.6 26 L 15 26 Z" class="clr-i-outline clr-i-outline-path-3"></path><path d="M 23 16 L 29 16 L 29 26 L 27.4 26 L 27.4 17.6 L 24.6 17.6 L 24.6 26 L 23 26 Z" class="clr-i-outline clr-i-outline-path-4"></path><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
                                title: "Switch to Bar Chart",
                                class: "custom-icon-bar",
                                index: -1,
                                click: () => setChartType("bar"),
                            },
                            {
                                icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M 32 5 L 4 5 C 2.895 5 2 5.895 2 7 L 2 29 C 2 30.105 2.895 31 4 31 L 32 31 C 33.105 31 34 30.105 34 29 L 34 7 C 34 5.895 33.105 5 32 5 Z M 4 29 L 4 7 L 32 7 L 32 29 Z"></path><polygon points="15.62 15.222 9.602 23.968 5.55 20.384 6.61 19.186 9.308 21.572 15.634 12.38 22.384 22.395 29.138 13.47 30.414 14.436 22.308 25.145" class="clr-i-outline clr-i-outline-path-2"></polygon><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
                                title: "Switch to Line Chart",
                                class: "custom-icon-line",
                                index: -1,
                                click: () => setChartType("line"),
                            },
                            {
                                icon: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 8.04144L12 3.99999L5 8.04145V9.7735L12 13.8149L19 9.7735V8.04144ZM6.5 8.90747L12 5.73204L17.5 8.90747L12 12.0829L6.5 8.90747Z" fill="#1F2328"/><path d="M19 14.1789V15.911L12 19.9524L5 15.911V14.1789L12 18.2204L19 14.1789Z" fill="#1F2328"/><path d="M19 11.1765V12.9086L12 16.95L5 12.9086V11.1765L12 15.218L19 11.1765Z" fill="#1F2328"/></svg>`,
                                title: isStacked ? "Tile" : "Stack",
                                class: "custom-icon-line",
                                index: -1,
                                click: () => setIsStacked(isStacked ? false : true),
                            },
                        ],
                    },
                },
            },
            xaxis: {
                categories: data.labels,
                title: {
                    text: xAxisTitle,
                },
                labels: {
                    // rotate: 45,
                },
            },
            // yaxis: [
            //     {
            //         title: {
            //             text: leftyAxisTitle,
            //         },
            //         seriesName: "Gross Revenue",
            //         labels: {
            //             formatter: (value) => {
            //                 if (value === null || value === undefined) return '-';
            //                 return value.toFixed(2) + ' $';
            //             },
            //             style: {
            //                 colors: ['#000']
            //             }
            //         },
            //     },
            //     {
            //         // show: false,
            //         seriesName: "Incremental Revenue",
            //         labels: {
            //             show: false,
            //             formatter: (value) => {
            //                 if (value === null || value === undefined) return '-';
            //                 return value.toFixed(2) + ' $';
            //             },
            //             style: {
            //                 colors: ['#000']
            //             }
            //         },
            //     },
            //     {

            //         // show: false,
            //         seriesName: "Incremental Profit",
            //         labels: {
            //             show: false,
            //             formatter: (value) => {
            //                 if (value === null || value === undefined) return '-';
            //                 return value.toFixed(2) + ' $';
            //             },
            //             style: {
            //                 colors: ['#000']
            //             }
            //         },
            //     },
            //     {
            //         opposite: true,
            //         title: {
            //             text: rightyAxisTitle,
            //         },
            //         labels: {
            //             formatter: (value) => {
            //                 if (value === null || value === undefined) return '-';
            //                 return value.toFixed(2) + ' %';
            //             }
            //         },
            //     },
            // ],
            yaxis: [
                {
                    title: {
                        text: leftyAxisTitle,
                    },
                    min: Math.floor(minValue - padding),
                    max: Math.ceil(maxValue + padding),
                    labels: {
                        formatter: (value) => {
                            if (value === null || value === undefined) return '-';
                            return value.toFixed(2) + ' $';
                        },
                        style: {
                            colors: ['#000']
                        }
                    },
                },
                {
                    seriesName: "Incremental Revenue",
                    show: false,
                    min: Math.floor(minValue - padding),
                    max: Math.ceil(maxValue + padding),
                    labels: {
                        formatter: (value) => {
                            if (value === null || value === undefined) return '-';
                            return value.toFixed(2) + ' $';
                        },
                        style: {
                            colors: ['#000']
                        }
                    }
                },
                {
                    seriesName: "Incremental Profit",
                    show: false,
                    min: Math.floor(minValue - padding),
                    max: Math.ceil(maxValue + padding),
                    labels: {
                        formatter: (value) => {
                            if (value === null || value === undefined) return '-';
                            return value.toFixed(2) + ' $';
                        },
                        style: {
                            colors: ['#000']
                        }
                    }
                },
                {
                    opposite: true,
                    title: {
                        text: rightyAxisTitle,
                    },
                    labels: {
                        formatter: (value) => {
                            if (value === null || value === undefined) return '-';
                            return value.toFixed(2) + ' %';
                        }
                    },
                },
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    // columnWidth: '55%',
                    // endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (val, opts) {
                    if (val === null || val === undefined || val === 0) return '-';

                    // Safely check if the series is percentage-based
                    const isPercentage = ['Sales ROI', 'Retail Promo Margin %'].includes(opts.w.globals.seriesNames[opts.seriesIndex]);

                    return val.toFixed(2) + (isPercentage ? ' %' : ' $');
                },
                style: {
                    colors: ['#000']
                }
            },

            legend: {
                position: "top",
                horizontalAlign: "center",
            },
            series: data.datasets.map((dataset) => ({
                name: dataset.name,
                data: dataset.data.map(val => val === null ? 0 : parseFloat(val)),
                type: dataset.type || chartType,
            })),
            tooltip: {
                shared: true,
                intersect: false,
            },
            stroke: {
                curve: "smooth",
            },
            markers: {
                size: 4,
            },
        };
    };
    // console.log(eventResults);
    // console.log(financialsChartData,"financialchardata" );


    return (
        <div className="simluation_db">
            <div className="container-fluid">
                <div className="sim_retailer_main mb-4" style={{ gridTemplateColumns: "auto" }}>
                    <p>Financial Analysis</p>
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
                                {financialsChartData.map((chartData, index) => (
                                    <ApexCharts
                                        key={`financials-${index}-${chartType}`}
                                        options={getApexOptions(chartData)}
                                        series={chartData.data.datasets}
                                        type={chartType}
                                        height={500}
                                        width="90%"
                                        style={{ marginBottom: index !== financialsChartData.length - 1 ? "50px" : "0" }}
                                    />
                                ))}
                            </div>
                            <div className="left_best_price">
                                <table className="best_pr_table">
                                    <thead>
                                        <tr>
                                            <th colSpan="2" style={{ backgroundColor: "#174F73", color: "#fff" }}>
                                                Financials
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
                                                        value={financialPriceValues.listPrice}
                                                        onChange={handleFinancialPriceInputChange}
                                                        min={0}
                                                    ></input>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <p>EDLP Per Unit Rate</p>
                                            </td>
                                            <td>
                                                <div className="sim_input_fild border-0">
                                                    <input
                                                        type="number"
                                                        placeholder="Enter the value"
                                                        className="margin_simu_input"
                                                        name="edlpPerUnitRate"
                                                        value={financialPriceValues.edlpPerUnitRate}
                                                        onChange={handleFinancialPriceInputChange}
                                                        min={0}
                                                    ></input>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>Promo Per Unit Rate</p>
                                            </td>
                                            <td>
                                                <div className="sim_input_fild border-0">
                                                    <input
                                                        type="number"
                                                        placeholder="Enter the value"
                                                        className="margin_simu_input"
                                                        name="promoPerUnitRate"
                                                        value={financialPriceValues.promoPerUnitRate}
                                                        onChange={handleFinancialPriceInputChange}
                                                    ></input>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>VCM</p>
                                            </td>
                                            <td>
                                                <div className="sim_input_fild border-0">
                                                    <input
                                                        type="number"
                                                        placeholder="Enter the value"
                                                        className="margin_simu_input"
                                                        name="vcm"
                                                        value={financialPriceValues.vcm}
                                                        onChange={handleFinancialPriceInputChange}
                                                    ></input>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>Fixed Fees</p>
                                            </td>
                                            <td>
                                                <div className="sim_input_fild border-0">
                                                    <input
                                                        type="number"
                                                        placeholder="Enter the value"
                                                        className="margin_simu_input"
                                                        name="fixedFee"
                                                        value={financialPriceValues.fixedFee}
                                                        onChange={handleFinancialPriceInputChange}
                                                    ></input>
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
                                                <th colSpan={2}>Event Results </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eventResults &&
                                                eventResults.map((ele) => (
                                                    <tr>
                                                        <td>
                                                            <p>{ele.name}</p>
                                                        </td>

                                                        <td>
                                                            <p>{ele.value ? ele.value : "-"}</p>
                                                        </td>
                                                    </tr>
                                                ))}
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


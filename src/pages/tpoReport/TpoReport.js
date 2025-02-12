import React, { useState, useEffect } from "react";
import "../../css/style.css";
import { Accordion } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import { getResult } from "../../utils/financialCalculations";
import { useParams } from "react-router";
import pptxgen from "pptxgenjs";
import Logo from "../../assets/images/darkLogo.png";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useEvents } from "../../hooks/useEvents";

const TpoReport = () => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const user_id = authData?.user_id;
    const { project_name, project_id, model_id, id } = useParams();
    const { events } = useEvents();
    const [chartData, setChartData] = useState({
        series: [{
            name: 'ROI',
            data: []
        }],
        options: {
            chart: {
                type: 'bar',
                height: 400
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    distributed: true
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val.toFixed(1) + '%';
                },
                style: {
                    colors: ['#fff']
                }
            },
            xaxis: {
                categories: [],
                title: {
                    text: 'Events'
                }
            },
            yaxis: {
                title: {
                    text: 'ROI (%)'
                }
            },
            legend: {
                show: false
            },
            colors: ['#52c41a'],
            theme: {
                mode: 'light'
            }
        }
    });
    const [summaryData, setSummaryData] = useState({
        total: 0,
        positiveROI: 0,
        negativeROI: 0,
        avgROI: 0,
        totalSpend: 0
    });
    const [presentationGenerated, setPresentationGenerated] = React.useState(false);
    const [chart2Data, setChart2Data] = useState({
        series: [{
            name: 'ROI',
            data: []
        }],
        options: {
            chart: {
                type: 'bar',
                height: 400
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    distributed: true
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val.toFixed(1) + '%';
                },
                style: {
                    colors: ['#fff']
                }
            },
            annotations: {
                yaxis: [{
                    y: 20, // Average ROI line at 20%
                    borderColor: '#000',
                    label: {
                        text: 'Avg. ROI: 20%',
                        position: 'left',
                        style: {
                            color: '#000'
                        }
                    }
                }]
            },
            xaxis: {
                categories: [],
                title: {
                    text: 'Accounts'
                }
            },
            yaxis: {
                title: {
                    text: 'ROI (%)'
                }
            },
            legend: {
                show: false
            },
            colors: ['#52c41a'],
            theme: {
                mode: 'light'
            }
        }
    });

    useEffect(() => {
        if (events.length) {
            calculateChartData();
            calculateChart2Data();
        }
    }, [events]);

    const calculateChartData = () => {
        let totalSpend = 0;
        let positiveCount = 0;
        let negativeCount = 0;
        let eventNames = [];
        let roiValues = [];

        // Transform events data for chart
        events.forEach(event => {
            let eventROI = 0;
            let eventSpend = 0;

            // Calculate ROI for each product in event
            event.planned.forEach(product => {
                const { financialResults } = getResult(product.financialData);
                const roiResult = financialResults.find(r => r.name === "Sales ROI")?.value;
                const spendResult = financialResults.find(r => r.name === "Total Spend")?.value;

                const roi = Number(roiResult?.replace(/[^0-9.-]+/g, "")) || 0;
                const spend = Number(spendResult?.replace(/[^0-9.-]+/g, "")) || 0;

                eventROI += roi;
                eventSpend += spend;
            });

            // Average ROI across products
            eventROI = eventROI / event.planned.length;
            totalSpend += eventSpend;

            if (eventROI > 0) positiveCount++;
            if (eventROI < 0) negativeCount++;

            eventNames.push(event.name || `Event ${event.id}`);
            roiValues.push(eventROI);
        });

        // Sort by ROI descending
        const sortedIndices = roiValues.map((val, idx) => idx)
            .sort((a, b) => roiValues[b] - roiValues[a]);

        const sortedNames = sortedIndices.map(i => eventNames[i]);
        const sortedValues = sortedIndices.map(i => roiValues[i]);

        // Create colors array based on ROI values
        const colors = sortedValues.map(value => value >= 0 ? '#52c41a' : '#ff4d4f');

        setChartData(prev => ({
            ...prev,
            series: [{
                name: 'ROI',
                data: sortedValues
            }],
            options: {
                ...prev.options,
                colors: colors,
                xaxis: {
                    ...prev.options.xaxis,
                    categories: sortedNames
                }
            }
        }));

        setSummaryData({
            total: events.length,
            positiveROI: positiveCount,
            negativeROI: negativeCount,
            avgROI: roiValues.reduce((acc, curr) => acc + curr, 0) / roiValues.length,
            totalSpend
        });
    };

    const calculateChart2Data = () => {
        // Group events by retailer and calculate average ROI
        const retailerROIs = {};
        let totalROI = 0;
        let retailerCount = 0;

        events.forEach(event => {
            const retailer = event.retailer_id;
            if (!retailerROIs[retailer]) {
                retailerROIs[retailer] = {
                    totalROI: 0,
                    count: 0
                };
            }

            let eventROI = 0;
            // Calculate ROI for each product in event
            event.planned.forEach(product => {
                const { financialResults } = getResult(product.financialData);
                const roiResult = financialResults.find(r => r.name === "Sales ROI")?.value;
                const roi = Number(roiResult?.replace(/[^0-9.-]+/g, "")) || 0;
                eventROI += roi;
            });

            // Average ROI across products in the event
            eventROI = eventROI / event.planned.length;
            retailerROIs[retailer].totalROI += eventROI;
            retailerROIs[retailer].count += 1;
            totalROI += eventROI;
            retailerCount++;
        });

        // Calculate average ROI for each retailer
        const accounts = [];
        const roiValues = [];

        Object.entries(retailerROIs).forEach(([retailer, data]) => {
            const avgROI = data.totalROI / data.count;
            accounts.push(retailer);
            roiValues.push(avgROI);
        });

        // Calculate overall average ROI
        const avgROI = totalROI / retailerCount;

        // Create colors array based on ROI values
        const colors = roiValues.map(value => {
            if (value >= 35) return '#52c41a';  // High positive - Green
            if (value > 0) return '#ffd700';     // Low positive - Yellow
            return '#ff4d4f';                    // Negative - Red
        });

        setChart2Data(prev => ({
            ...prev,
            series: [{
                name: 'ROI',
                data: roiValues
            }],
            options: {
                ...prev.options,
                colors: colors,
                xaxis: {
                    ...prev.options.xaxis,
                    categories: accounts
                },
                annotations: {
                    yaxis: [{
                        y: avgROI,
                        borderColor: '#000',
                        label: {
                            text: `Avg. ROI: ${avgROI.toFixed(1)}%`,
                            position: 'left',
                            style: {
                                color: '#000'
                            }
                        }
                    }]
                }
            }
        }));
    };

    const generatePPT = async () => {
        try {
            setPresentationGenerated(true);
            let pptx = new pptxgen();
            pptx.layout = "LAYOUT_WIDE";

            // Add master slide
            pptx.defineSlideMaster({
                title: "PLACEHOLDER_SLIDE",
                background: { color: "FFFFFF" },
                objects: [
                    {
                        rect: {
                            x: 0, y: 0, w: "100%", h: 0.35,
                            fill: { color: "174F73" }
                        }
                    },
                    {
                        text: {
                            text: "North Light Analytics Report",
                            options: {
                                x: 0, y: 0, w: 6, h: 0.35,
                                fontSize: 15, color: "FFFFFF"
                            }
                        }
                    }
                ],
                slideNumber: { x: 13, y: 0, color: "ffffff", fontSize: 15 }
            });

            // Create slide
            let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

            // Add title
            // slide.addText("Event Level ROI", {
            //     x: 0.2,
            //     y: 0.5,
            //     w: 13,
            //     h: 0.35,
            //     fontSize: 14,
            //     bold: true,
            //     color: "000000"
            // });

            // Add summary section at the top
            const summaryY = 0.30; // Moved up
            const leftColX = 0.35;
            const colWidth = 3;
            const rowHeight = 0.3;

            // Add main ROI text
            slide.addText(`Avg. ROI across all events: ${formatNumber(summaryData.avgROI)}%`, {
                x: leftColX,
                y: summaryY,
                w: 12,
                h: rowHeight,
                fontSize: 12,
                bold: true,
                color: "000000"
            });

            // Add 4-column grid
            const gridData = [
                [`Total: ${summaryData.total}`,
                `Events: ${summaryData.total}`,
                `Trade Spend: $${(summaryData.totalSpend / 1000000).toFixed(1)}MM`,
                `Avg. ROI: ${formatNumber(summaryData.avgROI)}%`]
            ];

            gridData[0].forEach((text, index) => {
                slide.addText(text, {
                    x: leftColX + (index * colWidth),
                    y: summaryY + rowHeight,
                    w: colWidth,
                    h: rowHeight,
                    fontSize: 11,
                    color: "000000"
                });
            });

            // Add 2-column grid
            const bottomGridData = [
                `Positive ROI: ${summaryData.positiveROI} (${formatNumber((summaryData.positiveROI / summaryData.total) * 100)}%)`,
                `Negative ROI: ${summaryData.negativeROI} (${formatNumber((summaryData.negativeROI / summaryData.total) * 100)}%)`
            ];

            bottomGridData.forEach((text, index) => {
                slide.addText(text, {
                    x: leftColX + (index * 6),
                    y: summaryY + (rowHeight * 2),
                    w: 6,
                    h: rowHeight,
                    fontSize: 11,
                    color: "000000"
                });
            });

            // Add divider line
            slide.addShape(pptx.shapes.LINE, {
                x1: leftColX,
                y1: summaryY + (rowHeight * 3) + 0.1,
                x2: 12.35,
                y2: summaryY + (rowHeight * 3) + 0.1,
                line: { color: "CCCCCC", width: 1 }
            });

            // Add chart area below summary
            const chartY = summaryY + (rowHeight * 4); // Position chart below summary

            slide.addShape(pptx.shapes.RECTANGLE, {
                x: 0.19,
                y: chartY,
                w: 13,
                h: 5.0, // Adjusted height
                line: { color: "cccccc" },
                fill: { color: "ffffff" }
            });

            // Prepare and add chart with adjusted position
            const chartValues = chartData.series[0].data;
            const chartLabels = chartData.options.xaxis.categories;

            const pptChartData = [{
                name: 'Event ROI',
                labels: chartLabels,
                values: chartValues
            }];

            slide.addChart(pptx.charts.BAR, pptChartData, {
                x: 0.35,
                y: chartY + 0.2, // Adjusted Y position
                w: 12,
                h: 4, // Adjusted height
                barDir: 'col',
                barGrouping: "standard",
                dataLabelColor: "000000",
                dataLabelFontFace: "Arial",
                dataLabelFontSize: 10,
                dataLabelPosition: "outEnd",
                dataLabelFormatCode: "#,##0.00'%'",
                showValue: true,
                chartColors: chartValues.map(value => value >= 0 ? '52c41a' : 'ff4d4f'),
                invertedColors: chartValues.map(value => value >= 0 ? '52c41a' : 'ff4d4f'),
                showLegend: false,
                showTitle: false,
                catAxisTitle: "Events",
                catAxisTitleColor: "000000",
                catAxisTitleFontSize: 12,
                valAxisTitle: "ROI (%)",
                valAxisTitleColor: "000000",
                valAxisTitleFontSize: 12,
                valAxisMinVal: Math.min(...chartValues) - 10,
                valAxisMaxVal: Math.max(...chartValues) + 10,
                valGridLine: { style: "none" },
                catGridLine: { style: "none" }
            });

            // Add logos at the bottom
            slide.addImage({
                path: Logo,
                x: 0.3,
                y: 7.0,
                w: 1.4,
                h: 0.5,
                sizing: { type: "contain", w: 1.4, h: 0.5 }
            });

            if (authData?.company_logo) {
                slide.addImage({
                    path: authData.company_logo,
                    x: 11.3,
                    y: 7.0,
                    w: 1.4,
                    h: 0.5,
                    sizing: { type: "contain", w: 1.4, h: 0.5 }
                });
            }

            // Save the presentation
            await pptx.writeFile({
                fileName: "Event_Level_ROI.pptx",
                compression: true
            });

        } catch (error) {
            console.error("PPT Generation Error:", error);
        } finally {
            setPresentationGenerated(false);
        }
    };

    const generateChart2PPT = async () => {
        try {
            setPresentationGenerated(true);
            let pptx = new pptxgen();
            pptx.layout = "LAYOUT_WIDE";

            // Master slide setup remains same...
            pptx.defineSlideMaster({
                title: "PLACEHOLDER_SLIDE",
                background: { color: "FFFFFF" },
                objects: [
                    {
                        rect: {
                            x: 0, y: 0, w: "100%", h: 0.35,
                            fill: { color: "174F73" }
                        }
                    },
                    {
                        text: {
                            text: "North Light Analytics Report",
                            options: {
                                x: 0, y: 0, w: 6, h: 0.35,
                                fontSize: 15, color: "FFFFFF"
                            }
                        }
                    }
                ],
                slideNumber: { x: 13, y: 0, color: "ffffff", fontSize: 15 }
            });

            let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

            // Add description text
            slide.addText("This chart shows the ROI by account which is the same formula as event level ROI but across all events", {
                x: 0.35,
                y: 0.5,
                w: 12,
                h: 0.5,
                fontSize: 12,
                color: "000000"
            });

            // Add chart
            const chartValues = chart2Data.series[0].data;
            const chartLabels = chart2Data.options.xaxis.categories;

            const pptChartData = [{
                name: 'Account ROI',
                labels: chartLabels,
                values: chartValues
            }];

            slide.addChart(pptx.charts.BAR, pptChartData, {
                x: 0.35,
                y: 1.2,
                w: 12,
                h: 5.5,
                barDir: 'col',
                barGrouping: "standard",
                dataLabelColor: "000000",
                dataLabelFontFace: "Arial",
                dataLabelFontSize: 10,
                dataLabelPosition: "outEnd",
                dataLabelFormatCode: "#,##0.00'%'",
                showValue: true,
                chartColors: chartValues.map(value => {
                    if (value >= 35) return '52c41a';
                    if (value > 0) return 'ffd700';
                    return 'ff4d4f';
                }),
                showLegend: false,
                showTitle: false,
                catAxisTitle: "Accounts",
                catAxisTitleColor: "000000",
                catAxisTitleFontSize: 12,
                valAxisTitle: "ROI (%)",
                valAxisTitleColor: "000000",
                valAxisTitleFontSize: 12,
                valAxisMinVal: Math.min(...chartValues) - 10,
                valAxisMaxVal: Math.max(...chartValues) + 10,
                valGridLine: { style: "none" },
                catGridLine: { style: "none" }
            });

            // Add question text at bottom
            slide.addText("What is driving the variation in ROI across different accounts?", {
                x: 0.35,
                y: 6.8,
                w: 12,
                h: 0.3,
                fontSize: 12,
                color: "000000",
                bold: true
            });

            // Add logos
            slide.addImage({
                path: Logo,
                x: 0.3,
                y: 7.2,
                w: 1.4,
                h: 0.5,
                sizing: { type: "contain", w: 1.4, h: 0.5 }
            });

            if (authData?.company_logo) {
                slide.addImage({
                    path: authData.company_logo,
                    x: 11.3,
                    y: 7.2,
                    w: 1.4,
                    h: 0.5,
                    sizing: { type: "contain", w: 1.4, h: 0.5 }
                });
            }

            await pptx.writeFile({
                fileName: "Account_Level_ROI.pptx",
                compression: true
            });

        } catch (error) {
            console.error("PPT Generation Error:", error);
        } finally {
            setPresentationGenerated(false);
        }
    };

    const formatNumber = (num) => {
        return Number(num).toFixed(2);
    };

    return (
        <>
            <Header />
            <div className="min-h-[calc(100vh-40px)] pt-20 pb-8">
                <div className="border-b border-[#cccccc] pb-3 px-[36px]">
                    <div className="container-fluid">
                        <div className="flex gap-2">
                            <a href="/tpo" className="flex items-center gap-2">
                                <div class="nla-arrow-left-icon"><span></span></div>
                            </a>
                            <h4 className="text-2xl font-bold">{project_name}</h4>
                        </div>
                    </div>
                </div>
                <div className="mx-auto px-12">
                    <div className="flex justify-between flex-wrap items-center h-full">
                        
                        <div className="w-full mt-4 tpo-report-accordion">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0" className="my-2 py-0 rounded-lg border-0">
                                    <Accordion.Header>
                                        <div className="flex items-center">
                                            <div className="theme_badge">
                                                <span>Chart</span>
                                                <span className="nla_number">1</span>
                                            </div>
                                            <span className="ml-2">Event Level ROI For all Events</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="overflow-x-auto">
                                                    {/* <p className="text-lg font-semibold mb-2">Avg. ROI across all events: {formatNumber(summaryData.avgROI)}%</p> */}
                                                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                                                        <thead>
                                                            <tr className="bg-[#164f73] text-white">
                                                                <th colspan="4" className="py-2 px-4 text-left text-lg">Avg. ROI across all events: {formatNumber(summaryData.avgROI)}%</th>
                                                            </tr>
                                                        </thead>
                                                        <thead>
                                                            <tr className="bg-gray-200 text-gray-700">
                                                                <th className="py-2 px-4 text-left">Overall</th>
                                                                <th className="py-2 px-4 text-left">Events</th>
                                                                <th className="py-2 px-4 text-left">Trade Spend</th>
                                                                <th className="py-2 px-4 text-left">Avg. ROI</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="border-b border-gray-300 text-left">
                                                                <th className="py-2 px-4">Total</th>
                                                                <th className="py-2 px-4">{summaryData.total}</th>
                                                                <th className="py-2 px-4">${(summaryData.totalSpend / 1000000).toFixed(1)}MM</th>
                                                                <th className="py-2 px-4">{formatNumber(summaryData.avgROI)}%</th>
                                                            </tr>
                                                            <tr className="border-b border-gray-300 text-left">
                                                                <th className="py-2 px-4">Position ROI</th>
                                                                <td className="py-2 px-4">{summaryData.positiveROI}</td>
                                                                <td className="py-2 px-4">-</td>
                                                                <td className="py-2 px-4">{formatNumber((summaryData.positiveROI / summaryData.total) * 100)}%</td>
                                                            </tr>
                                                            <tr className="border-b border-gray-300 text-left">
                                                                <th className="py-2 px-4">Negative ROI</th>
                                                                <td className="py-2 px-4">{summaryData.negativeROI}</td>
                                                                <td className="py-2 px-4">-</td>
                                                                <td className="py-2 px-4">{formatNumber((summaryData.negativeROI / summaryData.total) * 100)}%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* <div>
                                                    <div>Avg. ROI across all events: {formatNumber(summaryData.avgROI)}%</div>
                                                    <div className="grid grid-cols-4 gap-4 mt-2">
                                                        <div>Total: {summaryData.total}</div>
                                                        <div>Events: {summaryData.total}</div>
                                                        <div>Trade Spend: ${(summaryData.totalSpend / 1000000).toFixed(1)}MM</div>
                                                        <div>Avg. ROI: {formatNumber(summaryData.avgROI)}%</div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                                        <div>Positive ROI: {summaryData.positiveROI} ({formatNumber((summaryData.positiveROI / summaryData.total) * 100)}%)</div>
                                                        <div>Negative ROI: {summaryData.negativeROI} ({formatNumber((summaryData.negativeROI / summaryData.total) * 100)}%)</div>
                                                    </div>
                                                </div> */}
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={generatePPT}
                                                    disabled={presentationGenerated}
                                                >
                                                    {presentationGenerated ? 'Generating...' : 'Download PPT'}
                                                </button>
                                            </div>
                                            <ReactApexChart
                                                options={chartData.options}
                                                series={chartData.series}
                                                type="bar"
                                                height={400}
                                            />
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1" className="my-2 py-0 rounded-lg border-0">
                                    <Accordion.Header>
                                        <div className="flex items-center">
                                            <div className="theme_badge">
                                                <span>Chart</span>
                                                <span className="nla_number">2</span>
                                            </div>
                                            <span className="ml-2">What is driving the variation in ROI across different accounts?</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className="flex justify-between mb-4">
                                                <div>
                                                    <p>This chart shows the ROI by account which is the same formula as event level ROI but across all events</p>
                                                </div>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={generateChart2PPT}
                                                    disabled={presentationGenerated}
                                                >
                                                    {presentationGenerated ? 'Generating...' : 'Download PPT'}
                                                </button>
                                            </div>
                                            <ReactApexChart
                                                options={chart2Data.options}
                                                series={chart2Data.series}
                                                type="bar"
                                                height={400}
                                            />
                                            {/* <div className="mt-4">
                                                <p className="font-bold">What is driving the variation in ROI across different accounts?</p>
                                            </div> */}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TpoReport;

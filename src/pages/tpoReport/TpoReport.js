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
    const [chart3Data, setChart3Data] = useState({
        series1: [{
            name: 'Incremental Volume',
            data: [],
            type: 'scatter'
        }],
        series2: [{
            name: 'ROI (%)',
            data: [],
            type: 'scatter'
        }],
        options1: {
            chart: {
                type: 'scatter',
                height: 400,
            },
            xaxis: {
                title: {
                    text: 'Spend ($)'
                },
                tickAmount: 5,
                labels: {
                    formatter: function (val) {
                        return val.toFixed(2)
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Incremental Volume'
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(0)
                    }
                }
            },
            annotations: {
                yaxis: [{
                    y: 0,
                    borderColor: '#000',
                    strokeDashArray: 0,
                    opacity: 0.1,
                }]
            },
            tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                    return `<div class="p-2">
                        <div>Spend: $${data[0].toFixed(2)}</div>
                        <div>Volume: ${data[1].toFixed(0)}</div>
                    </div>`;
                }
            }
        },
        options2: {
            chart: {
                type: 'scatter',
                height: 400,
            },
            xaxis: {
                title: {
                    text: 'Spend ($)'
                },
                tickAmount: 5,
                labels: {
                    formatter: function (val) {
                        return val.toFixed(2)
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'ROI (%)'
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(1) + '%'
                    }
                }
            },
            annotations: {
                yaxis: [{
                    y: 0,
                    borderColor: '#000',
                    strokeDashArray: 0,
                    opacity: 0.1,
                }]
            },
            tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                    return `<div class="p-2">
                        <div>Spend: $${data[0].toFixed(2)}</div>
                        <div>ROI: ${data[1].toFixed(1)}%</div>
                    </div>`;
                }
            }
        }
    });
    const [chart4Data, setChart4Data] = useState({
        eventCount: {
            series: [{
                name: 'Event Count',
                data: []
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    toolbar: { show: false }
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        distributed: true
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val.toFixed(1) + '%';
                    },
                    style: { colors: ['#000'] }
                },
                xaxis: {
                    categories: ['TPR', 'Feature', 'Feature and Display', 'Display', 'All Events'],
                    title: { text: 'Event Count (% of Total)' }
                },
                colors: ['#2196f3'],
                title: {
                    text: 'Event Count (% of Total)',
                    align: 'center'
                }
            }
        },
        incrementalLift: {
            series: [{
                name: 'Incremental Lift',
                data: []
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    toolbar: { show: false }
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        distributed: true
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val.toFixed(1) + '%';
                    },
                    style: { colors: ['#000'] }
                },
                xaxis: {
                    categories: ['TPR', 'Feature', 'Feature and Display', 'Display', 'All Events'],
                    title: { text: 'Average Incremental Lift (%)' }
                },
                colors: ['#00e396'],
                title: {
                    text: 'Average Incremental Lift (%)',
                    align: 'center'
                }
            }
        },
        weightedROI: {
            series: [{
                name: 'Weighted ROI',
                data: []
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    toolbar: { show: false }
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        distributed: true
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val.toFixed(1) + '%';
                    },
                    style: { colors: ['#000'] }
                },
                xaxis: {
                    categories: ['TPR', 'Feature', 'Feature and Display', 'Display', 'All Events'],
                    title: { text: 'Weighted Average ROI (%)' }
                },
                colors: ['#feb019'],
                title: {
                    text: 'Weighted Average ROI (%)',
                    align: 'center'
                }
            }
        }
    });
    const [chart5Data, setChart5Data] = useState({
        series: [{
            name: 'ROI',
            data: []
        }],
        options: {
            chart: {
                type: 'bar',
                height: 400,
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '45%',
                    distributed: true
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val.toFixed(1) + '%';
                },
                style: {
                    colors: ['#000']
                }
            },
            colors: ['#2196f3'],
            xaxis: {
                categories: ['0-10', '10-20', '20-30', '30-40', '40-50'],
                title: {
                    text: 'Discount Depth'
                }
            },
            yaxis: {
                title: {
                    text: 'ROI (%)'
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(1) + '%';
                    }
                }
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                }
            },
            legend: {
                show: false
            }
        },
        summaryData: {
            noOfEvents: [],
            tradeSpend: [],
            avgLift: [],
            fndEvents: []
        }
    });

    useEffect(() => {
        if (events.length) {
            calculateChartData();
            calculateChart2Data();
            calculateChart3Data();
            calculateChart4Data();
            calculateChart5Data();
        }
    }, [events]);

    const calculateChartData = () => {
        let totalSpend = 0;
        let positiveCount = 0;
        let negativeCount = 0;
        let eventNames = [];
        let roiValues = [];
        let negativeROI = [];
        let positiveROI = [];

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

            if (eventROI > 0) {
                positiveCount++;
                positiveROI.push(eventROI);
            }
            if (eventROI < 0) {
                negativeCount++;
                negativeROI.push(eventROI);
            }

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
        console.log({ totalSpend });

        setSummaryData({
            total: events.length,
            positiveROI: positiveROI.reduce((acc, curr) => acc + curr, 0) / positiveCount,
            positiveCount: positiveCount,
            negativeROI: negativeROI.reduce((acc, curr) => acc + curr, 0) / negativeCount,
            negativeCount: negativeCount,
            avgROI: roiValues.reduce((acc, curr) => acc + curr, 0) / roiValues.length,
            totalSpend: totalSpend
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

    const calculateChart3Data = () => {
        const spendVolumeData = [];
        const spendROIData = [];
        let correlation1 = 0;
        let correlation2 = 0;

        events.forEach(event => {
            event.planned.forEach(product => {
                const { financialResults } = getResult(product.financialData);
                const spend = Number(financialResults.find(r => r.name === "Total Spend")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
                const roi = Number(financialResults.find(r => r.name === "Sales ROI")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
                const volume = Number(financialResults.find(r => r.name === "Incremental Revenue")?.value?.replace(/[^0-9.-]+/g, "")) || 0;

                spendVolumeData.push([spend, volume]);
                spendROIData.push([spend, roi]);
            });
        });

        // Calculate correlations
        correlation1 = calculateCorrelation(spendVolumeData);
        correlation2 = calculateCorrelation(spendROIData);

        setChart3Data(prev => ({
            ...prev,
            series1: [{
                name: 'Incremental Volume',
                data: spendVolumeData
            }],
            series2: [{
                name: 'ROI (%)',
                data: spendROIData
            }],
            options1: {
                ...prev.options1,
                subtitle: {
                    text: `Correlation: ${correlation1.toFixed(2)}`,
                    align: 'right',
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            options2: {
                ...prev.options2,
                subtitle: {
                    text: `Correlation: ${correlation2.toFixed(2)}`,
                    align: 'right',
                    style: {
                        fontSize: '12px'
                    }
                }
            }
        }));
    };

    const calculateCorrelation = (data) => {
        const n = data.length;
        if (n === 0) return 0;

        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

        data.forEach(([x, y]) => {
            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumX2 += x * x;
            sumY2 += y * y;
        });

        const numerator = (n * sumXY) - (sumX * sumY);
        const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

        return denominator === 0 ? 0 : numerator / denominator;
    };

    const calculateChart4Data = () => {
        const eventTypes = {
            TPR: { count: 0, lift: 0, roi: 0, spend: 0 },
            Feature: { count: 0, lift: 0, roi: 0, spend: 0 },
            'Feature and Display': { count: 0, lift: 0, roi: 0, spend: 0 },
            Display: { count: 0, lift: 0, roi: 0, spend: 0 }
        };

        let totalEvents = events.length;
        let totalSpend = 0;
        let totalROI = 0;
        let totalLift = 0;

        // First pass: Calculate totals
        events.forEach(event => {
            // Default to TPR if type is not specified
            const eventType = event.type || 'TPR';

            if (!eventTypes[eventType]) {
                console.warn(`Unknown event type: ${eventType}, defaulting to TPR`);
                eventType = 'TPR';
            }

            eventTypes[eventType].count++;

            event.planned.forEach(product => {
                const { financialResults } = getResult(product.financialData);

                const roi = Number(financialResults.find(r => r.name === "Sales ROI")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
                const lift = Number(financialResults.find(r => r.name === "Incremental Lift")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
                const spend = Number(financialResults.find(r => r.name === "Total Spend")?.value?.replace(/[^0-9.-]+/g, "")) || 0;

                eventTypes[eventType].lift += lift;
                eventTypes[eventType].roi += (roi * spend);
                eventTypes[eventType].spend += spend;

                totalSpend += spend;
                totalROI += (roi * spend);
                totalLift += lift;
            });
        });

        // Calculate percentages and averages
        const eventCount = Object.entries(eventTypes).map(([type, data]) => {
            return data.count > 0 ? (data.count / totalEvents) * 100 : 0;
        });

        const avgLift = Object.entries(eventTypes).map(([type, data]) => {
            return data.count > 0 ? data.lift / data.count : 0;
        });

        const weightedROI = Object.entries(eventTypes).map(([type, data]) => {
            return data.spend > 0 ? data.roi / data.spend : 0;
        });

        // Add "All Events" row
        eventCount.push(100); // Total is always 100%
        avgLift.push(totalEvents > 0 ? totalLift / totalEvents : 0);
        weightedROI.push(totalSpend > 0 ? totalROI / totalSpend : 0);

        // Update chart data
        setChart4Data(prev => ({
            eventCount: {
                ...prev.eventCount,
                series: [{
                    name: 'Event Count',
                    data: eventCount.map(val => val || 0) // Replace NaN with 0
                }]
            },
            incrementalLift: {
                ...prev.incrementalLift,
                series: [{
                    name: 'Incremental Lift',
                    data: avgLift.map(val => val || 0) // Replace NaN with 0
                }]
            },
            weightedROI: {
                ...prev.weightedROI,
                series: [{
                    name: 'Weighted ROI',
                    data: weightedROI.map(val => val || 0) // Replace NaN with 0
                }]
            }
        }));
    };

    const calculateChart5Data = () => {
        const discountRanges = [
            { min: 0, max: 10 },
            { min: 10, max: 20 },
            { min: 20, max: 30 },
            { min: 30, max: 40 },
            { min: 40, max: 50 }
        ];

        const rangeData = discountRanges.map(() => ({
            roi: 0,
            spend: 0,
            count: 0,
            lift: 0,
            fndCount: 0
        }));

        events.forEach(event => {
            event.planned.forEach(product => {
                const { financialResults } = getResult(product.financialData);
                const discount = Number(product.financialData.discount) || 0;
                const roi = Number(financialResults.find(r => r.name === "Sales ROI")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
                const lift = Number(financialResults.find(r => r.name === "Incremental Lift")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
                const spend = Number(financialResults.find(r => r.name === "Total Spend")?.value?.replace(/[^0-9.-]+/g, "")) || 0;

                const rangeIndex = discountRanges.findIndex(range =>
                    discount >= range.min && discount < range.max
                );

                if (rangeIndex !== -1) {
                    rangeData[rangeIndex].roi += (roi * spend);
                    rangeData[rangeIndex].spend += spend;
                    rangeData[rangeIndex].count++;
                    rangeData[rangeIndex].lift += lift;
                    if (event.type?.includes('Feature') || event.type?.includes('Display')) {
                        rangeData[rangeIndex].fndCount++;
                    }
                }
            });
        });

        const totalSpend = rangeData.reduce((sum, data) => sum + data.spend, 0);

        setChart5Data(prev => ({
            ...prev,
            series: [{
                name: 'ROI',
                data: rangeData.map(data => data.spend > 0 ? (data.roi / data.spend) : 0)
            }],
            summaryData: {
                noOfEvents: rangeData.map(data => data.count),
                tradeSpend: rangeData.map(data => (data.spend / totalSpend) * 100),
                avgLift: rangeData.map(data => data.count > 0 ? data.lift / data.count : 0),
                fndEvents: rangeData.map(data => data.fndCount)
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

    const generateChart3PPT = async () => {
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

            // Add title
            slide.addText("Trade spend versus incremental case consumption and ROI (%)", {
                x: 0.35,
                y: 0.5,
                w: 12,
                h: 0.5,
                fontSize: 14,
                bold: true,
                color: "000000"
            });

            // Format data for scatter plots
            const volumeData = {
                name: 'Incremental Volume',
                labels: chart3Data.series1[0].data.map(point => point[0].toString()),
                values: chart3Data.series1[0].data.map(point => point[1])
            };

            const roiData = {
                name: 'ROI',
                labels: chart3Data.series2[0].data.map(point => point[0].toString()),
                values: chart3Data.series2[0].data.map(point => point[1])
            };

            // Left chart - Trade Spend vs Incremental Volume
            slide.addChart(pptx.charts.SCATTER, [volumeData], {
                x: 0.35,
                y: 1.2,
                w: 5.9,
                h: 5,
                showTitle: true,
                title: "Trade Spend vs. Incremental Volume",
                showLegend: false,
                lineSize: 0,
                chartColors: ['4472C4'],
                lineWidth: 0,
                markerSize: 10,
                dataLabelFormatCode: "#,##0",
                valAxisTitle: "Incremental Volume",
                catAxisTitle: "Spend ($)",
                plotArea: { border: { pt: 1, color: "888888" } },
                showValAxisTitle: true,
                showCatAxisTitle: true,
                valAxisTitleColor: "000000",
                catAxisTitleColor: "000000"
            });

            // Right chart - Trade Spend vs ROI
            slide.addChart(pptx.charts.SCATTER, [roiData], {
                x: 6.45,
                y: 1.2,
                w: 5.9,
                h: 5,
                showTitle: true,
                title: "Trade Spend vs. ROI (%)",
                showLegend: false,
                lineSize: 0,
                chartColors: ['4472C4'],
                lineWidth: 0,
                markerSize: 10,
                dataLabelFormatCode: "#,##0.0'%'",
                valAxisTitle: "ROI (%)",
                catAxisTitle: "Spend ($)",
                plotArea: { border: { pt: 1, color: "888888" } },
                showValAxisTitle: true,
                showCatAxisTitle: true,
                valAxisTitleColor: "000000",
                catAxisTitleColor: "000000"
            });

            // Add correlation values
            slide.addText(`Correlation: ${chart3Data.options1.subtitle.text.split(": ")[1]}`, {
                x: 0.35,
                y: 6.3,
                w: 5.9,
                h: 0.3,
                fontSize: 12,
                color: "000000"
            });

            slide.addText(`Correlation: ${chart3Data.options2.subtitle.text.split(": ")[1]}`, {
                x: 6.45,
                y: 6.3,
                w: 5.9,
                h: 0.3,
                fontSize: 12,
                color: "000000"
            });

            // Add logos
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

            await pptx.writeFile({
                fileName: "Trade_Spend_Analysis.pptx",
                compression: true
            });

        } catch (error) {
            console.error("PPT Generation Error:", error);
        } finally {
            setPresentationGenerated(false);
        }
    };

    const generateChart4PPT = async () => {
        try {
            setPresentationGenerated(true);
            let pptx = new pptxgen();
            pptx.layout = "LAYOUT_WIDE";

            // Master slide setup
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

            // Add title
            slide.addText("Landscape and ROI by event type", {
                x: 0.35,
                y: 0.5,
                w: 12,
                h: 0.5,
                fontSize: 14,
                bold: true,
                color: "000000"
            });

            // Add description
            slide.addText("This chart shows count, avg incremental lift (%) and wtd average ROI by type of promotional event", {
                x: 0.35,
                y: 1.0,
                w: 12,
                h: 0.3,
                fontSize: 12,
                color: "000000"
            });

            const categories = ['TPR', 'Feature', 'Feature and Display', 'Display', 'All Events'];

            // Add Event Count chart
            slide.addChart(pptx.charts.BAR, [{
                name: 'Event Count',
                labels: categories,
                values: chart4Data.eventCount.series[0].data
            }], {
                x: 0.35,
                y: 1.5,
                w: 12,
                h: 1.8,
                barDir: 'bar',
                title: "Event Count (% of Total)",
                showTitle: true,
                titleFontSize: 12,
                showLegend: false,
                dataLabelFormatCode: '#,##0.0"%"',
                chartColors: ['2196f3'],
                showValue: true,
                dataLabelPosition: 'outEnd',
                catAxisOrientation: 'maxMin',
                barGrouping: "standard",
                chartColorsOpacity: 100,
                border: { pt: '1', color: '363636' },
                plotArea: { border: { pt: '1', color: 'cccccc' } }
            });

            // Add Incremental Lift chart
            slide.addChart(pptx.charts.BAR, [{
                name: 'Incremental Lift',
                labels: categories,
                values: chart4Data.incrementalLift.series[0].data
            }], {
                x: 0.35,
                y: 3.5,
                w: 12,
                h: 1.8,
                barDir: 'bar',
                title: "Average Incremental Lift (%)",
                showTitle: true,
                titleFontSize: 12,
                showLegend: false,
                dataLabelFormatCode: '#,##0.0"%"',
                chartColors: ['00e396'],
                showValue: true,
                dataLabelPosition: 'outEnd',
                catAxisOrientation: 'maxMin',
                barGrouping: "standard",
                chartColorsOpacity: 100,
                border: { pt: '1', color: '363636' },
                plotArea: { border: { pt: '1', color: 'cccccc' } }
            });

            // Add Weighted ROI chart
            slide.addChart(pptx.charts.BAR, [{
                name: 'Weighted ROI',
                labels: categories,
                values: chart4Data.weightedROI.series[0].data
            }], {
                x: 0.35,
                y: 5.5,
                w: 12,
                h: 1.8,
                barDir: 'bar',
                title: "Weighted Average ROI (%)",
                showTitle: true,
                titleFontSize: 12,
                showLegend: false,
                dataLabelFormatCode: '#,##0.0"%"',
                chartColors: ['feb019'],
                showValue: true,
                dataLabelPosition: 'outEnd',
                catAxisOrientation: 'maxMin',
                barGrouping: "standard",
                chartColorsOpacity: 100,
                border: { pt: '1', color: '363636' },
                plotArea: { border: { pt: '1', color: 'cccccc' } }
            });

            // Add logos
            slide.addImage({
                path: Logo,
                x: 0.3,
                y: 7.5,
                w: 1.4,
                h: 0.5,
                sizing: { type: "contain", w: 1.4, h: 0.5 }
            });

            if (authData?.company_logo) {
                slide.addImage({
                    path: authData.company_logo,
                    x: 11.3,
                    y: 7.5,
                    w: 1.4,
                    h: 0.5,
                    sizing: { type: "contain", w: 1.4, h: 0.5 }
                });
            }

            await pptx.writeFile({
                fileName: "Event_Type_Analysis.pptx",
                compression: true
            });

        } catch (error) {
            console.error("PPT Generation Error:", error);
        } finally {
            setPresentationGenerated(false);
        }
    };

    const generateChart5PPT = async () => {
        try {
            setPresentationGenerated(true);
            let pptx = new pptxgen();
            pptx.layout = "LAYOUT_WIDE";

            // Master slide setup
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

            // Add title and description
            slide.addText("Avg. Wtd ROI for different discount levels by brand", {
                x: 0.35,
                y: 0.5,
                w: 12,
                h: 0.5,
                fontSize: 14,
                bold: true,
                color: "000000"
            });

            slide.addText("This chart shows the avg ROI by average depth of discount. This can be by retailer or brand or items", {
                x: 0.35,
                y: 1.0,
                w: 12,
                h: 0.3,
                fontSize: 12,
                color: "000000"
            });

            // Add main chart
            const chartData = chart5Data.series.map(series => ({
                name: series.name,
                labels: ['0-10', '10-20', '20-30', '30-40', '40-50'],
                values: series.data
            }));

            slide.addChart(pptx.charts.BAR, chartData, {
                x: 0.35,
                y: 1.5,
                w: 8,
                h: 4,
                barDir: 'col',
                showTitle: true,
                title: "ROI by Discount Depth",
                showLegend: true,
                legendPos: 'b',
                dataLabelFormatCode: '#,##0.0"%"',
                showValue: true,
                valueBarColors: true,
                chartColors: ['4472C4', '00B050', 'FFC000', '7030A0'],
                catAxisTitle: "Discount Depth",
                valAxisTitle: "ROI (%)"
            });

            // Add summary table
            const summaryData = chart5Data.summaryData;
            slide.addTable([
                [
                    { text: "Discount Depth", options: { bold: true } },
                    { text: "0-10", options: { bold: true } },
                    { text: "10-20", options: { bold: true } },
                    { text: "20-30", options: { bold: true } },
                    { text: "30-40", options: { bold: true } },
                    { text: "40-50", options: { bold: true } }
                ],
                ["No. of events", ...summaryData.noOfEvents],
                ["% of Trade Spend", ...summaryData.tradeSpend.map(val => val.toFixed(1) + '%')],
                ["Avg. Wtd. Lift", ...summaryData.avgLift.map(val => val.toFixed(1) + '%')],
                ["# of F&D Events", ...summaryData.fndEvents]
            ], {
                x: 0.35,
                y: 5.5,
                w: 12,
                colW: [2, 2, 2, 2, 2, 2],
                fontSize: 10,
                border: { pt: 1, color: "cccccc" }
            });

            // Add formula section
            slide.addShape(pptx.shapes.RECTANGLE, {
                x: 8.5,
                y: 1.5,
                w: 4,
                h: 4,
                fill: { color: "F5F5F5" }
            });

            slide.addText("Formula:", {
                x: 8.7,
                y: 1.7,
                fontSize: 12,
                bold: true
            });

            slide.addText([
                { text: "Discount Depth:", options: { bold: true } },
                { text: "\nGroup the events based on the discount percentage in each event in ranges 0-10, 10-20..." }
            ].join(""), {
                x: 8.7,
                y: 2.0,
                w: 3.6,
                fontSize: 10
            });

            // Add logos
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

            await pptx.writeFile({
                fileName: "ROI_by_Discount_Depth.pptx",
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
                                <div className="nla-arrow-left-icon"><span></span></div>
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
                                                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                                                        <thead>
                                                            <tr className="bg-[#164f73] text-white">
                                                                <th colSpan="4" className="py-2 px-4 text-left text-lg">Avg. ROI across all events: {formatNumber(summaryData.avgROI)}%</th>
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
                                                                <th className="py-2 px-4">${((summaryData.totalSpend).toFixed(1).toLocaleString())}</th>
                                                                <th className="py-2 px-4">{formatNumber(summaryData.avgROI)}%</th>
                                                            </tr>
                                                            <tr className="border-b border-gray-300 text-left">
                                                                <th className="py-2 px-4">Position ROI</th>
                                                                <td className="py-2 px-4">{summaryData.positiveCount}</td>
                                                                <td className="py-2 px-4">-</td>
                                                                <td className="py-2 px-4">{formatNumber(summaryData.positiveROI)}%</td>
                                                            </tr>
                                                            <tr className="border-b border-gray-300 text-left">
                                                                <th className="py-2 px-4">Negative ROI</th>
                                                                <td className="py-2 px-4">{summaryData.negativeCount}</td>
                                                                <td className="py-2 px-4">-</td>
                                                                <td className="py-2 px-4">{formatNumber(summaryData.negativeROI)}%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
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
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2" className="my-2 py-0 rounded-lg border-0">
                                    <Accordion.Header>
                                        <div className="flex items-center">
                                            <div className="theme_badge">
                                                <span>Chart</span>
                                                <span className="nla_number">3</span>
                                            </div>
                                            <span className="ml-2">Trade spend versus incremental case consumption and ROI (%)</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className="flex justify-between mb-4">
                                                <div>
                                                    <p>This analysis shows the relationship between trade spend and both incremental volume and ROI</p>
                                                </div>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={generateChart3PPT}
                                                    disabled={presentationGenerated}
                                                >
                                                    {presentationGenerated ? 'Generating...' : 'Download PPT'}
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <ReactApexChart
                                                        options={chart3Data.options1}
                                                        series={chart3Data.series1}
                                                        type="scatter"
                                                        height={400}
                                                    />
                                                </div>
                                                <div>
                                                    <ReactApexChart
                                                        options={chart3Data.options2}
                                                        series={chart3Data.series2}
                                                        type="scatter"
                                                        height={400}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3" className="my-2 py-0 rounded-lg border-0">
                                    <Accordion.Header>
                                        <div className="flex items-center">
                                            <div className="theme_badge">
                                                <span>Chart</span>
                                                <span className="nla_number">4</span>
                                            </div>
                                            <span className="ml-2">Landscape and ROI by event type</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className="flex justify-between mb-4">
                                                <div>
                                                    <p>This chart shows count, avg incremental lift (%) and wtd average ROI by type of promotional event</p>
                                                </div>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={generateChart4PPT}
                                                    disabled={presentationGenerated}
                                                >
                                                    {presentationGenerated ? 'Generating...' : 'Download PPT'}
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <ReactApexChart
                                                        options={chart4Data.eventCount.options}
                                                        series={chart4Data.eventCount.series}
                                                        type="bar"
                                                        height={400}
                                                    />
                                                </div>
                                                <div>
                                                    <ReactApexChart
                                                        options={chart4Data.incrementalLift.options}
                                                        series={chart4Data.incrementalLift.series}
                                                        type="bar"
                                                        height={400}
                                                    />
                                                </div>
                                                <div>
                                                    <ReactApexChart
                                                        options={chart4Data.weightedROI.options}
                                                        series={chart4Data.weightedROI.series}
                                                        type="bar"
                                                        height={400}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4" className="my-2 py-0 rounded-lg border-0">
                                    <Accordion.Header>
                                        <div className="flex items-center">
                                            <div className="theme_badge">
                                                <span>Chart</span>
                                                <span className="nla_number">5</span>
                                            </div>
                                            <span className="ml-2">Avg. Wtd ROI for different discount levels by brand</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className="flex justify-between mb-4">
                                                <div>
                                                    <p>This chart shows the avg ROI by average depth of discount. This can be by retailer or brand or items</p>
                                                </div>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={generateChart5PPT}
                                                    disabled={presentationGenerated}
                                                >
                                                    {presentationGenerated ? 'Generating...' : 'Download PPT'}
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <ReactApexChart
                                                        options={chart5Data.options}
                                                        series={chart5Data.series}
                                                        type="bar"
                                                        height={400}
                                                    />
                                                </div>
                                            </div>
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

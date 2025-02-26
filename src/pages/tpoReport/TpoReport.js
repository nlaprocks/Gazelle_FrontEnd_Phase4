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
    // const user_id = authData?.user_id;
    const { project_name, project_id, model_id, id } = useParams();
    // Get current date for year comparison
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const { events } = useEvents();
    const [chartData, setChartData] = useState({
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
                    columnWidth: '55%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val.toFixed(2) + '%';
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
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(2) + '%';
                    }
                }
            },
            legend: {
                show: false
            },
            colors: ['#52c41a'],
            theme: {
                mode: 'light'
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val.toFixed(2) + '%';
                    }
                }
            }
        }
    });
    const [summaryData, setSummaryData] = useState({
        total: 0,
        positiveROI: 0,
        negativeROI: 0,
        avgROI: 0,
        totalSpend: 0,
        positiveSpend: 0,
        negativeSpend: 0
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
                height: 400,
                toolbar: { show: false }
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
                    return val.toFixed(2) + '%';
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
                    text: 'Retailers'
                }
            },
            yaxis: {
                title: {
                    text: 'ROI (%)'
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(2) + '%';
                    }
                }
            },
            legend: {
                show: false
            },
            colors: ['#52c41a'],
            theme: {
                mode: 'light'
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val.toFixed(2) + '%';
                    }
                }
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
                toolbar: { show: false }
            },
            xaxis: {
                title: {
                    text: 'Spend ($)'
                },
                tickAmount: 5,
                labels: {
                    formatter: function (val) {
                        return '$' + val.toFixed(2);
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Incremental Volume'
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(2);
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
                        <div><b>${data.eventName}</b></div>
                        <div>Spend: $${data.x.toFixed(2)}</div>
                        <div>Volume: ${data.y.toFixed(2)}</div>
                    </div>`;
                }
            }
        },
        options2: {
            chart: {
                type: 'scatter',
                height: 400,
                toolbar: { show: false }
            },
            xaxis: {
                title: {
                    text: 'Spend ($)'
                },
                tickAmount: 5,
                labels: {
                    formatter: function (val) {
                        return '$' + val.toFixed(2);
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'ROI (%)'
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(2) + '%';
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
                        <div><b>${data.eventName}</b></div>
                        <div>Spend: $${data.x.toFixed(2)}</div>
                        <div>ROI: ${data.y.toFixed(2)}%</div>
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
                        distributed: true,
                        barHeight: '40%'
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val.toFixed(2) + '%';
                    },
                    style: { colors: ['#000'] }
                },
                xaxis: {
                    categories: ['TPR', 'Feature Only', 'Display Only', 'Feature and Display', 'All Events'],
                    title: { text: '' },
                    labels: {
                        show: true
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                },
                grid: {
                    xaxis: {
                        lines: {
                            show: true
                        }
                    }
                },
                colors: ['#2196f3']
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
                        distributed: true,
                        barHeight: '40%'
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val.toFixed(2) + '%';
                    },
                    style: { colors: ['#000'] }
                },
                xaxis: {
                    categories: ['TPR', 'Feature Only', 'Display Only', 'Feature and Display', 'All Events'],
                    labels: {
                        show: true
                    },
                    title: { text: '' }
                },
                yaxis: {
                    labels: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                },
                grid: {
                    xaxis: {
                        lines: {
                            show: true
                        }
                    }
                },
                colors: ['#00e396'],
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val.toFixed(2) + '%';
                        }
                    }
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
                        distributed: true,
                        barHeight: '40%'
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val.toFixed(2) + '%';
                    },
                    style: { colors: ['#000'] }
                },
                xaxis: {
                    categories: ['TPR', 'Feature Only', 'Display Only', 'Feature and Display', 'All Events'],
                    labels: {
                        show: true
                    },
                    title: { text: '' }
                },
                yaxis: {
                    labels: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                },
                grid: {
                    xaxis: {
                        lines: {
                            show: true
                        }
                    }
                },
                colors: ['#feb019'],
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val.toFixed(2) + '%';
                        }
                    }
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
                    return val.toFixed(2) + '%';
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
                        return val.toFixed(2) + '%';
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
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val.toFixed(2) + '%';
                    }
                }
            }
        },
        summaryData: {
            noOfEvents: [],
            tradeSpend: [],
            avgLift: [],
            fndEvents: []
        }
    });
    const [chart6Data, setChart6Data] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
                height: 400,
                toolbar: { show: false },
                stacked: false
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    distributed: false
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    // Only show label if value exists and is not zero
                    return val != null && val !== 0 ? val.toFixed(2) + '%' : '';
                },
                style: {
                    colors: ['#000']
                }
            },
            xaxis: {
                categories: [],
                title: {
                    text: 'Price Point Groups'
                },
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'ROI (%)'
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(2) + '%';
                    }
                }
            },
            colors: ['#4472C4', '#00B050', '#FFC000', '#7030A0'], // Different colors for different events
            title: {
                text: 'Performance by Price Point Group',
                align: 'center',
                style: {
                    fontSize: '16px'
                }
            },
            legend: {
                show: true,
                position: 'bottom'
            }
        },
        summaryData: {
            ppgGroups: []
        }
    });
    const [chart7Data, setChart7Data] = useState({
        series: [{
            name: 'Previous Year',
            data: []
        }, {
            name: 'Current Year',
            data: [],
            percentageChanges: []
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
                    columnWidth: '55%',
                    dataLabels: {
                        position: 'center' // Change from 'top' to 'center'
                    }
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val, { seriesIndex, dataPointIndex, w }) {
                    if (seriesIndex === 1) { // Only show percentage change on current year bars
                        const percentageChanges = w.config.series[1].percentageChanges || [];
                        const change = percentageChanges[dataPointIndex];
                        if (isNaN(change) || change === undefined) return val.toFixed(2);
                        const arrow = change >= 0 ? '↑' : '↓';
                        return `${val.toFixed(2)} (${arrow}${Math.abs(change).toFixed(1)}%)`;
                    }
                    return val.toFixed(2);
                },
                style: {
                    colors: ['#fff'] // Change text color to white for better visibility
                }
            },
            colors: ['#2196f3', '#00e396'],
            xaxis: {
                categories: [], // Will be populated with channel names
                title: {
                    text: 'Channels'
                }
            },
            yaxis: {
                title: {
                    text: 'Incremental Profit Pool per Dollar Invested on Promo'
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(2);
                    }
                }
            },
            title: {
                text: 'Incremental Profit Pool per Dollar Invested on Promo',
                align: 'center',
                style: {
                    fontSize: '14px'
                }
            },
            subtitle: {
                // Will show the current year and the previous year
                text: `52 Weeks Ending ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
                align: 'center'
            },
            legend: {
                position: 'top'
            }
        }
    });
    const [chart8Data, setChart8Data] = useState({
        series: [{
            name: 'Incremental Profit per Dollar',
            data: []
        }],
        options: {
            chart: {
                type: 'scatter',
                height: 400,
                toolbar: { show: false }
            },
            xaxis: {
                title: {
                    text: 'Manufacturer ROI (%)',
                    style: {
                        fontSize: '14px'
                    }
                },
                tickAmount: 10,
                labels: {
                    formatter: function (val) {
                        return val.toFixed(0) + '%';
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Incremental Profit Pool per Dollar Invested',
                    style: {
                        fontSize: '14px'
                    }
                },
                labels: {
                    formatter: function (val) {
                        return '$' + val.toFixed(2);
                    }
                }
            },
            title: {
                text: 'Relationship between ROI and Incremental Profit Pool per Event',
                align: 'center',
                style: {
                    fontSize: '16px'
                }
            },
            tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                    return `<div class="p-2">
                        <div><b>${point.name}</b></div>
                        <div>ROI: ${point.x.toFixed(1)}%</div>
                        <div>Profit per $: $${point.y.toFixed(2)}</div>
                    </div>`;
                }
            },
            markers: {
                size: 6,
                colors: ['#00B3E5'],
                strokeColors: '#fff',
                strokeWidth: 2
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                }
            }
        }
    });
    const [chart9Data, setChart9Data] = useState({
        series: [
            {
                name: '$6.99',
                data: []
            },
            {
                name: '$5.99',
                data: []
            },
            {
                name: '$4.99',
                data: []
            }
        ],
        options: {
            chart: {
                type: 'line',
                height: 400,
                toolbar: { show: false }
            },
            stroke: {
                width: 2,
                curve: 'smooth'
            },
            colors: ['#00B3E5', '#4CAF50', '#FFC107'],
            xaxis: {
                title: {
                    text: '% of Promo Funded by Retailer',
                    style: {
                        fontSize: '14px'
                    }
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(0) + '%';
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Manufacturer Promo ROI',
                    style: {
                        fontSize: '14px'
                    }
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(0) + '%';
                    }
                }
            },
            annotations: {
                yaxis: [{
                    y: 25,
                    borderColor: '#00E396',
                    label: {
                        text: 'Minimum Acceptable ROI (25%)',
                        style: {
                            color: '#fff',
                            background: '#00E396'
                        }
                    }
                }],
                points: [
                    {
                        x: 20,
                        y: 25,
                        marker: {
                            size: 6,
                            fillColor: '#fff',
                            strokeColor: '#2196F3',
                            radius: 2
                        },
                        label: {
                            text: 'To get ROI of 25% at $6.99 would need retailer to fund ~20%',
                            style: {
                                color: '#333'
                            }
                        }
                    },
                    {
                        x: 35,
                        y: 25,
                        marker: {
                            size: 6,
                            fillColor: '#fff',
                            strokeColor: '#2196F3',
                            radius: 2
                        },
                        label: {
                            text: 'To get ROI of 25% at $5.99 would need retailer to fund ~35%',
                            style: {
                                color: '#333'
                            }
                        }
                    },
                    {
                        x: 50,
                        y: 25,
                        marker: {
                            size: 6,
                            fillColor: '#fff',
                            strokeColor: '#2196F3',
                            radius: 2
                        },
                        label: {
                            text: 'To get ROI of 25% at $4.99 would need retailer to fund ~50%',
                            style: {
                                color: '#333'
                            }
                        }
                    }
                ]
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['transparent', 'transparent'],
                    opacity: 0.5
                }
            },
            markers: {
                size: 4
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val.toFixed(1) + '%';
                    }
                },
                x: {
                    formatter: function (val) {
                        return val.toFixed(1) + '%';
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100]
                }
            }
        }
    });
    const [chart5View, setChart5View] = useState('retailer');
    const [currentYearEvents, setCurrentYearEvents] = useState([]);
    const [previousYearEvents, setPreviousYearEvents] = useState([]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const previousYear = currentYear - 1;
        setCurrentYearEvents(events.filter(event => new Date(event.start_date).getFullYear() === currentYear || new Date(event.end_date).getFullYear() === currentYear));
        setPreviousYearEvents(events.filter(event => new Date(event.start_date).getFullYear() === previousYear || new Date(event.end_date).getFullYear() === previousYear));
    }, [events]);

    useEffect(() => {
        if (currentYearEvents.length) {
            calculateChartData();
            calculateChart2Data();
            calculateChart3Data();
            calculateChart4Data();
            calculateChart5Data();
            calculateChart6Data();
            calculateChart7Data();
            calculateChart8Data();
            calculateChart9Data();
        }
    }, [currentYearEvents]);

    const calculateChartData = () => {
        let totalSpend = 0;
        let positiveCount = 0;
        let negativeCount = 0;
        let eventNames = [];
        let roiValues = [];
        let negativeROI = [];
        let positiveROI = [];
        let positiveSpend = [];
        let negativeSpend = [];

        // Transform events data for chart
        currentYearEvents.forEach(event => {
            let totalIncrContr = 0;
            let eventTotalSpend = 0;

            // Calculate metrics for each product in event
            event.planned.forEach(product => {
                const { promotionalResults } = getResult(product.financialData);
                // Get base values from financialData
                const baseUnits = Number(product.financialData.units) || 0;
                const basePrice = Number(product.financialData.basePrice) || 0;
                const promoPrice = Number(product.financialData.promoPrice) || 0;
                const vcm = Number(product.financialData.vcm) || 0;
                const fixedFee = Number(product.financialData.fixedFee) || 0;

                // Get promo units from promotionalResults
                const promoUnits = Number(promotionalResults?.find(r =>
                    r.promotion === 'Event Incremental')?.units) || 0;

                // Calculate incremental contribution
                const incrContr = promoUnits * vcm;

                totalIncrContr += incrContr;

                // Calculate variable spend
                const varSpend = (baseUnits + promoUnits) * (basePrice - promoPrice);

                // Add fixed fee to get total spend for this product
                const productTotalSpend = varSpend + fixedFee;
                eventTotalSpend += productTotalSpend;
            });

            // Calculate event ROI
            const eventROI = eventTotalSpend ? ((totalIncrContr - eventTotalSpend) / eventTotalSpend) : 0;

            totalSpend += eventTotalSpend;
            if (eventROI > 0) {
                positiveCount++;
                positiveROI.push(eventROI);
                positiveSpend.push(eventTotalSpend);
            }
            if (eventROI < 0) {
                negativeCount++;
                negativeROI.push(eventROI);
                negativeSpend.push(eventTotalSpend);
            }

            eventNames.push(event.title || `Event ${event.id}`);
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
            total: currentYearEvents.length,
            positiveROI: positiveROI.length > 0 ? Number(positiveROI.reduce((acc, curr) => acc + curr, 0) / positiveCount) : 0,
            positiveCount: positiveCount,
            negativeROI: negativeROI.length > 0 ? Number(negativeROI.reduce((acc, curr) => acc + curr, 0) / negativeCount) : 0,
            negativeCount: negativeCount,
            avgROI: roiValues.length > 0 ? Number(roiValues.reduce((acc, curr) => acc + curr, 0) / roiValues.length) : 0,
            totalSpend: totalSpend,
            positiveSpend: positiveSpend.length > 0 ? Number(positiveSpend.reduce((acc, curr) => acc + curr, 0)) : 0,
            negativeSpend: negativeSpend.length > 0 ? Number(negativeSpend.reduce((acc, curr) => acc + curr, 0)) : 0
        });
    };

    const calculateChart2Data = () => {
        // Group events by retailer and calculate average ROI
        const retailerROIs = {};
        let totalROI = 0;
        let retailerCount = 0;

        currentYearEvents.forEach(event => {
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
                // TODO: Change roi logic
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
                            text: `Avg. ROI: ${avgROI.toFixed(2)}%`,
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

        currentYearEvents.forEach(event => {
            let spend = 0;
            let volume = 0;
            let roi = 0;
            event.planned.forEach(product => {
                const { financialResults } = getResult(product.financialData);
                spend += Number(financialResults.find(r => r.name === "Total Spend")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
                // TODO: Change roi logic
                roi += Number(financialResults.find(r => r.name === "Sales ROI")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
                volume += Number(financialResults.find(r => r.name === "Incremental Revenue")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
            });

            // Add event name to the data points
            spendVolumeData.push({
                x: spend,
                y: volume,
                eventName: `${event.title}`
            });
            spendROIData.push({
                x: spend,
                y: roi,
                eventName: `${event.title}`
            });
        });

        // Calculate correlations
        correlation1 = calculateCorrelation(spendVolumeData.map(d => [d.x, d.y]));
        correlation2 = calculateCorrelation(spendROIData.map(d => [d.x, d.y]));

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
                tooltip: {
                    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                        const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                        return `<div class="p-2">
                            <div><b>${data.eventName}</b></div>
                            <div>Spend: $${data.x.toFixed(2)}</div>
                            <div>Volume: ${data.y.toFixed(2)}</div>
                        </div>`;
                    }
                },
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
                tooltip: {
                    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                        const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                        return `<div class="p-2">
                            <div><b>${data.eventName}</b></div>
                            <div>Spend: $${data.x.toFixed(2)}</div>
                            <div>ROI: ${data.y.toFixed(2)}%</div>
                        </div>`;
                    }
                },
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
            'TPR': { count: 0, productCount: 0, lift: 0, roi: 0, spend: 0, incrementalLift: 0 },
            'Feature Only': { count: 0, productCount: 0, lift: 0, roi: 0, spend: 0, incrementalLift: 0 },
            'Display Only': { count: 0, productCount: 0, lift: 0, roi: 0, spend: 0, incrementalLift: 0 },
            'Feature and Display': { count: 0, productCount: 0, lift: 0, roi: 0, spend: 0, incrementalLift: 0 }
        };

        let totalEvents = 0;
        let totalSpend = 0;
        let totalROI = 0;
        let totalIncrementalLift = 0;
        let totalProductCount = 0;

        // First pass: Calculate totals
        currentYearEvents.forEach(event => {
            // Determine event type from the first product's promotional results
            const firstProduct = event.planned[0];
            const { promotionalResults: firstProductPromo } = getResult(firstProduct.financialData);

            if (firstProductPromo) {
                // Check event type once per event
                const tprEvent = firstProductPromo.find(p => p.promotion === 'TPR')?.acv > 0;
                const featureEvent = firstProductPromo.find(p => p.promotion === 'Feature Only')?.acv > 0;
                const displayEvent = firstProductPromo.find(p => p.promotion === 'Display Only')?.acv > 0;
                const featureAndDisplayEvent = firstProductPromo.find(p => p.promotion === 'Feature and Display')?.acv > 0;

                // Increment counts once per event
                if (tprEvent) eventTypes.TPR.count++;
                if (featureEvent) eventTypes['Feature Only'].count++;
                if (displayEvent) eventTypes['Display Only'].count++;
                if (featureAndDisplayEvent) eventTypes['Feature and Display'].count++;
            }

            // Process each product's financial data
            event.planned.forEach(product => {
                const { financialResults, promotionalResults } = getResult(product.financialData);
                if (!promotionalResults) return;

                const roi = Number(financialResults.find(r => r.name === "Sales ROI")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
                const spend = Number(financialResults.find(r => r.name === "Total Spend")?.value?.replace(/[^0-9.-]+/g, "")) || 0;

                // Get promotional results
                const tprResult = promotionalResults.find(p => p.promotion === 'TPR');
                const featureResult = promotionalResults.find(p => p.promotion === 'Feature Only');
                const displayResult = promotionalResults.find(p => p.promotion === 'Display Only');
                const featureAndDisplayResult = promotionalResults.find(p => p.promotion === 'Feature and Display');

                // Accumulate metrics without incrementing counts
                if (tprResult && tprResult.acv > 0) {
                    eventTypes.TPR.productCount++;
                    eventTypes.TPR.incrementalLift += tprResult.lift;
                    eventTypes.TPR.roi += (roi);
                    eventTypes.TPR.spend += spend;
                    totalIncrementalLift += tprResult.lift;
                    totalProductCount++;
                }

                if (featureResult && featureResult.acv > 0) {
                    eventTypes['Feature Only'].productCount++;
                    eventTypes['Feature Only'].incrementalLift += featureResult.lift;
                    eventTypes['Feature Only'].roi += (roi);
                    eventTypes['Feature Only'].spend += spend;
                    totalIncrementalLift += featureResult.lift;
                    totalProductCount++;
                }

                if (displayResult && displayResult.acv > 0) {
                    eventTypes['Display Only'].productCount++;
                    eventTypes['Display Only'].incrementalLift += displayResult.lift;
                    eventTypes['Display Only'].roi += (roi);
                    eventTypes['Display Only'].spend += spend;
                    totalIncrementalLift += displayResult.lift;
                    totalProductCount++;
                }

                if (featureAndDisplayResult && featureAndDisplayResult.acv > 0) {
                    eventTypes['Feature and Display'].productCount++;
                    eventTypes['Feature and Display'].incrementalLift += featureAndDisplayResult.lift;
                    eventTypes['Feature and Display'].roi += (roi);
                    eventTypes['Feature and Display'].spend += spend;
                    totalIncrementalLift += featureAndDisplayResult.lift;
                    totalProductCount++;
                }

                totalSpend += spend;
                totalROI += (roi);
            });

            totalEvents++;
        });

        const categories = ['TPR', 'Feature Only', 'Display Only', 'Feature and Display', `All ${totalEvents} Events`];

        // Calculate percentages and weighted averages
        const eventCount = [
            (eventTypes.TPR.count / totalEvents) * 100,
            (eventTypes['Feature Only'].count / totalEvents) * 100,
            (eventTypes['Display Only'].count / totalEvents) * 100,
            (eventTypes['Feature and Display'].count / totalEvents) * 100,
            100 // All events is always 100%
        ];

        // Calculate average incremental lift for each type
        const avgLift = [
            eventTypes.TPR.productCount > 0 ? eventTypes.TPR.incrementalLift / eventTypes.TPR.productCount : 0,
            eventTypes['Feature Only'].productCount > 0 ? eventTypes['Feature Only'].incrementalLift / eventTypes['Feature Only'].productCount : 0,
            eventTypes['Display Only'].productCount > 0 ? eventTypes['Display Only'].incrementalLift / eventTypes['Display Only'].productCount : 0,
            eventTypes['Feature and Display'].productCount > 0 ? eventTypes['Feature and Display'].incrementalLift / eventTypes['Feature and Display'].productCount : 0,
            totalProductCount > 0 ? totalIncrementalLift / totalProductCount : 0
        ];

        const weightedROI = [
            eventTypes.TPR.spend > 0 ? eventTypes.TPR.roi / totalEvents : 0,
            eventTypes['Feature Only'].spend > 0 ? eventTypes['Feature Only'].roi / totalEvents : 0,
            eventTypes['Display Only'].spend > 0 ? eventTypes['Display Only'].roi / totalEvents : 0,
            eventTypes['Feature and Display'].spend > 0 ? eventTypes['Feature and Display'].roi / totalEvents : 0,
            totalEvents > 0 ? totalROI / totalEvents : 0
        ];

        setChart4Data(prev => ({
            eventCount: {
                ...prev.eventCount,
                series: [{
                    name: 'Event Count',
                    data: eventCount
                }],
                options: {
                    ...prev.eventCount.options,
                    xaxis: {
                        ...prev.eventCount.options.xaxis,
                        categories
                    }
                }
            },
            incrementalLift: {
                ...prev.incrementalLift,
                series: [{
                    name: 'Incremental Lift',
                    data: avgLift
                }],
                options: {
                    ...prev.incrementalLift.options,
                    xaxis: {
                        ...prev.incrementalLift.options.xaxis,
                        categories
                    }
                }
            },
            weightedROI: {
                ...prev.weightedROI,
                series: [{
                    name: 'Weighted ROI',
                    data: weightedROI
                }],
                options: {
                    ...prev.weightedROI.options,
                    xaxis: {
                        ...prev.weightedROI.options.xaxis,
                        categories
                    }
                }
            }
        }));
    };

    const calculateChart5Data = () => {
        // Initialize data structure for discount ranges
        const discountRanges = [
            { min: 0, max: 10, events: [] },
            { min: 10, max: 20, events: [] },
            { min: 20, max: 30, events: [] },
            { min: 30, max: 40, events: [] },
            { min: 40, max: 50, events: [] }
        ];

        let totalSpend = 0;

        // Process each event
        currentYearEvents.forEach(event => {
            // Calculate average discount for the event
            let eventTotalDiscount = 0;
            let eventProductCount = 0;
            let eventROI = 0;
            let eventSpend = 0;

            // Calculate event metrics
            event.planned.forEach(product => {
                const basePrice = Number(product.financialData.basePrice) || 0;
                const promoPrice = Number(product.financialData.promoPrice) || 0;
                const productDiscount = ((basePrice - promoPrice) / basePrice) * 100;

                const { financialResults } = getResult(product.financialData);
                const roiResult = financialResults.find(r => r.name === "Sales ROI")?.value;
                const roi = Number(roiResult?.replace(/[^0-9.-]+/g, "")) || 0;
                const spend = Number(financialResults.find(r => r.name === "Total Spend")?.value?.replace(/[^0-9.-]+/g, "")) || 0;

                eventTotalDiscount += productDiscount;
                eventROI += roi;
                eventSpend += spend;
                eventProductCount++;
                totalSpend += spend;
            });

            // Calculate event averages
            const avgDiscount = eventTotalDiscount / eventProductCount;
            const avgROI = eventROI / eventProductCount;

            // Find appropriate discount range and add event
            const rangeIndex = discountRanges.findIndex(range =>
                avgDiscount >= range.min && avgDiscount < range.max
            );

            if (rangeIndex !== -1) {
                discountRanges[rangeIndex].events.push({
                    name: event.title || `Event ${event.id}`,
                    roi: avgROI,
                    spend: eventSpend
                });
            }
        });

        // Prepare summary data
        const summaryData = {
            noOfEvents: discountRanges.map(range => range.events.length),
            tradeSpend: discountRanges.map(range =>
                (range.events.reduce((sum, event) => sum + event.spend, 0) / totalSpend) * 100
            ),
            avgLift: discountRanges.map(range =>
                range.events.length > 0
                    ? range.events.reduce((sum, event) => sum + event.roi, 0) / range.events.length
                    : 0
            ),
            fndEvents: discountRanges.map(range => range.events.length) // Using event count as F&D count for now
        };

        // Prepare series data - one series per event in each range
        const series = [];
        const categories = ['0-10', '10-20', '20-30', '30-40', '40-50'];

        // Create a data array with all events properly positioned
        const data = Array(categories.length).fill(null).map(() => []);

        discountRanges.forEach((range, rangeIndex) => {
            range.events.forEach(event => {
                data[rangeIndex].push({
                    x: categories[rangeIndex],
                    y: event.roi,
                    name: event.name
                });
            });
        });

        // Convert to series format
        const maxEventsInAnyRange = Math.max(...data.map(range => range.length));

        for (let i = 0; i < maxEventsInAnyRange; i++) {
            const seriesData = categories.map((cat, catIndex) => {
                return data[catIndex][i] || { x: cat, y: 0 };
            });

            series.push({
                name: `Event ${i + 1}`,
                data: seriesData.map(d => d.y)
            });
        }

        setChart5Data(prev => ({
            ...prev,
            series: series,
            options: {
                ...prev.options,
                xaxis: {
                    ...prev.options.xaxis,
                    categories: categories
                },
                colors: ['#4472C4', '#00B050', '#FFC000', '#7030A0'], // Colors for different events
                title: {
                    text: 'ROI by Discount Depth',
                    align: 'center'
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val.toFixed(2) + '%';
                        }
                    }
                },
                dataLabels: {
                    ...prev.options.dataLabels,
                    formatter: function (val) {
                        // Only show label if value is not zero
                        return val === 0 ? '' : val.toFixed(2) + '%';
                    }
                },
                plotOptions: {
                    ...prev.options.plotOptions,
                    bar: {
                        ...prev.options.plotOptions?.bar,
                        hideZeros: true, // Hide zero values
                    }
                }
            },
            summaryData: summaryData
        }));
    };

    // Add this function at the top level of the component
    const createPPGGroups = (events) => {
        // Map to store PPG groups and their events
        const ppgMap = new Map();

        events.forEach(event => {
            // Use ppg_name as the key instead of product combinations
            const ppgName = event.ppg_name || 'Ungrouped';

            if (!ppgMap.has(ppgName)) {
                ppgMap.set(ppgName, {
                    products: event.planned.map(p => p.productId),
                    events: [],
                    name: ppgName // Use the actual PPG name instead of generating A, B, C
                });
            }

            ppgMap.get(ppgName).events.push(event);
        });

        return ppgMap;
    };

    // Update calculateChart6Data function
    const calculateChart6Data = () => {
        const ppgGroups = createPPGGroups(currentYearEvents);
        const summaryData = [];
        const categories = [];
        const seriesData = new Map(); // Use Map to track events by name

        // Process each PPG group
        ppgGroups.forEach((group, productIds) => {
            const ppgName = group.name;
            const ppgEvents = [];
            const ppgProducts = new Map();
            categories.push(ppgName);

            // Process events in the group
            group.events.forEach((event) => {
                const eventData = {
                    name: event.title,
                    roi: 0,
                    sharedProfitPerDollar: 0,
                    retailerFunding: 0,
                    products: []
                };

                // Calculate event metrics
                event.planned.forEach(product => {
                    const { financialResults } = getResult(product.financialData);
                    const basePrice = Number(product.financialData.basePrice) || 0;
                    const promoPrice = Number(product.financialData.promoPrice) || 0;
                    const roiResult = financialResults.find(r => r.name === "Sales ROI")?.value;
                    // TODO: Change roi logic
                    const roi = Number(roiResult?.replace(/[^0-9.-]+/g, "")) || 0;

                    const shelfPriceInvestment = (basePrice - promoPrice) * Number(product.financialData.units);
                    const mftTradeInvestment = Number(product.financialData.mft_trade_investment) || 0;
                    const retailerFunding = ((shelfPriceInvestment - mftTradeInvestment) / shelfPriceInvestment) * 100;

                    eventData.roi += roi;
                    eventData.retailerFunding += retailerFunding;

                    // Track product-level data
                    const productData = {
                        name: product.name,
                        roi: roi,
                        sharedProfitPerDollar: shelfPriceInvestment ? (shelfPriceInvestment - mftTradeInvestment) / shelfPriceInvestment : 0,
                        retailerFunding: retailerFunding,
                        pricePoints: [promoPrice.toFixed(2)]
                    };

                    eventData.products.push(productData);
                    if (!ppgProducts.has(product.productId)) {
                        ppgProducts.set(product.productId, productData);
                    }
                });

                // Calculate average ROI for the event
                eventData.roi /= event.planned.length;
                eventData.retailerFunding /= event.planned.length;
                ppgEvents.push(eventData);

                // Track event data for series
                if (!seriesData.has(event.title)) {
                    seriesData.set(event.title, {
                        name: event.title,
                        data: Array(categories.length - 1).fill(0) // Fill previous positions with 0
                    });
                }

                // Add ROI data for this event
                const eventSeries = seriesData.get(event.title);
                eventSeries.data.push(eventData.roi);
            });

            // Fill remaining positions for all series
            seriesData.forEach(series => {
                while (series.data.length < categories.length) {
                    series.data.push(0);
                }
            });

            // Add to summary data
            summaryData.push({
                ppgName: ppgName,
                events: ppgEvents,
                products: Array.from(ppgProducts.values())
            });
        });

        // Convert series data to array and update chart
        setChart6Data(prev => ({
            ...prev,
            series: Array.from(seriesData.values()),
            options: {
                ...prev.options,
                xaxis: {
                    ...prev.options.xaxis,
                    categories: categories
                }
            },
            summaryData: {
                ppgGroups: summaryData
            }
        }));
    };

    const calculateChart7Data = () => {
        // Extract unique channels from events
        const channels = [...new Set(events.flatMap(event =>
            event.channels ? (Array.isArray(event.channels) ? event.channels : [event.channels]) : []
        ))];

        // Initialize data structure for year comparison
        const channelData = {};
        channels.forEach(channel => {
            channelData[channel] = {
                previousYear: {
                    profit: 0,
                    spend: 0
                },
                currentYear: {
                    profit: 0,
                    spend: 0
                }
            };
        });

        // Process events
        events.forEach(event => {
            const eventDate = new Date(event.start_date);
            const eventYear = eventDate.getFullYear();
            const eventChannels = Array.isArray(event.channels) ? event.channels : [event.channels];

            // TODO : Change logic by retailer. Not channel
            eventChannels.forEach(channel => {
                if (!channel || !channelData[channel]) return;

                event.planned.forEach(product => {
                    const { financialResults } = getResult(product.financialData);

                    // Calculate incremental profit
                    const incrementalRevenue = Number(financialResults.find(r => r.name === "Incremental Revenue")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
                    const totalSpend = Number(financialResults.find(r => r.name === "Total Spend")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
                    if (eventYear === currentYear) {
                        channelData[channel].currentYear.profit += incrementalRevenue;
                        channelData[channel].currentYear.spend += totalSpend;
                    } else if (eventYear === currentYear - 1) {
                        channelData[channel].previousYear.profit += incrementalRevenue;
                        channelData[channel].previousYear.spend += totalSpend;
                    }
                });
            });
        });

        // Calculate profit per dollar and percentage changes
        const previousYearData = [];
        const currentYearData = [];
        const percentageChanges = [];

        channels.forEach(channel => {
            const prevProfitPerDollar = channelData[channel].previousYear.spend > 0
                ? channelData[channel].previousYear.profit / channelData[channel].previousYear.spend
                : 0;

            const currProfitPerDollar = channelData[channel].currentYear.spend > 0
                ? channelData[channel].currentYear.profit / channelData[channel].currentYear.spend
                : 0;

            previousYearData.push(prevProfitPerDollar);
            currentYearData.push(currProfitPerDollar);

            // Calculate percentage change between previous and current year
            const percentChange = ((currProfitPerDollar - prevProfitPerDollar) / prevProfitPerDollar) * 100;
            percentageChanges.push(percentChange);
        });

        // Update chart data with modified options
        setChart7Data(prev => ({
            ...prev,
            series: [
                {
                    name: 'Previous Year',
                    data: previousYearData
                },
                {
                    name: 'Current Year',
                    data: currentYearData,
                    percentageChanges: percentageChanges
                }
            ],
            options: {
                ...prev.options,
                xaxis: {
                    ...prev.options.xaxis,
                    categories: channels
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        dataLabels: {
                            position: 'center'
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val, { seriesIndex, dataPointIndex, w }) {
                        if (seriesIndex === 1) { // For current year bars
                            const prevValue = w.config.series[0].data[dataPointIndex];
                            const currValue = val;
                            const percentChange = ((currValue - prevValue) / prevValue) * 100;
                            const arrow = percentChange >= 0 ? '↑' : '↓';
                            return `${val.toFixed(2)} (${arrow}${Math.abs(percentChange).toFixed(1)}%)`;
                        }
                        return val.toFixed(2);
                    },
                    style: {
                        colors: ['#fff']
                    }
                }
            }
        }));
    };

    const calculateChart8Data = () => {
        const scatterData = [];

        currentYearEvents.forEach(event => {
            event.planned.forEach(product => {
                const { financialResults } = getResult(product.financialData);

                // Calculate ROI
                const roiResult = financialResults.find(r => r.name === "Sales ROI")?.value;
                const roi = Number(roiResult?.replace(/[^0-9.-]+/g, "")) || 0;

                // Calculate Shared Profit Created
                const baseUnits = Number(product.financialData.units) || 0;
                const promoUnits = Number(financialResults.find(r => r.name === "Units")?.value) || 0;
                const baseShelfPrice = Number(product.financialData.basePrice) || 0;
                const promoShelfPrice = Number(product.financialData.promoPrice) || 0;
                const mfrCOGS = Number(product.financialData.basePrice / 2) || 0;

                const baseSharedProfit = (baseShelfPrice - mfrCOGS) * baseUnits;
                const promoSharedProfit = (promoShelfPrice - mfrCOGS) * promoUnits;
                const sharedProfitCreated = promoSharedProfit - baseSharedProfit;

                // Calculate Shelf Price Investment
                const shelfPriceInvestment = (baseShelfPrice - promoShelfPrice) * promoUnits;

                // Calculate Incremental Profit per Dollar
                const incrementalProfitPerDollar = shelfPriceInvestment !== 0 ?
                    sharedProfitCreated / shelfPriceInvestment : 0;

                // Only add points with valid values
                if (!isNaN(roi) && !isNaN(incrementalProfitPerDollar) &&
                    isFinite(roi) && isFinite(incrementalProfitPerDollar)) {
                    scatterData.push({
                        x: roi,
                        y: incrementalProfitPerDollar,
                        name: `${product.name} : ${event.title}`
                    });
                }
            });
        });

        // Update chart data
        setChart8Data(prev => ({
            ...prev,
            series: [{
                name: 'Incremental Profit per Dollar',
                data: scatterData
            }],
            options: {
                ...prev.options,
                xaxis: {
                    ...prev.options.xaxis,
                    min: Math.min(...scatterData.map(d => d.x)) - 5,
                    max: Math.max(...scatterData.map(d => d.x)) + 5
                },
                yaxis: {
                    ...prev.options.yaxis,
                    min: Math.min(...scatterData.map(d => d.y)) - 0.5,
                    max: Math.max(...scatterData.map(d => d.y)) + 0.5
                }
            }
        }));
    };

    const calculateChart9Data = () => {
        const ppgGroups = createPPGGroups(currentYearEvents);
        const retailerFundingData = new Map();

        ppgGroups.forEach((group, productIds) => {
            const fundingPoints = [];

            // Process each event in the PPG
            group.events.forEach(event => {
                let eventRetailerFunding = 0;
                let eventROI = 0;

                event.planned.forEach(product => {
                    const { financialResults, promotionalResults } = getResult(product.financialData);
                    const basePrice = Number(product.financialData.basePrice) || 0;
                    const promoPrice = Number(product.financialData.promoPrice) || 0;
                    const promoUnits = Number(promotionalResults.find(result =>
                        result.promotion === 'Event Total')?.units) || 0;

                    // Calculate Shelf Price Investment
                    const shelfPriceInvestment = (basePrice - promoPrice) * promoUnits;

                    // Calculate ROI
                    const roiResult = financialResults.find(r => r.name === "Sales ROI")?.value;
                    const roi = Number(roiResult?.replace(/[^0-9.-]+/g, "")) || 0;

                    // Calculate Retailer Funding
                    const mftTradeInvestment = Number(product.financialData.mft_trade_investment) || 0;
                    const retailerFunding = ((shelfPriceInvestment - mftTradeInvestment) / shelfPriceInvestment) * 100;

                    eventRetailerFunding += retailerFunding;
                    eventROI += roi;
                });

                // Average metrics for the event
                const avgRetailerFunding = eventRetailerFunding / event.planned.length;
                const avgROI = eventROI / event.planned.length;

                fundingPoints.push([avgRetailerFunding, avgROI]);
            });

            retailerFundingData.set(group.name, fundingPoints);
        });

        // Generate series data
        const series = Array.from(retailerFundingData.entries()).map(([ppgName, points]) => ({
            name: ppgName,
            data: points.sort((a, b) => a[0] - b[0]) // Sort by retailer funding percentage
        }));

        setChart9Data(prev => ({
            ...prev,
            series
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

            // Event Count chart
            slide.addShape(pptx.shapes.RECTANGLE, {
                x: 0.35,
                y: 0.5,
                w: 12,
                h: 0.4,
                fill: { color: "0072bc" }
            });

            slide.addText("Event Count (% of Total)", {
                x: 0.35,
                y: 0.5,
                w: 12,
                h: 0.4,
                align: 'center',
                fontSize: 12,
                bold: true,
                color: "FFFFFF"
            });

            const eventCountData = [{
                name: 'Event Count',
                labels: ['TPR', 'Feature Only', 'Display Only', 'Feature and Display', 'All Events'],
                values: chart4Data.eventCount.series[0].data
            }];

            slide.addChart(pptx.charts.BAR, eventCountData, {
                x: 0.35,
                y: 0.9,
                w: 12,
                h: 1.6,
                barDir: 'bar',
                showTitle: false,
                showLegend: false,
                dataLabelFormatCode: '#,##0.00"%"',
                chartColors: ['2196f3'],
                showValue: true,
                dataLabelPosition: 'outEnd',
                catAxisOrientation: 'maxMin',
                barGapWidthPct: 60,
                valAxisMaxVal: 100,
                valAxisMinVal: 0,
                catAxisLabelPos: 'low'
            });

            // Incremental Lift chart
            slide.addShape(pptx.shapes.RECTANGLE, {
                x: 0.35,
                y: 2.7,
                w: 12,
                h: 0.4,
                fill: { color: "0072bc" }
            });

            slide.addText("Average Incremental Lift (%)", {
                x: 0.35,
                y: 2.7,
                w: 12,
                h: 0.4,
                align: 'center',
                fontSize: 12,
                bold: true,
                color: "FFFFFF"
            });

            const incrementalLiftData = [{
                name: 'Incremental Lift',
                labels: ['TPR', 'Feature Only', 'Display Only', 'Feature and Display', 'All Events'],
                values: chart4Data.incrementalLift.series[0].data
            }];

            slide.addChart(pptx.charts.BAR, incrementalLiftData, {
                x: 0.35,
                y: 3.1,
                w: 12,
                h: 1.6,
                barDir: 'bar',
                showTitle: false,
                showLegend: false,
                dataLabelFormatCode: '#,##0.00"%"',
                chartColors: ['00e396'],
                showValue: true,
                dataLabelPosition: 'outEnd',
                catAxisOrientation: 'maxMin',
                barGapWidthPct: 60,
                catAxisLabelPos: 'low'
            });

            // Weighted ROI chart
            slide.addShape(pptx.shapes.RECTANGLE, {
                x: 0.35,
                y: 4.9,
                w: 12,
                h: 0.4,
                fill: { color: "0072bc" }
            });

            slide.addText("Weighted Average ROI (%)", {
                x: 0.35,
                y: 4.9,
                w: 12,
                h: 0.4,
                align: 'center',
                fontSize: 12,
                bold: true,
                color: "FFFFFF"
            });

            const weightedROIData = [{
                name: 'Weighted ROI',
                labels: ['TPR', 'Feature Only', 'Display Only', 'Feature and Display', 'All Events'],
                values: chart4Data.weightedROI.series[0].data
            }];

            slide.addChart(pptx.charts.BAR, weightedROIData, {
                x: 0.35,
                y: 5.3,
                w: 12,
                h: 1.6,
                barDir: 'bar',
                showTitle: false,
                showLegend: false,
                dataLabelFormatCode: '#,##0.00"%"',
                chartColors: ['feb019'],
                showValue: true,
                dataLabelPosition: 'outEnd',
                catAxisOrientation: 'maxMin',
                barGapWidthPct: 60,
                catAxisLabelPos: 'low'
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
            slide.addText(`Avg. Wtd ROI for different discount levels by ${chart5View}`, {
                x: 0.35,
                y: 0.5,
                w: 12,
                h: 0.5,
                fontSize: 14,
                bold: true,
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
                title: `ROI by Discount Depth (${chart5View} View)`,
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
                fileName: `ROI_by_Discount_Depth_${chart5View}.pptx`,
                compression: true
            });

        } catch (error) {
            console.error("PPT Generation Error:", error);
        } finally {
            setPresentationGenerated(false);
        }
    };

    const generateChart6PPT = async () => {
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

            // Add main chart
            const chartData = chart6Data.series.map(series => ({
                name: series.name,
                labels: ['PPG A', 'PPG B'],
                values: series.data
            }));

            slide.addChart(pptx.charts.BAR, chartData, {
                x: 0.35,
                y: 1.5,
                w: 8,
                h: 4,
                barDir: 'col',
                showTitle: true,
                title: "Performance by Price Point Group",
                showLegend: true,
                legendPos: 'b',
                dataLabelFormatCode: '#,##0.0"%"',
                showValue: true,
                valueBarColors: true,
                chartColors: ['4472C4', '00B050', 'FFC000'],
                catAxisTitle: "Price Point Groups",
                valAxisTitle: "Percentage (%)"
            });

            // Add summary tables
            const summaryData = chart6Data.summaryData;

            // PPG A Summary
            slide.addText("PPG A Summary", {
                x: 8.5,
                y: 1.5,
                w: 4,
                h: 0.3,
                fontSize: 12,
                bold: true,
                color: "000000"
            });

            slide.addTable([
                ["Metric", "Value"],
                ["Shared Profit Created", `$${formatNumber(summaryData.ppgA.sharedProfitCreated)}`],
                ["Shelf Price Investment", `$${formatNumber(summaryData.ppgA.shelfPriceInvestment)}`],
                ["Shared Profit Per $", `${formatNumber(summaryData.ppgA.sharedProfitPerDollar)}%`],
                ["% Funded by Retailer", `${formatNumber(summaryData.ppgA.percentFundedByRetailer)}%`]
            ], {
                x: 8.5,
                y: 1.9,
                w: 4,
                colW: [2, 2],
                fontSize: 10,
                border: { pt: 1, color: "cccccc" }
            });

            // PPG B Summary
            slide.addText("PPG B Summary", {
                x: 8.5,
                y: 3.5,
                w: 4,
                h: 0.3,
                fontSize: 12,
                bold: true,
                color: "000000"
            });

            slide.addTable([
                ["Metric", "Value"],
                ["Shared Profit Created", `$${formatNumber(summaryData.ppgB.sharedProfitCreated)}`],
                ["Shelf Price Investment", `$${formatNumber(summaryData.ppgB.shelfPriceInvestment)}`],
                ["Shared Profit Per $", `${formatNumber(summaryData.ppgB.sharedProfitPerDollar)}%`],
                ["% Funded by Retailer", `${formatNumber(summaryData.ppgB.percentFundedByRetailer)}%`]
            ], {
                x: 8.5,
                y: 3.9,
                w: 4,
                colW: [2, 2],
                fontSize: 10,
                border: { pt: 1, color: "cccccc" }
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
                fileName: "Performance_by_PPG.pptx",
                compression: true
            });

        } catch (error) {
            console.error("PPT Generation Error:", error);
        } finally {
            setPresentationGenerated(false);
        }
    };

    const generateChart7PPT = async () => {
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

            // Add main chart
            const chartData = chart7Data.series.map(series => ({
                name: series.name,
                labels: chart7Data.options.xaxis.categories,
                values: series.data
            }));

            slide.addChart(pptx.charts.BAR, chartData, {
                x: 0.35,
                y: 1.5,
                w: 12,
                h: 5,
                barDir: 'col',
                showTitle: true,
                title: "Incremental Profit Pool per Dollar Invested on Promo",
                showLegend: true,
                legendPos: 'b',
                dataLabelFormatCode: '#,##0.00',
                showValue: true,
                chartColors: ['2196f3', '00e396', 'feb019'],
                catAxisTitle: "Channels",
                valAxisTitle: "Incremental Profit per Dollar"
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
                fileName: "Incremental_Profit_by_Channel.pptx",
                compression: true
            });

        } catch (error) {
            console.error("PPT Generation Error:", error);
        } finally {
            setPresentationGenerated(false);
        }
    };

    const generateChart8PPT = async () => {
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
            slide.addText("Relationship between ROI and Incremental Profit Pool", {
                x: 0.35,
                y: 0.5,
                w: 12,
                h: 0.5,
                fontSize: 14,
                bold: true,
                color: "000000"
            });

            // Add chart
            const scatterData = chart8Data.series[0].data.map(point => ({
                x: point.x,
                y: point.y,
                name: point.name
            }));

            const chartData = [{
                name: 'Incremental Profit per Dollar',
                values: scatterData.map(point => point.y),
                labels: scatterData.map(point => point.x.toString())
            }];

            slide.addChart(pptx.charts.SCATTER, chartData, {
                x: 0.35,
                y: 1.2,
                w: 12,
                h: 5,
                showTitle: true,
                title: "Relationship between ROI and Incremental Profit Pool per Event",
                showLegend: false,
                lineSize: 0,
                chartColors: ['#00B3E5'],
                lineWidth: 0,
                markerSize: 10,
                valAxisTitle: "Incremental Profit Pool per Dollar Invested",
                catAxisTitle: "Manufacturer ROI (%)",
                plotArea: { border: { pt: 1, color: "888888" } },
                showValAxisTitle: true,
                showCatAxisTitle: true,
                valAxisTitleColor: "000000",
                catAxisTitleColor: "000000",
                dataLabelFormatCode: "#,##0.00",
                valAxisLabelFormatCode: "$#,##0.00",
                catAxisLabelFormatCode: "#,##0'%'"
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
                fileName: "Relationship_between_ROI_and_Incremental_Profit_Pool.pptx",
                compression: true
            });

        } catch (error) {
            console.error("PPT Generation Error:", error);
        } finally {
            setPresentationGenerated(false);
        }
    };

    const generateChart9PPT = async () => {
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
            slide.addText("Relationship between retailer funding and ROI at different price points", {
                x: 0.35,
                y: 0.5,
                w: 12,
                h: 0.5,
                fontSize: 14,
                bold: true,
                color: "000000"
            });

            // Format data for the chart
            const chartData = chart9Data.series.map(series => {
                // Ensure data points exist and are properly formatted
                const validData = series.data.filter(point =>
                    Array.isArray(point) && point.length === 2 &&
                    !isNaN(point[0]) && !isNaN(point[1])
                );

                return {
                    name: series.name,
                    values: validData.map(point => point[1]),
                    labels: validData.map(point => point[0].toString())
                };
            }).filter(series => series.values.length > 0); // Only include series with valid data

            if (chartData.length > 0) {
                // Add chart
                slide.addChart(pptx.charts.LINE, chartData, {
                    x: 0.35,
                    y: 1.2,
                    w: 12,
                    h: 5,
                    showTitle: true,
                    title: "Relationship between retailer funding and ROI at different price points",
                    showLegend: true,
                    legendPos: 'b',
                    dataLabelFormatCode: "#,##0.00",
                    showValue: true,
                    chartColors: ['#00B3E5', '#4CAF50', '#FFC107'],
                    catAxisTitle: "% of Promo Funded by Retailer",
                    valAxisTitle: "Manufacturer Promo ROI",
                    valAxisMinVal: Math.min(...chartData.flatMap(s => s.values)) - 5,
                    valAxisMaxVal: Math.max(...chartData.flatMap(s => s.values)) + 5,
                    valGridLine: { style: "none" },
                    catGridLine: { style: "none" }
                });

                // Add description
                slide.addText("The green shaded area indicates the minimum acceptable ROI of 25%", {
                    x: 0.35,
                    y: 6.3,
                    w: 12,
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
                    fileName: "Relationship_between_retailer_funding_and_ROI.pptx",
                    compression: true
                });
            } else {
                console.error("No valid data available for the chart");
                throw new Error("No valid data available for the chart");
            }

        } catch (error) {
            console.error("PPT Generation Error:", error);
        } finally {
            setPresentationGenerated(false);
        }
    };

    const formatNumber = (num) => {
        return Number(num).toFixed(1);
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
                                            <span className="ml-2">What is the ROI for all events?</span>
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
                                                                <th className="py-2 px-4">Positive ROI</th>
                                                                <td className="py-2 px-4">{summaryData.positiveCount}</td>
                                                                <td className="py-2 px-4">${((summaryData.positiveSpend).toFixed(1).toLocaleString())}</td>
                                                                <th className="py-2 px-4">{formatNumber(summaryData.positiveROI)}%</th>
                                                            </tr>
                                                            <tr className="border-b border-gray-300 text-left">
                                                                <th className="py-2 px-4">Negative ROI</th>
                                                                <td className="py-2 px-4">{summaryData.negativeCount}</td>
                                                                <td className="py-2 px-4">${((summaryData.negativeSpend).toFixed(1).toLocaleString())}</td>
                                                                <th className="py-2 px-4">{formatNumber(summaryData.negativeROI)}%</th>
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
                                            <span className="ml-2">What is driving the variation in ROI across different retailers?</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className="flex justify-between mb-4">
                                                <div>
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
                                            <span className="ml-2">What is the ROI by event types?</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className="flex justify-between mb-4">
                                                <div>

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
                                                <div className="flex flex-col">
                                                    <div className="bg-[#0072bc] text-white p-2 mb-2 text-center">
                                                        Event Count (% of Total)
                                                    </div>
                                                    <ReactApexChart
                                                        options={chart4Data.eventCount.options}
                                                        series={chart4Data.eventCount.series}
                                                        type="bar"
                                                        height={400}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="bg-[#0072bc] text-white p-2 mb-2 text-center">
                                                        Average Incremental Lift (%)
                                                    </div>
                                                    <ReactApexChart
                                                        options={chart4Data.incrementalLift.options}
                                                        series={chart4Data.incrementalLift.series}
                                                        type="bar"
                                                        height={400}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="bg-[#0072bc] text-white p-2 mb-2 text-center">
                                                        Weighted Average ROI (%)
                                                    </div>
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
                                            <span className="ml-2">What is the ROI at different discount levels?</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className="flex justify-between mb-4">
                                                <div>
                                                </div>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={generateChart5PPT}
                                                    disabled={presentationGenerated}
                                                >
                                                    {presentationGenerated ? 'Generating...' : 'Download PPT'}
                                                </button>
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                {/* Full width chart */}
                                                <div className="w-full">
                                                    <ReactApexChart
                                                        options={chart5Data.options}
                                                        series={chart5Data.series}
                                                        type="bar"
                                                        height={500} // Increased height for better visibility
                                                    />
                                                </div>

                                                {/* Summary table below */}
                                                <div className="bg-gray-50 p-4 rounded w-full">
                                                    <h4 className="text-lg font-bold mb-3">Result Summary</h4>
                                                    <div className="overflow-x-auto">
                                                        <table className="min-w-full bg-white border border-gray-300">
                                                            <thead>
                                                                <tr className="bg-gray-100">
                                                                    <th className="border px-4 py-2">Discount Depth</th>
                                                                    <th className="border px-4 py-2">0-10</th>
                                                                    <th className="border px-4 py-2">10-20</th>
                                                                    <th className="border px-4 py-2">20-30</th>
                                                                    <th className="border px-4 py-2">30-40</th>
                                                                    <th className="border px-4 py-2">40-50</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="border px-4 py-2 font-semibold">No. of events</td>
                                                                    {chart5Data.summaryData.noOfEvents.map((val, i) => (
                                                                        <td key={i} className="border px-4 py-2">{val}</td>
                                                                    ))}
                                                                </tr>
                                                                <tr>
                                                                    <td className="border px-4 py-2 font-semibold">% of Trade Spend</td>
                                                                    {chart5Data.summaryData.tradeSpend.map((val, i) => (
                                                                        <td key={i} className="border px-4 py-2">{val.toFixed(1)}%</td>
                                                                    ))}
                                                                </tr>
                                                                <tr>
                                                                    <td className="border px-4 py-2 font-semibold">Avg. Wtd. Lift</td>
                                                                    {chart5Data.summaryData.avgLift.map((val, i) => (
                                                                        <td key={i} className="border px-4 py-2">{val.toFixed(1)}%</td>
                                                                    ))}
                                                                </tr>
                                                                <tr>
                                                                    <td className="border px-4 py-2 font-semibold"># of F&D Events</td>
                                                                    {chart5Data.summaryData.fndEvents.map((val, i) => (
                                                                        <td key={i} className="border px-4 py-2">{val}</td>
                                                                    ))}
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="5" className="my-2 py-0 rounded-lg border-0">
                                    <Accordion.Header>
                                        <div className="flex items-center">
                                            <div className="theme_badge">
                                                <span>Chart</span>
                                                <span className="nla_number">6</span>
                                            </div>
                                            <span className="ml-2">What is the performance of PPGs?</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className="flex justify-between mb-4">
                                                <div>
                                                </div>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={generateChart6PPT}
                                                    disabled={presentationGenerated}
                                                >
                                                    {presentationGenerated ? 'Generating...' : 'Download PPT'}
                                                </button>
                                            </div>

                                            {/* Full width chart */}
                                            <div className="w-full mb-8">
                                                <ReactApexChart
                                                    options={chart6Data.options}
                                                    series={chart6Data.series}
                                                    type="bar"
                                                    height={500}
                                                />
                                            </div>

                                            {/* Summary section with accordions */}
                                            <div className="w-full">
                                                <Accordion>
                                                    {chart6Data.summaryData.ppgGroups.map((ppg, index) => (
                                                        <Accordion.Item key={index} eventKey={index.toString()}>
                                                            <Accordion.Header>
                                                                <strong>{ppg.ppgName}</strong>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className="grid grid-cols-1 gap-4">
                                                                    {/* Products Summary */}
                                                                    <div className="bg-gray-50 p-4 rounded">
                                                                        <h5 className="font-bold mb-3">Products Performance</h5>
                                                                        <div className="overflow-x-auto">
                                                                            <table className="min-w-full bg-white border">
                                                                                <thead>
                                                                                    <tr className="bg-gray-100">
                                                                                        <th className="border px-4 py-2">Product</th>
                                                                                        <th className="border px-4 py-2">ROI</th>
                                                                                        <th className="border px-4 py-2">Shared Profit per $</th>
                                                                                        <th className="border px-4 py-2">% Funded by Retailer</th>
                                                                                        <th className="border px-4 py-2">Price Points</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {ppg.products.map((product, pIndex) => (
                                                                                        <tr key={pIndex}>
                                                                                            <td className="border px-4 py-2">{product.name}</td>
                                                                                            <td className="border px-4 py-2">{formatNumber(product.roi)}%</td>
                                                                                            <td className="border px-4 py-2">${formatNumber(product.sharedProfitPerDollar)}</td>
                                                                                            <td className="border px-4 py-2">{formatNumber(product.retailerFunding)}%</td>
                                                                                            <td className="border px-4 py-2">${product.pricePoints.join(', $')}</td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>

                                                                    {/* Events Summary */}
                                                                    <div className="bg-gray-50 p-4 rounded">
                                                                        <h5 className="font-bold mb-3">Events Performance</h5>
                                                                        <div className="overflow-x-auto">
                                                                            <table className="min-w-full bg-white border">
                                                                                <thead>
                                                                                    <tr className="bg-gray-100">
                                                                                        <th className="border px-4 py-2">Event</th>
                                                                                        <th className="border px-4 py-2">ROI</th>
                                                                                        <th className="border px-4 py-2">% Funded by Retailer</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {ppg.events.map((event, eIndex) => (
                                                                                        <tr key={eIndex}>
                                                                                            <td className="border px-4 py-2">{event.name}</td>
                                                                                            <td className="border px-4 py-2">{formatNumber(event.roi)}%</td>
                                                                                            <td className="border px-4 py-2">{formatNumber(event.retailerFunding)}%</td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    ))}
                                                </Accordion>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="6" className="my-2 py-0 rounded-lg border-0">
                                    <Accordion.Header>
                                        <div className="flex items-center">
                                            <div className="theme_badge">
                                                <span>Chart</span>
                                                <span className="nla_number">7</span>
                                            </div>
                                            <span className="ml-2">What is the Incremental Profit Per Dollar Invested on Promo By Retailer?</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className="flex justify-between mb-4">
                                                <div>
                                                </div>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={generateChart7PPT}
                                                    disabled={presentationGenerated}
                                                >
                                                    {presentationGenerated ? 'Generating...' : 'Download PPT'}
                                                </button>
                                            </div>
                                            <ReactApexChart
                                                options={chart7Data.options}
                                                series={chart7Data.series}
                                                type="bar"
                                                height={400}
                                            />
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="7" className="my-2 py-0 rounded-lg border-0">
                                    <Accordion.Header>
                                        <div className="flex items-center">
                                            <div className="theme_badge">
                                                <span>Chart</span>
                                                <span className="nla_number">8</span>
                                            </div>
                                            <span className="ml-2">What is the relationship between ROI and Incremental Profit Pool?</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className="flex justify-between mb-4">
                                                <div className="flex-1">

                                                </div>
                                                <button
                                                    className="btn btn-primary ml-4"
                                                    onClick={generateChart8PPT}
                                                    disabled={presentationGenerated}
                                                >
                                                    {presentationGenerated ? 'Generating...' : 'Download PPT'}
                                                </button>
                                            </div>
                                            <ReactApexChart
                                                options={chart8Data.options}
                                                series={chart8Data.series}
                                                type="scatter"
                                                height={500}
                                            />
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="8" className="my-2 py-0 rounded-lg border-0">
                                    <Accordion.Header>
                                        <div className="flex items-center">
                                            <div className="theme_badge">
                                                <span>Chart</span>
                                                <span className="nla_number">9</span>
                                            </div>
                                            <span className="ml-2">How is the relationship between retailer funding and ROI at different price points?</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <div className="flex justify-between mb-4">
                                                <div className="flex-1">
                                                </div>
                                                <button
                                                    className="btn btn-primary ml-4"
                                                    onClick={generateChart9PPT}
                                                    disabled={presentationGenerated}
                                                >
                                                    {presentationGenerated ? 'Generating...' : 'Download PPT'}
                                                </button>
                                            </div>
                                            <ReactApexChart
                                                options={chart9Data.options}
                                                series={chart9Data.series}
                                                type="line"
                                                height={500}
                                            />
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TpoReport;

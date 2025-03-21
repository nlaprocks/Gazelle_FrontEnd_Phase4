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
import { Link } from "react-router-dom";

const TpoReport = ({ event, projects }) => {
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
                toolbar: { show: false },
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
                toolbar: { show: false },
                zoom: {
                    enabled: false,
                }
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
                        <div>Spend: $${formatCurrency(data.x)}</div>
                        <div>Volume: ${formatCurrency(data.y)}</div>
                    </div>`;
                }
            }
        },
        options2: {
            chart: {
                type: 'scatter',
                height: 400,
                toolbar: { show: false },
                zoom: {
                    enabled: false,
                }
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
                        <div>Spend: $${formatCurrency(data.x)}</div>
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
                        show: true,
                        formatter: function (val) {
                            return val + '%';
                        }
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
                        show: true,
                        formatter: function (val) {
                            return val + '%';
                        }
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
                        show: true,
                        formatter: function (val) {
                            return val + '%';
                        }
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
            avgWeightedROI: [],
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
                        if (isNaN(change) || change === undefined) return `$${val.toFixed(2)}`;
                        const arrow = change >= 0 ? '↑' : '↓';
                        return `$${val.toFixed(2)} (${arrow}${Math.abs(change).toFixed(1)}%)`;
                    }
                    return `$${val.toFixed(2)}`;
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
                    text: 'Incremental Profit'
                },
                labels: {
                    formatter: function (val) {
                        return `$${val.toFixed(2)}`;
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
                position: 'top',
                horizontalAlign: 'center'
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return `$${val.toFixed(2)}`;
                    }
                }
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
                toolbar: { show: false },
                zoom: {
                    enabled: false,
                }
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
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [availableYears, setAvailableYears] = useState([]);

    useEffect(() => {
        // Get all unique years from events
        if (events.length) {
            const years = new Set();
            events.forEach(event => {
                years.add(new Date(event.start_date).getFullYear());
                years.add(new Date(event.end_date).getFullYear());
            });
            setAvailableYears(Array.from(years).sort((a, b) => b - a)); // Sort descending
        }
    }, [events]);

    useEffect(() => {
        const previousYear = selectedYear - 1;
        setCurrentYearEvents(events.filter(event => new Date(event.start_date).getFullYear() === selectedYear || new Date(event.end_date).getFullYear() === selectedYear));
        setPreviousYearEvents(events.filter(event => new Date(event.start_date).getFullYear() === previousYear || new Date(event.end_date).getFullYear() === previousYear));
    }, [projects, events, selectedYear]);

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

    // Add this reusable function before all chart calculations
    const calculateEventROI = (event) => {
        let totalIncrContr = 0;
        let eventTotalSpend = 0;
        let eventTotalUnits = 0;
        let eventTotalPromoUnits = 0;
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
            eventTotalUnits += promoUnits + baseUnits;
            eventTotalPromoUnits += promoUnits;
            // Calculate variable spend
            const varSpend = (baseUnits + promoUnits) * (basePrice - promoPrice);

            // Add fixed fee to get total spend for this product
            const productTotalSpend = varSpend + fixedFee;
            eventTotalSpend += productTotalSpend;
        });

        // Calculate and return event ROI and related metrics
        const roi = eventTotalSpend ? ((totalIncrContr - eventTotalSpend) / eventTotalSpend) * 100 : 0;
        return {
            roi,
            totalSpend: eventTotalSpend,
            incrementalContribution: totalIncrContr,
            eventTotalUnits,
            eventLift: eventTotalPromoUnits ? (eventTotalPromoUnits * 100) / eventTotalUnits : 0,
            eventROIUnits: eventTotalUnits * roi
        };
    };

    // Now update each chart calculation to use this function
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
            const { roi, totalSpend: eventTotalSpend } = calculateEventROI(event);

            totalSpend += eventTotalSpend;
            if (roi > 0) {
                positiveCount++;
                positiveROI.push(roi);
                positiveSpend.push(eventTotalSpend);
            }
            if (roi < 0) {
                negativeCount++;
                negativeROI.push(roi);
                negativeSpend.push(eventTotalSpend);
            }

            eventNames.push(event.title || `Event ${event.id}`);
            roiValues.push(roi);
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
        let eventCount = 0;
        let totalSpend = 0;
        let totalIncrementalContribution = 0;

        currentYearEvents.forEach(event => {
            const retailer = event.retailer_id;
            if (!retailerROIs[retailer]) {
                retailerROIs[retailer] = {
                    totalROI: 0,
                    count: 0,
                    totalSpend: 0,
                    totalIncrementalContribution: 0
                };
            }

            const { totalSpend: eventTotalSpend, incrementalContribution } = calculateEventROI(event);

            totalSpend += eventTotalSpend;
            totalIncrementalContribution += incrementalContribution;
            retailerROIs[retailer].totalSpend += eventTotalSpend;
            retailerROIs[retailer].totalIncrementalContribution += incrementalContribution;
            retailerROIs[retailer].count += 1;
            eventCount++;
        });

        // Calculate average ROI for each retailer
        const accounts = [];
        const roiValues = [];

        Object.entries(retailerROIs).forEach(([retailer, data]) => {
            const roi = (((data.totalIncrementalContribution - data.totalSpend) / data.totalSpend) * 100);
            accounts.push(retailer);
            roiValues.push(roi);
        });

        // Calculate overall average ROI
        const totalRoi = (((totalIncrementalContribution - totalSpend) / totalSpend) * 100);

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
                        y: totalRoi,
                        borderColor: '#000',
                        label: {
                            text: `Avg. ROI: ${totalRoi.toFixed(2)}%`,
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
            let volume = 0;
            event.planned.forEach(product => {
                const { financialResults } = getResult(product.financialData);
                volume += Number(financialResults.find(r => r.name === "Incremental Revenue")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
            });

            const { roi: eventROI, totalSpend: eventTotalSpend } = calculateEventROI(event);
            // Add event name to the data points
            spendVolumeData.push({
                x: eventTotalSpend,
                y: volume,
                eventName: `${event.title}`,
                originalX: eventTotalSpend // Store original value for tooltip
            });
            spendROIData.push({
                x: eventTotalSpend,
                y: eventROI,
                eventName: `${event.title}`,
                originalX: eventTotalSpend // Store original value for tooltip
            });
        });

        // Calculate correlations
        correlation1 = calculateCorrelation(spendVolumeData.map(d => [d.x, d.y]));
        correlation2 = calculateCorrelation(spendROIData.map(d => [d.x, d.y]));

        // Create round, equidistant X-axis values
        if (spendVolumeData.length > 0) {
            // Find min and max spend values
            const minSpend = Math.min(...spendVolumeData.map(d => d.x));
            const maxSpend = Math.max(...spendVolumeData.map(d => d.x));

            // Round to nearest 100,000 for better readability
            const roundedMin = Math.floor(minSpend / 100000) * 100000;
            const roundedMax = Math.ceil(maxSpend / 100000) * 100000;

            // Create 7 equidistant points
            const interval = Math.round((roundedMax - roundedMin) / 6);
            const roundedInterval = Math.ceil(interval / 100000) * 100000;

            // Generate tick values
            const tickValues = [];
            for (let i = 0; i < 7; i++) {
                tickValues.push(roundedMin + (i * roundedInterval));
            }

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
                    xaxis: {
                        ...prev.options1.xaxis,
                        min: roundedMin,
                        max: roundedMin + (6 * roundedInterval),
                        tickAmount: 7,
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true
                        },
                        labels: {
                            formatter: function (val) {
                                return '$' + formatNumber(val);
                            }
                        }
                    },
                    tooltip: {
                        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                            const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                            return `<div class="p-2">
                                <div><b>${data.eventName}</b></div>
                                <div>Spend: $${formatCurrency(data.originalX)}</div>
                                <div>Volume: ${formatCurrency(data.y)}</div>
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
                    xaxis: {
                        ...prev.options2.xaxis,
                        min: roundedMin,
                        max: roundedMin + (6 * roundedInterval),
                        tickAmount: 7,
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true
                        },
                        labels: {
                            formatter: function (val) {
                                return '$' + formatNumber(val);
                            }
                        }
                    },
                    tooltip: {
                        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                            const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                            return `<div class="p-2">
                                <div><b>${data.eventName}</b></div>
                                <div>Spend: $${formatCurrency(data.originalX)}</div>
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
        }
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
            'TPR': { count: 0, productCount: 0, lift: 0, roi: 0, spend: 0, incrementalLift: 0, totalUnits: 0, totalROIUnits: 0 },
            'Feature Only': { count: 0, productCount: 0, lift: 0, roi: 0, spend: 0, incrementalLift: 0, totalUnits: 0, totalROIUnits: 0 },
            'Display Only': { count: 0, productCount: 0, lift: 0, roi: 0, spend: 0, incrementalLift: 0, totalUnits: 0, totalROIUnits: 0 },
            'Feature and Display': { count: 0, productCount: 0, lift: 0, roi: 0, spend: 0, incrementalLift: 0, totalUnits: 0, totalROIUnits: 0 }
        };

        let totalEvents = 0;
        let totalSpend = 0;
        let totalROI = 0;
        let totalIncrementalLift = 0;
        let totalProductCount = 0;
        let totalUnits = 0;
        let totalROIUnits = 0;

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

            const { roi: eventROI, totalSpend: eventTotalSpend } = calculateEventROI(event);
            event.planned.forEach(product => {
                const { promotionalResults } = getResult(product.financialData);
                if (!promotionalResults) return;

                // const roi = Number(financialResults.find(r => r.name === "Sales ROI")?.value?.replace(/[^0-9.-]+/g, "")) || 0;
                // const spend = Number(financialResults.find(r => r.name === "Total Spend")?.value?.replace(/[^0-9.-]+/g, "")) || 0;

                // Get promotional results
                const tprResult = promotionalResults.find(p => p.promotion === 'TPR');
                const featureResult = promotionalResults.find(p => p.promotion === 'Feature Only');
                const displayResult = promotionalResults.find(p => p.promotion === 'Display Only');
                const featureAndDisplayResult = promotionalResults.find(p => p.promotion === 'Feature and Display');
                const eventTotalUnits = Number(promotionalResults.find(result => result.promotion === 'Event Total')?.units);

                // Add to total units and total ROI units
                totalUnits += eventTotalUnits;
                totalROIUnits += eventTotalUnits * eventROI;

                // Accumulate metrics without incrementing counts
                if (tprResult && tprResult.acv > 0) {
                    eventTypes.TPR.productCount++;
                    eventTypes.TPR.incrementalLift += tprResult.lift;
                    eventTypes.TPR.roi += (eventROI);
                    eventTypes.TPR.spend += eventTotalSpend;
                    eventTypes.TPR.totalROIUnits += eventTotalUnits * eventROI;
                    eventTypes.TPR.totalUnits += eventTotalUnits;
                    totalIncrementalLift += tprResult.lift;
                    totalProductCount++;

                }

                if (featureResult && featureResult.acv > 0) {
                    eventTypes['Feature Only'].productCount++;
                    eventTypes['Feature Only'].incrementalLift += featureResult.lift;
                    eventTypes['Feature Only'].roi += (eventROI);
                    eventTypes['Feature Only'].spend += eventTotalSpend;
                    eventTypes['Feature Only'].totalROIUnits += eventTotalUnits * eventROI;
                    eventTypes['Feature Only'].totalUnits += eventTotalUnits;
                    totalIncrementalLift += featureResult.lift;
                    totalProductCount++;
                }

                if (displayResult && displayResult.acv > 0) {
                    eventTypes['Display Only'].productCount++;
                    eventTypes['Display Only'].incrementalLift += displayResult.lift;
                    eventTypes['Display Only'].roi += (eventROI);
                    eventTypes['Display Only'].spend += eventTotalSpend;
                    eventTypes['Display Only'].totalROIUnits += eventTotalUnits * eventROI;
                    eventTypes['Display Only'].totalUnits += eventTotalUnits;
                    totalIncrementalLift += displayResult.lift;
                    totalProductCount++;
                }

                if (featureAndDisplayResult && featureAndDisplayResult.acv > 0) {
                    eventTypes['Feature and Display'].productCount++;
                    eventTypes['Feature and Display'].incrementalLift += featureAndDisplayResult.lift;
                    eventTypes['Feature and Display'].roi += (eventROI);
                    eventTypes['Feature and Display'].spend += eventTotalSpend;
                    eventTypes['Feature and Display'].totalROIUnits += eventTotalUnits * eventROI;
                    eventTypes['Feature and Display'].totalUnits += eventTotalUnits;
                    totalIncrementalLift += featureAndDisplayResult.lift;
                    totalProductCount++;
                }

                totalSpend += eventTotalSpend;
                totalROI += (eventROI);
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

        // Calculation for weighted ROI
        // SUM(ROI * Units each evetn) / SUM(Units)
        const weightedROI = [
            eventTypes.TPR.totalROIUnits > 0 ? (eventTypes.TPR.totalROIUnits) / eventTypes.TPR.totalUnits : 0,
            eventTypes['Feature Only'].totalROIUnits > 0 ? (eventTypes['Feature Only'].totalROIUnits) / eventTypes['Feature Only'].totalUnits : 0,
            eventTypes['Display Only'].totalROIUnits > 0 ? (eventTypes['Display Only'].totalROIUnits) / eventTypes['Display Only'].totalUnits : 0,
            eventTypes['Feature and Display'].totalROIUnits > 0 ? (eventTypes['Feature and Display'].totalROIUnits) / eventTypes['Feature and Display'].totalUnits : 0,
            totalROIUnits > 0 ? (totalROIUnits) / totalUnits : 0
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

        let totalEventCount = 0;
        let totalEventsSpend = 0;
        // Process each event
        currentYearEvents.forEach(event => {
            // Calculate average discount for the event
            let eventTotalDiscount = 0;
            let eventProductCount = 0;

            const { roi, totalSpend, eventLift, eventTotalUnits, incrementalContribution, eventROIUnits } = calculateEventROI(event);
            totalEventCount++;
            totalEventsSpend += totalSpend;
            // Calculate event metrics
            event.planned.forEach(product => {
                const basePrice = Number(product.financialData.basePrice) || 0;
                const promoPrice = Number(product.financialData.promoPrice) || 0;
                const productDiscount = ((basePrice - promoPrice) / basePrice) * 100;
                eventTotalDiscount += productDiscount;
                eventProductCount++;
            });


            // Calculate event averages
            const avgDiscount = eventTotalDiscount / eventProductCount;

            // Find appropriate discount range and add event
            const rangeIndex = discountRanges.findIndex(range =>
                avgDiscount >= range.min && avgDiscount < range.max
            );

            if (rangeIndex !== -1) {
                discountRanges[rangeIndex].events.push({
                    name: event.title,
                    roi: roi,
                    spend: totalSpend,
                    eventLift: eventLift,
                    eventTotalUnits: eventTotalUnits,
                    incrementalContribution: incrementalContribution,
                    eventROIUnits: eventROIUnits
                });
            }
        });

        // Prepare summary data
        const summaryData = {
            noOfEvents: discountRanges.map(range => range.events.length),
            tradeSpend: discountRanges.map(range =>
                (range.events.reduce((sum, event) => sum + event.spend, 0) / totalEventsSpend) * 100
            ),
            // TODO : Update calculation
            // Calculation = each event (SUM(eventLift * eventTotalUnits)) / SUM(all eventTotalUnits)
            avgLift: discountRanges.map(range =>
                range.events.length > 0
                    ? range.events.reduce((sum, event) => sum + event.eventLift * event.eventTotalUnits, 0) / range.events.reduce((sum, event) => sum + event.eventTotalUnits, 0)
                    : 0
            ),
            avgWeightedROI: discountRanges.map(range =>
                range.events.length > 0
                    ? range.events.reduce((sum, event) => sum + (event.eventROIUnits), 0) / range.events.reduce((sum, event) => sum + event.eventTotalUnits, 0)
                    : 0
            ),
            fndEvents: discountRanges.map(range => range.events.length) // Using event count as F&D count for now
        };

        // Prepare series data - one bar per discount range using weighted ROI
        const series = [{
            name: 'Weighted ROI',
            data: summaryData.avgWeightedROI.map(roi => parseFloat((roi).toFixed(2)))
        }];

        setChart5Data(prev => ({
            ...prev,
            series: series,
            options: {
                ...prev.options,
                xaxis: {
                    ...prev.options.xaxis,
                    categories: ['0-10', '10-20', '20-30', '30-40', '40-50']
                },
                colors: ['#52c41a'], // Green color for ROI bars
                title: {
                    text: 'ROI by Discount Depth',
                    align: 'center'
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val === 0 ? 'N/A' : val.toFixed(2) + '%';
                        }
                    }
                },
                dataLabels: {
                    ...prev.options.dataLabels,
                    formatter: function (val) {
                        return val === 0 ? '' : val.toFixed(2) + '%';
                    }
                },
                plotOptions: {
                    ...prev.options.plotOptions,
                    bar: {
                        ...prev.options.plotOptions?.bar,
                        columnWidth: '50%', // Wider bars since we only have one series
                        distributed: true, // Distribute colors
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

        // Create a single series for the average ROI
        const avgRoiSeries = {
            name: 'Average ROI',
            data: []
        };

        // Process each PPG group
        ppgGroups.forEach((group, productIds) => {
            const ppgName = group.name;
            const ppgEvents = [];
            const ppgProducts = new Map();
            categories.push(ppgName);

            let totalROI = 0;
            let totalUnits = 0;
            let eventCount = 0;

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
                const { roi: eventRoi, totalSpend: eventSpend, eventTotalUnits, eventROIUnits } = calculateEventROI(event);
                totalROI += eventROIUnits;
                totalUnits += eventTotalUnits;
                eventCount++;

                event.planned.forEach(product => {
                    const { financialResults } = getResult(product.financialData);
                    const basePrice = Number(product.financialData.basePrice) || 0;
                    const promoPrice = Number(product.financialData.promoPrice) || 0;
                    const roiResult = financialResults.find(r => r.name === "Sales ROI")?.value;
                    const productRoi = Number(roiResult?.replace(/[^0-9.-]+/g, "")) || 0;

                    const shelfPriceInvestment = (basePrice - promoPrice) * Number(product.financialData.units);
                    const mftTradeInvestment = Number(product.financialData.fixedFee + (product.financialData.edlpPerUnitRate + product.financialData.promoPerUnitRate) * Number(product.financialData.units)) || 0;
                    const retailerFunding = ((shelfPriceInvestment - mftTradeInvestment) / shelfPriceInvestment) * 100;

                    eventData.retailerFunding += retailerFunding;

                    // Track product-level data
                    const productData = {
                        name: product.name,
                        roi: productRoi,
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
                eventData.roi = eventRoi;
                eventData.retailerFunding /= event.planned.length;
                ppgEvents.push(eventData);
            });

            // Calculate weighted average ROI for this PPG group
            const avgRoi = totalUnits > 0 ? totalROI / totalUnits : 0;
            avgRoiSeries.data.push(parseFloat((avgRoi).toFixed(2))); // Convert to percentage and fix to 2 decimal places

            // Add to summary data
            summaryData.push({
                ppgName: ppgName,
                events: ppgEvents,
                products: Array.from(ppgProducts.values()),
                avgRoi: avgRoi
            });
        });

        // Update chart data with the single series
        setChart6Data(prev => ({
            ...prev,
            series: [avgRoiSeries],
            options: {
                ...prev.options,
                xaxis: {
                    ...prev.options.xaxis,
                    categories: categories
                },
                colors: ['#52c41a'], // Green color for ROI bars
                dataLabels: {
                    ...prev.options.dataLabels,
                    formatter: function (val) {
                        return val === 0 ? '' : val.toFixed(2) + '%';
                    }
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val === 0 ? 'N/A' : val.toFixed(2) + '%';
                        }
                    }
                },
                plotOptions: {
                    ...prev.options.plotOptions,
                    bar: {
                        ...prev.options.plotOptions?.bar,
                        columnWidth: '50%', // Wider bars since we only have one series
                        distributed: true, // Distribute colors
                    }
                }
            },
            summaryData: {
                ppgGroups: summaryData
            }
        }));
    };

    const calculateChart7Data = () => {
        // Extract unique channels from events
        let retailerName = "";
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
                            return `$${val.toFixed(2)} (${arrow}${Math.abs(percentChange).toFixed(1)}%)`;
                        }
                        return `$${val.toFixed(2)}`;
                    },
                    style: {
                        colors: ['#fff']
                    }
                },
                yaxis: {
                    title: {
                        text: 'Incremental Profit'
                    },
                    labels: {
                        formatter: function (val) {
                            return `$${val.toFixed(2)}`;
                        }
                    }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'center'
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return `$${val.toFixed(2)}`;
                        }
                    }
                }
            }
        }));
    };

    const calculateChart8Data = () => {
        const scatterData = [];

        currentYearEvents.forEach(event => {
            // Calculate event metrics
            const { roi: eventRoi, totalSpend: eventSpend } = calculateEventROI(event);
            let totalIncrementalProfitPerDollar = 0;
            event.planned.forEach(product => {
                const { financialResults, promotionalResults } = getResult(product.financialData);

                // Calculate ROI
                // const roiResult = financialResults.find(r => r.name === "Sales ROI")?.value;
                // const roi = Number(roiResult?.replace(/[^0-9.-]+/g, "")) || 0;

                // Calculate Shared Profit Created
                const baseUnits = Number(product.financialData.units) || 0;
                const promoUnits = Number(promotionalResults.find(r => r.promotion === "Event Total")?.units) || 0;
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
                totalIncrementalProfitPerDollar += incrementalProfitPerDollar;


            });

            // Only add points with valid values
            if (!isNaN(eventRoi) && !isNaN(totalIncrementalProfitPerDollar) &&
                isFinite(eventRoi) && isFinite(totalIncrementalProfitPerDollar)) {
                scatterData.push({
                    x: eventRoi,
                    y: totalIncrementalProfitPerDollar,
                    name: `${event.title}`
                });
            }
        });

        // Calculate correlation
        const correlationData = scatterData.map(point => [point.x, point.y]);
        const correlation = calculateCorrelation(correlationData);

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
            },
            correlation: correlation
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

    const generatePPT = async (existingPptx = null) => {
        try {
            if (!existingPptx) {
                setPresentationGenerated(true);
            }

            // Create a new pptx instance if not provided
            let pptx = existingPptx || new pptxgen();

            // Ensure pptx is properly initialized
            if (!pptx.addSlide) {
                console.error("Invalid pptx object, creating a new one");
                pptx = new pptxgen();
            }

            if (!existingPptx) {
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
            }

            // Create slide
            let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

            // Add chart title at the top with ROI text on the right
            slide.addText("What is the ROI for all events?", {
                x: 0.35,
                y: 0.4,
                w: 6, // Half width to make room for ROI text
                h: 0.4,
                fontSize: 16,
                bold: true,
                color: "000000"
            });

            // Add ROI text on the right side of the title
            slide.addText(`Avg. ROI across all events: ${formatNumber(summaryData.avgROI)}%`, {
                x: 6.35, // Position to the right of the title
                y: 0.4,
                w: 6,
                h: 0.4,
                fontSize: 14,
                bold: true,
                color: "000000",
                align: "right"
            });

            // Create a styled summary table similar to the image
            // Header row with blue background
            // slide.addShape(pptx.shapes.RECTANGLE, {
            //     x: 0.35,
            //     y: 0.9,
            //     w: 12,
            //     h: 0.5,
            //     fill: { color: "174F73" },
            //     line: { color: "174F73" } // Match border to background to hide it
            // });

            // slide.addText(`Avg. ROI across all events: ${formatNumber(summaryData.avgROI)}%`, {
            //     x: 0.35,
            //     y: 0.9,
            //     w: 12,
            //     h: 0.5,
            //     fontSize: 14,
            //     bold: true,
            //     color: "FFFFFF",
            //     valign: "middle",
            //     margin: [0, 0, 0, 0.2]
            // });

            // Create table headers with gray background
            const tableHeaders = [
                { text: "Overall", options: { bold: true, color: "000000", fill: "E6E6E6", border: { pt: 0 } } },
                { text: "Events", options: { bold: true, color: "000000", fill: "E6E6E6", border: { pt: 0 } } },
                { text: "Trade Spend", options: { bold: true, color: "000000", fill: "E6E6E6", border: { pt: 0 } } },
                { text: "Avg. ROI", options: { bold: true, color: "000000", fill: "E6E6E6", border: { pt: 0 } } }
            ];

            // Create table rows
            const tableRows = [
                [
                    { text: "Total", options: { bold: true, border: { pt: 0 } } },
                    { text: summaryData.total.toString(), options: { border: { pt: 0 } } },
                    { text: `$${formatCurrency(summaryData.totalSpend)}`, options: { border: { pt: 0 } } },
                    { text: `${formatNumber(summaryData.avgROI)}%`, options: { border: { pt: 0 } } }
                ],
                [
                    { text: "Positive ROI", options: { bold: true, border: { pt: 0 } } },
                    { text: summaryData.positiveCount.toString(), options: { border: { pt: 0 } } },
                    { text: `$${formatCurrency(summaryData.positiveSpend)}`, options: { border: { pt: 0 } } },
                    { text: `${formatNumber(summaryData.positiveROI)}%`, options: { border: { pt: 0 } } }
                ],
                [
                    { text: "Negative ROI", options: { bold: true, border: { pt: 0 } } },
                    { text: summaryData.negativeCount.toString(), options: { border: { pt: 0 } } },
                    { text: `$${formatCurrency(summaryData.negativeSpend)}`, options: { border: { pt: 0 } } },
                    { text: `${formatNumber(summaryData.negativeROI)}%`, options: { border: { pt: 0 } } }
                ]
            ];

            // Add the table to the slide - remove border to eliminate lines
            slide.addTable([tableHeaders, ...tableRows], {
                x: 0.35,
                y: 1.4,
                w: 12,
                colW: [3, 3, 3, 3],
                rowH: [0.4, 0.4, 0.4, 0.4],
                fontSize: 12,
                border: { pt: 0, color: "FFFFFF" }, // Set border to 0 to remove lines
                fill: { color: "FFFFFF" }
                // Removed firstRow styling since we're applying it directly to the cells
            });

            // Add chart area below summary
            const chartY = 3.2; // Position chart below summary

            // Prepare and add chart with adjusted position
            const chartValues = chartData.series[0].data;
            const chartLabels = chartData.options.xaxis.categories;

            // Create the chart data with the exact values
            const pptChartData = [{
                name: 'Event ROI',
                labels: chartLabels,
                values: chartValues,
                dataLabels: chartValues.map(value => value.toString())
            }];

            slide.addChart(pptx.charts.BAR, pptChartData, {
                x: 0.35,
                y: chartY,
                w: 12,
                h: 3.5,
                barDir: 'col',
                barGrouping: "standard",
                dataLabelColor: "000000",
                dataLabelFontFace: "Arial",
                dataLabelFontSize: 10,
                dataLabelPosition: "outEnd",
                dataLabelFormatCode: '0.00"%"',
                showValue: true,
                chartColors: chartValues.map(value => {
                    if (value >= 35) return '52c41a';
                    if (value > 0) return 'ffd700';
                    return 'ff4d4f';
                }),
                showLegend: false,
                showTitle: false,
                catAxisTitle: "Events",
                catAxisTitleColor: "000000",
                catAxisTitleFontSize: 12,
                valAxisTitle: "ROI (%)",
                valAxisTitleColor: "000000",
                valAxisTitleFontSize: 12,
                valAxisMinVal: 0, // Start from 0%
                valAxisMaxVal: Math.max(...chartValues) * 1.1, // Add 10% padding
                valGridLine: { style: "solid" },
                catGridLine: { style: "none" },
                valAxisLabelFormatCode: '0"%"', // Format y-axis labels as percentages
                valAxisMajorUnit: 200 // Set major unit to 200% for y-axis
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

            // Only save if this is not part of a combined presentation
            if (!existingPptx) {
                await pptx.writeFile({
                    fileName: "What is the ROI for all events.pptx",
                    compression: true
                });
            }

            return pptx;
        } catch (error) {
            console.error("PPT Generation Error:", error);
            return null;
        } finally {
            if (!existingPptx) {
                setPresentationGenerated(false);
            }
        }
    };

    const generateChart2PPT = async (existingPptx = null) => {
        try {
            if (!existingPptx) {
                setPresentationGenerated(true);
            }

            // Create a new pptx instance if not provided
            let pptx = existingPptx || new pptxgen();

            // Ensure pptx is properly initialized
            if (!pptx.addSlide) {
                console.error("Invalid pptx object, creating a new one");
                pptx = new pptxgen();
            }

            if (!existingPptx) {
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
            }

            let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

            // Add chart title at the top
            slide.addText("What is driving the variation in ROI across different retailers?", {
                x: 0.35,
                y: 0.4,
                w: 12,
                h: 0.4,
                fontSize: 16,
                bold: true,
                color: "000000"
            });

            // Add chart
            const chartValues = chart2Data.series[0].data;
            const chartLabels = chart2Data.options.xaxis.categories;

            const pptChartData = [{
                name: 'Account ROI',
                labels: chartLabels,
                values: chartValues,
                dataLabels: chartValues.map(value => value.toString())
            }];

            slide.addChart(pptx.charts.BAR, pptChartData, {
                x: 0.35,
                y: 1.5,
                w: 12,
                h: 5.5,
                barDir: 'col',
                barGrouping: "standard",
                dataLabelColor: "000000",
                dataLabelFontFace: "Arial",
                dataLabelFontSize: 10,
                dataLabelPosition: "outEnd",
                dataLabelFormatCode: '0.00"%"',
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
                valAxisMinVal: 0, // Start from 0%
                valAxisMaxVal: Math.max(...chartValues) * 1.1, // Add 10% padding
                valAxisLabelFormatCode: '0"%"', // Format as round percentages (0%, 50%, etc.)
                valAxisMajorUnit: 50, // Set major tick marks at 50% intervals
                valGridLine: { style: "solid" },
                catGridLine: { style: "none" }
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

            // Only save if this is not part of a combined presentation
            if (!existingPptx) {
                await pptx.writeFile({
                    fileName: "What is driving the variation in ROI across different retailers.pptx",
                    compression: true
                });
            }

            return pptx;
        } catch (error) {
            console.error("PPT Generation Error:", error);
            return null;
        } finally {
            if (!existingPptx) {
                setPresentationGenerated(false);
            }
        }
    };

    const generateChart3PPT = async (existingPptx = null) => {
        try {
            if (!existingPptx) {
                setPresentationGenerated(true);
            }

            // Create a new pptx instance if not provided
            let pptx = existingPptx || new pptxgen();

            // Ensure pptx is properly initialized
            if (!pptx.addSlide) {
                console.error("Invalid pptx object, creating a new one");
                pptx = new pptxgen();
            }

            if (!existingPptx) {
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
            }

            let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

            // Add chart title at the top
            slide.addText("What is the relationship between trade spend, incremental volume, and ROI?", {
                x: 0.35,
                y: 0.4,
                w: 12,
                h: 0.4,
                fontSize: 16,
                bold: true,
                color: "000000"
            });

            // Sort data by spend (x value) for better visualization
            const sortedVolumeData = [...chart3Data.series1[0].data].sort((a, b) => a.x - b.x);
            const sortedRoiData = [...chart3Data.series2[0].data].sort((a, b) => a.x - b.x);

            // Create round, equidistant spend values for X-axis
            const minSpend = Math.min(...sortedVolumeData.map(d => d.x));
            const maxSpend = Math.max(...sortedVolumeData.map(d => d.x));

            // Round to nearest 100,000 for better readability
            const roundedMin = Math.floor(minSpend / 100000) * 100000;
            const roundedMax = Math.ceil(maxSpend / 100000) * 100000;

            // Create 5 equidistant points for the PPT
            const interval = Math.round((roundedMax - roundedMin) / 4);
            const roundedInterval = Math.ceil(interval / 100000) * 100000;

            // Generate tick values
            const tickValues = [];
            for (let i = 0; i < 5; i++) {
                tickValues.push(roundedMin + (i * roundedInterval));
            }

            // Format tick values for display
            const formattedTickValues = tickValues.map(val => `$${formatNumber(val)}`);

            // Prepare data for bar charts with equidistant X-axis
            const volumeBarData = [{
                name: 'Incremental Volume',
                labels: sortedVolumeData.map((point, i) => `Event ${i + 1}`),
                values: sortedVolumeData.map(point => point.y)
            }];

            const spendBarData = [{
                name: 'Spend',
                labels: sortedVolumeData.map((point, i) => `Event ${i + 1}`),
                values: sortedVolumeData.map(point => point.originalX || point.x)
            }];

            const roiBarData = [{
                name: 'ROI',
                labels: sortedRoiData.map((point, i) => `Event ${i + 1}`),
                values: sortedRoiData.map(point => point.y)
            }];

            // Left chart - Trade Spend vs Incremental Volume
            slide.addChart(pptx.charts.BAR, volumeBarData, {
                x: 0.35,
                y: 1.5,
                w: 5.9,
                h: 2.3,
                showTitle: true,
                title: "Incremental Volume by Event",
                showLegend: false,
                chartColors: ['4472C4'],
                dataLabelFormatCode: "#,##0",
                valAxisTitle: "Incremental Volume",
                plotArea: { border: { pt: 1, color: "888888" } },
                showValAxisTitle: true,
                valAxisTitleColor: "000000"
            });

            // Left chart (bottom) - Spend
            slide.addChart(pptx.charts.BAR, spendBarData, {
                x: 0.35,
                y: 4.0,
                w: 5.9,
                h: 2.3,
                showTitle: true,
                title: "Spend by Event",
                showLegend: false,
                chartColors: ['FF9900'],
                dataLabelFormatCode: "$#,##0",
                valAxisTitle: "Spend ($)",
                plotArea: { border: { pt: 1, color: "888888" } },
                showValAxisTitle: true,
                valAxisTitleColor: "000000",
                valAxisLabelFormatCode: "$#,##0",
                valAxisMaxVal: roundedMin + (4 * roundedInterval),
                valAxisMinVal: roundedMin,
                valAxisMajorUnit: roundedInterval
            });

            // Right chart - Trade Spend vs ROI
            slide.addChart(pptx.charts.BAR, roiBarData, {
                x: 6.45,
                y: 1.5,
                w: 5.9,
                h: 2.3,
                showTitle: true,
                title: "ROI by Event",
                showLegend: false,
                chartColors: ['4472C4'],
                dataLabelFormatCode: "#,##0.0'%'",
                valAxisTitle: "ROI (%)",
                plotArea: { border: { pt: 1, color: "888888" } },
                showValAxisTitle: true,
                valAxisTitleColor: "000000"
            });

            // Right chart (bottom) - Spend
            slide.addChart(pptx.charts.BAR, spendBarData, {
                x: 6.45,
                y: 4.0,
                w: 5.9,
                h: 2.3,
                showTitle: true,
                title: "Spend by Event",
                showLegend: false,
                chartColors: ['FF9900'],
                dataLabelFormatCode: "$#,##0",
                valAxisTitle: "Spend ($)",
                plotArea: { border: { pt: 1, color: "888888" } },
                showValAxisTitle: true,
                valAxisTitleColor: "000000",
                valAxisLabelFormatCode: "$#,##0",
                valAxisMaxVal: roundedMin + (4 * roundedInterval),
                valAxisMinVal: roundedMin,
                valAxisMajorUnit: roundedInterval
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

            // Save the presentation with the chart title as the filename
            // Only save if this is not part of a combined presentation
            if (!existingPptx) {
                await pptx.writeFile({
                    fileName: "What is the relationship between trade spend, incremental volume, and ROI.pptx",
                    compression: true
                });
            }

            return pptx;
        } catch (error) {
            console.error("PPT Generation Error:", error);
            return null;
        } finally {
            if (!existingPptx) {
                setPresentationGenerated(false);
            }
        }
    };

    const generateChart4PPT = async (existingPptx = null) => {
        try {
            if (!existingPptx) {
                setPresentationGenerated(true);
            }

            // Create a new pptx instance if not provided
            let pptx = existingPptx || new pptxgen();

            // Ensure pptx is properly initialized
            if (!pptx.addSlide) {
                console.error("Invalid pptx object, creating a new one");
                pptx = new pptxgen();
            }

            if (!existingPptx) {
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
            }

            let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

            // Add chart title at the top
            slide.addText("What is the ROI by event types?", {
                x: 0.35,
                y: 0.4,
                w: 12,
                h: 0.4,
                fontSize: 16,
                bold: true,
                color: "000000"
            });

            // Create a labels-only chart on the left
            const labelsData = [{
                name: 'Labels',
                labels: ['TPR', 'Feature Only', 'Display Only', 'Feature and Display', 'All Events'],
                values: [0, 0, 0, 0, 0] // Zero values so bars don't show
            }];

            // Add labels-only chart
            slide.addChart(pptx.charts.BAR, labelsData, {
                x: 0.35,
                y: 1.3,
                w: 1.8,
                h: 5.6,
                barDir: 'bar',
                showTitle: false,
                showLegend: false,
                chartColors: ['FFFFFF'], // White color so bars are invisible
                showValue: false,
                catAxisOrientation: 'maxMin',
                valAxisHidden: true, // Hide value axis
                valAxisMaxVal: 0.1, // Very small max value to ensure bars don't show
                plotArea: { fill: { color: 'FFFFFF' }, border: { pt: 0, color: "FFFFFF" } }, // White background, no border
                barGapWidthPct: 60,
                dataLabelPosition: 'outEnd',
                catGridLine: { style: "none" }, // Hide category grid lines
                valGridLine: { style: "none" }, // Hide value grid lines
                catAxisLineShow: false, // Hide category axis line
                valAxisLineShow: false, // Hide value axis line
                dataBorder: { pt: 0 }, // No border on data elements
                border: { pt: 0, color: "FFFFFF" }, // No border on chart
                chartArea: { border: { pt: 0, color: "FFFFFF" } } // No border on chart area
            });

            // Event Count chart - Left section
            slide.addShape(pptx.shapes.RECTANGLE, {
                x: 2.25,
                y: 0.9,
                w: 3.2,
                h: 0.4,
                fill: { color: "0072bc" }
            });

            slide.addText("Event Count (% of Total)", {
                x: 2.25,
                y: 0.9,
                w: 3.2,
                h: 0.4,
                align: 'center',
                fontSize: 12,
                bold: true,
                color: "FFFFFF"
            });

            const eventCountData = [{
                name: 'Event Count',
                labels: ['', '', '', '', ''], // Empty labels since we're showing them separately
                values: chart4Data.eventCount.series[0].data
            }];

            slide.addChart(pptx.charts.BAR, eventCountData, {
                x: 2.25,
                y: 1.3,
                w: 3.2,
                h: 5.6,
                barDir: 'bar',
                showTitle: false,
                showLegend: false,
                dataLabelFormatCode: '#,##0.0"%"',
                chartColors: ['4472C4'],
                showValue: true,
                dataLabelPosition: 'outEnd',
                catAxisOrientation: 'maxMin',
                barGapWidthPct: 60,
                catAxisHidden: true, // Hide the category axis since we're showing labels separately
                catAxisLabelPos: 'low',
                valAxisLabelFormatCode: '0"%"' // Format X-axis values with % symbol
            });

            // Incremental Lift chart - Middle section
            slide.addShape(pptx.shapes.RECTANGLE, {
                x: 5.55,
                y: 0.9,
                w: 3.2,
                h: 0.4,
                fill: { color: "0072bc" }
            });

            slide.addText("Average Incremental Lift (%)", {
                x: 5.55,
                y: 0.9,
                w: 3.2,
                h: 0.4,
                align: 'center',
                fontSize: 12,
                bold: true,
                color: "FFFFFF"
            });

            const incrementalLiftData = [{
                name: 'Incremental Lift',
                labels: ['', '', '', '', ''], // Empty labels
                values: chart4Data.incrementalLift.series[0].data
            }];

            slide.addChart(pptx.charts.BAR, incrementalLiftData, {
                x: 5.55,
                y: 1.3,
                w: 3.2,
                h: 5.6,
                barDir: 'bar',
                showTitle: false,
                showLegend: false,
                dataLabelFormatCode: '#,##0.0"%"',
                chartColors: ['00e396'],
                showValue: true,
                dataLabelPosition: 'outEnd',
                catAxisOrientation: 'maxMin',
                barGapWidthPct: 60,
                catAxisHidden: true, // Hide the category axis
                catAxisLabelPos: 'low',
                valAxisLabelFormatCode: '0"%"' // Format X-axis values with % symbol
            });

            // Weighted ROI chart - Right section
            slide.addShape(pptx.shapes.RECTANGLE, {
                x: 8.85,
                y: 0.9,
                w: 3.2,
                h: 0.4,
                fill: { color: "0072bc" }
            });

            slide.addText("Weighted Average ROI (%)", {
                x: 8.85,
                y: 0.9,
                w: 3.2,
                h: 0.4,
                align: 'center',
                fontSize: 12,
                bold: true,
                color: "FFFFFF"
            });

            const weightedROIData = [{
                name: 'Weighted ROI',
                labels: ['', '', '', '', ''], // Empty labels
                values: chart4Data.weightedROI.series[0].data
            }];

            slide.addChart(pptx.charts.BAR, weightedROIData, {
                x: 8.85,
                y: 1.3,
                w: 3.2,
                h: 5.6,
                barDir: 'bar',
                showTitle: false,
                showLegend: false,
                dataLabelFormatCode: '#,##0.0"%"',
                chartColors: ['feb019'],
                showValue: true,
                dataLabelPosition: 'outEnd',
                catAxisOrientation: 'maxMin',
                barGapWidthPct: 60,
                catAxisHidden: true, // Hide the category axis
                catAxisLabelPos: 'low',
                valAxisLabelFormatCode: '0"%"' // Format X-axis values with % symbol
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

            // Save the presentation with the chart title as the filename
            // Only save if this is not part of a combined presentation
            if (!existingPptx) {
                await pptx.writeFile({
                    fileName: "What is the ROI by event types.pptx",
                    compression: true
                });
            }

            return pptx;
        } catch (error) {
            console.error("PPT Generation Error:", error);
            return null;
        } finally {
            if (!existingPptx) {
                setPresentationGenerated(false);
            }
        }
    };

    const generateChart5PPT = async (existingPptx = null) => {
        try {
            if (!existingPptx) {
                setPresentationGenerated(true);
            }

            // Create a new pptx instance if not provided
            let pptx = existingPptx || new pptxgen();

            // Ensure pptx is properly initialized
            if (!pptx.addSlide) {
                console.error("Invalid pptx object, creating a new one");
                pptx = new pptxgen();
            }

            if (!existingPptx) {
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
            }

            let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

            // Add chart title at the top
            slide.addText("What is the ROI at different discount levels?", {
                x: 0.35,
                y: 0.4,
                w: 12,
                h: 0.4,
                fontSize: 16,
                bold: true,
                color: "000000"
            });

            // Add main chart
            const chartData = [{
                name: 'Weighted ROI',
                labels: ['0-10', '10-20', '20-30', '30-40', '40-50'],
                values: chart5Data.series[0].data.map(val => val === 0 ? null : val) // Replace 0 with null to hide
            }];

            slide.addChart(pptx.charts.BAR, chartData, {
                x: 0.35,
                y: 1.5,
                w: 8,
                h: 4,
                barDir: 'col',
                showTitle: true,
                title: `ROI by Discount Depth`,
                showLegend: false, // No legend needed for single series
                dataLabelFormatCode: '#,##0.00"%"',
                showValue: true,
                chartColors: chart5Data.series[0].data.map(value => {
                    if (value >= 35) return '52c41a'; // Green for high ROI
                    if (value > 0) return 'ffd700';  // Yellow for medium ROI
                    return 'ff4d4f';                 // Red for negative ROI
                }),
                catAxisTitle: "Discount Depth",
                valAxisTitle: "ROI (%)",
                dataLabelPosition: "outEnd"
            });

            // Add summary table
            const summaryData = chart5Data.summaryData;
            slide.addTable([
                [
                    { text: "Discount Depth", options: { bold: true, fill: { color: "f2f2f2" } } },
                    { text: "0-10", options: { bold: true, fill: { color: "f2f2f2" } } },
                    { text: "10-20", options: { bold: true, fill: { color: "f2f2f2" } } },
                    { text: "20-30", options: { bold: true, fill: { color: "f2f2f2" } } },
                    { text: "30-40", options: { bold: true, fill: { color: "f2f2f2" } } },
                    { text: "40-50", options: { bold: true, fill: { color: "f2f2f2" } } }
                ],
                ["No. of events", ...summaryData.noOfEvents.map(val => val === 0 ? '-' : val)],
                ["Avg. Wtd. ROI", ...summaryData.avgWeightedROI.map(val => val === 0 ? '-' : (val).toFixed(2) + '%')],
                ["% of Trade Spend", ...summaryData.tradeSpend.map(val => val === 0 ? '-' : val.toFixed(1) + '%')],
                ["Avg. Wtd. Lift", ...summaryData.avgLift.map(val => val === 0 ? '-' : val.toFixed(1) + '%')],
                ["No. of F&D Events", ...summaryData.fndEvents.map(val => val === 0 ? '-' : val)]
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

            // Save the presentation with the chart title as the filename
            // Only save if this is not part of a combined presentation
            if (!existingPptx) {
                await pptx.writeFile({
                    fileName: "What is the ROI at different discount levels.pptx",
                    compression: true
                });
            }

            return pptx;
        } catch (error) {
            console.error("PPT Generation Error:", error);
            return null;
        } finally {
            if (!existingPptx) {
                setPresentationGenerated(false);
            }
        }
    };

    const generateChart6PPT = async (existingPptx = null) => {
        try {
            if (!existingPptx) {
                setPresentationGenerated(true);
            }

            // Create a new pptx instance if not provided
            let pptx = existingPptx || new pptxgen();

            // Ensure pptx is properly initialized
            if (!pptx.addSlide) {
                console.error("Invalid pptx object, creating a new one");
                pptx = new pptxgen();
            }

            if (!existingPptx) {
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
            }

            let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

            // Add chart title at the top
            slide.addText("What is the performance of PPGs?", {
                x: 0.35,
                y: 0.4,
                w: 12,
                h: 0.4,
                fontSize: 16,
                bold: true,
                color: "000000"
            });

            // Add main chart
            const chartData = [{
                name: 'Average ROI',
                labels: chart6Data.options.xaxis.categories,
                values: chart6Data.series[0].data.map(val => val === 0 ? null : val) // Replace 0 with null to hide
            }];

            slide.addChart(pptx.charts.BAR, chartData, {
                x: 0.35,
                y: 1.0,
                w: 12,
                h: 4,
                barDir: 'col',
                showTitle: true,
                title: "Performance by Price Point Group",
                showLegend: false, // No legend needed for single series
                dataLabelFormatCode: '#,##0.00"%"',
                showValue: true,
                chartColors: chart6Data.series[0].data.map(value => {
                    if (value >= 35) return '52c41a'; // Green for high ROI
                    if (value > 0) return 'ffd700';  // Yellow for medium ROI
                    return 'ff4d4f';                 // Red for negative ROI
                }),
                catAxisTitle: "Price Point Groups",
                valAxisTitle: "ROI (%)",
                dataLabelPosition: "outEnd"
            });

            // Add summary table
            const summaryData = chart6Data.summaryData;
            const ppgGroups = summaryData.ppgGroups;

            // Create header row with PPG names
            const headerRow = [
                { text: "Metric", options: { bold: true, fill: { color: "f2f2f2" } } }
            ];

            // Add each PPG name to the header
            chart6Data.options.xaxis.categories.forEach(ppgName => {
                headerRow.push({ text: ppgName, options: { bold: true, fill: { color: "f2f2f2" } } });
            });

            // Create data rows
            const tableRows = [headerRow];

            // No. of events row
            const eventsRow = ["No. of events"];
            ppgGroups.forEach(group => {
                eventsRow.push(group.events.length === 0 ? '-' : group.events.length);
            });
            tableRows.push(eventsRow);

            // Avg. Wtd. ROI row
            const roiRow = ["Avg. Wtd. ROI"];
            ppgGroups.forEach(group => {
                const roi = group.avgRoi;
                roiRow.push(roi === 0 ? '-' : (roi).toFixed(2) + '%');
            });
            tableRows.push(roiRow);

            // No. of Products row
            const productsRow = ["No. of Products"];
            ppgGroups.forEach(group => {
                productsRow.push(group.products.length === 0 ? '-' : group.products.length);
            });
            tableRows.push(productsRow);

            // Add the summary table
            slide.addTable(tableRows, {
                x: 0.35,
                y: 5.5,
                w: 12,
                colW: Array(headerRow.length).fill(12 / headerRow.length), // Evenly distribute column widths
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

            // Save the presentation with the chart title as the filename
            // Only save if this is not part of a combined presentation
            if (!existingPptx) {
                await pptx.writeFile({
                    fileName: "What is the performance of PPGs.pptx",
                    compression: true
                });
            }

            return pptx;
        } catch (error) {
            console.error("PPT Generation Error:", error);
            return null;
        } finally {
            if (!existingPptx) {
                setPresentationGenerated(false);
            }
        }
    };

    const generateChart7PPT = async (existingPptx = null) => {
        try {
            if (!existingPptx) {
                setPresentationGenerated(true);
            }

            // Create a new pptx instance if not provided
            let pptx = existingPptx || new pptxgen();

            // Ensure pptx is properly initialized
            if (!pptx.addSlide) {
                console.error("Invalid pptx object, creating a new one");
                pptx = new pptxgen();
            }

            if (!existingPptx) {
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
            }

            let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

            // Add chart title at the top
            slide.addText("What is the Incremental Profit Per Dollar Invested on Promo By Retailer?", {
                x: 0.35,
                y: 0.4,
                w: 12,
                h: 0.4,
                fontSize: 16,
                bold: true,
                color: "000000"
            });

            // Add main chart
            const chartData = chart7Data.series.map(series => ({
                name: series.name,
                labels: chart7Data.options.xaxis.categories,
                values: series.data
            }));

            slide.addChart(pptx.charts.BAR, chartData, {
                x: 0.35,
                y: 1.0,
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

            // Save the presentation with the chart title as the filename
            // Only save if this is not part of a combined presentation
            if (!existingPptx) {
                await pptx.writeFile({
                    fileName: "What is the Incremental Profit Per Dollar Invested on Promo By Retailer.pptx",
                    compression: true
                });
            }

            return pptx;
        } catch (error) {
            console.error("PPT Generation Error:", error);
            return null;
        } finally {
            if (!existingPptx) {
                setPresentationGenerated(false);
            }
        }
    };

    const generateChart8PPT = async (existingPptx = null) => {
        try {
            if (!existingPptx) {
                setPresentationGenerated(true);
            }

            // Create a new pptx instance if not provided
            let pptx = existingPptx || new pptxgen();

            // Ensure pptx is properly initialized
            if (!pptx.addSlide) {
                console.error("Invalid pptx object, creating a new one");
                pptx = new pptxgen();
            }

            if (!existingPptx) {
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
                    ]
                });
            }

            let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

            // Add chart title at the top
            slide.addText("What is the relationship between ROI and Incremental Profit Pool?", {
                x: 0.35,
                y: 0.4,
                w: 12,
                h: 0.4,
                fontSize: 16,
                bold: true,
                color: "000000"
            });

            // Format chart data properly for scatter plot
            const chartData = chart8Data.series[0].data;

            // Create separate arrays for x and y values
            const xValues = chartData.map(point => point.x);
            const yValues = chartData.map(point => point.y);

            const formattedChartData = [{
                name: "Events",
                values: xValues,
                sizes: Array(xValues.length).fill(4),
                labels: chartData.map(point => point.name || ''),
                valuesY: yValues
            }];

            // Add scatter plot
            slide.addChart(pptx.charts.SCATTER, formattedChartData, {
                x: 0.5,
                y: 1.5,
                w: 12,
                h: 5,
                showTitle: false,
                showLegend: false,
                chartColors: ['4472C4'],
                lineWidth: 0,
                lineSize: 0,
                markerSize: 10,
                dataLabelFormatCode: '#,##0.0"%"',
                valAxisTitle: "Incremental Profit per Dollar",
                catAxisTitle: "ROI (%)",
                plotArea: { border: { pt: 1, color: "888888" } },
                showValAxisTitle: true,
                showCatAxisTitle: true,
                valAxisTitleColor: "000000",
                catAxisTitleColor: "000000"
            });

            // Add correlation value
            slide.addText(`Correlation: ${chart8Data.correlation ? chart8Data.correlation.toFixed(2) : "N/A"}`, {
                x: 0.5,
                y: 6.5,
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

            // Save the presentation with the chart title as the filename
            // Only save if this is not part of a combined presentation
            if (!existingPptx) {
                await pptx.writeFile({
                    fileName: "What is the relationship between ROI and Incremental Profit Pool.pptx",
                    compression: true
                });
            }

            return pptx;
        } catch (error) {
            console.error("PPT Generation Error:", error);
            return null;
        } finally {
            if (!existingPptx) {
                setPresentationGenerated(false);
            }
        }
    };

    const generateChart9PPT = async (existingPptx = null) => {
        try {
            if (!existingPptx) {
                setPresentationGenerated(true);
            }

            // Create a new pptx instance if not provided
            let pptx = existingPptx || new pptxgen();

            // Ensure pptx is properly initialized
            if (!pptx.addSlide) {
                console.error("Invalid pptx object, creating a new one");
                pptx = new pptxgen();
            }

            if (!existingPptx) {
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
            }

            let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

            // Add chart title at the top
            slide.addText("What is the relationship between retailer funding and ROI at different price points?", {
                x: 0.35,
                y: 0.4,
                w: 12,
                h: 0.4,
                fontSize: 16,
                bold: true,
                color: "000000"
            });

            // Format data for scatter plot
            const scatterData = [];
            chart9Data.series.forEach(series => {
                scatterData.push({
                    name: series.name,
                    values: series.data.map(point => ({
                        x: point[0], // Retailer funding %
                        y: point[1]  // ROI %
                    }))
                });
            });

            // Add scatter plot
            slide.addChart(pptx.charts.SCATTER, scatterData, {
                x: 0.35,
                y: 1.5,
                w: 12,
                h: 5,
                showTitle: false,
                showLegend: true,
                legendPos: 'b',
                lineSize: 0,
                chartColors: ['4472C4', '00B050', 'FFC000', '7030A0'],
                lineWidth: 0,
                markerSize: 10,
                dataLabelFormatCode: '#,##0.0"%"',
                valAxisTitle: "ROI (%)",
                catAxisTitle: "Retailer Funding (%)",
                plotArea: { border: { pt: 1, color: "888888" } },
                showValAxisTitle: true,
                showCatAxisTitle: true,
                valAxisTitleColor: "000000",
                catAxisTitleColor: "000000"
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

            // Save the presentation with the chart title as the filename
            // Only save if this is not part of a combined presentation
            if (!existingPptx) {
                await pptx.writeFile({
                    fileName: "What is the relationship between retailer funding and ROI at different price points.pptx",
                    compression: true
                });
            }

            return pptx;
        } catch (error) {
            console.error("PPT Generation Error:", error);
            return null;
        } finally {
            if (!existingPptx) {
                setPresentationGenerated(false);
            }
        }
    };

    const formatNumber = (num) => {
        if (num === undefined || num === null) return '0.0';

        // Convert to number to ensure proper formatting
        const numValue = Number(num);

        return numValue.toFixed(2);
    };

    // Add a new function for formatting currency with commas
    const formatCurrency = (num) => {
        if (num === undefined || num === null) return '$0.0';

        // Convert to number to ensure proper formatting
        const numValue = Number(num);

        // Format with commas for thousands and 1 decimal place
        return numValue.toLocaleString('en-IN', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        });
    };

    const generateAllPPT = async () => {
        try {
            setPresentationGenerated(true);

            // Create a new presentation
            let pptx = new pptxgen();

            // Ensure pptx is properly initialized
            if (!pptx.addSlide) {
                console.error("Invalid pptx object, creating a new one");
                pptx = new pptxgen();
            }

            // Set presentation properties
            pptx.layout = "LAYOUT_WIDE";
            pptx.title = `${project_name} Complete Report ${selectedYear}`;
            pptx.subject = "Trade Promotion Optimization Report";
            pptx.company = "North Light Analytics";
            pptx.author = authData?.name || "User";
            pptx.revision = "1";

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

            // Add a title slide
            let titleSlide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

            // Add title
            titleSlide.addText(`${project_name} - Trade Promotion Optimization Report`, {
                x: 0.5,
                y: 1.5,
                w: 12,
                h: 1.0,
                fontSize: 24,
                bold: true,
                color: "000000",
                align: "center"
            });

            // Add year
            titleSlide.addText(`Year: ${selectedYear}`, {
                x: 0.5,
                y: 2.5,
                w: 12,
                h: 0.5,
                fontSize: 18,
                color: "000000",
                align: "center"
            });

            // Add date
            titleSlide.addText(`Generated on: ${new Date().toLocaleDateString()}`, {
                x: 0.5,
                y: 3.5,
                w: 12,
                h: 0.5,
                fontSize: 14,
                color: "000000",
                align: "center"
            });

            // Add logos to title slide
            titleSlide.addImage({
                path: Logo,
                x: 5.3,
                y: 5.0,
                w: 2.4,
                h: 1.0,
                sizing: { type: "contain", w: 2.4, h: 1.0 }
            });

            if (authData?.company_logo) {
                titleSlide.addImage({
                    path: authData.company_logo,
                    x: 5.3,
                    y: 6.0,
                    w: 2.4,
                    h: 1.0,
                    sizing: { type: "contain", w: 2.4, h: 1.0 }
                });
            }

            // Generate all chart slides sequentially with proper error handling
            try {
                // Chart 1
                try {
                    const pptx1 = await generatePPT(pptx);
                    if (pptx1 && pptx1.addSlide) pptx = pptx1;
                } catch (err) {
                    console.error("Error generating Chart 1:", err);
                }

                // Chart 2
                try {
                    const pptx2 = await generateChart2PPT(pptx);
                    if (pptx2 && pptx2.addSlide) pptx = pptx2;
                } catch (err) {
                    console.error("Error generating Chart 2:", err);
                }

                // Chart 3
                try {
                    const pptx3 = await generateChart3PPT(pptx);
                    if (pptx3 && pptx3.addSlide) pptx = pptx3;
                } catch (err) {
                    console.error("Error generating Chart 3:", err);
                }

                // Chart 4
                try {
                    const pptx4 = await generateChart4PPT(pptx);
                    if (pptx4 && pptx4.addSlide) pptx = pptx4;
                } catch (err) {
                    console.error("Error generating Chart 4:", err);
                }

                // Chart 5
                try {
                    const pptx5 = await generateChart5PPT(pptx);
                    if (pptx5 && pptx5.addSlide) pptx = pptx5;
                } catch (err) {
                    console.error("Error generating Chart 5:", err);
                }

                // Chart 6
                try {
                    const pptx6 = await generateChart6PPT(pptx);
                    if (pptx6 && pptx6.addSlide) pptx = pptx6;
                } catch (err) {
                    console.error("Error generating Chart 6:", err);
                }

                // Chart 7
                try {
                    const pptx7 = await generateChart7PPT(pptx);
                    if (pptx7 && pptx7.addSlide) pptx = pptx7;
                } catch (err) {
                    console.error("Error generating Chart 7:", err);
                }

                // Chart 8
                try {
                    const pptx8 = await generateChart8PPT(pptx);
                    if (pptx8 && pptx8.addSlide) pptx = pptx8;
                } catch (err) {
                    console.error("Error generating Chart 8:", err);
                }

                // Chart 9
                // try {
                //     const pptx9 = await generateChart9PPT(pptx);
                //     if (pptx9 && pptx9.addSlide) pptx = pptx9;
                // } catch (err) {
                //     console.error("Error generating Chart 9:", err);
                // }
            } catch (chartError) {
                console.error("Error generating chart slides:", chartError);
            }

            // Verify the pptx object is valid before saving
            if (!pptx || !pptx.writeFile) {
                console.error("Invalid pptx object before saving");
                alert("There was an error generating the complete PPT. Please try again.");
                setPresentationGenerated(false);
                return;
            }

            // Save the presentation with proper error handling
            try {
                await pptx.writeFile({
                    fileName: `${project_name}_Complete_Report_${selectedYear}.pptx`,
                    compression: true
                });
                console.log("Complete PPT file saved successfully");
            } catch (saveError) {
                console.error("Error saving PPT file:", saveError);
                alert("There was an error saving the complete PPT file. Please try again.");
            }
        } catch (error) {
            console.error("Error in generateAllPPT:", error);
            alert("There was an error generating the complete PPT. Please try again.");
        } finally {
            setPresentationGenerated(false);
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-[calc(100vh-40px)] pt-20 pb-8">
                <div className="border-b border-[#cccccc] pb-3 px-[36px]">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <Link to={`/tpo/${encodeURIComponent(project_name)}/${project_id}/${model_id}/${id}`} className="flex items-center gap-2">
                                    <div className="nla-arrow-left-icon"><span></span></div>
                                </Link>
                                <h4 className="text-2xl font-bold">{project_name}</h4>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    {/* <label htmlFor="yearSelect" className="mr-2 font-medium">Year:</label>
                                    <select
                                        id="yearSelect"
                                        className="form-select rounded border border-gray-300 py-1 px-3"
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                    >
                                        {availableYears.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select> */}
                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={generateAllPPT}
                                    disabled={presentationGenerated}
                                >
                                    {presentationGenerated ? (
                                        <>
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            Download All PPT
                                        </>
                                    )}
                                </button>
                            </div>
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
                                                                <th className="py-2 px-4">${formatCurrency(summaryData.totalSpend)}</th>
                                                                <th className="py-2 px-4">{formatNumber(summaryData.avgROI)}%</th>
                                                            </tr>
                                                            <tr className="border-b border-gray-300 text-left">
                                                                <th className="py-2 px-4">Positive ROI</th>
                                                                <td className="py-2 px-4">{summaryData.positiveCount}</td>
                                                                <td className="py-2 px-4">${formatCurrency(summaryData.positiveSpend)}</td>
                                                                <th className="py-2 px-4">{formatNumber(summaryData.positiveROI)}%</th>
                                                            </tr>
                                                            <tr className="border-b border-gray-300 text-left">
                                                                <th className="py-2 px-4">Negative ROI</th>
                                                                <td className="py-2 px-4">{summaryData.negativeCount}</td>
                                                                <td className="py-2 px-4">${formatCurrency(summaryData.negativeSpend)}</td>
                                                                <th className="py-2 px-4">{formatNumber(summaryData.negativeROI)}%</th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => generatePPT()}
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
                                                    onClick={() => generateChart2PPT()}
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
                                                    onClick={() => generateChart3PPT()}
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
                                                    onClick={() => generateChart4PPT()}
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
                                                    onClick={() => generateChart5PPT()}
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
                                                                    <td className="border px-4 py-2 font-semibold">Avg. Wtd. ROI</td>
                                                                    {chart5Data.summaryData.avgWeightedROI.map((val, i) => (
                                                                        <td key={i} className="border px-4 py-2">{val.toFixed(1)}%</td>
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
                                                                    <td className="border px-4 py-2 font-semibold">No. of F&D Events</td>
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
                                                    onClick={() => generateChart6PPT()}
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

                                            {/* Summary table */}
                                            <div className="bg-gray-50 p-4 rounded w-full mb-8">
                                                <h4 className="text-lg font-bold mb-3">Result Summary</h4>
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full bg-white border border-gray-300">
                                                        <thead>
                                                            <tr className="bg-gray-100">
                                                                <th className="border px-4 py-2">Metric</th>
                                                                {chart6Data.options.xaxis.categories.map((category, i) => (
                                                                    <th key={i} className="border px-4 py-2">{category}</th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="border px-4 py-2 font-semibold">No. of events</td>
                                                                {chart6Data.summaryData.ppgGroups.map((group, i) => (
                                                                    <td key={i} className="border px-4 py-2">
                                                                        {group.events.length === 0 ? '-' : group.events.length}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                            <tr>
                                                                <td className="border px-4 py-2 font-semibold">Avg. Wtd. ROI</td>
                                                                {chart6Data.summaryData.ppgGroups.map((group, i) => (
                                                                    <td key={i} className="border px-4 py-2">
                                                                        {group.avgRoi === 0 ? '-' : (group.avgRoi).toFixed(2) + '%'}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                            <tr>
                                                                <td className="border px-4 py-2 font-semibold">No. of Products</td>
                                                                {chart6Data.summaryData.ppgGroups.map((group, i) => (
                                                                    <td key={i} className="border px-4 py-2">
                                                                        {group.products.length === 0 ? '-' : group.products.length}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
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
                                                    onClick={() => generateChart7PPT()}
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
                                                    onClick={() => generateChart8PPT()}
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
                                                {/* <button
                                                    className="btn btn-primary ml-4"
                                                    onClick={() => generateChart9PPT()}
                                                    disabled={presentationGenerated}
                                                >
                                                    {presentationGenerated ? 'Generating...' : 'Download PPT'}
                                                </button> */}
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

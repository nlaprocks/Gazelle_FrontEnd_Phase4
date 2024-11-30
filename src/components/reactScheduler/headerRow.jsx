import * as React from 'react';
import { useRef } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, TimelineMonth, getWeekNumber, Inject, HeaderRowDirective, HeaderRowsDirective, ResourcesDirective, ResourceDirective, Resize, DragAndDrop, getWeekLastDate } from '@syncfusion/ej2-react-schedule';
import './resources.css';
import { extend, Internationalization, createElement, L10n } from '@syncfusion/ej2-base';
import { applyCategoryColor } from './helper';
import dataSource from './datasource.json';
import { DropDownList, MultiSelect } from '@syncfusion/ej2-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';

/**
 * schedule header rows sample
 */
const HeaderRows = () => {
    const data = extend([], dataSource.headerRowData, null, true);
    console.log({ data });
    const scheduleObj = useRef(null);
    const instance = new Internationalization();
    L10n.load({
        'en-US': {
            'schedule': {
                'saveButton': 'Create',
                'cancelButton': 'Close',
                'deleteButton': 'Cancel',
                'newEvent': 'Create Promo',
            },
        }
    });

    const promotions = [{
        id: 1,
        name: 'Promotion 1'
    }, {
        id: 2,
        name: 'Promotion 2'
    }, {
        id: 3,
        name: 'Promotion 3'
    }, {
        id: 4,
        name: 'Promotion 4'
    }, {
        id: 5,
        name: 'Promotion 5'
    },
    {
        id: 6,
        name: 'Promotion 6'
    },
    {
        id: 7,
        name: 'Promotion 7'
    },
    {
        id: 8,
        name: 'Promotion 8'
    },
    {
        id: 9,
        name: 'Promotion 9'
    }];

    const fieldsData = {
        subject: { name: 'Title', title: 'Event Name' },
        location: { name: 'Location', title: 'Budget' },
        startTime: { name: 'StartTime', title: 'Start Time' },
        endTime: { name: 'EndTime', title: 'End Time' }
    }
    const onPopupOpen = (args) => {
        if (args.type === 'Editor') {
            try {
                // Basic Selection Dropdowns
                if (!args.element.querySelector('.custom-field-selections-row')) {
                    let row = createElement('div', { className: 'custom-field-selections-row' });
                    let formElement = args.element.querySelector('.e-schedule-form');
                    formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);

                    // Add dropdowns for Promotions, Channel, Retailer, Brands, Products
                    const dropdowns = [
                        { name: 'Promotions', type: 'dropdown', options: promotions, fields: { text: 'name', value: 'id' } },
                        { name: 'Channel', type: 'multiselect', options: ['Channel 1', 'Channel 2'], fields: { text: 'text', value: 'value' } },
                        { name: 'Retailer', type: 'dropdown', options: ['Retailer A', 'Retailer B', 'Retailer C'], fields: { text: 'text', value: 'value' } },
                        { name: 'Brands', type: 'dropdown', options: ['Brand X', 'Brand Y', 'Brand Z'], fields: { text: 'text', value: 'value' } },
                        { name: 'Products', type: 'multiselect', options: ['Product 1', 'Product 2', 'Product 3'], fields: { text: 'text', value: 'value' } }
                    ];

                    dropdowns.forEach(dropdown => {
                        let container = createElement('div', {
                            className: 'custom-field-container'
                        });

                        // Add label
                        let label = createElement('label', {
                            className: 'mb-1 font-medium',
                            innerHTML: dropdown.name
                        });
                        container.appendChild(label);

                        // Add input element
                        let inputEle = createElement('input', {
                            className: 'e-field',
                            attrs: { name: dropdown.name }
                        });
                        container.appendChild(inputEle);
                        row.appendChild(container);

                        if (dropdown.type === 'text') {
                            // For Event Name field
                            new TextBoxComponent({
                                placeholder: dropdown.placeholder,
                                floatLabelType: 'Never'
                            }).appendTo(inputEle);
                        }
                        else if (dropdown.type === 'multiselect') {
                            // For dropdown fields
                            new MultiSelect({
                                dataSource: dropdown.options,
                                fields: dropdown.fields,
                                value: args.data[dropdown.name] || [],
                                floatLabelType: 'Never',
                                placeholder: `Select ${dropdown.name}`,
                            }).appendTo(inputEle);
                        }
                        else if (dropdown.type === 'dropdown') {
                            // For dropdown fields
                            new DropDownList({
                                dataSource: dropdown.options,
                                fields: dropdown.fields,
                                value: args.data[dropdown.name] || [],
                                floatLabelType: 'Never',
                                placeholder: `Select ${dropdown.name}`,
                            }).appendTo(inputEle);
                        }
                        inputEle.setAttribute('name', dropdown.name);

                    });
                }

                // Financial Fields
                if (!args.element.querySelector('.custom-field-financial-row')) {
                    let row = createElement('div', { className: 'custom-field-financial-row' });
                    let formElement = args.element.querySelector('.e-schedule-form');
                    formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild.nextSibling);

                    const financialFields = [
                        { name: 'basePrice', label: 'Base Price' },
                        { name: 'promoPrice', label: 'Promo Price' },
                        { name: 'discount', label: 'Discount %', readonly: true },
                        { name: 'units', label: 'Units' },
                        { name: 'listPrice', label: 'List Price' },
                        { name: 'edlpPerUnitRate', label: 'EDLP Per Unit Rate' },
                        { name: 'promoPerUnitRate', label: 'Promo Per Unit Rate' },
                        { name: 'vcm', label: 'VCM' },
                        { name: 'fixedFee', label: 'Fixed Fees' },
                        { name: 'increamentalUnits', label: 'Incremental Units' }
                    ];

                    financialFields.forEach(field => {
                        let container = createElement('div', {
                            className: 'custom-field-container'
                        });

                        let label = createElement('label', {
                            className: 'mb-1 font-medium',
                            innerHTML: field.label
                        });
                        container.appendChild(label);

                        let inputEle = createElement('input', {
                            className: 'e-field margin_simu_input',
                            attrs: {
                                name: field.name,
                                type: 'number',
                                placeholder: field.label,
                                value: args.data[field.name] || ''
                            }
                        });

                        // Add input event listener directly to the input element
                        inputEle.addEventListener('input', (e) => {
                            const formElement = args.element.querySelector('.e-schedule-form');
                            if (formElement) {
                                // Trigger form update
                                const event = new Event('input', { bubbles: true });
                                formElement.dispatchEvent(event);
                            }
                        });

                        container.appendChild(inputEle);
                        row.appendChild(container);
                    });
                }

                // Add results table
                if (!args.element.querySelector('.event-results-table')) {
                    let resultsContainer = createElement('div', {
                        className: 'event-results-table left_best_price shadow-none'
                    });

                    // Get the form element from args
                    const formElement = args.element.querySelector('.e-schedule-form');

                    const table = createElement('table', { className: 'best_pr_table' });

                    // Table Header
                    const thead = createElement('thead', {});
                    const headerRow = createElement('tr', {});
                    const headerCell = createElement('th', {
                        attrs: { colSpan: "2" },
                        innerHTML: 'Event Results'
                    });
                    headerRow.appendChild(headerCell);
                    thead.appendChild(headerRow);
                    table.appendChild(thead);

                    // Table Body
                    const tbody = createElement('tbody', {});

                    // Calculate and update results
                    const calculateAndUpdateResults = (values) => {
                        console.log({ values });
                        const units = parseFloat(values.units) || 0;
                        const promotedPrice = parseFloat(values.promoPrice) || 0;
                        const basePrice = parseFloat(values.basePrice) || 0;
                        const edlpPerUnitRate = parseFloat(values.edlpPerUnitRate) || 0;
                        const promoPerUnitRate = parseFloat(values.promoPerUnitRate) || 0;
                        const fixedFee = parseFloat(values.fixedFee) || 0;
                        const listPrice = parseFloat(values.listPrice) || 0;
                        const vcm = parseFloat(values.vcm) || 0;
                        const increamentalUnits = parseFloat(values.increamentalUnits) || 0;

                        let grossRevenue = units * promotedPrice;
                        let variableSpend = (edlpPerUnitRate + promoPerUnitRate) * units;
                        let totalSpend = fixedFee ? fixedFee + variableSpend : variableSpend;
                        let increamentalRevenue = increamentalUnits * promotedPrice;
                        let increamentalProfit = increamentalUnits * vcm - totalSpend;
                        let percentageROI = (increamentalProfit / totalSpend) * 100;
                        let retailerEverydayMargin = ((basePrice - listPrice) / basePrice) * 100;
                        let netCost = listPrice - edlpPerUnitRate - promoPerUnitRate - fixedFee / units;
                        let retailerPromoMargin = ((promotedPrice - netCost) / promotedPrice) * 100;
                        let retailerProfit = units * promotedPrice - netCost * units;
                        console.log({ grossRevenue, totalSpend, increamentalRevenue, increamentalProfit, percentageROI, retailerPromoMargin, retailerEverydayMargin, retailerProfit });
                        const results = [
                            {
                                name: "Gross Revenue",
                                value: !isNaN(grossRevenue) && grossRevenue !== 0 ? `${grossRevenue.toFixed(2)}$` : "-"
                            },
                            {
                                name: "Total Spend",
                                value: !isNaN(totalSpend) ? `${totalSpend.toFixed(2)}$` : "-"
                            },
                            {
                                name: "Incremental Revenue",
                                value: !isNaN(increamentalRevenue) && increamentalRevenue !== 0 ? `${increamentalRevenue.toFixed(2)}$` : "-"
                            },
                            {
                                name: "Incremental Profit",
                                value: !isNaN(increamentalProfit) ? `${increamentalProfit.toFixed(2)}$` : "-"
                            },
                            {
                                name: "Sales ROI",
                                value: !isNaN(percentageROI) ? `${percentageROI.toFixed(2)}%` : "-"
                            },
                            {
                                name: "Retail Promo Margin %",
                                value: !isNaN(retailerPromoMargin) ? `${retailerPromoMargin.toFixed(2)}%` : "-"
                            },
                            {
                                name: "Retail Everyday Margin %",
                                value: !isNaN(retailerEverydayMargin) && promotedPrice ? `${retailerEverydayMargin.toFixed(2)}%` : "-"
                            },
                            {
                                name: "Retail Profit",
                                value: !isNaN(retailerProfit) && retailerProfit !== 0 ? `${retailerProfit.toFixed(2)}$` : "-"
                            }
                        ];

                        // Update table body
                        tbody.innerHTML = '';
                        results.forEach(result => {
                            const row = createElement('tr', {});

                            const nameCell = createElement('td', {});
                            const nameP = createElement('p', { innerHTML: result.name });
                            nameCell.appendChild(nameP);

                            const valueCell = createElement('td', {});
                            const valueP = createElement('p', { innerHTML: result.value });
                            valueCell.appendChild(valueP);

                            row.appendChild(nameCell);
                            row.appendChild(valueCell);
                            tbody.appendChild(row);
                        });
                    };

                    table.appendChild(tbody);
                    resultsContainer.appendChild(table);
                    formElement.appendChild(resultsContainer);

                    // Add input event listeners to all relevant fields
                    const inputs = formElement.querySelectorAll('input[type="number"]');
                    inputs.forEach(input => {
                        input.addEventListener('input', () => {
                            const values = {};
                            inputs.forEach(inp => {
                                values[inp.name] = inp.value;
                            });
                            console.log({ values });
                            calculateAndUpdateResults(values);
                        });
                    });

                    // Initial calculation
                    const initialValues = {};
                    inputs.forEach(inp => {
                        initialValues[inp.name] = inp.value;
                    });
                    calculateAndUpdateResults(initialValues);
                }
            } catch (error) {
                console.log('Popup open error:', error);
            }
        }
    };

    const getMonthDetails = (value) => {
        return instance.formatDate(value.date, { skeleton: 'yMMMM' });
    };
    const monthTemplate = (props) => {
        return (<span className="month">{getMonthDetails(props)}</span>);
    };
    const weekTemplate = (props) => {
        const weekNumber = getWeekNumber(getWeekLastDate(props.date, 0));
        return (<span className="week">{weekNumber}</span>);
    };
    const onEventRendered = (args) => {
        applyCategoryColor(args, scheduleObj.current.currentView);
    };

    return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
            <div className='control-wrapper'>
                <ScheduleComponent ref={scheduleObj} height='800px' selectedDate={new Date(2021, 0, 1)} eventSettings={{ dataSource: data, fields: fieldsData }} group={{ resources: ['Promotions'] }} popupOpen={onPopupOpen} eventRendered={onEventRendered}>
                    <ResourcesDirective>
                        <ResourceDirective field='ResourceId' title='Promotions' name='Promotions' allowMultiple={true} dataSource={promotions} textField='name' idField='id' enableTooltip={true} />
                    </ResourcesDirective>
                    <HeaderRowsDirective>
                        <HeaderRowDirective option='Month' template={monthTemplate} />
                        <HeaderRowDirective option='Week' template={weekTemplate} />
                        {/* <HeaderRowDirective option='Date' /> */}
                    </HeaderRowsDirective>
                    <ViewsDirective>
                        <ViewDirective option='TimelineMonth' interval={12} />
                    </ViewsDirective>
                    <Inject services={[TimelineMonth, Resize, DragAndDrop]} />
                </ScheduleComponent>
            </div>
        </div>
    </div>);
};
export default HeaderRows;
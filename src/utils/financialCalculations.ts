export const calculateFinancialResults = (values: {
  units: number;
  promoPrice: number;
  basePrice: number;
  edlpPerUnitRate: number;
  promoPerUnitRate: number;
  fixedFee: number;
  listPrice: number;
  vcm: number;
  increamentalUnits: number;
}): { name: string; value: string }[] => {
  const {
    units,
    promoPrice,
    basePrice,
    edlpPerUnitRate,
    promoPerUnitRate,
    fixedFee,
    listPrice,
    vcm,
    increamentalUnits,
  } = values;

  const grossRevenue = units * promoPrice;
  const variableSpend = (edlpPerUnitRate + promoPerUnitRate) * units;
  const totalSpend = fixedFee ? fixedFee + variableSpend : variableSpend;
  const increamentalRevenue = increamentalUnits * promoPrice;
  const increamentalProfit = increamentalUnits * vcm - totalSpend;
  const percentageROI = (increamentalProfit / totalSpend) * 100;
  const retailerEverydayMargin = ((basePrice - listPrice) / basePrice) * 100;
  const netCost = listPrice - edlpPerUnitRate - promoPerUnitRate - fixedFee / units;
  const retailerPromoMargin = ((promoPrice - netCost) / promoPrice) * 100;
  const retailerProfit = units * promoPrice - netCost * units;

  return [
    {
      name: "Gross Revenue",
      value: formatValue(grossRevenue, '$'),
    },
    {
      name: "Total Spend",
      value: formatValue(totalSpend, '$'),
    },
    {
      name: "Incremental Revenue",
      value: formatValue(increamentalRevenue, '$'),
    },
    {
      name: "Incremental Profit",
      value: formatValue(increamentalProfit, '$'),
    },
    {
      name: "Sales ROI",
      value: formatValue(percentageROI, '%'),
    },
    {
      name: "Retail Promo Margin %",
      value: formatValue(retailerPromoMargin, '%'),
    },
    {
      name: "Retail Everyday Margin %",
      value: formatValue(retailerEverydayMargin, '%'),
    },
    {
      name: "Retail Profit",
      value: formatValue(retailerProfit, '$'),
    },
  ];
};

const formatValue = (value: number, suffix: string): string => {
  return !isNaN(value) && value !== 0 ? `${value.toFixed(2)}${suffix}` : "-";
};
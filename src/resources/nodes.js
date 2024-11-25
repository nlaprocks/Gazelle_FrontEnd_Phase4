const topics = [
  {
    id: "1",
    name: "Price Elasticity",
    tooltip: "Price Promo Modeling",
  },
  {
    id: "2",
    name: "Demand Forecasting",
    tooltip: "Forecasting the demand",
  },
  {
    id: "3",
    name: "Marketing Mix",
    tooltip: "Measuring impacts from various marketing sources",
  },
  {
    id: "4",
    name: "Assortment Optimization",
    tooltip: "Optimizing assortments for better space utilization",
  },
  {
    id: "5",
    name: "Trendspotting",
    tooltip: "Identify outperforming brands and attributes",
  },
  {
    id: "6",
    name: "Brandspotting",
    tooltip: "Identify small and unique well performing brands for M&A",
  },
];

const dataAcess = [
  {
    id: "1",
    name: "Read File",
    params: {
      name: "Read",
      fileFormat: ".xlsx, .xls, .csv",
    },
    tooltip: "Read the file from a local source",
  },
  {
    id: "2",
    name: "Write File",
    style: { border: "1px solid #777", padding: 10 },
    params: {
      name: "Write",
      fileFormat: ".xlsx, .xls, .csv",
    },
    tooltip: "Write to a file on a local source",
  },
  {
    id: "3",
    name: "DB Read",
    tooltip: "Read from the database",
  },
  {
    id: "4",
    name: "DB Write",
    tooltip: "Write to the database",
  },
  {
    id: "5",
    name: "Cloud AmazonS3 Read",
    tooltip: "Read from AmazonS3 Cloud",
  },
  {
    id: "6",
    name: "Cloud AmazonS3 Write",
    tooltip: "Write to AmazonS3 Cloud",
  },
  {
    id: "7",
    name: "Cloud Google Read",
    tooltip: "Read from Google Cloud",
  },
];

const modeling = [
  {
    id: "1",
    name: "Linear Regression",
    tooltip: "Simple linear regression",
  },
  {
    id: "2",
    name: "Arima",
    tooltip: "Auto regressive moving average",
  },
  {
    id: "3",
    name: "Price",
    params: {
      name: "Price",
      pValue: "P-value",
      train: "Train",
      test: "Test",
      validate: "Validate",
    },
    tooltip: "Price Elasticity Model",
  },
  {
    id: "4",
    name: "Logistic Regression",
    tooltip: "Simple logistic regression",
  },
  {
    id: "5",
    name: "SVM",
    tooltip: "Support Vector Machine",
  },
  {
    id: "6",
    name: "XGBOOST",
    tooltip: "Xtreme Gradient Boosting",
  },
  {
    id: "7",
    name: "GBM",
    tooltip: "Gradient Boosting Model",
  },
];

const cleansing = [
  {
    id: "1",
    name: "Normalize",
    tooltip: "Reduce the Scale of the Variables",
  },
  {
    id: "2",
    name: "Denormalize",
    tooltip: "Increase the Scale of the Variables",
  },
  // {
  //   id: "3",
  //   name: "Statistics",
  //   tooltip: "",
  // },
  {
    id: "4",
    name: "Scale By Weights",
    tooltip: "Scale One or More Variables by a Constant",
  },
  {
    id: "5",
    name: "Quality Measures",
    tooltip: "Measure the quality of the input data",
  },
  {
    id: "6",
    name: "Cross Validation",
    tooltip: "Test, train and validate the model data",
  },
  {
    id: "7",
    name: "Split Validation",
    tooltip: "Split the data for test and train",
  },
];

export { topics, dataAcess, modeling, cleansing };

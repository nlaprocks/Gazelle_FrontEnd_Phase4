import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/simulation-style.css";
import { useParams } from "react-router-dom";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import PriceSimulator from "../../utils/simulation/PriceSimulator";
import MarginSimulator from "../../utils/simulation/MarginSimulator";
import PromoEventSimulator from "../../utils/simulation/promo/PromoEventSimulator";

export default function Simulation() {
  const { projectName, project_id, model_id } = useParams();
  // console.log("project_id: model_id", project_id, model_id)

  const [isPriceSimulationLoading, setIsPriceSimulationLoading] =
    useState(false);
  const [retailerBrandProducts, setRetailerBrandProducts] = useState([]);
  const [priceSimulationData, setPriceSimulationData] = useState([]);
  const [marginSimulationData, setMarginSimulationData] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [competitorNewPrice, setCompetitorNewPrice] = useState([]);
  const [simulatorType, setSimulatorType] = React.useState("price");
  // Price simulation states
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredSelectedPriceProducts, setFilteredSelectedPriceProducts] =
    useState([]);
  const [newPrices, setNewPrices] = useState([]);
  const [showProductResults, setShowProductResults] = useState(false);
  const [showCompetitorResults, setShowCompetitorResults] = useState(false);
  // Margin simulation states
  const [marginPriceValues, setMarginPriceValues] = useState({
    listPrice: "",
    edlpSpend: "",
    netUnitPrice: "",
    cogs: null,
    basePriceElasticity: "",
    basePrice: "",
  });

  const [marginChartData, setMarginChartData] = useState({
    manufacturerProfit: [],
    annualProfit: [],
  });

  // Common Pirce/Margin simulator states
  const [selectedRetailer, setSelectedRetailer] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  /* Promo Event Simulation States */
  const [promoEventPriceValues, setPromoEventPriceValues] = useState({
    promoPrice: "",
    discount: "",
    total_units_sum: "",
    discount: null,
    promoPriceElasticity: "",
    basePrice: "",
    tprDist: "",
    foDist: "",
    doDist: "",
    fdDist: "",
  });

  const [promoSimulationData, setPromoSimulationData] = useState([]);
  const [discount, setDiscount] = React.useState("");
  const [lift, setLift] = React.useState({});
  const [units, setUnits] = React.useState({});
  const [dollars, setDollars] = React.useState({});
  const [promoEventChartData, setpromoEventChartData] = React.useState([]);

  // Margin Simulator
  const retailers = Object?.keys(retailerBrandProducts);
  let brands = selectedRetailer
    ? Object?.keys(retailerBrandProducts[selectedRetailer])
    : [];
  let products = selectedBrand
    ? retailerBrandProducts[selectedRetailer][selectedBrand]
    : [];

  /* -----start----- Margin API handler -----start----- */
  const marginSimulationApiHandler = async (product) => {
    setIsPriceSimulationLoading(true);
    try {
      const api = `${process.env.REACT_APP_NGROK}/insights/simulation/price/product-data?project_id=${project_id}&model_id=${model_id}&Retailer=${selectedRetailer}&Product=${product}`;
      const response = await axios.get(api);
      if (response.status === 200) {
        // console.log("response: ", response);
        setMarginSimulationData(response?.data?.data);
        const basePrice = !isNaN(
          response?.data?.data[0]?.Price_avg_last_4_weeks
        )
          ? response?.data?.data[0]?.Price_avg_last_4_weeks
          : 0;
        setMarginPriceValues((prevInputValues) => ({
          ...prevInputValues,
          basePriceElasticity: response?.data?.data[0]?.Base_Price_Elasticity,
          basePrice: basePrice,
        }));
        setIsPriceSimulationLoading(false);
      }
    } catch (error) {
      setIsPriceSimulationLoading(false);
      console.log("Error in fetching margin simulation data: ", error);
    }
  };

  /* -----end----- Margin API handler -----end----- */

  /* -----start----- Common handlers -----start----- */
  const [isAllProductSelected, setIsAllProductSelected] = useState(false);

  // Local handlers
  const handleSimulatorChange = (e) => {
    setSimulatorType(e.target.value);
  };

  const handleProductsChangeForPrice = (values) => {
    setIsAllProductSelected(false);
    if (values && values.length && values.includes("select-all")) {
      if (values.length === products.length + 1) {
        setIsAllProductSelected(false);
        return setSelectedProducts([]);
      }
      setIsAllProductSelected(true);
      return setSelectedProducts([...products]);
    }
    if (values.length === products.length) {
      setIsAllProductSelected(true);
    }
    return setSelectedProducts(values);
  };

  // Retailer change handler
  const handleRetailerChange = (value) => {
    setIsAllProductSelected(false);
    setSelectedRetailer(value);
    setSelectedBrand("");
    setSelectedProduct("");
    setSelectedProducts([]);
    if (simulatorType === "price") {
      setFilteredSelectedPriceProducts([]);
      setCompetitors([]);
      getPriceSimulationApiHandler(value);
    }
  };

  // Brand change handler
  const handleBrandChange = (value) => {
    setIsAllProductSelected(false);
    setSelectedBrand(value);
    setSelectedProduct("");
    setSelectedProducts([]);
  };

  // Product change handler
  const handleProductChange = (value) => {
    setSelectedProduct(value);
    if (simulatorType === "margin") {
      marginSimulationApiHandler(value);
    }
    if (simulatorType === "promo") {
      promoEventHandler(value);
    }
  };
  /* -----end----- Common handlers -----end----- */

  /******************************************************************************************************************************************************/
  /*======================= START ===================================== PRICE SIMULATOR ================================= START ========================*/

  /* -----start----- Api Handler -----start----- */
  const getPriceSimulationApiHandler = async (retailer) => {
    setIsPriceSimulationLoading(true);
    try {
      const api = `${process.env.REACT_APP_NGROK}/insights/simulation/price/product-data?project_id=${project_id}&model_id=${model_id}&Retailer=${retailer}`;
      const response = await axios.get(api);
      if (response.status === 200) {
        setPriceSimulationData(response?.data?.data);
        setIsPriceSimulationLoading(false);
      }
    } catch (error) {
      setIsPriceSimulationLoading(false);
      console.log("Error in fetching simulation data: ", error);
    }
  };
  /* -----start----- Api Handler -----start----- */

  /* -----start----- Price change Handler -----start----- */
  const [newPriceChange, setNewPriceChange] = useState([]);

  const handleNewPriceOnChange = (index, event, product, type) => {
    let temp = [...newPriceChange];
    if (newPriceChange && newPriceChange.length > 0) {
      for (let i = 0; i < newPriceChange.length; i++) {
        if (product?.Product === newPriceChange[i]?.Product) {
          temp[i].newPrice = event.target.value;
          break;
        } else if (i === newPriceChange.length - 1) {
          temp.push({
            ...product,
            type: type,
            newPrice: event.target.value,
          });
        }
      }
    } else {
      temp.push({
        ...product,
        type: type,
        newPrice: event.target.value,
      });
    }
    // console.log("priceChange", temp);
    setNewPriceChange(temp);
    if (type === "product") {
      const updatedPrices = [...newPrices];
      updatedPrices[index] = event.target.value;
      setNewPrices(updatedPrices);
    }
    if (type === "competitor") {
      const updatedPrices = [...competitorNewPrice];
      updatedPrices[index] = event.target.value;
      setCompetitorNewPrice(updatedPrices);
    }
  };
  /* -----end----- Price change Handler -----end----- */

  /* -----start------ Impact handler function when there is a change in Price -----start----- */
  const [volumeImpact, setVolumeImpact] = useState([]);
  const [dollarImpact, setDollarImpact] = useState([]);

  const impactHandler = () => {
    let tempVolumeImpact = [];
    let tempDollarImpact = [];
    newPriceChange &&
      newPriceChange.length > 0 &&
      newPriceChange.map((ele, j) => {
        if (ele.newPrice !== "" && ele.newPrice !== "0") {
          //Volume Impact
          let Product = ele.Product;
          let PercentageChangeInPrice =
            ((ele.newPrice - ele.Price_avg_last_4_weeks) * 100) /
            ele.Price_avg_last_4_weeks;

          let NewUnits =
            ele.total_units_sum +
            ele.total_units_sum *
              ((1 + PercentageChangeInPrice / 100) **
                ele.Base_Price_Elasticity -
                1);

          let ChangeInUnits = NewUnits - ele.total_units_sum;
          let PercentageChangeInUnits =
            (ChangeInUnits * 100) / ele.total_units_sum;
          tempVolumeImpact.push({
            Product: Product,
            Base_Price_Elasticity: ele.Base_Price_Elasticity,
            total_units_sum: ele.total_units_sum,
            NewPrice: ele.newPrice,
            type: ele.type,
            NewUnits: ele.newPrice != 0 ? NewUnits : 0,
            ChangeInUnits: ele.newPrice != 0 ? ChangeInUnits : 0,
            PercentageChangeInUnits:
              ele.newPrice != 0 ? PercentageChangeInUnits : 0,
            NewVolume:
              ele.newPrice != 0
                ? NewUnits *
                  Product.match(/[+-]?\d+(\.\d+)?/g)[
                    Product.match(/[+-]?\d+(\.\d+)?/g).length - 2
                  ]
                : 0,
            ChangeInVolume:
              ele.newPrice != 0
                ? ChangeInUnits *
                  Product.match(/[+-]?\d+(\.\d+)?/g)[
                    Product.match(/[+-]?\d+(\.\d+)?/g).length - 2
                  ]
                : 0,
          });
          //Dollar Impact
          let NewDollars = NewUnits * ele.newPrice;
          let ChangeInDollars =
            NewDollars - ele.total_units_sum * ele.Price_avg_last_4_weeks;
          let PercentageChangeInDollars =
            (ChangeInDollars * 100) /
            (ele.total_units_sum * ele.Price_avg_last_4_weeks);
          tempDollarImpact.push({
            Product: Product,
            NewPrice: ele.newPrice,
            Base_Price_Elasticity: ele.Base_Price_Elasticity,
            totalDollars: ele.total_units_sum * ele.Price_avg_last_4_weeks,
            type: ele.type,
            NewDollars: ele.newPrice != 0 ? NewDollars : 0,
            ChangeInDollars: ele.newPrice != 0 ? ChangeInDollars : 0,
            PercentageChangeInDollars:
              ele.newPrice != 0 ? PercentageChangeInDollars : 0,
          });
        }
      });
    console.log(tempVolumeImpact, tempDollarImpact);
    crossEffectHandler(tempVolumeImpact, tempDollarImpact);
  };

  /* -----end------ Impact handler function when there is a change in Price -----end----- */

  /* -----start------ cross Effects handler function -----start----- */

  const crossEffectHandler = (volumeImpact, dollarImpact) => {
    let productCompetitorCrossEffects = [];
    if (volumeImpact.length > 0) {
      //gets cross effect values within selected products
      volumeImpact.map((ele) => {
        filteredSelectedPriceProducts.map((val) => {
          if (val.Product === ele.Product && ele.type === "product") {
            let crossEffects = [];
            let sum = 0;
            let comps = JSON.parse(val.Competitors).filter(
              (comp) => comp.cross_effect > 0
            );
            comps.length > 0 &&
              comps.map((comp) => {
                if (comp.cross_effect > 0) {
                  sum = sum + comp.cross_effect;
                }
              });
            comps.length > 0 &&
              comps.map((comp) => {
                if (comp.cross_effect > 0) {
                  crossEffects.push((comp.cross_effect * comps.length) / sum);
                }
              });
            crossEffects.map((eff, i) => {
              let productOunces =
                comps[i].competitor.match(/[+-]?\d+(\.\d+)?/g)[
                  comps[i].competitor.match(/[+-]?\d+(\.\d+)?/g).length - 2
                ];
              // productCompetitorCrossEffects.push({
              //   competitor: comps[i].competitor,
              //   crossEffectValue:
              //     ele.ChangeInUnits < 0
              //       ? (eff * Math.abs(ele.ChangeInUnits)) / comps.length
              //       : -(eff * Math.abs(ele.ChangeInUnits)) / comps.length,
              // });

              productCompetitorCrossEffects.push({
                competitor: comps[i].competitor,
                crossEffectValue:
                  ele.ChangeInVolume < 0
                    ? (eff * Math.abs(ele.ChangeInVolume)) /
                      comps.length /
                      productOunces
                    : -(eff * Math.abs(ele.ChangeInVolume)) /
                      comps.length /
                      productOunces,
              });
            });
          }
        });
        //gets cross effect values within competitor products
        competitors.map((val) => {
          if (
            val.Product === ele.Product &&
            ele.type === "competitor" &&
            ele.NewPrice !== ""
          ) {
            let crossEffects = [];
            let comps = JSON.parse(val.Competitors).filter(
              (comp) => comp.cross_effect > 0
            );
            // console.log("comps", comps, val);
            let sum = 0;
            comps.length > 0 &&
              comps.map((comp) => {
                if (comp.cross_effect > 0) {
                  sum = sum + comp.cross_effect;
                }
              });
            comps.length > 0 &&
              comps.map((comp) => {
                if (comp.cross_effect > 0) {
                  crossEffects.push((comp.cross_effect * comps.length) / sum);
                }
              });
            crossEffects.map((eff, i) => {
              let productOunces =
                comps[i].competitor.match(/[+-]?\d+(\.\d+)?/g)[
                  comps[i].competitor.match(/[+-]?\d+(\.\d+)?/g).length - 2
                ];
              // productCompetitorCrossEffects.push({
              //   competitor: comps[i].competitor,
              //   crossEffectValue:
              //     ele.ChangeInUnits < 0
              //       ? (eff * Math.abs(ele.ChangeInUnits)) / comps.length
              //       : -(eff * Math.abs(ele.ChangeInUnits)) / comps.length,
              // });
              productCompetitorCrossEffects.push({
                competitor: comps[i].competitor,
                crossEffectValue:
                  ele.ChangeInVolume < 0
                    ? (eff * Math.abs(ele.ChangeInVolume)) /
                      comps.length /
                      productOunces
                    : -(eff * Math.abs(ele.ChangeInVolume)) /
                      comps.length /
                      productOunces,
              });
            });
          }
        });
      });
    }

    productCompetitorCrossEffects.map((ele, i) => {
      for (let j = i + 1; j < productCompetitorCrossEffects.length; j++) {
        if (productCompetitorCrossEffects[j].competitor === ele.competitor) {
          productCompetitorCrossEffects[i].crossEffectValue =
            productCompetitorCrossEffects[i].crossEffectValue +
            productCompetitorCrossEffects[j].crossEffectValue;
          productCompetitorCrossEffects.splice(j, 1);
        }
      }
    });
    let tempVolumeImpact = [...volumeImpact];
    let tempDollarImpact = [...dollarImpact];
    productCompetitorCrossEffects.length > 0 &&
      productCompetitorCrossEffects.map((ele, j) => {
        for (let id = 0; id < volumeImpact.length; id++) {
          if (volumeImpact[id].Product === ele.competitor) {
            tempVolumeImpact[id] = {
              ...volumeImpact[id],
              NewUnits: volumeImpact[id].NewUnits + ele.crossEffectValue,
              ChangeInUnits:
                volumeImpact[id].ChangeInUnits + ele.crossEffectValue,
              PercentageChangeInUnits:
                ((volumeImpact[id].ChangeInUnits + ele.crossEffectValue) *
                  100) /
                volumeImpact[id].total_units_sum,
            };
            tempDollarImpact[id] = {
              ...tempDollarImpact[id],
              NewDollars:
                (volumeImpact[id].NewUnits + ele.crossEffectValue) *
                parseInt(volumeImpact[id].NewPrice),
              ChangeInDollars:
                (volumeImpact[id].NewUnits + ele.crossEffectValue) *
                  parseInt(volumeImpact[id].NewPrice) -
                tempDollarImpact[id].totalDollars,
              PercentageChangeInDollars:
                (((volumeImpact[id].NewUnits + ele.crossEffectValue) *
                  parseInt(volumeImpact[id].NewPrice) -
                  tempDollarImpact[id].totalDollars) *
                  100) /
                tempDollarImpact[id].totalDollars,
            };
            productCompetitorCrossEffects.splice(j, 1);
          }
        }
      });
    productCompetitorCrossEffects.length > 0 &&
      productCompetitorCrossEffects.map((ele) => {
        filteredSelectedPriceProducts.map((prod) => {
          if (prod.Product === ele.competitor) {
            let Product = prod.Product;
            let NewUnits = prod.total_units_sum + ele.crossEffectValue;
            let ChangeInUnits = NewUnits - prod.total_units_sum;
            let PercentageChangeInUnits =
              (ChangeInUnits * 100) / prod.total_units_sum;
            tempVolumeImpact.push({
              Product: Product,
              Base_Price_Elasticity: prod.Base_Price_Elasticity,
              total_units_sum: prod.total_units_sum,
              NewPrice: "",
              type: "product",
              NewUnits: NewUnits,
              ChangeInUnits: ChangeInUnits,
              PercentageChangeInUnits: PercentageChangeInUnits,
            });
            let NewDollars = NewUnits * prod.Price_avg_last_4_weeks;
            let ChangeInDollars =
              NewDollars - prod.total_units_sum * prod.Price_avg_last_4_weeks;
            let PercentageChangeInDollars =
              (ChangeInDollars * 100) /
              (prod.total_units_sum * prod.Price_avg_last_4_weeks);
            tempDollarImpact.push({
              Product: Product,
              NewPrice: "",
              Base_Price_Elasticity: prod.Base_Price_Elasticity,
              totalDollars: prod.total_units_sum * prod.Price_avg_last_4_weeks,
              type: "product",
              NewDollars: NewDollars,
              ChangeInDollars: ChangeInDollars,
              PercentageChangeInDollars: PercentageChangeInDollars,
            });
          }
        });
        competitors.map((prod) => {
          if (prod.Product === ele.competitor) {
            let Product = prod.Product;
            let NewUnits = prod.total_units_sum + ele.crossEffectValue;
            let ChangeInUnits = NewUnits - prod.total_units_sum;
            let PercentageChangeInUnits =
              (ChangeInUnits * 100) / prod.total_units_sum;
            tempVolumeImpact.push({
              Product: Product,
              Base_Price_Elasticity: prod.Base_Price_Elasticity,
              total_units_sum: prod.total_units_sum,
              NewPrice: "",
              type: "competitor",
              NewUnits: NewUnits,
              ChangeInUnits: ChangeInUnits,
              PercentageChangeInUnits: PercentageChangeInUnits,
            });
            let NewDollars = NewUnits * prod.Price_avg_last_4_weeks;
            let ChangeInDollars =
              NewDollars - prod.total_units_sum * prod.Price_avg_last_4_weeks;
            let PercentageChangeInDollars =
              (ChangeInDollars * 100) /
              (prod.total_units_sum * prod.Price_avg_last_4_weeks);
            tempDollarImpact.push({
              Product: Product,
              NewPrice: "",
              Base_Price_Elasticity: prod.Base_Price_Elasticity,
              totalDollars: prod.total_units_sum * prod.Price_avg_last_4_weeks,
              type: "competitor",
              NewDollars: NewDollars,
              ChangeInDollars: ChangeInDollars,
              PercentageChangeInDollars: PercentageChangeInDollars,
            });
          }
        });
      });
    setVolumeImpact(tempVolumeImpact);
    setDollarImpact(tempDollarImpact);
  };

  /* -----end------ cross Effects handler function -----end----- */

  /* -----start----- Promo Event handler -----start----- */
  const promoEventHandler = async (product) => {
    setIsPriceSimulationLoading(true);
    try {
      const api = `${process.env.REACT_APP_NGROK}/insights/simulation/price/product-data?project_id=${project_id}&model_id=${model_id}&Retailer=${selectedRetailer}&Product=${product}`;
      const response = await axios.get(api);
      // let response = {
      //   status: 200,
      //   data: {
      //     data: output.filter((ele) => ele.Retailer === selectedRetailer && ele.Product === product),
      //   },
      // };
      if (response.status === 200) {
        setTimeout(() => {
          // console.log("response: ", response);
          setPromoSimulationData(response?.data?.data);
          const basePrice = !isNaN(
            response?.data?.data[0]?.Price_avg_last_4_weeks
          )
            ? response?.data?.data[0]?.Price_avg_last_4_weeks
            : 0;
          setPromoEventPriceValues((prevInputValues) => ({
            ...prevInputValues,
            promoPriceElasticity:
              response?.data?.data[0]?.Promo_Price_Elasticity,
            basePrice: basePrice,
            total_units_sum: response?.data?.data[0]?.total_units_sum / 52,
          }));
          setIsPriceSimulationLoading(false);
        }, 2000);
      }
    } catch (error) {
      setIsPriceSimulationLoading(false);
      console.log("Error in fetching promo event simulation data: ", error);
    }
  };

  /* -----end----- Promo Event handler -----end----- */

  const handlePromoEventPriceInputChange = (event) => {
    const { name, value } = event.target;
    setPromoEventPriceValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  /* -----start------ updating the state of the respective products with their impacts -----start------ */
  useEffect(() => {
    let productImpacts = [...filteredSelectedPriceProducts];
    filteredSelectedPriceProducts.map((ele, i) => {
      if (volumeImpact.length > 0) {
        for (let volImp of volumeImpact) {
          if (ele.Product === volImp.Product) {
            productImpacts[i] = {
              ...productImpacts[i],
              newVolume: volImp.NewUnits,
              changeInVolume: volImp.ChangeInUnits,
              percentageChangeInVolume: volImp.PercentageChangeInUnits,
            };
            break;
          } else {
            delete productImpacts[i].newVolume;
            delete productImpacts[i].changeInVolume;
            delete productImpacts[i].percentageChangeInVolume;
          }
        }
        for (let dolImp of dollarImpact) {
          if (ele.Product === dolImp.Product) {
            productImpacts[i] = {
              ...productImpacts[i],
              newDollars: dolImp.NewDollars,
              changeInDollars: dolImp.ChangeInDollars,
              percentageChangeInDollars: dolImp.PercentageChangeInDollars,
            };
            break;
          } else {
            delete productImpacts[i].newDollars;
            delete productImpacts[i].changeInDollars;
            delete productImpacts[i].percentageChangeInDollars;
          }
        }
      } else {
        delete productImpacts[i].newVolume;
        delete productImpacts[i].changeInVolume;
        delete productImpacts[i].percentageChangeInVolume;
        delete productImpacts[i].newDollars;
        delete productImpacts[i].changeInDollars;
        delete productImpacts[i].percentageChangeInDollars;
      }
    });
    let competitorImpacts = [...competitors];
    competitors.map((ele, i) => {
      if (volumeImpact.length > 0) {
        for (let volImp of volumeImpact) {
          if (ele.Product === volImp.Product) {
            competitorImpacts[i] = {
              ...competitorImpacts[i],
              newVolume: volImp.NewUnits,
              changeInVolume: volImp.ChangeInUnits,
              percentageChangeInVolume: volImp.PercentageChangeInUnits,
            };
            break;
          } else {
            delete competitorImpacts[i].newVolume;
            delete competitorImpacts[i].changeInVolume;
            delete competitorImpacts[i].percentageChangeInVolume;
          }
        }
        for (let dolImp of dollarImpact) {
          if (ele.Product === dolImp.Product) {
            competitorImpacts[i] = {
              ...competitorImpacts[i],
              newDollars: dolImp.NewDollars,
              changeInDollars: dolImp.ChangeInDollars,
              percentageChangeInDollars: dolImp.PercentageChangeInDollars,
            };
            break;
          } else {
            delete competitorImpacts[i].newDollars;
            delete competitorImpacts[i].changeInDollars;
            delete competitorImpacts[i].percentageChangeInDollars;
          }
        }
      } else {
        delete competitorImpacts[i].newVolume;
        delete competitorImpacts[i].changeInVolume;
        delete competitorImpacts[i].percentageChangeInVolume;
        delete competitorImpacts[i].newDollars;
        delete competitorImpacts[i].changeInDollars;
        delete competitorImpacts[i].percentageChangeInDollars;
      }
    });
    // console.log("Impacts:", newPriceChange, volumeImpact, dollarImpact, productImpacts, competitorImpacts);
    setCompetitors(competitorImpacts);
    setFilteredSelectedPriceProducts(productImpacts);
  }, [volumeImpact, dollarImpact]);
  /* -----end------ updating the state of the respective products with their impacts -----end------ */

  /* -----start------ Calls Impact handler function on price change -----start------ */
  useEffect(() => {
    // impactHandler();
    if (newPrices.length > 0 || competitorNewPrice.length > 0) {
      impactHandler();
    } else {
      setDollarImpact([]);
      setVolumeImpact([]);
    }
  }, [newPriceChange]);
  /* -----end------ Calls Impact handler function on price change -----end------ */

  /* -----start------ Summary of Price Simulator -----start------ */
  //Computes Summary of the price simulator
  const calculatePriceSimulatorProductSummary = (
    filteredSelectedPriceProducts,
    newPrices
  ) => {
    let totalNewWeeklyDollars = 0;
    let totalChangeWeeklyDollars = 0;
    let totalPercentageChangeWeeklyDollars = 0;
    for (let index = 0; index < filteredSelectedPriceProducts.length; index++) {
      totalNewWeeklyDollars +=
        !isNaN(filteredSelectedPriceProducts[index].newDollars) &&
        filteredSelectedPriceProducts[index].newDollars
          ? filteredSelectedPriceProducts[index].newDollars
          : 0;
      totalChangeWeeklyDollars +=
        !isNaN(filteredSelectedPriceProducts[index].changeInDollars) &&
        filteredSelectedPriceProducts[index].changeInDollars
          ? filteredSelectedPriceProducts[index].changeInDollars
          : 0;
    }
    totalPercentageChangeWeeklyDollars +=
      (totalChangeWeeklyDollars * 100) / totalNewWeeklyDollars;
    return {
      totalNewWeeklyDollars,
      totalChangeWeeklyDollars,
      totalPercentageChangeWeeklyDollars,
    };
  };
  // Brand summary calculation
  const {
    totalNewWeeklyDollars,
    totalChangeWeeklyDollars,
    totalPercentageChangeWeeklyDollars,
  } = calculatePriceSimulatorProductSummary(
    filteredSelectedPriceProducts,
    newPrices
  );
  //Competitor Summary calculation
  const competitorSummary = calculatePriceSimulatorProductSummary(
    competitors,
    competitorNewPrice
  );
  /* -----end------ Summary of Price Simulator -----end------ */

  /*======================= END ===================================== PRICE SIMULATOR ================================= END ========================*/
  /**************************************************************************************************************************************************/

  const handleMarginPriceInputChange = (event) => {
    const { name, value } = event.target;
    setMarginPriceValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  function filterCompetitorsHandler(products) {
    // console.log("\n\nproducts from filterCompetitorsHandler:::::::: ", products);

    const seenProducts = new Set();
    const uniqueCompetitors = [];

    for (const filteredProduct of products) {
      const competitors = JSON.parse(filteredProduct.Competitors);
      for (const competitor of competitors) {
        const competitorName = competitor.competitor;
        if (!seenProducts.has(competitorName)) {
          const competitorData = priceSimulationData?.find(
            (item) =>
              item.Product === competitorName &&
              item.Product !== filteredProduct.Product &&
              !products.some((p) => p.Product === competitorName)
          );
          if (competitorData && competitor.cross_effect > 0) {
            competitorData.cross_effect = competitor.cross_effect;
            competitorData.competitorNewChangeInVolumn = 0;
            uniqueCompetitors.push(competitorData);
            seenProducts.add(competitorName);
          }
        }
      }
    }

    const updatedCompetitors = uniqueCompetitors.map((product) => {
      const competitorTo = [];
      // Find products that are competitors to the current product
      products.forEach((otherProduct) => {
        if (otherProduct.Product !== product.Product) {
          const otherCompetitors = JSON.parse(otherProduct.Competitors);
          const isCompetitor = otherCompetitors.some(
            (competitor) =>
              competitor.competitor === product.Product &&
              competitor.cross_effect > 0
          );
          if (isCompetitor) {
            competitorTo.push({
              Product: otherProduct.Product,
              crossEffect: otherCompetitors.find(
                (competitor) => competitor.competitor === product.Product
              ).cross_effect,
            });
          }
        }
      });
      return {
        ...product,
        competitorTo,
      };
    });
    setCompetitors(updatedCompetitors);
  }

  useEffect(() => {
    const fetchRetailerBrandProductApiHandler = async () => {
      try {
        const api = `${process.env.REACT_APP_NGROK}/insights/retailer_brands_products?project_id=${project_id}&model_id=${model_id}`;
        const response = await axios.get(api);
        if (response.status === 200) {
          setRetailerBrandProducts(response?.data?.data);
        }
      } catch (error) {
        console.log("Error in fetching retailers", error);
      }
    };
    fetchRetailerBrandProductApiHandler();
  }, []);

  useEffect(() => {
    // Filter data based on selected retailers
    const filteredData = priceSimulationData?.filter((item) =>
      selectedProducts.includes(item.Product)
    );
    setFilteredSelectedPriceProducts(filteredData);
    filterCompetitorsHandler(filteredData);
    setNewPrices([]);
    setCompetitorNewPrice([]);
    setShowCompetitorResults(true);
    setShowProductResults(true);
  }, [selectedProducts]);

  // Margin simulater useEffect
  useEffect(() => {
    const changeInPrice = [
      -25, -24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11,
      -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    ];
    const TotalVolume = marginSimulationData[0]?.total_units_sum;
    const BasePriceElasticity = marginPriceValues.basePriceElasticity;
    const listPrice = parseFloat(marginPriceValues.listPrice);
    const basePrice = parseFloat(marginPriceValues.basePrice);
    const cogs = parseFloat(marginPriceValues.cogs);

    // Formula
    const newUnits = changeInPrice.map(
      (change) =>
        TotalVolume +
        TotalVolume * ((1 + change / 100) ** BasePriceElasticity - 1)
    ); // Volume (pounds)
    const baseMrev = newUnits.map((unit) => unit * listPrice);
    const baseMtrade = changeInPrice.map(
      (change, index) =>
        newUnits[index] * (basePrice - basePrice * (1 + change / 100))
    );
    const baseMnetRev = baseMrev.map((rev, index) => rev - baseMtrade[index]);
    const mProfit = baseMnetRev.map(
      (netRev, index) => netRev - newUnits[index] * cogs
    ); // Manufacture profit
    // Annual Sales
    const annualSales = newUnits.map(
      (unit, index) => unit * basePrice * (1 + changeInPrice[index] / 100)
    );

    setMarginChartData({
      ...marginChartData,
      manufacturerProfit: mProfit,
      annualProfit: annualSales,
    });
  }, [marginPriceValues]);

  // Promo
  useEffect(() => {
    let discount =
      ((promoEventPriceValues?.basePrice - promoEventPriceValues?.promoPrice) *
        100) /
      promoEventPriceValues?.basePrice;

    let lift = {
      tprLift:
        promoEventPriceValues?.tprDist === 0 ||
        promoEventPriceValues?.tprDist === ""
          ? 0
          : ((1 + -discount / 100) **
              promoEventPriceValues?.promoPriceElasticity -
              1) *
            promoEventPriceValues?.tprDist,
      foLift:
        promoEventPriceValues?.foDist === 0 ||
        promoEventPriceValues?.foDist === ""
          ? 0
          : ((1 + -discount / 100) **
              (promoEventPriceValues?.promoPriceElasticity *
                Math.exp(
                  (promoSimulationData[0]?.Feature *
                    promoEventPriceValues?.foDist) /
                    100
                )) -
              1) *
              100 -
            ((1 + -discount / 100) **
              promoEventPriceValues?.promoPriceElasticity -
              1) *
              promoEventPriceValues?.tprDist,
      doLift:
        promoEventPriceValues?.doDist === 0 &&
        promoEventPriceValues?.doDist === ""
          ? 0
          : ((1 + -discount / 100) **
              (promoEventPriceValues?.promoPriceElasticity *
                Math.exp(
                  (promoSimulationData[0]?.Display *
                    promoEventPriceValues?.doDist) /
                    100
                )) -
              1) *
              100 -
            ((1 + -discount / 100) **
              promoEventPriceValues?.promoPriceElasticity -
              1) *
              promoEventPriceValues?.tprDist,
      fdLift:
        promoEventPriceValues?.fdDist === 0 ||
        promoEventPriceValues?.fdDist === ""
          ? 0
          : ((1 + -discount / 100) **
              (promoEventPriceValues?.promoPriceElasticity *
                Math.exp(
                  (promoSimulationData[0]?.Feature_And_Display *
                    promoEventPriceValues?.fdDist) /
                    100
                )) -
              1) *
              100 -
            ((1 + -discount / 100) **
              promoEventPriceValues?.promoPriceElasticity -
              1) *
              promoEventPriceValues?.tprDist,
    };
    let units = {
      tprUnits: (lift?.tprLift / 100) * promoEventPriceValues?.total_units_sum,
      foUnits: (lift?.foLift / 100) * promoEventPriceValues?.total_units_sum,
      doUnits: (lift?.doLift / 100) * promoEventPriceValues?.total_units_sum,
      fdUnits: (lift?.fdLift / 100) * promoEventPriceValues?.total_units_sum,
    };
    let dollars = {
      tprDollars: units?.tprUnits * promoEventPriceValues?.promoPrice,
      foDollars: units?.foUnits * promoEventPriceValues?.promoPrice,
      doDollars: units?.doUnits * promoEventPriceValues?.promoPrice,
      fdDollars: units?.fdUnits * promoEventPriceValues?.promoPrice,
    };
    setDollars(dollars);
    setUnits(units);
    setLift(lift);
    setDiscount(discount);

    setpromoEventChartData([
      {
        xAxisTitle: "Promotion",
        leftyAxisTitle: "Percent Lift",
        rightyAxisTitle: "",
        multiAxes: true,
        data: {
          labels: [
            "TPR",
            "Feature Only",
            "Display Only",
            "Feature and Display",
            "Event Incremental",
          ],
          datasets: [
            {
              label: "",
              data: lift
                ? [
                    0,
                    lift.tprLift.toFixed(2),
                    lift.tprLift.toFixed(2),
                    lift.tprLift.toFixed(2),
                    0,
                  ]
                : [],
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(75, 192, 192,0.5)",
              yAxisID: "left-y-axis",
            },
            {
              label: "TPR",
              data: lift ? [lift.tprLift.toFixed(2), "-", "-", "-", "-"] : [],
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(75, 192, 192,0.5)",
              yAxisID: "left-y-axis",
            },
            {
              label: "Feature Only",
              data: lift ? ["-", lift.foLift.toFixed(2), "-", "-", "-"] : [],
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(75, 192, 192,0.5)",
              yAxisID: "left-y-axis",
            },
            {
              label: "Display Only",
              data: lift ? ["-", "-", lift.doLift.toFixed(2), "-", "-"] : [],
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(75, 192, 192,0.5)",
              yAxisID: "left-y-axis",
            },
            {
              label: "Feature and Display",
              data: lift ? ["-", "-", "-", lift.fdLift.toFixed(2), "-"] : [],
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(75, 192, 192,0.5)",
              yAxisID: "left-y-axis",
            },
            {
              label: "Event Incremental",
              data: lift
                ? [
                    "-",
                    "-",
                    "-",
                    "-",
                    (
                      lift.tprLift +
                      lift.foLift +
                      lift.doLift +
                      lift.fdLift
                    ).toFixed(2),
                  ]
                : [],
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(75, 192, 192,0.5)",
              yAxisID: "left-y-axis",
            },
          ],
        },
      },
    ]);
  }, [promoEventPriceValues]);

  return (
    <div className="main-content-wrapper">
      <div className="design-studio-topbar">
        <div className="cotainer-fluid">
          <div className="row">
            <div className="col-lg-4">
              <div className="new-project-name">
                <a href="/dashboard">
                  <div className="nla-arrow-left-icon">
                    <span></span>
                  </div>
                </a>
                <div className="nla-name">
                  <span>Back to Home Page</span>
                  <p>{projectName}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="btn-wrapper">
                <div className="other-design-studio-buttons version_btn">
                  <select
                    className="form-select form-select-lg sim_drop"
                    aria-label=".form-select-lg example"
                    onChange={handleSimulatorChange}
                    defaultValue="price"
                    disabled={isPriceSimulationLoading}>
                    <option value="price">Price</option>
                    <option value="margin">Margin</option>
                    <option value="promo">Promo</option>
                  </select>
                </div>
                <div className="other-design-studio-buttons ml-3">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 250 }}
                    overlay={<Tooltip id="overlay-example">Save</Tooltip>}>
                    <a href="#!" className={`btn icon-btn btn-primary`}>
                      <i className="fa-solid fa-floppy-disk alertAligns"></i>
                    </a>
                  </OverlayTrigger>
                  {/* <div>
                    <a href="##" className="btn btn-primary">
                      Save
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11.769"
                        height="11.769"
                        viewBox="0 0 11.769 11.769"
                      >
                        <g id="Icon_feather-save" data-name="Icon feather-save" transform="translate(-4 -4)">
                          <path
                            id="Path_20096"
                            data-name="Path 20096"
                            d="M14.072,15.269H5.7a1.2,1.2,0,0,1-1.2-1.2V5.7A1.2,1.2,0,0,1,5.7,4.5h6.581l2.991,2.991v6.581A1.2,1.2,0,0,1,14.072,15.269Z"
                            transform="translate(0 0)"
                            fill="none"
                            stroke="#ffffff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                          />
                          <path
                            id="Path_20097"
                            data-name="Path 20097"
                            d="M16.483,24.286V19.5H10.5v4.786"
                            transform="translate(-3.607 -9.017)"
                            fill="none"
                            stroke="#ffffff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                          />
                          <path
                            id="Path_20098"
                            data-name="Path 20098"
                            d="M10.5,4.5V7.491h4.786"
                            transform="translate(-3.607 0)"
                            fill="none"
                            stroke="#ffffff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                          />
                        </g>
                      </svg>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="simluation_db-tab-wrapper">
          {simulatorType === "price" && (
            <PriceSimulator
              showProductResults={showProductResults}
              showCompetitorResults={showCompetitorResults}
              newPrice={newPrices}
              competitorNewPrice={competitorNewPrice}
              retailers={retailers}
              brands={brands}
              products={products}
              selectedRetailer={selectedRetailer}
              selectedBrand={selectedBrand}
              selectedProducts={selectedProducts}
              competitors={competitors}
              filteredSelectedPriceProducts={filteredSelectedPriceProducts}
              isPriceSimulationLoading={isPriceSimulationLoading}
              totalNewWeeklyDollars={totalNewWeeklyDollars}
              totalChangeWeeklyDollars={totalChangeWeeklyDollars}
              totalPercentageChangeWeeklyDollars={
                totalPercentageChangeWeeklyDollars
              }
              competitorSummary={competitorSummary}
              isAllProductSelected={isAllProductSelected}
              handleNewPriceOnChange={handleNewPriceOnChange}
              handleRetailerChange={handleRetailerChange}
              handleBrandChange={handleBrandChange}
              handleProductChange={handleProductChange}
              handleProductsChangeForPrice={handleProductsChangeForPrice}
            />
          )}
          {simulatorType === "margin" && (
            <MarginSimulator
              retailers={retailers}
              brands={brands}
              products={products}
              selectedRetailer={selectedRetailer}
              selectedBrand={selectedBrand}
              selectedProduct={selectedProduct}
              marginPriceValues={marginPriceValues}
              marginSimulationData={marginSimulationData}
              marginChartData={marginChartData}
              isPriceSimulationLoading={isPriceSimulationLoading}
              handleRetailerChange={handleRetailerChange}
              handleBrandChange={handleBrandChange}
              handleProductChange={handleProductChange}
              handleMarginPriceInputChange={handleMarginPriceInputChange}
            />
          )}
          {simulatorType === "promo" && (
            <PromoEventSimulator
              retailers={retailers}
              brands={brands}
              products={products}
              selectedRetailer={selectedRetailer}
              selectedBrand={selectedBrand}
              selectedProduct={selectedProduct}
              promoEventPriceValues={promoEventPriceValues}
              promoSimulationData={promoSimulationData}
              promoEventChartData={promoEventChartData}
              isPriceSimulationLoading={isPriceSimulationLoading}
              handleRetailerChange={handleRetailerChange}
              handleBrandChange={handleBrandChange}
              handleProductChange={handleProductChange}
              handlePromoEventPriceInputChange={
                handlePromoEventPriceInputChange
              }
              discount={discount}
              units={units}
              lift={lift}
              dollars={dollars}
            />
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/simulation-style.css";
import { useParams } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import PriceSimulator from "../../utils/simulation/PriceSimulator";
import MarginSimulator from "../../utils/simulation/MarginSimulator";
import PromoEventSimulator from "../../utils/simulation/promo/PromoEventSimulator";

const getStorageKey = (projectId, modelId) => {
    return `simulator_state_${projectId}_${modelId}`;
};

const getStoredState = (projectId, modelId) => {
    const key = getStorageKey(projectId, modelId);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
};

const saveState = (projectId, modelId, state) => {
    const key = getStorageKey(projectId, modelId);
    localStorage.setItem(key, JSON.stringify(state));
};

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
    const retailers = Object?.keys(retailerBrandProducts || {});
    let brands = selectedRetailer && retailerBrandProducts
        ? Object?.keys(retailerBrandProducts[selectedRetailer] || {})
        : [];
    let products = selectedBrand && selectedRetailer && retailerBrandProducts
        ? retailerBrandProducts[selectedRetailer][selectedBrand] || []
        : [];

    /* -----start----- Margin API handler -----start----- */
    const marginSimulationApiHandler = async (product) => {
        setIsPriceSimulationLoading(true);
        try {
            const api = `${process.env.REACT_APP_NGROK}/insights/simulation/price/product-data?project_id=${project_id}&model_id=${model_id}&Retailer=${selectedRetailer}&Product=${product}`;
            const response = await axios.get(api);
            if (response.status === 200) {
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
                return response.data;
            }
        } catch (error) {
            setIsPriceSimulationLoading(false);
            console.log("Error in fetching margin simulation data: ", error);
            return null;
        }
    };

    /* -----end----- Margin API handler -----end----- */

    /* -----start----- Common handlers -----start----- */
    const [isAllProductSelected, setIsAllProductSelected] = useState(false);

    // Local handlers
    const handleSimulatorChange = async (e) => {
        const newType = e.target.value;
        setSimulatorType(newType);

        // Load stored values for the selected simulator type
        const storedState = getStoredState(project_id, model_id);
        if (storedState && storedState[newType]) {
            const typeState = storedState[newType];

            // Set common fields
            if (typeState.retailer) {
                setSelectedRetailer(typeState.retailer);

                // Handle different simulator types
                if (newType === 'price') {
                    const priceResponse = await getPriceSimulationApiHandler(typeState.retailer);
                    if (priceResponse && typeState.brand) {
                        setSelectedBrand(typeState.brand);
                        if (typeState.products && typeState.products.length > 0) {
                            setSelectedProducts(typeState.products);
                            setNewPrices(typeState.newPrices || []);
                            setCompetitorNewPrice(typeState.competitorNewPrice || []);
                        }
                    }
                }
                else if (newType === 'margin') {
                    if (typeState.brand) {
                        setSelectedBrand(typeState.brand);

                        if (typeState.product) {
                            setSelectedProduct(typeState.product);
                            // Fetch margin simulation data
                            await marginSimulationApiHandler(typeState.product);

                            // Set margin price values after data is loaded
                            if (typeState.priceValues) {
                                setTimeout(() => {
                                    setMarginPriceValues(prev => ({
                                        ...prev,
                                        ...typeState.priceValues
                                    }));
                                }, 100);
                            }
                        }
                    }
                }
                else if (newType === 'promo') {
                    if (typeState.brand) {
                        setSelectedBrand(typeState.brand);

                        if (typeState.product) {
                            setSelectedProduct(typeState.product);
                            // Fetch promo simulation data
                            await promoEventHandler(typeState.product);

                            // Set promo event values after data is loaded
                            if (typeState.priceValues) {
                                setTimeout(() => {
                                    setPromoEventPriceValues(prev => ({
                                        ...prev,
                                        ...typeState.priceValues
                                    }));
                                }, 100);
                            }
                        }
                    }
                }
            }
        }
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

        // Clear related data
        if (simulatorType === "price") {
            setFilteredSelectedPriceProducts([]);
            setCompetitors([]);
            getPriceSimulationApiHandler(value);
        }

        // Save the updated state immediately
        const currentState = getStoredState(project_id, model_id);
        const newState = {
            ...currentState,
            [simulatorType]: {
                ...currentState[simulatorType],
                retailer: value,
                brand: "",
                product: "",
                products: []
            }
        };
        saveState(project_id, model_id, newState);
    };

    // Brand change handler
    const handleBrandChange = (value) => {
        setIsAllProductSelected(false);
        setSelectedBrand(value);
        setSelectedProduct("");
        setSelectedProducts([]);

        // Save the updated state immediately
        const currentState = getStoredState(project_id, model_id);
        const newState = {
            ...currentState,
            [simulatorType]: {
                ...currentState[simulatorType],
                brand: value,
                product: "",
                products: []
            }
        };
        saveState(project_id, model_id, newState);
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
                return response.data;
            }
        } catch (error) {
            setIsPriceSimulationLoading(false);
            console.log("Error in fetching simulation data: ", error);
            return null;
        }
    };
    /* -----start----- Api Handler -----start----- */

    /* -----start----- Price change Handler -----start----- */
    const [newPriceChange, setNewPriceChange] = useState([]);

    const handleNewPriceOnChange = (index, event, product, type) => {
        const newValue = event.target?.value || event.value || event; // Handle both event types
        let temp = [...newPriceChange];

        if (newPriceChange && newPriceChange.length > 0) {
            let found = false;
            for (let i = 0; i < newPriceChange.length; i++) {
                if (product?.Product === newPriceChange[i]?.Product) {
                    temp[i].newPrice = newValue;
                    found = true;
                    break;
                }
            }
            if (!found) {
                temp.push({
                    ...product,
                    type: type,
                    newPrice: newValue,
                });
            }
        } else {
            temp.push({
                ...product,
                type: type,
                newPrice: newValue,
            });
        }

        setNewPriceChange(temp);

        if (type === "product") {
            const updatedPrices = [...newPrices];
            updatedPrices[index] = newValue;
            setNewPrices(updatedPrices);
        }
        if (type === "competitor") {
            const updatedPrices = [...competitorNewPrice];
            updatedPrices[index] = newValue;
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
                if (ele.newPrice !== "" && ele.newPrice !== "0" && ele.Product) {
                    //Volume Impact
                    let Product = ele.Product;
                    let productOunces = 0;

                    // Safely extract product ounces with error handling
                    try {
                        const matches = Product.match(/[+-]?\d+(\.\d+)?/g);
                        if (matches && matches.length >= 2) {
                            productOunces = matches[matches.length - 2];
                        }
                    } catch (error) {
                        console.log("Error extracting product ounces:", error);
                        productOunces = 1; // Default value if extraction fails
                    }

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
                                ? NewUnits * productOunces
                                : 0,
                        ChangeInVolume:
                            ele.newPrice != 0
                                ? ChangeInUnits * productOunces
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

        // Rest of the impactHandler function...
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
        if (name === 'tprDist' || name === 'doDist' || name === 'foDist' || name === 'fdDist') {
            if (value > 100) {
                setPromoEventPriceValues((prevInputValues) => ({ ...prevInputValues, [name]: 100, }));
            } else {
                setPromoEventPriceValues((prevInputValues) => ({ ...prevInputValues, [name]: value, }));
            }
        } else {
            setPromoEventPriceValues((prevInputValues) => ({ ...prevInputValues, [name]: value, }));
        }
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
                setIsPriceSimulationLoading(true);
                const api = `${process.env.REACT_APP_NGROK}/insights/retailer_brands_products?project_id=${project_id}&model_id=${model_id}`;
                const response = await axios.get(api);
                if (response.status === 200) {
                    setRetailerBrandProducts(response?.data?.data);

                    // After getting the data, restore the stored state
                    const storedState = getStoredState(project_id, model_id);
                    if (storedState) {
                        // Set simulator type
                        setSimulatorType(storedState.currentType || 'price');

                        // Restore price simulator state
                        if (storedState.price) {
                            const priceState = storedState.price;
                            console.log({ priceState });

                            if (priceState.retailer) {
                                setSelectedRetailer(priceState.retailer);
                                // Trigger API call for price simulation
                                const priceResponse = await getPriceSimulationApiHandler(priceState.retailer);

                                // Only proceed with other settings if API call was successful
                                if (priceResponse) {
                                    if (priceState.brand) {
                                        setSelectedBrand(priceState.brand);
                                    }

                                    if (priceState.products && priceState.products.length > 0) {
                                        setSelectedProducts(priceState.products);

                                        // First get the filtered products data
                                        const filteredData = priceResponse.data?.filter((item) =>
                                            priceState.products.includes(item.Product)
                                        );
                                        setFilteredSelectedPriceProducts(filteredData);
                                        filterCompetitorsHandler(filteredData);

                                        // Then restore prices and trigger calculations
                                        if (priceState.newPrices && priceState.newPrices.length > 0) {
                                            setNewPrices(priceState.newPrices);

                                            // Create price change events with complete product data
                                            const priceChanges = filteredData.map((product, index) => ({
                                                ...product,
                                                type: "product",
                                                newPrice: priceState.newPrices[index]
                                            }));

                                            // If there are competitor prices, add them
                                            if (priceState.competitorNewPrice && priceState.competitorNewPrice.length > 0) {
                                                setCompetitorNewPrice(priceState.competitorNewPrice);

                                                // Get competitor data and add their price changes
                                                const competitorChanges = competitors.map((competitor, index) => ({
                                                    ...competitor,
                                                    type: "competitor",
                                                    newPrice: priceState.competitorNewPrice[index]
                                                }));

                                                // Combine product and competitor changes
                                                setNewPriceChange([...priceChanges, ...competitorChanges]);
                                            } else {
                                                setNewPriceChange(priceChanges);
                                            }

                                            // Show results sections
                                            setShowProductResults(true);
                                            setShowCompetitorResults(true);
                                        }
                                    }
                                }
                            }
                        }

                        // Store margin simulator values
                        if (storedState.margin) {
                            const marginState = storedState.margin;
                            if (marginState.retailer) {
                                setSelectedRetailer(marginState.retailer);
                            }

                            if (marginState.brand) {
                                setSelectedBrand(marginState.brand);
                            }

                            if (marginState.product) {
                                setSelectedProduct(marginState.product);
                                // Trigger API call for margin
                                await marginSimulationApiHandler(marginState.product);
                            }

                            if (marginState.priceValues) {
                                setMarginPriceValues(marginState.priceValues);
                            }
                        }

                        // Store promo simulator values  
                        if (storedState.promo) {
                            const promoState = storedState.promo;
                            if (promoState.retailer) {
                                setSelectedRetailer(promoState.retailer);
                            }

                            if (promoState.brand) {
                                setSelectedBrand(promoState.brand);
                            }

                            if (promoState.product) {
                                setSelectedProduct(promoState.product);
                                // Trigger API call for promo
                                await promoEventHandler(promoState.product);
                            }

                            if (promoState.priceValues) {
                                setPromoEventPriceValues(promoState.priceValues);
                            }
                        }
                    }
                    setIsPriceSimulationLoading(false);
                }
            } catch (error) {
                setIsPriceSimulationLoading(false);
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

        // Get stored state
        const storedState = getStoredState(project_id, model_id);
        const storedPrices = storedState?.price?.newPrices;
        const storedCompetitorPrices = storedState?.price?.competitorNewPrice;

        // Only reset prices if there's no stored state or if products selection changed
        if (!storedPrices || storedPrices.length !== selectedProducts.length) {
            setNewPrices([]);
        }
        if (!storedCompetitorPrices || storedCompetitorPrices.length !== competitors?.length) {
            setCompetitorNewPrice([]);
        }

        // If we have stored prices and filtered data, recreate the price changes
        if (storedPrices && storedPrices.length > 0 && filteredData) {
            const priceChanges = filteredData.map((product, index) => ({
                ...product,
                type: "product",
                newPrice: storedPrices[index]
            }));

            if (storedCompetitorPrices && storedCompetitorPrices.length > 0 && competitors) {
                const competitorChanges = competitors.map((competitor, index) => ({
                    ...competitor,
                    type: "competitor",
                    newPrice: storedCompetitorPrices[index]
                }));
                setNewPriceChange([...priceChanges, ...competitorChanges]);
            } else {
                setNewPriceChange(priceChanges);
            }
        }

        setShowCompetitorResults(true);
        setShowProductResults(true);
    }, [selectedProducts, priceSimulationData]);

    // Add useEffect to trigger impact calculation when newPriceChange is updated
    useEffect(() => {
        if (newPriceChange && newPriceChange.length > 0) {
            impactHandler();
        }
    }, [newPriceChange]);

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
        console.log({ "discount": discount, "basePrice": promoEventPriceValues?.basePrice, "promoPrice": promoEventPriceValues?.promoPrice })
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

    // Add effect to save state when values change
    useEffect(() => {
        if (!retailerBrandProducts) return; // Don't save if data isn't loaded

        const currentState = getStoredState(project_id, model_id) || {};
        const state = {
            currentType: simulatorType,
            price: {
                ...currentState.price,
                retailer: selectedRetailer || currentState.price?.retailer,
                brand: selectedBrand || currentState.price?.brand,
                products: selectedProducts?.length ? selectedProducts : currentState.price?.products,
                newPrices: newPrices?.length ? newPrices : currentState.price?.newPrices,
                competitorNewPrice: competitorNewPrice?.length ? competitorNewPrice : currentState.price?.competitorNewPrice
            },
            margin: {
                ...currentState.margin,
                retailer: selectedRetailer || currentState.margin?.retailer,
                brand: selectedBrand || currentState.margin?.brand,
                product: selectedProduct || currentState.margin?.product,
                priceValues: Object.keys(marginPriceValues).some(key => marginPriceValues[key])
                    ? marginPriceValues
                    : currentState.margin?.priceValues || marginPriceValues
            },
            promo: {
                ...currentState.promo,
                retailer: selectedRetailer || currentState.promo?.retailer,
                brand: selectedBrand || currentState.promo?.brand,
                product: selectedProduct || currentState.promo?.product,
                priceValues: Object.keys(promoEventPriceValues).some(key => promoEventPriceValues[key])
                    ? promoEventPriceValues
                    : currentState.promo?.priceValues || promoEventPriceValues
            }
        };

        saveState(project_id, model_id, state);
    }, [
        retailerBrandProducts,
        simulatorType,
        selectedRetailer,
        selectedBrand,
        selectedProducts,
        selectedProduct,
        newPrices,
        competitorNewPrice,
        marginPriceValues,
        promoEventPriceValues,
        project_id,
        model_id
    ]);

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
                            <div className="btn-wrapper flex gap-4">
                                <div>
                                    <a
                                        href={`/new-insights/${project_id}/${model_id}`}
                                        className="btn btn-outline-primary d-inline-flex items-center gap-3">
                                        Insights
                                        <i className="fa-solid fa-eye ms-0"></i>
                                    </a>
                                </div>
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
                                    {/* <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 250 }}
                                        overlay={<Tooltip id="overlay-example">Save</Tooltip>}>
                                        <a href="#!" className={`btn icon-btn btn-primary`}>
                                            <i className="fa-solid fa-floppy-disk alertAligns"></i>
                                        </a>
                                    </OverlayTrigger> */}
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
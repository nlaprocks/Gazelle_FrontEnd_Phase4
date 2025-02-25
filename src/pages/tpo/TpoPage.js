import React, { useState, useEffect } from "react";
import "../../css/style.css";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { ImportEvent } from "../../components/Calendar/ImportEvent/ImportEvent";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Calendar from "../../components/Calendar/Calendar";
import { Select, Form } from "antd";
import { Link } from "react-router-dom";
import { useEvents } from '../../hooks/useEvents'
import { TargetUpdate } from "../../components/Calendar/TargetUpdate";
import { eventService } from "../../services/eventService"

const getTpoStorageKey = (projectId, modelId, id) => {
    return `tpo_state_${projectId}_${modelId}_${id}`;
};

const getTpoStoredState = (projectId, modelId, id) => {
    const key = getTpoStorageKey(projectId, modelId, id);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
};

const saveTpoState = (projectId, modelId, id, state) => {
    const key = getTpoStorageKey(projectId, modelId, id);
    localStorage.setItem(key, JSON.stringify(state));
};

const TpoPage = () => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const user_id = authData?.user_id;
    const { project_name, project_id, model_id, id } = useParams();

    // Fetch TPO data
    const [tpoData, setTpoData] = useState(null);

    const [projects, setProjects] = useState([]);
    const [projectModels, setProjectModels] = useState([]);
    const [retailerBrandProducts, setRetailerBrandProducts] = useState([]);
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`/tpo-report/${project_name}/${project_id}/${model_id}/${id}`);
    };

    // Select project and model
    const [selectedProject, setSelectedProject] = useState(project_id);
    const [selectedModel, setSelectedModel] = useState(model_id);

    const [selectedRetailer, setSelectedRetailer] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [productData, setProductData] = useState([]);
    const retailers = Object?.keys(retailerBrandProducts);
    let brands = selectedRetailer
        ? Object?.keys(retailerBrandProducts[selectedRetailer])
        : [];
    let products = selectedBrand
        ? retailerBrandProducts[selectedRetailer][selectedBrand]
        : [];

    const [isEditingTargets, setIsEditingTargets] = useState(false);
    const [targetValues, setTargetValues] = useState({
        volume: 0,
        spend: 0,
        revenue: 0
    });
    const [tempTargets, setTempTargets] = useState({});

    // Add these state declarations after other useState declarations
    const [isLoading, setIsLoading] = useState(false);
    const [isAllProductSelected, setIsAllProductSelected] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ` + authData.token } };
                const api = `${process.env.REACT_APP_Base_URL}/api/v1/project/list_view/all_projects/${user_id}/date_created?page=1&limit=100`;
                let { data } = await axios.get(api, config);

                if (data) {
                    setProjects(data?.rows);
                }
            } catch (error) {
                console.log("Error", error);
            }
        }

        // fetch tpo data
        const fetchTpoData = async () => {
            const api = `${process.env.REACT_APP_Base_URL}/api/v1/events/tpo/${id}`;
            const config = { headers: { Authorization: `Bearer ` + authData.token, "accept": "application/json" } };
            const response = await axios.get(api, config);
            console.log("response", response.data);
            setTpoData(response?.data);
            setTargetValues({
                volume: response?.data?.volume || 0,
                spend: response?.data?.spend || 0,
                revenue: response?.data?.revenue || 0
            });
        }

        fetchProjects();
        fetchTpoData();
    }, []);

    // Get project models from selected project params Models
    useEffect(() => {
        const fetchProjectModels = async () => {
            const projectModels = projects.find(project => project.id === selectedProject)?.Models;
            setProjectModels(projectModels);
        }
        fetchProjectModels();
    }, [selectedProject]);

    useEffect(() => {
        const fetchRetailerBrandProductApiHandler = async () => {
            try {
                setIsLoading(true);
                const api = `${process.env.REACT_APP_NGROK}/insights/retailer_brands_products?project_id=${project_id}&model_id=${model_id}`;
                const response = await axios.get(api);
                if (response.status === 200) {
                    setRetailerBrandProducts(response?.data?.data);

                    // After getting the data, restore the stored state
                    const storedState = getTpoStoredState(project_id, model_id, id);
                    if (storedState) {
                        if (storedState.retailer) {
                            setSelectedRetailer(storedState.retailer);

                            if (storedState.brand) {
                                setSelectedBrand(storedState.brand);

                                if (storedState.products && storedState.products.length > 0) {
                                    setSelectedProducts(storedState.products);
                                }
                            }
                        }
                    }
                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
                console.log("Error in fetching retailers", error);
            }
        };
        fetchRetailerBrandProductApiHandler();
    }, [project_id, model_id, id]);

    const handleRetailerChange = (value) => {
        setSelectedRetailer(value);
        setSelectedBrand("");
        setSelectedProducts([]);

        // Save the updated state
        const currentState = getTpoStoredState(project_id, model_id, id) || {};
        const newState = {
            ...currentState,
            retailer: value,
            brand: "",
            products: []
        };
        saveTpoState(project_id, model_id, id, newState);
    };

    const handleBrandChange = (value) => {
        setSelectedBrand(value);
        setSelectedProducts([]);

        // Save the updated state
        const currentState = getTpoStoredState(project_id, model_id, id) || {};
        const newState = {
            ...currentState,
            brand: value,
            products: []
        };
        saveTpoState(project_id, model_id, id, newState);
    };

    const handleProductsChange = (values) => {
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

        setSelectedProducts(values);

        // Save the updated state
        const currentState = getTpoStoredState(project_id, model_id, id) || {};
        const newState = {
            ...currentState,
            products: values
        };
        saveTpoState(project_id, model_id, id, newState);
    };

    useEffect(() => {
        if (!retailerBrandProducts) return; // Don't save if data isn't loaded

        // get current state and maintain current state if available
        const currentState = getTpoStoredState(project_id, model_id, id) || {};

        const state = {
            retailer: currentState.retailer || selectedRetailer,
            brand: currentState.brand || selectedBrand,
            products: currentState.products || selectedProducts
        };

        saveTpoState(project_id, model_id, id, state);
    }, [
        retailerBrandProducts,
        selectedRetailer,
        selectedBrand,
        selectedProducts,
        project_id,
        model_id,
        id
    ]);

    useEffect(() => {
        fetchProductData(selectedProducts);
    }, [selectedProducts]);

    // const handleProductChange = (value) => {
    //     setSelectedProducts(value);
    //     fetchProductData(value);
    // };

    const fetchProductData = async (products) => {
        try {
            // loading 
            setIsLoading(true);
            await eventService.fetchProductData(products, selectedProject, selectedModel, selectedRetailer).then((productData) => {
                setProductData(productData);
            });
            setIsLoading(false);
        } catch (error) {
            console.log("Error in fetching promo event simulation data: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const { createImportedEvent } = useEvents()

    const [isImportModalOpen, setIsImportModalOpen] = useState(false)
    const [fetchImportedEvents, setFetchImportedEvents] = useState(false)

    const handleImportEvents = async (importedEvents) => {
        try {
            for (const event of importedEvents) {
                await createImportedEvent(event)
            }
            setFetchImportedEvents(true)
        } catch (error) {
            console.error('Failed to import events:', error)
            throw error
        }
    }

    useEffect(() => {
        if (tpoData) {
            setTargetValues({
                volume: tpoData.volume || 0,
                spend: tpoData.spend || 0,
                revenue: tpoData.revenue || 0
            });
        }
    }, [tpoData]);

    return (
        <>
            <Header />
            <div className="min-h-[calc(100vh-40px)] bg-[rgb(249,249,249)] pt-20 pb-8">
                <div className="mx-auto px-12" >
                    <div className="flex justify-between flex-wrap items-center h-full">
                        <div className="flex" >
                            <Link to="/tpo">
                                <div className="nla-arrow-left-icon">
                                    <span></span>
                                </div>
                            </Link>
                            <h4 className="text-2xl font-bold"> {project_name} </h4>
                            {/* <a href="/tpo" className="flex items-center gap-2" >
                                <div className="fa-solid fa-arrow-left" > </div>
                                <span> Back </span>
                            </a>
                            <h4 className="text-2xl font-bold"> {project_name} </h4> */}
                        </div>
                        <div>
                            <div className="tpo-page flex justify-end flex-wrap items-center gap-x-4 gap-y-2" >
                                {/* <button className="flex items-center space-x-2 bg-white text-black hover:shadow-sm rounded-lg py-2.5 px-3" >
                                    <p className="text-base font-medium" >01.01.2024 - 03.01.2024 </p>
                                </button> */}

                                <div className="flex items-center space-x-2 py-2.5 px-3 gap-2">
                                    <Form.Item>
                                        <Select
                                            value={selectedRetailer}
                                            onChange={handleRetailerChange}
                                            options={
                                                retailers.map(retailer => ({
                                                    value: retailer,
                                                    label: retailer,
                                                }))
                                            }
                                            className="w-full mb-0 shadow-sm rounded-sm"
                                            placeholder="Select retailer"
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Select
                                            value={selectedBrand}
                                            onChange={handleBrandChange}
                                            options={
                                                brands.map(brand => ({
                                                    value: brand,
                                                    label: brand,
                                                }))
                                            }
                                            className="w-full mb-0 shadow-sm rounded-sm"
                                            placeholder="Select brand"
                                            disabled={!selectedRetailer}
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Select
                                            mode="multiple"
                                            value={selectedProducts}
                                            onChange={handleProductsChange}
                                            style={{
                                                minWidth: "100%",
                                            }}
                                            className="w-full mb-0 shadow-sm rounded-sm filtered-accordion-ant-select"
                                            placeholder="Select products"
                                            disabled={!selectedBrand}
                                            maxTagCount="responsive"
                                        >
                                            <Select.Option
                                                key="select-all"
                                                value="select-all"
                                                className="text-primary">
                                                {!isAllProductSelected ? "Select all" : "Unselect all"}
                                            </Select.Option>
                                            {products.map((product, index) => (
                                                <Select.Option key={index} value={product}>
                                                    {product}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </div>

                                <button onClick={handleRedirect} className="flex items-center bg-[#009bcc] text-white hover:text-primary rounded-lg py-2 px-4" >
                                    <p className="text-base font-medium" > Trade Plan Report </p>
                                </button>

                                <button
                                    className="flex items-center bg-[rgb(73,162,128)] text-white hover:shadow-sm rounded-lg py-2.5 px-3"
                                    onClick={() => setIsImportModalOpen(true)}
                                >
                                    <p className="text-base font-medium" > Import </p>
                                </button>
                            </div>
                        </div>
                    </div>

                    {
                        selectedProject && selectedModel ? (
                            <>
                                <Calendar projects={projects} selectedRetailer={selectedRetailer} selectedBrand={selectedBrand} productData={productData} fetchImportedEvents={fetchImportedEvents} setFetchImportedEvents={setFetchImportedEvents} targetValues={targetValues} setIsEditingTargets={setIsEditingTargets} setTempTargets={setTempTargets} isLoading={isLoading} />
                            </>
                        ) : (
                            <>
                                {/* Show Information about select project and model */}
                                <div className="bg-white rounded-lg w-full shadow-md p-4 text-center" >
                                    <p className="text-gray-500 text-sm" > Select project and model to view TPO </p>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

            <ImportEvent
                show={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onImport={handleImportEvents}
                event_tpo_id={id}
                retailerBrandProducts={retailerBrandProducts}
            />

            <TargetUpdate
                isEditingTargets={isEditingTargets}
                tempTargets={tempTargets}
                setTempTargets={setTempTargets}
                targetValues={targetValues}
                setTargetValues={setTargetValues}
                setIsEditingTargets={setIsEditingTargets}
                event_tpo_id={id}
            />

            <Footer />
        </>

    );
};

export default TpoPage;

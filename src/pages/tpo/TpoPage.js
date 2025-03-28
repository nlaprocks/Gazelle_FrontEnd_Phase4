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
import { useRetailerBrandData } from '../../hooks/useRetailerBrandData';

const getTpoStorageKey = (projectId, modelId, eventTpoId) => {
    return `tpo_state_${projectId}_${modelId}_${eventTpoId}`;
};

const getTpoStoredState = (projectId, modelId, eventTpoId) => {
    const key = getTpoStorageKey(projectId, modelId, eventTpoId);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
};

const saveTpoState = (projectId, modelId, eventTpoId, state) => {
    const key = getTpoStorageKey(projectId, modelId, eventTpoId);
    localStorage.setItem(key, JSON.stringify(state));
};

const TpoPage = () => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const user_id = authData?.user_id;
    const { project_name, project_id, model_id, id: event_tpo_id } = useParams();

    // Fetch TPO data
    const [tpoData, setTpoData] = useState(null);
    const [projects, setProjects] = useState([]);
    const [projectModels, setProjectModels] = useState([]);
    const navigate = useNavigate();

    // Use the retailer brand data hook
    const { retailerBrandProducts, getProductsForBrand, isLoading: isLoadingProducts } = useRetailerBrandData(project_id, model_id);

    const handleRedirect = () => {
        navigate(`/tpo-report/${project_name}/${project_id}/${model_id}/${event_tpo_id}`);
    };

    // Select project and model
    const [selectedProject, setSelectedProject] = useState(project_id);
    const [selectedModel, setSelectedModel] = useState(model_id);
    const [productData, setProductData] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isAllProductSelected, setIsAllProductSelected] = useState(false);

    // Add these state declarations after other useState declarations
    const [isLoading, setIsLoading] = useState(false);

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
            try {
                const api = `${process.env.REACT_APP_Base_URL}/api/v1/events/tpo/${event_tpo_id}`;
                const config = { headers: { Authorization: `Bearer ` + authData.token, "accept": "application/json" } };
                const response = await axios.get(api, config);
                setTpoData(response?.data);
                setTargetValues({
                    volume: response?.data?.volume || 0,
                    spend: response?.data?.spend || 0,
                    revenue: response?.data?.revenue || 0
                });
            } catch (error) {
                console.log("Error fetching TPO data:", error);
            }
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

    // Set initial products when TPO data and retailerBrandProducts are loaded
    useEffect(() => {
        if (tpoData?.retailer_id && tpoData?.brand_id && retailerBrandProducts[tpoData.retailer_id]) {
            const products = getProductsForBrand(tpoData.retailer_id, tpoData.brand_id);
            setSelectedProducts(products);
            if (products.length > 0) {
                fetchProductData(products, tpoData.retailer_id);
            }
        }
    }, [tpoData, retailerBrandProducts]);

    const handleProductsChange = (values) => {
        if (values && values.length && values.includes("select-all")) {
            const availableProducts = getProductsForBrand(tpoData?.retailer_id, tpoData?.brand_id);
            if (values.length === availableProducts.length + 1) {
                setIsAllProductSelected(false);
                return setSelectedProducts([]);
            }
            setIsAllProductSelected(true);
            return setSelectedProducts(availableProducts);
        }

        const availableProducts = getProductsForBrand(tpoData?.retailer_id, tpoData?.brand_id);
        if (values.length === availableProducts.length) {
            setIsAllProductSelected(true);
        }

        setSelectedProducts(values);

        // Save the updated state
        const currentState = getTpoStoredState(project_id, model_id, event_tpo_id) || {};
        const newState = {
            ...currentState,
            products: values
        };
        saveTpoState(project_id, model_id, event_tpo_id, newState);
    };

    useEffect(() => {
        if (tpoData?.retailer_id && selectedProducts.length > 0) {
            fetchProductData(selectedProducts, tpoData.retailer_id);
        }
    }, [selectedProducts]);

    const fetchProductData = async (products, retailerId) => {
        try {
            setIsLoading(true);
            await eventService.fetchProductData(products, selectedProject, selectedModel, retailerId).then((productData) => {
                setProductData(productData);
            });
            setIsLoading(false);
        } catch (error) {
            console.log("Error in fetching promo event simulation data: ", error);
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

    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false)
    const [isEditingTargets, setIsEditingTargets] = useState(false);
    const [targetValues, setTargetValues] = useState({
        volume: 0,
        spend: 0,
        revenue: 0
    });
    const [tempTargets, setTempTargets] = useState({});

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
                        </div>
                        <div>
                            <div className="tpo-page flex justify-end flex-wrap items-center gap-x-4 gap-y-2" >
                                <div className="flex items-center space-x-2 py-2.5 px-3 gap-2">
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
                                            maxTagCount="responsive"
                                            loading={isLoadingProducts}
                                        >
                                            <Select.Option
                                                key="select-all"
                                                value="select-all"
                                                className="text-primary">
                                                {!isAllProductSelected ? "Select all" : "Unselect all"}
                                            </Select.Option>
                                            {getProductsForBrand(tpoData?.retailer_id, tpoData?.brand_id).map((product, index) => (
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
                                <button
                                    className="flex items-center bg-[rgb(73,162,128)] text-white hover:shadow-sm rounded-lg py-2.5 px-3"
                                    onClick={() => setIsCreateEventModalOpen(true)}
                                >
                                    <p className="text-base font-medium" > Create Event </p>
                                </button>
                            </div>
                        </div>
                    </div>

                    {
                        selectedProject && selectedModel ? (
                            <>
                                <Calendar
                                    projects={projects}
                                    selectedRetailer={tpoData?.retailer_id}
                                    selectedBrand={tpoData?.brand_id}
                                    productData={productData}
                                    fetchImportedEvents={fetchImportedEvents}
                                    setFetchImportedEvents={setFetchImportedEvents}
                                    targetValues={targetValues}
                                    setIsEditingTargets={setIsEditingTargets}
                                    setTempTargets={setTempTargets}
                                    isLoading={isLoading || isLoadingProducts}
                                    isCreateEventModalOpen={isCreateEventModalOpen}
                                    setIsCreateEventModalOpen={setIsCreateEventModalOpen}
                                />
                            </>
                        ) : (
                            <>
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
                event_tpo_id={event_tpo_id}
                retailerBrandProducts={retailerBrandProducts}
            />

            <TargetUpdate
                isEditingTargets={isEditingTargets}
                tempTargets={tempTargets}
                setTempTargets={setTempTargets}
                targetValues={targetValues}
                setTargetValues={setTargetValues}
                setIsEditingTargets={setIsEditingTargets}
                event_tpo_id={event_tpo_id}
            />

            <Footer />
        </>
    );
};

export default TpoPage;

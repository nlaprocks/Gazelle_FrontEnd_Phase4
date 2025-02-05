import React, { useState, useEffect } from "react";
import "../../css/style.css";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { ImportEvent } from "../../components/Calendar/ImportEvent/ImportEvent";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Calendar from "../../components/Calendar/Calendar";
import { Select, Form, Modal, Input, message } from "antd";
import { useEvents } from '../../hooks/useEvents'
import { Event } from '../../types/event'
import { Pencil } from 'lucide-react';
import { eventService } from "../../services/eventService"
// interface TpoData {
//     project_id: number;
//     model_id: number;
//     user_id: number;
//     id: number;
//     name: string;

//     volume: number;
//     spend: number;
//     revenue: number;
// }

const TpoPage = ({
    formData = {},
    setFormData = () => { },
}) => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const user_id = authData?.user_id;
    const { projectName, project_id, model_id, id } = useParams();

    // Fetch TPO data
    const [tpoData, setTpoData] = useState(null);

    const [projects, setProjects] = useState([]);
    const [projectModels, setProjectModels] = useState([]);
    const [retailerBrandProducts, setRetailerBrandProducts] = useState([]);
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/tpo-report");
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
                const api = `${process.env.REACT_APP_NGROK}/insights/retailer_brands_products?project_id=${selectedProject}&model_id=${selectedModel}`;
                const response = await axios.get(api);
                if (response.status === 200) {
                    setRetailerBrandProducts(response?.data?.data);
                }
            } catch (error) {
                console.log("Error in fetching retailers", error);
            }
        };
        if (selectedProject && selectedModel) {
            fetchRetailerBrandProductApiHandler();
        } else {
            setRetailerBrandProducts([]);
        }
    }, []);

    const handleProductChange = (value) => {
        setFormData({ ...formData, products: value })
        fetchProductData(value);
    }

    const fetchProductData = async (products) => {
        try {
            await eventService.fetchProductData(products, selectedProject, selectedModel, selectedRetailer).then((productData) => {
                console.log({ productData });
                setProductData(productData);
            });

            // for (const product of products) {
            //     const api = `${process.env.REACT_APP_NGROK}/insights/simulation/price/product-data?project_id=${selectedProject}&model_id=${selectedModel}&Retailer=${selectedRetailer}&Product=${product}`;

            //     const response = await axios.get(api);
            //     if (response.status === 200) {
            //         // setTimeout(() => {
            //         let SingleproductData = response?.data?.data[0];
            //         const basePrice = !isNaN(
            //             response?.data?.data[0]?.Price_avg_last_4_weeks
            //         )
            //             ? response?.data?.data[0]?.Price_avg_last_4_weeks
            //             : 0;

            //         SingleproductData = {
            //             id: SingleproductData._id,
            //             name: SingleproductData.Product,
            //             brand_id: SingleproductData.Brand,
            //             retailer_id: SingleproductData.Retailer,
            //             totalUnits: SingleproductData.total_units_sum / 52,
            //             promoPriceElasticity:
            //                 SingleproductData?.Promo_Price_Elasticity,
            //             basePrice: basePrice,
            //             // total_units_sum: SingleproductData?.total_units_sum / 52,
            //         };

            //         productDataArray.push(SingleproductData);
            //         // }, 500);

            //     }
            // }

        } catch (error) {
            console.log("Error in fetching promo event simulation data: ", error);
        }
    };

    const { createImportedEvent } = useEvents()

    const [isImportModalOpen, setIsImportModalOpen] = useState(false)
    const [fetchImportedEvents, setFetchImportedEvents] = useState(false)

    const handleImportEvents = async (importedEvents: Event[]) => {
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

    const handleUpdateTargets = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${authData.token}` } };
            const api = `${process.env.REACT_APP_Base_URL}/api/v1/events/tpo/${id}/target`;

            await axios.put(api, tempTargets, config);

            setTargetValues(tempTargets);
            setIsEditingTargets(false);
            message.success('Target values updated successfully');
        } catch (error) {
            console.error('Failed to update targets:', error);
            message.error('Failed to update target values');
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-[calc(100vh-40px)] bg-[rgb(249,249,249)] pt-20 pb-8">
                <div className="mx-auto px-12" >
                    <div className="flex justify-between flex-wrap items-center h-full">
                        <div className="flex flex-col " >
                            <a href="/tpo" className="flex items-center gap-2" >
                                <div className="fa-solid fa-arrow-left" > </div>
                                <span> Back </span>
                            </a>
                            <h4 className="text-2xl font-bold"> {projectName} </h4>
                        </div>
                        <div>
                            <div className="tpo-page flex justify-end flex-wrap items-center gap-x-4 gap-y-2" >
                                {/* <button className="flex items-center space-x-2 bg-white text-black hover:shadow-sm rounded-lg py-2.5 px-3" >
                                    <p className="text-base font-medium" >01.01.2024 - 03.01.2024 </p>
                                </button> */}

                                <div className="flex items-center space-x-2 py-2.5 px-3 gap-2">
                                    <Form.Item>
                                        <Select
                                            value={formData.retailer_id}
                                            onChange={value => {
                                                setFormData({
                                                    ...formData,
                                                    retailer_id: value,
                                                    brand_id: '',
                                                    products: [],
                                                })
                                                setSelectedRetailer(value)
                                            }}
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
                                            value={formData.brand_id}
                                            onChange={value => {
                                                setFormData({
                                                    ...formData,
                                                    brand_id: value,
                                                    products: [],
                                                })
                                                setSelectedBrand(value)
                                            }}
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
                                            value={formData.products}
                                            onChange={values => {
                                                handleProductChange(values)
                                            }}
                                            style={{
                                                minWidth: "100%",
                                            }}
                                            options={
                                                products.map(product => ({
                                                    value: product,
                                                    label: product,
                                                }))
                                            }
                                            className="w-full mb-0 shadow-sm rounded-sm filtered-accordion-ant-select"
                                            placeholder="Select products"
                                            disabled={!selectedBrand}
                                            maxTagCount="responsive"
                                        />
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
                                <div className="grid grid-cols-[1fr_300px] gap-4 items-start py-8" >
                                    <div className="w-full grid grid-cols-4 justify-between items-stretch gap-4 flex-1" >
                                        {/* Show below box in left side container */}
                                        < div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                                            <p className="text-gray-500 text-sm" > Total Volume </p>
                                            < p className="text-black text-2xl font-bold" > 60 </p>
                                        </div>
                                        < div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                                            <p className="text-gray-500 text-sm" > Total Revenue </p>
                                            < p className="text-black text-2xl font-bold" > $340, 567 </p>
                                        </div>
                                        < div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                                            <p className="text-gray-500 text-sm" > Total Contribution </p>
                                            < p className="text-black text-2xl font-bold" > 60 </p>
                                        </div>
                                        <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                                            <p className="text-gray-500 text-sm" > Total Spend </p>
                                            < p className="text-black text-2xl font-bold" > $340, 567 </p>
                                        </div>
                                        <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                                            <p className="text-gray-500 text-sm" > Incremental volume </p>
                                            < p className="text-black text-2xl font-bold" > 34.5 % </p>
                                        </div>
                                        <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                                            <p className="text-gray-500 text-sm" > Incremental Revenue </p>
                                            < p className="text-black text-2xl font-bold" > $1, 423, 941 </p>
                                        </div>
                                        <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                                            <p className="text-gray-500 text-sm" > Plan ROI </p>
                                            < p className="text-black text-2xl font-bold" > 34.5 % </p>
                                        </div>
                                        <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow" >
                                            <p className="text-gray-500 text-sm" > Budget Remaining </p>
                                            < p className="text-black text-2xl font-bold" > $1, 423, 941 </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 border-l pl-6 relative" >
                                        <button
                                            onClick={
                                                () => {
                                                    setTempTargets(targetValues);
                                                    setIsEditingTargets(true);
                                                }
                                            }
                                            className="absolute right-2 top-2 p-2 hover:bg-gray-100 rounded-full"
                                        >
                                            <Pencil size={16} className="text-gray-500" />
                                        </button>

                                        <div className="bg-white rounded-lg py-1.5 px-3 w-full shadow flex items-center gap-2 border-b-4 border-green-600" >
                                            <p className="text-gray-500 text-sm min-w-24" > Target Volume: </p>
                                            < p className="text-black text-lg m-0 font-bold" >
                                                ${targetValues.volume.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="bg-white rounded-lg py-1.5 px-3 w-full shadow flex items-center gap-2 border-b-4 border-green-600" >
                                            <p className="text-gray-500 text-sm min-w-24" > Target Spend: </p>
                                            <p className="text-black text-lg m-0 font-bold" >
                                                ${targetValues.spend.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="bg-white rounded-lg py-1.5 px-3 w-full shadow flex items-center gap-2 border-b-4 border-green-600" >
                                            <p className="text-gray-500 text-sm min-w-24" > Target Revenue: </p>
                                            < p className="text-black text-lg m-0 font-bold" >
                                                ${targetValues.revenue.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg w-full shadow-md" >
                                    <Calendar projects={projects} selectedRetailer={selectedRetailer} selectedBrand={selectedBrand} productData={productData} fetchImportedEvents={fetchImportedEvents} setFetchImportedEvents={setFetchImportedEvents} />
                                </div>
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

            <Modal
                title="Edit Target Values"
                open={isEditingTargets}
                onOk={handleUpdateTargets}
                onCancel={() => setIsEditingTargets(false)}
                okText="Save"
                cancelText="Cancel"
            >
                <div className="space-y-4" >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" >
                            Target Volume
                        </label>
                        <Input
                            type="number"
                            value={tempTargets.volume}
                            onChange={(e) => setTempTargets({
                                ...tempTargets,
                                volume: parseInt(e.target.value) || 0
                            })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" >
                            Target Spend
                        </label>
                        <Input
                            type="number"
                            value={tempTargets.spend}
                            onChange={(e) => setTempTargets({
                                ...tempTargets,
                                spend: parseInt(e.target.value) || 0
                            })}
                            prefix="$"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" >
                            Target Revenue
                        </label>
                        <Input
                            type="number"
                            value={tempTargets.revenue}
                            onChange={(e) => setTempTargets({
                                ...tempTargets,
                                revenue: parseInt(e.target.value) || 0
                            })}
                            prefix="$"
                        />
                    </div>
                </div>
            </Modal>

            <Footer />
        </>
    );
};

export default TpoPage;

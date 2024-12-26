import React, { useState, useEffect } from "react";
import "../../css/style.css";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { ImportEvent } from "../../components/Calendar/ImportEvent/ImportEvent";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Calendar from "../../components/Calendar/Calendar";
import { Select, Form } from "antd";
import { useEvents } from '../../hooks/useEvents'
import { Event } from '../../types/event'

const TpoPage = ({
    formData = {},
    setFormData = () => { },
}) => {
    const { projectName, project_id, model_id } = useParams();
    const [retailerBrandProducts, setRetailerBrandProducts] = useState([]);
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/tpo-report");
    };

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

    const handleProductChange = (value) => {
        setFormData({ ...formData, products: value })
        fetchProductData(value);
    }

    const fetchProductData = async (products) => {
        let productDataArray = [];
        try {
            for (const product of products) {
                const api = `${process.env.REACT_APP_NGROK}/insights/simulation/price/product-data?project_id=${project_id}&model_id=${model_id}&Retailer=${selectedRetailer}&Product=${product}`;
                const response = await axios.get(api);
                if (response.status === 200) {
                    // setTimeout(() => {
                    let SingleproductData = response?.data?.data[0];
                    const basePrice = !isNaN(
                        response?.data?.data[0]?.Price_avg_last_4_weeks
                    )
                        ? response?.data?.data[0]?.Price_avg_last_4_weeks
                        : 0;

                    SingleproductData = {
                        id: SingleproductData._id,
                        name: SingleproductData.Product,
                        brandId: SingleproductData.Brand,
                        retailerId: SingleproductData.Retailer,
                        totalUnits: SingleproductData.total_units_sum / 52,
                        promoPriceElasticity:
                            SingleproductData?.Promo_Price_Elasticity,
                        basePrice: basePrice,
                        // total_units_sum: SingleproductData?.total_units_sum / 52,
                    };

                    productDataArray.push(SingleproductData);
                    // }, 500);

                }
            }
            setProductData(productDataArray);
        } catch (error) {
            console.log("Error in fetching promo event simulation data: ", error);
        }
    };

    const { createImportedEvent } = useEvents()

    const [isImportModalOpen, setIsImportModalOpen] = useState(false)

    const handleImportEvents = async (importedEvents: Event[]) => {
        try {
            for (const event of importedEvents) {
                await createImportedEvent(event)
            }
        } catch (error) {
            console.error('Failed to import events:', error)
            throw error
        }
    }

    return (
        <>
            <Header />
            <div className="min-h-[calc(100vh-40px)] bg-[rgb(249,249,249)] pt-20 pb-8">
                <div className="mx-auto px-12">
                    <div className="flex justify-between flex-wrap items-center h-full">
                        <div className="flex flex-col ">
                            <a href="/dashboard" className="flex items-center gap-2">
                                <div className="fa-solid fa-arrow-left"></div>
                                <span>Back to Home Page</span>
                            </a>
                            <h2 className="text-2xl">{projectName}</h2>
                        </div>
                        <div className="w-[calc(100%-140px)]">
                            <div className="tpo-page flex justify-end flex-wrap items-center gap-x-4 gap-y-2">
                                <button className="flex items-center space-x-2 bg-white text-black hover:shadow-sm rounded-lg py-2.5 px-3">
                                    <p className="text-base font-medium">01.01.2024 - 03.01.2024</p>
                                </button>

                                <div className="w-[30%] flex gap-2">
                                    <Form.Item>
                                        <Select
                                            value={formData.retailerId}
                                            onChange={value => {
                                                setFormData({
                                                    ...formData,
                                                    retailerId: value,
                                                    brandId: '',
                                                    products: [],
                                                })
                                                setSelectedRetailer(value)
                                            }}
                                            options={retailers.map(retailer => ({
                                                value: retailer,
                                                label: retailer,
                                            }))}
                                            className="w-full mb-0 shadow-sm rounded-sm"
                                            placeholder="Select retailer"
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Select
                                            value={formData.brandId}
                                            onChange={value => {
                                                setFormData({
                                                    ...formData,
                                                    brandId: value,
                                                    products: [],
                                                })
                                                setSelectedBrand(value)
                                            }}
                                            options={brands.map(brand => ({
                                                value: brand,
                                                label: brand,
                                            }))}
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
                                            options={products.map(product => ({
                                                value: product,
                                                label: product,
                                            }))}
                                            className="w-full mb-0 shadow-sm rounded-sm filtered-accordion-ant-select"
                                            placeholder="Select products"
                                            disabled={!selectedBrand}
                                            maxTagCount="responsive"
                                        />
                                    </Form.Item>
                                </div>

                                <button onClick={handleRedirect} className="flex items-center bg-[#009bcc] text-white hover:text-primary rounded-lg py-2 px-4">
                                    <p className="text-base font-medium">TPO Report</p>
                                </button>

                                <button className="flex items-center bg-[rgb(229,229,230)] text-black hover:shadow-sm rounded-lg py-2.5 px-3">
                                    <p className="text-base font-medium">Calculate ROI</p>
                                </button>
                                <button
                                    className="flex items-center bg-[rgb(73,162,128)] text-white hover:shadow-sm rounded-lg py-2.5 px-3"
                                    onClick={() => setIsImportModalOpen(true)}
                                >
                                    <p className="text-base font-medium">Import</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-[1fr_300px] gap-4 items-start py-8">
                        <div className="w-full grid grid-cols-4 justify-between items-stretch gap-4 flex-1">
                            {/* Show below box in left side container */}
                            <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow">
                                <p className="text-gray-500 text-sm">Total Volume</p>
                                <p className="text-black text-2xl font-bold">60</p>
                            </div>
                            <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow">
                                <p className="text-gray-500 text-sm">Total Revenue</p>
                                <p className="text-black text-2xl font-bold">$340,567</p>
                            </div>
                            <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow">
                                <p className="text-gray-500 text-sm">Total Contribution</p>
                                <p className="text-black text-2xl font-bold">60</p>
                            </div>
                            <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow">
                                <p className="text-gray-500 text-sm">Total Spend</p>
                                <p className="text-black text-2xl font-bold">$340,567</p>
                            </div>
                            <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow">
                                <p className="text-gray-500 text-sm">Incremental volume</p>
                                <p className="text-black text-2xl font-bold">34.5%</p>
                            </div>
                            <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow">
                                <p className="text-gray-500 text-sm">Incremental Revenue</p>
                                <p className="text-black text-2xl font-bold">$1,423,941</p>
                            </div>
                            <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow">
                                <p className="text-gray-500 text-sm">Plan ROI</p>
                                <p className="text-black text-2xl font-bold">34.5%</p>
                            </div>
                            <div className="bg-white rounded-lg py-2 px-4 w-full border-b-4 border-secondary shadow color-shadow">
                                <p className="text-gray-500 text-sm">Budget Remaining</p>
                                <p className="text-black text-2xl font-bold">$1,423,941</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 border-l pl-6">
                            <div className="bg-white rounded-lg py-1.5 px-3 w-full shadow flex items-center gap-2 border-b-4 border-green-600">
                                <p className="text-gray-500 text-sm min-w-24">Target Volume:</p>
                                <p className="text-black text-lg m-0 font-bold">$340,567</p>
                            </div>
                            <div className="bg-white rounded-lg py-1.5 px-3 w-full shadow flex items-center gap-2 border-b-4 border-green-600">
                                <p className="text-gray-500 text-sm min-w-24">Target Spend:</p>
                                <p className="text-black text-lg m-0 font-bold">$1,423,941</p>
                            </div>
                            <div className="bg-white rounded-lg py-1.5 px-3 w-full shadow flex items-center gap-2 border-b-4 border-green-600">
                                <p className="text-gray-500 text-sm min-w-24">Target Revenue:</p>
                                <p className="text-black text-lg m-0 font-bold">$1,423,941</p>
                            </div>
                        </div>
                    </div>

                    {/* Scheduler Wrapper */}
                    <div className="bg-white rounded-lg w-full shadow-md">
                        <Calendar retailers={retailers} brands={brands} selectedRetailer={selectedRetailer} selectedBrand={selectedBrand} productData={productData} />
                    </div>
                </div>
            </div>

            <ImportEvent
                show={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onImport={handleImportEvents}
            />

            <Footer />
        </>
    );
};

export default TpoPage;

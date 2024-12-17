import React, { useState } from "react";
import "../../css/style.css";
import { useNavigate } from "react-router-dom";
import PromoModal from "../../components/reactScheduler/promoModal";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Calendar from "../../components/Calendar/Calendar";
import { Select, Form } from "antd";

const TpoPage = ({
    formData = {},
    setFormData = () => { },
    channels = [],
    retailers = [],
    brands = [],
    products = [],
}) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRedirect = () => {
        navigate("/tpo-report");
    };

    const filteredBrands = (brands || []).filter(brand => brand.retailerId === formData.retailerId);
    const filteredProducts = (products || []).filter(product =>
        filteredBrands.some(brand => brand.id === product.brandId)
    );

    return (
        <>
            <Header />
            <div className="min-h-[calc(100vh-40px)] bg-[rgb(249,249,249)] pt-20 pb-8">
                <div className="mx-auto px-12">
                    <div className="flex justify-between flex-wrap items-center h-full">
                        <h2 className="text-2xl">Promotion</h2>
                        <div className="w-[calc(100%-140px)]">
                            <div className="tpo-page flex justify-end flex-wrap items-center gap-x-4 gap-y-2">
                                <button className="flex items-center space-x-2 bg-white text-black hover:shadow-sm rounded-lg py-2.5 px-3">
                                    <p className="text-base font-medium">01.01.2024 - 03.01.2024</p>
                                </button>

                                <Form.Item>
                                    <Select
                                        value={formData.retailerId}
                                        onChange={value =>
                                            setFormData({
                                                ...formData,
                                                retailerId: value,
                                                brandId: '',
                                                products: [],
                                            })
                                        }
                                        options={retailers.map(retailer => ({
                                            value: retailer.id,
                                            label: retailer.name,
                                        }))}
                                        className="w-full mb-0 shadow-sm rounded-sm"
                                        placeholder="Select retailer"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Select
                                        value={formData.brandId}
                                        onChange={value =>
                                            setFormData({
                                                ...formData,
                                                brandId: value,
                                                products: [],
                                            })
                                        }
                                        options={filteredBrands.map(brand => ({
                                            value: brand.id,
                                            label: brand.name,
                                        }))}
                                        className="w-full mb-0 shadow-sm rounded-sm"
                                        placeholder="Select brand"
                                        disabled={!formData.retailerId}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Select
                                        mode="multiple"
                                        value={formData.products}
                                        onChange={values =>
                                            setFormData({ ...formData, products: values })
                                        }
                                        options={filteredProducts.map(product => ({
                                            value: product.id,
                                            label: product.name,
                                        }))}
                                        className="w-full mb-0 shadow-sm rounded-sm"
                                        placeholder="Select products"
                                        disabled={!formData.brandId}
                                    />
                                </Form.Item>

                                <button onClick={handleRedirect} className="flex items-center bg-[#009bcc] text-white hover:text-primary rounded-lg py-2 px-4">
                                    <p className="text-base font-medium">TPO Report</p>
                                </button>
                                <button className="flex items-center bg-[rgb(229,229,230)] text-black hover:shadow-sm rounded-lg py-2.5 px-3">
                                    <p className="text-base font-medium">Calculate ROI</p>
                                </button>
                                <button
                                    className="flex items-center bg-[rgb(73,162,128)] text-white hover:shadow-sm rounded-lg py-2.5 px-3"
                                    onClick={handleShow}
                                >
                                    <p className="text-base font-medium">Import</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-5 justify-between items-stretch gap-4 my-4">
                        {/* Show below box in left side container */}
                        <div className="bg-white rounded-lg py-2 px-4 w-full color-shadow">
                            <p className="text-gray-500 text-sm">Total Volume</p>
                            <p className="text-black text-2xl font-bold">60</p>
                        </div>
                        <div className="bg-white rounded-lg py-2 px-4 w-full color-shadow">
                            <p className="text-gray-500 text-sm">Incremental volume</p>
                            <p className="text-black text-2xl font-bold">34.5%</p>
                        </div>
                        <div className="bg-white rounded-lg py-2 px-4 w-full color-shadow">
                            <p className="text-gray-500 text-sm">Total Revenue</p>
                            <p className="text-black text-2xl font-bold">$340,567</p>
                        </div>
                        <div className="bg-white rounded-lg py-2 px-4 w-full color-shadow">
                            <p className="text-gray-500 text-sm">Incremental Revenue</p>
                            <p className="text-black text-2xl font-bold">$1,423,941</p>
                        </div>
                        <div className="bg-white rounded-lg py-2 px-4 w-full color-shadow">
                            <p className="text-gray-500 text-sm">Total Contribution</p>
                            <p className="text-black text-2xl font-bold">60</p>
                        </div>
                        <div className="bg-white rounded-lg py-2 px-4 w-full color-shadow">
                            <p className="text-gray-500 text-sm">Plan ROI</p>
                            <p className="text-black text-2xl font-bold">34.5%</p>
                        </div>
                        <div className="bg-white rounded-lg py-2 px-4 w-full color-shadow">
                            <p className="text-gray-500 text-sm">Total Spend</p>
                            <p className="text-black text-2xl font-bold">$340,567</p>
                        </div>

                        {/* Create a target box in the right side */}
                        <div className="bg-white rounded-lg py-2 px-4 w-full color-shadow">
                            <p className="text-gray-500 text-sm">Budget Remaining</p>
                            <p className="text-black text-2xl font-bold">$1,423,941</p>
                        </div>
                        <div className="bg-white rounded-lg py-2 px-4 w-full color-shadow">
                            <p className="text-gray-500 text-sm">Target Volume</p>
                            <p className="text-black text-2xl font-bold">$340,567</p>
                        </div>
                        <div className="bg-white rounded-lg py-2 px-4 w-full color-shadow">
                            <p className="text-gray-500 text-sm">Target Spend</p>
                            <p className="text-black text-2xl font-bold">$1,423,941</p>
                        </div>
                    </div>
                    {/* Scheduler Wrapper */}
                    <div className="bg-white rounded-lg w-full shadow-md">
                        <Calendar />
                    </div>
                </div>
            </div>

            {show && (
                <PromoModal
                    show={show}
                    handleClose={handleClose}
                    setShow={setShow}
                />
            )}

            <Footer />
        </>
    );
};

export default TpoPage;

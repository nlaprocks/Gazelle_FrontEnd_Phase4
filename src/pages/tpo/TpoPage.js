import React, { useState } from "react";
import "../../css/style.css";
// import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeaderRows from "../../components/reactScheduler/headerRow";
import Sidebar from "../../components/reactScheduler/sidebar";
import PromoModal from "../../components/reactScheduler/promoModal";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Calendar from "../../components/Calendar/Calendar";

const TpoPage = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRedirect = () => {
        navigate("/tpo-report"); // specify the path you want to navigate to
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[rgb(249,249,249)] pt-20 pb-8 flex flex-col">
                <div className="mx-auto px-12 h-full flex-1 flex flex-col">
                    <div className="flex justify-between items-center h-full">
                        <h2>Promotion</h2>
                        <div className="w-2/3">
                            <div className="flex justify-end items-center gap-7">
                                <button className="flex items-center space-x-2 bg-white text-black hover:shadow-sm rounded-lg py-2.5 px-3">
                                    {/* <Calendar className="size-4" /> */}
                                    <p className="text-base font-medium">01.01.2024 - 03.01.2024</p>
                                </button>
                                <div className="flex justify-end items-center gap-2">
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
                                        <p className="text-base font-medium">Create Promo</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between items-stretch gap-4 my-10">
                        <div className="bg-white rounded-lg p-4 shadow-md w-1/4">
                            <p className="text-gray-500 text-sm">Promo count</p>
                            <p className="text-black text-3xl font-bold">60</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-md w-1/4">
                            <p className="text-gray-500 text-sm">% on Promo</p>
                            <p className="text-black text-3xl font-bold">34.5%</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-md w-1/4">
                            <p className="text-gray-500 text-sm">Planned spend</p>
                            <p className="text-black text-3xl font-bold">$340,567</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-md w-1/4">
                            <p className="text-gray-500 text-sm">Budget remaining</p>
                            <p className="text-black text-3xl font-bold">$1,423,941</p>
                        </div>
                    </div>
                    {/* Scheduler Wrapper */}
                    <div className="bg-white rounded-lg p-4 w-full shadow-md">
                        <div className="flex justify-center items-stretch w-full">
                            <div className="max-w-72 w-full">
                                <Sidebar />
                            </div>
                            <div className="w-full">
                                <Calendar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {show && (
                <PromoModal
                    show={show} handleClose={handleClose}
                    setShow={setShow}
                />
            )}

            <Footer />
        </>
    );
};

export default TpoPage;

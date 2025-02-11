import React, { useState, useEffect } from "react";
import TpoReportComponent from "../../layouts/TopReport/TpoReport";
import { useParams } from "react-router";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useEvents } from "../../hooks/useEvents";

const TpoReport = () => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const user_id = authData?.user_id;
    const { project_name, project_id, model_id, id } = useParams();
    const { events } = useEvents()

    useEffect(() => {
        if (events.length) {
            // Generate chart calculation and show with react-apexjschart
        }
    }, [events]);

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
                            <h4 className="text-2xl font-bold"> {project_name} </h4>
                        </div>
                        <div>
                            <div className="tpo-page flex justify-end flex-wrap items-center gap-x-4 gap-y-2" >
                                {/* Show accordian with chart */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default TpoReport;

import React, { useState } from "react";
import "../../css/style.css";
import "./tporeport.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import TopBar from "../../components/TopReportFilters/TopFilterReport";
import TapWrapper from "../../utils/newInsights/tabWrapper/TapWrapper";
import Accordion from 'react-bootstrap/Accordion';
import graphImg from '../../assets/images/graph.jpeg';
import graphImg2 from '../../assets/images/graph-2.jpg';

const TpoReportLayout = () => {

    const [showShareModal, setShowShareModal] = React.useState(false);
    const [sidebarState, setSidebarState] = useState(false);

    return (
        <div>
            <Header />
            <div className="nla_insight-tab-wrapper ">
                <div className="container-fluid">
                    <TopBar setShowShareModal={setShowShareModal} sidebarState={sidebarState} />
                    <div className="tab-content">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>This chart shows event level ROI for all events. This chart can be at the overall company level or brand level or retailer level.</Accordion.Header>
                                <Accordion.Body>
                                    <img src={graphImg} alt="image" />
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>This chart shows the ROI by account which is the same formula as event level ROI but across all events</Accordion.Header>
                                <Accordion.Body>
                                    <img src={graphImg2} alt="image" />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TpoReportLayout;

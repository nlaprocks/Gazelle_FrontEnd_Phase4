import React, { useState } from "react";
import video from "../assets/images/video_login_page.mp4";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../css/style.css";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    const [showHelpModal, setHelpModal] = useState(false);

    function HelpAndSupportModal(props) {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Help and Support</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 style={{ marginTop: 15 }}>
                        Please contact{" "}
                        <a href="#">
                            <strong>techsupport@northanalytics.com</strong>
                        </a>{" "}
                        for Help and Support, Thanks.
                    </h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <>
            {/* <!-- Header Start --> */}
            <header className="container-fluid login_header">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-6 col-4">
                        <div className="nla_logo">
                            <Link to="/login">
                                <img src={logo} alt="Northlight Analytics Logo" className="img-fluid" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-6 col-8">
                        <div className="theme-title">
                            <h1 className="mb-0">
                                NORTHLIGHT <span>GAZELLE</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </header>
            {/* <!-- Header End --> */}
            <div className="container-fluid" >
                <div className="row align-items-center login-wrapper">
                    <div className="col-lg-5 col-md-6 px-0">
                        <div className="nla_login-sidebar">
                            <div className="ratio ratio-1x1">
                                <video id="myVideo" poster="" width="300" height="150" autoPlay loop muted className="object-cover">
                                    <source src={video} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-6 px-0">
                        <Outlet context={{ setHelpModal }} />
                    </div>
                    <HelpAndSupportModal show={showHelpModal} onHide={() => setHelpModal(false)} />
                </div>
            </div>
        </>
    );
};

export default AuthLayout;

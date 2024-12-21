import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const ResetPassword = () => {
    const { setHelpModal } = useOutletContext();
    const navigate = useNavigate();

    return (
        <>
            <div className="nla_login_data_wrapper">
                <div className="login-form">
                    <h4 className="pb-3">
                        <strong>Please check your email</strong>
                    </h4>
                    <p>
                        We have sent you an email to reset your password. Please check your email and follow the instructions to reset your password.
                    </p>
                    <div className="row justify-content-center mt-4">
                        <div className="col-12 nla_top-spacing">
                            <a style={{ cursor: "pointer" }} className="nla_forgot_psw" onClick={() => navigate("/login")}>
                                Back to login
                            </a>
                        </div>
                    </div>
                </div>
                <div className="login_footer_wrapper">
                    <div className="login_footer">
                        <div className="row align-items-center">
                            <div className="col-lg-4 col-md-4">
                                <div className="nla_help_and_support">
                                    <a style={{ cursor: "pointer" }} onClick={() => setHelpModal(true)}>
                                        <i className="fa-solid fa-circle-question"></i> Help & Support
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-8 text-end">
                                <div className="nla_help_and_support">
                                    <p className="mb-0">
                                        &copy; 2024 NorthLight Analytic Partners Inc. | Confidential and Proprietary
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ResetPassword;

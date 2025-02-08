import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Api from "../../services/Api";

const ForgotPassword = () => {
    const { setHelpModal } = useOutletContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setErrorMsg] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const loginHandlerSub = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const apiData = {
                email,
            };

            let { data } = await Api("POST", "api/v1/auth/forgot-password", apiData, config);
            if (data.status) {
                navigate("/reset-link-sent");
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log("Error", error.response);
            setErrorMsg(error?.response?.data?.msg);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    };

    const loginHandler = (e) => {
        e.preventDefault();
        if (email === "") {
            setErrorMsg("Please fill all fields");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setErrorMsg("Invalid Email");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } else {
            loginHandlerSub();
        }
    };

    return (
        <>
            <div className="nla_login_data_wrapper">
                <div className="login-form">
                    <h4 className="pb-3">
                        <strong>Forgot Password</strong>
                    </h4>
                    <p>
                        Please enter your email below to receive a link to reset your password.
                    </p>

                    <div className="login-form-block">
                        <form noValidate>
                            <div className="row align-items-center">
                                <div className="col-lg-12 col-md-12">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email*"
                                        name="email"
                                        required
                                        // onChange={handleChange}
                                        onChange={(e) => setEmail(e.currentTarget.value)}
                                    />
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    {error !== "" && showAlert ? (
                                        <Stack sx={{ width: "100%", marginTop: "5px" }} spacing={2}>
                                            <Alert variant="outlined" severity="error">
                                                {error}
                                            </Alert>
                                        </Stack>
                                    ) : null}
                                </div>
                                <div className="col-6 nla_top-spacing">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={loginHandler}
                                    >
                                        {loading === true ? (
                                            <>
                                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                            </>
                                        ) : (
                                            "Send Reset Link"
                                        )}
                                    </button>
                                </div>

                                <div className="col-6 text-end nla_top-spacing">
                                    <a style={{ cursor: "pointer" }} className="nla_forgot_psw" onClick={() => navigate("/login")}>
                                        Back to login
                                    </a>
                                </div>
                            </div>
                        </form>
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

export default ForgotPassword;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import video from "../../assets/images/video_login_page.mp4";
import "../../css/style.css";
import Spinner from "react-bootstrap/Spinner";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Modal, Button } from "react-bootstrap";
import Api from "../../services/Api";

const Login = () => {

  const [modalShow, setModalShow] = useState(false);
  const [showHelpModal, setHelpModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        password,
      };

      let { data } = await Api("POST", "api/v1/auth/login", apiData, config);
      // console.log(data);
      if (data.code === 200) {
        localStorage.setItem("auth", JSON.stringify(data.data));
        if (data.data.role === "admin" || data.data.role === "manager") {
          navigate("/admin/user-management");
        } else {
          navigate("/dashboard");
        }
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
    if (email === "" || password === "") {
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

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Forgot Password?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{ marginTop: 15 }}>
            Please email{" "}
            <a href="#">
              <strong>techsupport@northanalytics.com</strong>
            </a>{" "}
            to reset the password.
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

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

  // ---------------------------------------------

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
      <div className="container-fluid">
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
            <div className="nla_login_data_wrapper">
              <div className="login-form">
                {/* <div className="nla_logo">
                  <Link to="/login">
                    <img src={logo} alt="Northlight Analytics Logo" className="img-fluid" />
                  </Link>
                </div> */}
                <h4 className="pb-3">
                  <strong>Dynamic Analytics Enabling Real-Time Business Impact.</strong>
                </h4>
                <p>
                  A path breaking analytics platform that harmonizes advanced analytics and business decision making.
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
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password*"
                          name="password"
                          // onChange={handleChange}
                          onChange={(e) => setPassword(e.currentTarget.value)}
                          required
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
                        {/* {showAlert && (
                          <>
                            <Alert variant="outlined" severity="info">
                              Please fill all fields
                            </Alert>
                          </>
                        )}
                        {showEmailAlert && (
                          <>
                            <Alert variant="outlined" severity="info">
                              Invalid email..!!
                            </Alert>
                          </>
                        )} */}
                      </div>
                      <div className="col-6 nla_top-spacing">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ width: "166.81px" }}
                          // onClick={(e) => loginHandler()}
                          onClick={loginHandler}
                        >
                          {loading === true ? (
                            <>
                              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            </>
                          ) : (
                            "Login"
                          )}
                        </button>
                      </div>

                      <div className="col-6 text-end nla_top-spacing">
                        <a style={{ cursor: "pointer" }} className="nla_forgot_psw" onClick={() => setModalShow(true)}>
                          Forgot Password?
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
          </div>
        </div>
        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
        <HelpAndSupportModal show={showHelpModal} onHide={() => setHelpModal(false)} />
      </div>
    </>
  );
};

export default Login;

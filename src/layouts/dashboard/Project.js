import React, { useState, useRef, useEffect } from 'react';
import "../../css/style.css";
import { Link } from "react-router-dom";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
// import { Tooltip, OverlayTrigger, Badge } from "react-bootstrap";
import modelSearchIntroImage from '../../assets/images/model-search-intro-image.png';
import KebabMenu from '../../components/KebabMenu/KebabMenu';
import moment from "moment";
import Moment from "react-moment";
import info from "../../assets/images/feather-info.svg";
import output from "../../assets/images/icon-output.svg";
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

export default function Project({
  elem,
  PinUnPinHandler,
  duplicateProjectHandler,
  handleEditProjectModal,
  deleteProjectHandler,
  fetchNodes,
  setShowUniversalAlert,
  setUniversalAlertMsg
}) {

  const todayDate = new Date();
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const downloadPdf = async (elem) => {
    try {
      const formData = new FormData();
      formData.append("project_id", elem?.id);
      formData.append("model_id", elem?.Models[0]?.id);
      const response = await axios.post(`${process.env.REACT_APP_NGROK}/insights/output-pdf`, formData);
      if (response.data) {
        setShowUniversalAlert(true);
        setUniversalAlertMsg("Opening PDF...");
        setTimeout(() => {
          setShowUniversalAlert(false);
          window.open(response?.data?.data?.file_link, "_blank");
        }, 3000);
      }
    } catch (error) {
      setShowUniversalAlert(true);
      setUniversalAlertMsg("PDF Report is not generated yet");
      setTimeout(() => {
        setShowUniversalAlert(false);
      }, 3000);
      console.error(error);
    }
  };

  // elem && console.log(elem)

  return (
    <>
      <div className="nla_item_box_col first-nla-itembox" data-position="right">
        <div className="nla_item_box shadow-md">

          <div className='d-flex card__header'>
            <div className="d-flex flex-grow-1">
              <div className="avatar">
                {elem.company_logo ? (
                  <img src={elem.company_logo} alt="Company Logo" className="img-fluid" />
                ) : (
                  <img src={modelSearchIntroImage} alt="Default" className="img-fluid" />
                )}
              </div>
              <div className='position-relative'>
                <h3 className='position-relative'>{elem.project_name}</h3>
                <div className="badgeNew">
                  {moment(todayDate).diff(moment(elem.date_created)) / 3600000 <= 1 ? (
                    <Badge bg="success">NEW</Badge>
                  ) : (
                    ""
                  )}
                </div>
                <small className="fst-normal badge-primary rounded">
                  Version: {elem.project_version}
                </small>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3" style={{ marginTop: '-10px' }}>
              {elem.pin_project === 1 ? (
                <div className="nla_pin-icon unpin" onClick={() => PinUnPinHandler(elem)}>
                  <i className="fa-solid fa-star" style={{ color: "rgba(250, 204, 21, 1)" }}></i>
                </div>
              ) : (
                <div className="nla_pin-icon" onClick={() => PinUnPinHandler(elem)}>
                  <i className="fa-regular fa-star" style={{ color: "rgba(0, 0, 0, 0.5)" }}></i>
                </div>
              )}
              <KebabMenu
                elem={elem}
                duplicateProjectHandler={duplicateProjectHandler}
                handleEditProjectModal={handleEditProjectModal}
                deleteProjectHandler={deleteProjectHandler}
              />
            </div>
          </div>

          {/* <div className="nla_shared_link_block">

          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 250 }}
            overlay={<Tooltip id={`tooltip-top`}>Duplicate</Tooltip>}
          >
            <a href="#!" onClick={() => duplicateProjectHandler(elem?.id)}>
              <i className="fa-regular fa-copy"></i>
            </a>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 250 }}
            overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}
          >
            <a href="#!" onClick={() => handleEditProjectModal(elem?.id)}>
              <i className="fa-solid fa-pen"></i>
            </a>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 250 }}
            overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}
          >
            <a href="#!" onClick={() => deleteProjectHandler(elem?.id)}>
              <i className="fa-solid fa-trash"></i>
            </a>
          </OverlayTrigger>
        </div> */}
          <div className="nla_additional_links">
            <a href="#!" onClick={() => fetchNodes(elem)}>
              <i className="fa-solid fa-pencil"></i>
              Design Studio
            </a>
            {elem.is_insight ? (
              <Link to={`/new-insights/${elem?.id}/${elem?.Models[0]?.id}`} className='insights'>
                <i className="fa-solid fa-eye"></i>
                Insights
              </Link>
            ) : (
              <button disabled className='insights'>
                <i className="fa-solid fa-eye"></i>
                Insights
              </button>
            )}
            {elem.is_insight && (
              <Link
                to={`/simulation/${encodeURIComponent(elem?.project_name)}/${elem?.id}/${elem?.Models[0]?.id}`}
                className='simulator'
              >
                <i className="fa-solid fa-sliders"></i>
                Simulator
              </Link>
            )}

            <a
              href="#!"
              className='output'
              data-bs-toggle="modal"
              data-bs-target="#outputModal"
              onClick={() => {
                downloadPdf(elem);
              }}
            >
              <i className="fa-solid"><img src={output} alt="" className="inline-block" /></i>
              Output
            </a>
          </div>
          <div className="card_footer">
            <p className="fst-normal">
              <span>Created at:</span> <Moment format="MM/DD/YYYY">{elem.date_created}</Moment><br />
              {" "} <Moment format="HH:mm">{elem.date_created}</Moment>
              {/* ,{" "} <Moment format="HH:mm:ss">{elem.date_created}</Moment> */}
            </p>
            <p className="fst-normal">
              <span>Updated at:</span> <Moment format="MM/DD/YYYY">{elem.updatedAt}</Moment><br />
              {" "} <Moment format="HH:mm">{elem.updatedAt}</Moment>
              {/* ,{" "} <Moment format="HH:mm:ss">{elem.updatedAt}</Moment> */}
            </p>
          </div>
        </div>
      </div>
      {/* <div className='alertPDF'>
      <Snackbar
        open={showUniversalAlert}
        autoHideDuration={3000}
        key={'openalert'}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      </div> */}
    </>
  );
}

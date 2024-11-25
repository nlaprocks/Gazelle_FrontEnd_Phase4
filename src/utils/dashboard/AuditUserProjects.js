import React, { useState, useCallback, useEffect } from "react";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import feather from "../../assets/images/feather-info.svg";
import Api from "../../services/Api";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AuditUserProjects({
  columnState,
  user_id,
  handleEditProjectModal,
  fetchNodes,
  // modelsList,
  duplicateProjectHandler,
  deleteProjectHandler,
}) {
  const [projects, setProjects] = useState([]);
  const authData = JSON.parse(localStorage.getItem("auth"));

  const getAssignedProjects = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ` + authData.token,
      },
    };

    try {
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/audit/all-projects/${user_id}`;
      var res = await axios.get(api, config);

      if (res) {
        setProjects(res.data.data);
      }
    } catch (error) {
      console.log("Assigned projects api error", error);
    }
  }, [setProjects]);

  useEffect(() => {
    getAssignedProjects();
  }, [getAssignedProjects]);

  return (
    <div>
      {projects?.length === 0 ? null : (
        <>
          <div className="nla_view_top_title_and_add_new_block">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <p className="mb-3">
                  Assigned Projects
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 250 }}
                    overlay={<Tooltip id="overlay-example">Assigned project to you for audit</Tooltip>}
                  >
                    <a href="#!">
                      <img src={feather} className="alertAligns" alt="" />
                    </a>
                  </OverlayTrigger>
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className={`nla_grid_view_wrapper ${columnState}`}>
        {projects?.map((elem, id) => (
          <div className="nla_item_box_col first-nla-itembox" data-position="right">
            <div className="nla_item_box">
              <div className="nla_pin-icon unpin">
                <i
                  className="fa-solid fa-thumbtack"
                  //   onClick={() => PinUnPinHandler(elem.project_id)}
                ></i>
              </div>
              <h3>{elem.project_name}</h3>
              <div className="nla_shared_link_block">
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 250 }}
                  overlay={<Tooltip id={`tooltip-top`}>Share</Tooltip>}
                >
                  <a href="#!">
                    <i className="fa-solid fa-share-nodes"></i>
                  </a>
                </OverlayTrigger>

                {/* <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 250 }}
                  overlay={<Tooltip id={`tooltip-top`}>Duplicate</Tooltip>}
                >
                  <a href="#!" onClick={() => duplicateProjectHandler(elem?.project_id)}>
                    <i className="fa-regular fa-copy"></i>
                  </a>
                </OverlayTrigger> */}

                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 250 }}
                  overlay={<Tooltip id={`tooltip-top`}>Download</Tooltip>}
                >
                  <a href="#!">
                    <i className="fa-solid fa-download"></i>
                  </a>
                </OverlayTrigger>

                {/* <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 250 }}
                  overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}
                >
                  <a href="#!" onClick={() => handleEditProjectModal(elem?.project_id)}>
                    <i className="fa-solid fa-pen"></i>
                  </a>
                </OverlayTrigger> */}

                {/* <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 250 }}
                  overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}
                >
                  <a
                    href="#!"
                    // onClick={() => deleteProjectHandler(elem?.project_id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </a>
                </OverlayTrigger> */}
              </div>
              <div className="nla_additional_links">
                <a onClick={() => fetchNodes(elem?.project_id)}>
                  Design Studio <i className="fa-solid fa-pencil"></i>
                </a>

                {elem.is_insight ? (
                  <Link to={`/insights/${elem?.project_id}`}>
                    Insights <i className="fa-solid fa-eye"></i>
                  </Link>
                ) : (
                  <button to="" style={{ cursor: "default" }} className="disabledCursor">
                    Insights <i className="fa-solid fa-eye"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

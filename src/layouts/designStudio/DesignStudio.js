import React, { useState, useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/style.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import SidebarToggle from "../../components/sidebarToggle/SidebarToggle";
import info from "../../assets/images/feather-info.svg";
import output from "../../assets/images/icon-output.svg";
import plus from "../../assets/images/feather-file-plus.svg";
import RightSideBarDesignStudio from "../../components/rightSideBarDesignStudio/RightSideBarDesignStudio";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import Flow from "../../components/flow/Flow";
import { Link, useParams, useNavigate } from "react-router-dom";
import Api from "../../services/Api";
import CreateProject from "../../utils/dashboard/CreateProject";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ProgressBar from "react-bootstrap/ProgressBar";
import allActions from "../../store/index";
import Spinner from "react-bootstrap/Spinner";
import progressModalImg from "../../assets/images/progress-status-modal-image.png";
import AdvanceLog from "../../utils/designStudio/Modals/AdvanceLog";
import MyVerticallyCenteredModal from "../../utils/designStudio/Modals/runModal";
import formReducer from "../../store/formData/formReducer";
import tableReducer from "../../store/tableData/tableReducer";
import axios from "axios";

const FETCHING_DATA_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  FETCHED: "fetched",
};

const DesignStudio = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let project_id = useParams().id;

  const { model_id } = useParams();

  const [nodesObserver, setNodesObserver] = React.useState([]);

  const [dataIsFetched, setDataIsFetched] = useState({
    status: FETCHING_DATA_STATUS.IDLE,
  });

  const [isModelCompeleted, setIsModelCompeleted] = useState(false);
  const [runningAnalysisChecker, setRunningAnalysisChecker] = useState(false);
  const getIsDataFetchedReducer = useSelector((state) => state.getIsDataFetchedReducer);
  const [databaseObserver, setDatabaseObserver] = React.useState(false);
  const formReducer = useSelector((state) => state.formReducer);
  const formData = useSelector((state) => state.formReducer.formData);
  const currentTable = useSelector((state) => state.tableReducer.currentTable)
  console.log(currentTable)

  //User
  const authData = JSON.parse(localStorage.getItem("auth"));
  const user_id = authData?.user_id;
  const [project, setProject] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Nodes
  const [activeNode, setActiveNode] = useState("");
  const [menu, setMenu] = useState("head1");
  const [paramState, setParamState] = useState({});

  // Run Modal
  const [modalShow, setModalShow] = React.useState(false);

  const handleFormSubmit = (data) => {
    // console.log("Form Data Submitted:", data);

  };

  useEffect(() => {
    if (typeof paramState === "string") {
      if (paramState.includes("Read")) {
        setParamState({ fileFormat: ".csv", name: "Read" });
      }
      if (paramState.includes("Write")) {
        setParamState({ fileFormat: ".csv", name: "Write" });
      }
    }

    // Add the class to the body tag
    document.body.classList.add("design-studio-page");
    return () => {
      document.body.classList.remove("design-studio-page");
    };
  }, [paramState]);


  // Run Modal
  const [show, setShow] = useState(false);
  const [log, setLog] = useState(false);

  // Model Version
  const modelVerionReducer = useSelector((state) => state.getModelVersionByProjectIdReducer);
  const saveModelidReducer = useSelector((state) => state.saveModelidReducer);

  const handleClose = () => {
    setShow(false);
    setRunningAnalysisChecker(true);
  };

  const handleShow = () => {
    setShow(true);
    setRunningAnalysisChecker(false);
  };

  const handleLogShow = () => {
    if (Number(model_id) !== 0 && model_id) {
      dispatch(allActions.getAllLogAction.getAllLog(model_id));
    }
    setLog(true);
  };

  //SnackBar Alert
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("center");
  const [saveModel, setModalSaved] = useState(false);

  const [alertMsg, setAlertMsg] = useState("");
  const [load, setLoad] = useState(false);
  const [showUniversalAlert, setShowUniversalAlert] = useState(false);
  const [saveModelVersion, setModalSavedVersion] = useState(false);

  // Is file uploaded for Model RUN
  const [projectName, setProjectName] = useState("Untitled name");
  const [nodeAttributes, setNodeAttributes] = useState([]);
  const [projectID, setProjectID] = useState();

  const [editIcon, setEditIcon] = useState(false);
  const [editProjectName, setEditProjectName] = useState(true);

  //Price Parameters
  const [pValue, setPValue] = useState();
  const [vifValue, setVifValue] = useState(5);
  const [sigValue, setSigValue] = useState(0.05);
  const [train, setTrain] = useState();
  const [test, setTest] = useState();
  const [validate, setValidate] = useState();


  // useCallBack
  const setProjectNameCallback = useCallback(
    (project_name) => {
      setProjectName(project_name);
    },
    [projectName]
  );

  const addProjectID = useCallback(
    (project_id) => {
      // console.log("project_id", project_id);
      setProjectID(project_id);
    },
    [projectID]
  );

  // UseCallback for Price Parameters
  const setPriceParameters = useCallback(
    (pValue, train, test, validate, vifValue, sigValue) => {
      setPValue(pValue);
      setTrain(train);
      setTest(test);
      setValidate(validate);
      setVifValue(vifValue);
      setSigValue(sigValue);
    },
    [pValue, train, test, validate, vifValue, sigValue]
  );

  // let reload;
  // Main UseEffect
  useEffect(() => {
    if (!project_id) {
      return;
    }
    async function fetchProject() {
      const { data } = await Api("GET", `api/v1/project/${project_id}`);
      setProject(data.data);
    }
    dispatch(allActions.getModelVersionByProjectIdAction.getModelVersionByProjectId(project_id));
    fetchProject();
    setEditIcon(false);
    setEditProjectName(false);
  }, []);

  useEffect(() => {
    setProject([]);
  }, [project_id]);

  //Edit project
  const editHandler = () => {
    setEditProjectName(true);
    setEditIcon(true);
  };

  const projectNameHandler = () => {
    setEditProjectName(false);
    setEditIcon(false);
  };

  const handleEditProjectModal = () => {
    setShowCreateModal(true);
    setShowCreateModal(true);
  };


  const [sideBar, setSideBar] = useState(false);

  const nodeSaveHandler = () => {
    AddNodeAttributesHandler();
    const modelData = JSON.parse(localStorage.getItem("react_flow_nodes"));
    localStorage.setItem("nodesData_from_database", JSON.stringify(modelData));
    const edges = modelData?.edges;
    const nodes = modelData?.nodes;
    const viewport = modelData?.viewport;
    const data = {
      user_id: user_id,
      project_id: project_id ? project_id : projectID,
      edges: edges,
      nodes: nodes,
      viewport: viewport,
    };
    if (project_id || projectID) {
      dispatch(allActions.addModelAction.nodeState(data));
      setModalSaved(true);
      setTimeout(() => {
        setModalSaved(false);
      }, 3000);
    }
  };

  const addModelReducer = useSelector((state) => state.addModelReducer);
  const addModelWithVersionReducer = useSelector((state) => state.addModelWithVersionReducer);

  const addModelWithVersionHandler = () => {
    const modelData = JSON.parse(localStorage.getItem("react_flow_nodes"));
    localStorage.setItem("nodesData_from_database", JSON.stringify(modelData));
    const edges = modelData?.edges;
    const nodes = modelData?.nodes;
    const viewport = modelData?.viewport;
    const data = {
      user_id: user_id,
      project_id: project_id ? project_id : projectID,
      edges: edges,
      nodes: nodes,
      viewport: viewport,
    };
    dispatch(allActions.addModelWithVersionAction.addModelWithVersion(data));
  };

  const nodeUpdateHandler = () => {

    const modelData = JSON.parse(localStorage.getItem("react_flow_nodes"));
    localStorage.setItem("nodesData_from_database", JSON.stringify(modelData));

    const edges = modelData?.edges;
    const nodes = modelData?.nodes;
    const viewport = modelData?.viewport;

    const data = {
      user_id: user_id,
      project_id: project_id ? project_id : projectID,
      edges: edges,
      nodes: nodes,
      viewport: viewport,
    };

    if (project_id || projectID) {
      dispatch(allActions.updateModelVersionAction.updateModelVersion(model_id, data));
      setModalSaved(true);
      setTimeout(() => {
        setModalSaved(false);
      }, 3000);
    }
  };

  const AddNodeAttributesHandler = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const apiData = {
      project_id,
      node_name: "price",
      node_attributes: {
        pValue: pValue,
        Train: train,
        Test: test,
        Validate: validate,
      },
    };
    try {
      await Api("POST", `api/add/model/node/attributes`, apiData, config);
    } catch (error) {
      console.log("Error", error.response);
    }
  };

  const [val, setVal] = useState(0);
  const [apiCompleted, setApiCompleted] = useState(false);
  const datastructureReducer = useSelector((state) => state.datastructureReducer);
  const runModelReducer = useSelector((state) => state.runModelReducer);

  // console.log(runModelReducer, "runmodelreducer")

  const runHandler = () => {
    if (modelVerionReducer?.modelVersion?.data?.length > 0) {
      setModalShow(false);
      nodeUpdateHandler();
    }
    if (Number(model_id) !== 0) {
      // console.log("hellos")
      dispatch(
        allActions.runModelAction.runModel({
          project_id: project_id,
          vif: vifValue,
          sig_value: sigValue,
          model_id: model_id,
          cumulativeShare: formData.cumulativeShare,
          minDollarSales: formData.minDollarSales,
          weeks: formData.weeks,
          tablename: currentTable
        })
      );
    }
  };

  const animateProgressBar = () => {
    const intervalId = setInterval(() => {
      setVal((prev) => {
        if (prev >= 100 || apiCompleted) {
          clearInterval(intervalId);
          return 100;
        } else if (prev >= 60) {
          clearInterval(intervalId);
          return 60;
        } else {
          return prev + 6;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  };

  const getEventIdReducer = useSelector((state) => state.getEventIdReducer);

  const downloadPdf = async () => {
    try {
      const formData = new FormData();
      // formData.append("event_id", getEventIdReducer?.eventId?.data?.event_id);
      formData.append("project_id", project_id);
      formData.append("model_id", model_id);
      const response = await axios.post(`${process.env.REACT_APP_NGROK}/insights/output-pdf`, formData);
      if (response.data) {
        setShowUniversalAlert(true);
        setAlertMsg("Opening PDF...");
        setTimeout(() => {
          setShowUniversalAlert(false);
          window.open(response?.data?.data?.file_link, "_blank");
        }, 3000);
      }
    } catch (error) {
      setShowUniversalAlert(true);
      setAlertMsg("PDF Report is not generated yet");
      setTimeout(() => {
        setShowUniversalAlert(false);
      }, 3000);
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (addModelWithVersionReducer?.success) {
      setModalSavedVersion(true);
      dispatch(allActions.getModelVersionByProjectIdAction.getModelVersionByProjectId(project_id));
      const timeoutId = setTimeout(() => {
        setModalSavedVersion(false);
      }, 4000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [addModelWithVersionReducer]);

  React.useEffect(() => {
    if (runModelReducer.success && model_id) {
      handleShow();
      dispatch(allActions.getIsModelFetchedAction.getIsModelFetched(model_id));
      if (Number(model_id) !== 0) {
        dispatch(allActions.addInsightsVersionAction.addInsightsVersion(model_id));
      } else {
        dispatch(allActions.addInsightsVersionAction.addInsightsVersion(addModelReducer?.user?.data?.model_id));
      }
      animateProgressBar();
      delete runModelReducer.success;
    }
  }, [runModelReducer]);

  const getIsModelFetchedReducer = useSelector((state) => state.getIsModelFetchedReducer);

  React.useEffect(() => {
    if (!model_id) {
      return;
    }
    dispatch(allActions.getEventIdAction.getEventId(model_id));
  }, []);

  React.useEffect(() => {
    let intervalId;
    if (getIsModelFetchedReducer.success) {
      intervalId = setInterval(() => {
        dispatch(allActions.getIsModelFetchedAction.getIsModelFetched(model_id));
        setIsModelCompeleted(true);
      }, 3000);
      if (getIsModelFetchedReducer?.model?.data?.is_model_completed === 1) {
        setIsModelCompeleted(false);
        dispatch(
          allActions.addLogAction.addLog(model_id, {
            status: "success",
            log_message: "Model run successfully",
          })
        );
        clearInterval(intervalId);
        setApiCompleted(true);
        setVal(100);
        setShow(true);
        dispatch(allActions.getEventIdAction.getEventId(model_id));

        setShowUniversalAlert(true);
        setAlertMsg("Model ran successfully");
        setTimeout(() => {
          setShowUniversalAlert(false);
        }, 5000);
        delete getIsModelFetchedReducer.success;
      }
    }
    if (getIsModelFetchedReducer.error) {
      dispatch(
        allActions.addLogAction.addLog(model_id, {
          status: "Failed",
          log_message: "Model Failed to run",
        })
      );
      delete getIsModelFetchedReducer.error;
    }
    return () => clearInterval(intervalId);
  }, [getIsModelFetchedReducer]);

  React.useEffect(() => {
    let intervalId;
    if (getIsDataFetchedReducer.success) {
      intervalId = setInterval(() => {
        dispatch(allActions.getIsDataFetchedAction.getIsDataFetched(model_id));
        // setDataIsFetched(false);
        setDataIsFetched({
          status: FETCHING_DATA_STATUS.LOADING,
        });
      }, 3000);
      if (getIsDataFetchedReducer?.data?.data?.is_data_fetched === 1) {
        // setDataIsFetched(true);
        setDataIsFetched({
          status: FETCHING_DATA_STATUS.FETCHED,
        });

        clearInterval(intervalId);
        delete getIsDataFetchedReducer.success;

        setShowUniversalAlert(true);
        setAlertMsg("Data fetched successfully");
        setTimeout(() => {
          setShowUniversalAlert(false);
        }, 3000);
      }
    }
    return () => clearInterval(intervalId);
  }, [getIsDataFetchedReducer]);

  React.useEffect(() => {
    if (addModelReducer.success) {
      if (Number(model_id) === 0) {
        dispatch(
          allActions.saveModelidAction.saveModelid({
            model_id: addModelReducer?.user?.data?.model_id,
            event_id: datastructureReducer?.structure?.data?.event_id,
          })
        );
      }
      delete addModelReducer.success;
    }
  }, [addModelReducer]);

  React.useEffect(() => {
    if (saveModelidReducer.success) {
      dispatch(
        allActions.runModelAction.runModel({
          project_id: project_id,
          vif: vifValue,
          sig_value: sigValue,
          model_id: addModelReducer?.user?.data?.model_id,
        })
      );
      delete saveModelidReducer.success;
    }
  }, [saveModelidReducer]);

  const viewInsightsNavigator = () => {
    if (Number(model_id) === 0) {
      navigate(`/new-insights/${project_id}/${addModelReducer?.user?.data?.model_id}`);
    } else {
      navigate(`/new-insights/${project_id}/${model_id}`);
    }
  };

  const viewSimulationNavigator = () => {
    navigate(`/simulation/${encodeURIComponent(project?.project_name)}/${project?.id}/${project?.Models[0]?.id}`);
  };

  const viewInsightsHandler = () => {
    navigate(`/new-insights/${project?.id}/${project?.Models[0]?.id}`);
  };

  //UseEffect for Fetching a Model
  useEffect(() => {
    if (!model_id && !project_id) {
      return;
    }
    const getNodeAttributesHandler = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const apiData = {
        project_id,
        node_name: "price",
      };
      try {
        const res = await Api("POST", `api/get/model-node-attribute`, apiData, config);
        if (res?.status === 200) {
          const json_node_attributes = JSON.parse(res?.data?.data[0]?.node_attributes);
          setNodeAttributes(json_node_attributes);
        }
      } catch (error) { }
    };
    if (Number(model_id) === 0) {
      getNodeAttributesHandler();
    } else {
      dispatch(allActions.getModelByModelIdAction.getModelByModelId(model_id));
    }
  }, [model_id, project_id]);

  const [sidebarState, setSidebarState] = useState(false);

  const sidebarHandler = () => {
    setSidebarState(!sidebarState);
  };

  function extractVersionNumber(versionString) {
    const [, version] = versionString.split(" ");
    // console.log(parseInt(version))
    return parseInt(version) || null;
  }


  return (
    <div>
      <Header />
      {/* <Sidebar sidebarState={sidebarState} />
      <SidebarToggle sidebarState={sidebarState} sidebarHandler={sidebarHandler} /> */}
      <div className={`main-content-wrapper ${sidebarState ? "sidebarCollapse" : ""}`} >
        <div className={`design-studio-topbar ${sidebarState ? "sidebarCollapse" : ""}`}>
          <div className="cotainer-fluid">
            <div className="row">
              <div className="col-lg-3">
                <div className="new-project-name">
                  <Link to="/dashboard">
                    <div className="nla-arrow-left-icon">
                      <span></span>
                    </div>
                  </Link>
                  {project?.project_name ? (
                    <>
                      {" "}
                      <div className="nla-name">
                        <span>Back to Home Page</span>
                        <p>{project?.project_name || "Enter Project Name"}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="nla-name">
                        <span>Back to Home Page</span>
                        <p>{projectName}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-lg-9">
                <div className="btn-wrapper">
                  {modelVerionReducer?.modelVersion?.data?.length > 0 ? (
                    <div className="nla-select-box-with-lbl headerDropDown">
                      <select
                        className="form-select"
                        value={model_id}
                        onChange={(e) => {
                          // console.log(e.target.value); // "Version 23"
                          // console.log(extractVersionNumber(e.target.value)); // 23

                          // navigate(`/design-studio/${project_id}/${extractVersionNumber(e.target.value)}`);
                          // window.location.reload();

                          navigate(`/design-studio/${project_id}/${e.target.value}`);
                          window.location.reload();
                        }}
                      >
                        <option value="">Select a Version</option>
                        {modelVerionReducer?.modelVersion?.data?.map((val, id) => {
                          return (
                            <>
                              {val?.model_version === 1 && model_id === 1 ? (
                                <option value={val?.id} key={id} disabled={true}>
                                  Version {val?.model_version}
                                </option>
                              ) : (
                                <option value={val?.id} key={id}>
                                  Version {val?.model_version}
                                </option>
                              )}
                            </>
                            // <>
                            //   {val?.model_version === 1 && model_id === 1 ? (
                            //     <option value={val?.model_id} key={id} disabled={true}>
                            //       Version {val?.model_version}
                            //     </option>
                            //   ) : (
                            //     <option value={val?.model_id} key={id}>
                            //       Version {val?.model_version}
                            //     </option>
                            //   )}
                            // </>
                          );
                        })}
                      </select>
                    </div>
                  ) : null}
                  {model_id ? (
                    <div className="nla-run-btn-and-info">
                      {/* <a
                        href="#!"
                        className={`btn ${dataIsFetched.status === FETCHING_DATA_STATUS.FETCHED && !isModelCompeleted
                          ? `btn-primary`
                          : `btn-outline-secondary`
                          }`}
                        onClick={() => {
                          if (
                            dataIsFetched.status === FETCHING_DATA_STATUS.FETCHED &&
                            databaseObserver &&
                            !isModelCompeleted
                          ) {
                            runHandler();
                          }
                        }}
                      >
                        {runModelReducer.loading ? <Spinner animation="grow" size="sm" /> : "Run"}
                        <i className="fa-solid fa-play"></i>
                      </a> */}
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 250 }}
                        overlay={
                          <Tooltip id="overlay-example">
                            Run
                          </Tooltip>
                        }
                      >
                        <a href="#!" className={`btn icon-btn ${dataIsFetched.status === FETCHING_DATA_STATUS.FETCHED && !isModelCompeleted
                          ? `btn-primary`
                          : `btn-outline-secondary`
                          }`}
                          // onClick={() => setModalShow(true)}
                          onClick={() => {
                            if (
                              dataIsFetched.status === FETCHING_DATA_STATUS.FETCHED &&
                              databaseObserver &&
                              !isModelCompeleted
                            ) {
                              runHandler();
                            }
                          }}
                        >
                          {/* <img src={info} alt="" className="alertAligns" /> */}
                          {runModelReducer.loading ? <Spinner animation="grow" size="sm" /> : ""}
                          <i className="fa-solid fa-play alertAligns"></i>
                        </a>
                      </OverlayTrigger>
                    </div>
                  ) : null}

                  <div className="other-design-studio-buttons">
                    {/* {getEventIdReducer?.eventId?.data?.event_id ? ( */}
                    <div hidden={project_id ? false : true}>
                      {/* <a
                        href="#!"
                        className="btn btn-outline-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#outputModal"
                        onClick={() => {
                          downloadPdf();
                        }}
                      >
                        Output <img src={output} alt="" className="inline-block" />
                      </a> */}
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 250 }}
                        overlay={<Tooltip id="overlay-example">Stastical Report</Tooltip>}
                      >
                        <a href="#!"
                          className="btn icon-btn btn-outline-secondary"
                          data-bs-toggle="modal"
                          data-bs-target="#outputModal"
                          onClick={() => {
                            downloadPdf();
                          }}>
                          <i className="fa-solid fa-file-lines alertAligns"></i>
                          {/* <img src={output} alt="" className="inline-block" /> */}
                          {/* <img src={info} alt="" className="alertAligns" /> */}
                        </a>
                      </OverlayTrigger>
                    </div>
                    {/* )} */}

                    <div hidden={project_id ? true : false}>
                      {/* <a
                        href="#!"
                        className="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#createNewProject"
                        onClick={() => handleEditProjectModal()}
                      >
                        Create Project <img src={plus} alt="" className="inline-flex align-center" />
                      </a> */}
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 250 }}
                        overlay={<Tooltip id="overlay-example">Create New Project</Tooltip>}
                      >
                        <a href="#" className="btn icon-btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#createNewProject"
                          onClick={() => handleEditProjectModal()}>
                          <i className="fa-solid fa-plus alertAligns"></i>
                          {/* <img src={info} alt="" className="alertAligns" /> */}
                        </a>
                      </OverlayTrigger>
                    </div>
                    {!modelVerionReducer?.modelVersion?.data?.length > 0 ? (
                      <div hidden={project_id ? false : true}>
                        {/* <button className="btn btn-primary" onClick={nodeSaveHandler}>
                          Save <i className="fa-solid fa-floppy-disk"></i>
                        </button> */}
                        <OverlayTrigger
                          placement="top"
                          delay={{ show: 250, hide: 250 }}
                          overlay={<Tooltip id="overlay-example">Save</Tooltip>}
                        >
                          <a href="#!" className="btn icon-btn btn-primary" onClick={nodeSaveHandler}>
                            <i className="fa-solid fa-floppy-disk"></i>
                            {/* <img src={info} alt="" className="alertAligns" /> */}
                          </a>
                        </OverlayTrigger>
                      </div>
                    ) : (
                      <>
                        <div hidden={project_id ? false : true}>
                          {/* <button className="btn btn-primary" onClick={nodeUpdateHandler}>
                            Update <i className="fa-solid fa-floppy-disk"></i>
                          </button> */}
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 250 }}
                            overlay={<Tooltip id="overlay-example">Update</Tooltip>}
                          >
                            <a href="#!" className="btn icon-btn btn-primary" onClick={nodeUpdateHandler}>
                              <i className="fa-solid fa-floppy-disk"></i>
                              {/* <img src={info} alt="" className="alertAligns" /> */}
                            </a>
                          </OverlayTrigger>
                        </div>

                        <div hidden={project_id ? false : true} className="last_btn">
                          {/* <button className="btn btn-primary" onClick={addModelWithVersionHandler}>
                            Add Version <i className="fa-solid fa-floppy-disk"></i>
                          </button> */}
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 250 }}
                            overlay={<Tooltip id="overlay-example">Add Version</Tooltip>}
                          >
                            <a href="#!" className="btn icon-btn btn-primary" onClick={nodeUpdateHandler}>
                              <i className="fa-solid fa-sliders"></i>
                              {/* <img src={info} alt="" className="alertAligns" /> */}
                            </a>
                          </OverlayTrigger>
                        </div>
                        <div hidden={project?.is_insight ? false : true} className="hidden_btn">
                          {/* <button className="btn btn-primary" onClick={viewInsightsHandler}>
                            View Insights <i className="fa-solid fa-chart-simple"></i>
                          </button> */}
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 250 }}
                            overlay={<Tooltip id="overlay-example">View insights</Tooltip>}
                          >
                            <a href="#!" className="btn icon-btn btn-primary" onClick={viewInsightsHandler}>
                              <i className="fa-solid fa-chart-simple alertAligns"></i>
                              {/* <img src={info} alt="" className="alertAligns" /> */}
                            </a>
                          </OverlayTrigger>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RightSideBarDesignStudio
          sideBar={sideBar}
          setSideBar={setSideBar}
          setPriceParameters={setPriceParameters}
          projectID={project_id}
          nodeAttributes={nodeAttributes}
          activeNode={activeNode}
          setActiveNode={setActiveNode}
          menu={menu}
          setMenu={setMenu}
          paramState={paramState}
          setParamState={setParamState}
          databaseObserver={databaseObserver}
          setDatabaseObserver={setDatabaseObserver}
        />
        <div className={`${sideBar === false ? "flow" : "flowActive"} ${sidebarState ? "sidebarCollapse" : ""}`}>
          <Flow
            activeNode={activeNode}
            setActiveNode={setActiveNode}
            menu={menu}
            setMenu={setMenu}
            paramState={paramState}
            setParamState={setParamState}
            projectId={project_id}
            setNodesObserver={setNodesObserver}
          />
        </div>
        <div className={`design-studio-additional-block position-relative logNbackground ${sidebarState ? "sidebarCollapse" : ""}`}>
          <div className="nla-log-block">
            <h6 className="mb-2">Logs</h6>
            <div className="nla-view" onClick={handleLogShow}>
              <p data-bs-toggle="modal" data-bs-target="#advanceLogModal">
                <i className="fa-solid fa-eye"></i> View
              </p>
            </div>
          </div>
          {dataIsFetched.status === FETCHING_DATA_STATUS.LOADING ? (
            <div className="backgroundTasks">
              <div>Fetching Data in background</div>
              <div class="load-icon center">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : null}
          {isModelCompeleted && runningAnalysisChecker ? (
            <div className="backgroundTasks" onClick={handleShow}>
              <div>Running Analysis in background</div>
              <div class="load-icon center">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <AdvanceLog log={log} setLog={setLog} />
      <Modal show={show} onHide={handleClose} centered className="runModal">
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto">Progress Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="nla_modal_banenr">
            <img src={progressModalImg} alt="placeholder" className="img-fluid" />
          </div>
          <div className="text-center">
            <h5 className="runHeader">Modeling and Insights are in progress</h5>
            <p className="mx-auto" style={{ maxWidth: "273px", marginBottom: "1rem" }}>
              You can continue to work and let the program run in the backrground
            </p>
          </div>
          <div className="text-end progress-block">
            {/* <label for="" className="text-right">
              ~ ETA 2 mins
            </label> */}
            <ProgressBar
              now={val}
              label={val === 100 ? `Completed ${val}%` : `Loading ${val}%`}
              className={val === 100 ? `Run-Progress-Bar bgGreen` : `Run-Progress-Bar`}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {val === 100 ? (
            <div className="flex w-full">
              <button
                type="button"
                className="btn btn-outline-primary runInBg"
                data-bs-toggle="modal"
                data-bs-target="#projectRendering"
                id="process_status_modal"
                onClick={viewInsightsNavigator}
              >
                Insights
              </button>
              <button
                type="button"
                className="btn btn-outline-primary runInBg"
                data-bs-toggle="modal"
                data-bs-target="#projectRendering"
                id="process_status_modal"
                onClick={viewSimulationNavigator}
              >
                Simulator
              </button>
              <button
                type="button"
                className="btn btn-outline-primary runInBg"
                data-bs-toggle="modal"
                data-bs-target="#projectRendering"
                id="process_status_modal"
                onClick={downloadPdf}
              >
                Statistical Report
              </button>

              {/* <button
                type="button"
                className="btn btn-outline-danger projectOutput"
                data-bs-dismiss="modal"
                onClick={handleClose}
                style={{ width: "max-content !important" }}
              >
                Project Output
              </button> */}
            </div>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-outline-primary runInBg"
                data-bs-toggle="modal"
                data-bs-target="#projectRendering"
                id="process_status_modal"
                onClick={handleClose}
              >
                Run in background
              </button>
              {/* <button
                type="button"
                className="btn btn-outline-primary runPause"
              >
                Pause
              </button> */}
              <button
                type="button"
                className="btn btn-outline-danger runCancel"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Cancel
              </button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      <Footer />
      <CreateProject
        setLoad={setLoad}
        authData={authData}
        setShowUniversalAlert={setShowUniversalAlert}
        setUniversalAlertMsg={setAlertMsg}
        setProjectCreatedAlert={setShowUniversalAlert}
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        isNewProjectFromStudio={true}
        project_name={projectName}
        setProjectNameCallback={setProjectNameCallback}
        addProjectID={addProjectID}
      />
      <Snackbar
        open={showUniversalAlert}
        autoHideDuration={3000}
        // key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <Snackbar
        open={saveModel}
        autoHideDuration={3000}
        // key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Nodes Saved successfully!
        </Alert>
      </Snackbar>



      {/* <DesignStudio onFormSubmit={handleFormSubmit} /> */}

      {/* <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onRun={runHandler}
      /> */}
    </div>
  );
};

export default memo(DesignStudio);

import React, { useState, useEffect } from "react";
import "../../css/style.css";
import { Accordion, Button } from "react-bootstrap";
import info from "../../assets/images/feather-info.svg";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../store/index";
import { useParams } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import loader from "../../assets/images/loader.gif";
import ConnectionConfirm from "../../utils/designStudio/Modals/ConnectionConfirm";
import InternalDatabaseConnectionConfirm from "../../utils/designStudio/Modals/InternalDatabaseConnectionConfirm";
import Spinner from "react-bootstrap/Spinner";

const RightSideBarDesignStudio = ({
  sideBar,
  setSideBar,
  projectID,
  setPriceParameters,
  nodeAttributes,
  activeNode,
  setActiveNode,
  menu,
  setMenu,
  paramState,
  setParamState,
  databaseObserver,
  setDatabaseObserver,
}) => {
  const dispatch = useDispatch();
  //Project ID and User ID for Saving file
  const authData = JSON.parse(localStorage.getItem("auth"));
  // connection Confirm Modal
  const [connectionConfirmModal, setConnectionConfirmModal] = useState(false);
  const [internalDbConnectionConfirmModal, setInternalDbConnectionConfirmModal] = useState(false);
  const { model_id, id } = useParams();
  const user_id = authData?.user_id;
  const onDragStart = (event, node_type, node_label) => {
    event.dataTransfer.setData("application/reactflow", node_type);
    event.dataTransfer.setData("node_data", node_label);
    event.dataTransfer.effectAllowed = "move";
  };
  const listOfDatabasesReducer = useSelector((state) => state.listOfDatabasesReducer);

  //File
  const [uploadProjectFile, setUploadFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const clientCsvFileReducer = useSelector((state) => state.clientCsvFileReducer);
  React.useEffect(() => {
    if (uploadProjectFile) {
      dispatch(
        allActions.clientCsvFileAction.clientCsvFile({
          input_file: uploadProjectFile[0],
          client_id: user_id,
          project_id: id,
          model_id: model_id,
        })
      );
    }
  }, [uploadProjectFile]);
  React.useEffect(() => {
    if (clientCsvFileReducer.success) {
      setFileUploaded(true);
      delete clientCsvFileReducer.success;
      const timeoutId = setTimeout(() => {
        setFileUploaded(false);
      }, 5000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [clientCsvFileReducer]);
  //Price Parameters
  const [pValue, setPValue] = useState(0.05);
  const [vifValue, setVifValue] = useState(5);
  const [sigValue, setSigValue] = useState(0.05);
  const [train, setTrain] = useState(70);
  const [test, setTest] = useState(20);
  const [validate, setValidate] = useState(10);
  setPriceParameters(pValue, train, test, validate, vifValue, sigValue);

  function onMenuClick() {
    if (menu === "head1") {
      setMenu("head2");
    } else {
      setMenu("head1");
    }
  }
  const paramSwitchHandler = (props) => {
    setMenu("head2");
    setActiveNode(props?.node_name);
    setParamState(props?.node_name);
  };
  const sideBarHandler = () => {
    sideBar === false ? setSideBar(true) : setSideBar(false);
  };

  useEffect(() => {
    setPValue(nodeAttributes?.pValue);
    setTrain(nodeAttributes?.Train);
    setTest(nodeAttributes?.Test);
    setValidate(nodeAttributes?.Validate);
  }, [nodeAttributes]);

  const databaseRequirementsReducer = useSelector((state) => state.databaseRequirementsReducer);
  const datastructureReducer = useSelector((state) => state.datastructureReducer);
  const getAllOperatorsWithNodesReducer = useSelector((state) => state.getAllOperatorsWithNodesReducer);
  const [databaseConfig, setDatabaseConfig] = React.useState(null);
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [internalSelectedDatabase, setInternalSelectedDatabase] = useState("");
  const [formValues, setFormValues] = useState({});
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newFormValues = { ...formValues, [name]: value };
    if (value === "") {
      delete newFormValues[name];
    }
    setFormValues(newFormValues);
  };
  const handleDatabaseConnect = () => {
    const body = {
      username: "nlaapi",
      password: "6dZmYzDMaFpeouRh",
      host: "mongodb+srv://nlaapi:6dZmYzDMaFpeouRhcls@cluster0.dlplzel.mongodb.net/?retryWrites=true&w=majority",
      port: "27017",
      database_name: "sample_client_database",
    };
    dispatch(
      allActions.datastructureAction.datastructure({
        ...body,
        client_id: user_id,
        project_id: projectID,
        database_type: selectedDatabase,
        model_id: model_id,
      })
    );
  };
  React.useEffect(() => {
    dispatch(allActions.databaseRequirementsAction.databaseRequirements());
    dispatch(allActions.getAllOperatorsWithNodesAction.getAllOperatorsWithNodes());
  }, []);
  React.useEffect(() => {
    if (databaseRequirementsReducer.success) {
      const requirements = databaseRequirementsReducer?.requirements?.data?.[0];
      const { _id, ...filteredRequirements } = requirements;
      setDatabaseConfig(filteredRequirements);
      delete databaseRequirementsReducer.success;
    }
  }, [databaseRequirementsReducer]);
  React.useEffect(() => {
    if (datastructureReducer.success) {
      setDatabaseObserver(true);
      setFormValues({});
      setSelectedDatabase("");
      setConnectionConfirmModal(true);
      dispatch(allActions.listOfDatabasesAction.listOfDatabases());
      delete datastructureReducer.success;
    }
  }, [datastructureReducer]);
  return (
    <div
      className={sideBar === false ? `right_sidebar` : `right_sidebar nla_rightside-bar-small`}
      data-position="right"
    >
      <div style={{ zIndex: "1000000000000000000" }}>
        <span className="nla-toggle-line" onClick={sideBarHandler}></span>
      </div>
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        {menu === "head1" && (
          <>
            <li
              className="nav-item"
              role="presentation"
              onClick={() => {
                setMenu("head1");
              }}
            >
              <button
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <i className="fa-solid fa-user-gear"></i> <span>Operators</span>
              </button>
            </li>
            <li
              onClick={() => {
                setMenu("head2");
              }}
              className="nav-item"
              role="presentation"
            >
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                <i className="fa-solid fa-sliders"></i> <span>Parameters</span>
              </button>
            </li>
          </>
        )}

        {menu === "head2" && (
          <>
            <li onClick={() => onMenuClick()} className="nav-item" role="presentation">
              <button
                className="nav-link "
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
                // onClick={nodeStateHandler}
              >
                <i className="fa-solid fa-user-gear"></i> <span>Operators</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                <i className="fa-solid fa-sliders"></i> <span>Parameters</span>
              </button>
            </li>
          </>
        )}
      </ul>
      <div className="tab-content" id="pills-tabContent">
        {menu === "head1" && (
          <div className="tab-pane fade show active" id="pills-home">
            <Accordion defaultActiveKey="0">
              {getAllOperatorsWithNodesReducer?.operators?.data?.map((val, index) => {
                return (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{val.operator}</Accordion.Header>
                    <Accordion.Body>
                      <div className="data-access_btn">
                        {val?.OperatorNodes?.map((elem, id) => (
                          <div
                            key={id}
                            onDragStart={(event) => {
                              onDragStart(event, "input", `${elem.node_name}`);
                            }}
                            draggable={elem.is_active === 1}
                          >
                            <button className="btn btn-secondary" disabled={elem.is_active === 0}>
                              <i className="fa-solid fa-book-open"></i>
                              {elem.node_name}
                            </button>
                            <OverlayTrigger
                              placement="left"
                              delay={{ show: 250, hide: 250 }}
                              overlay={<Tooltip id="overlay-example">{elem.node_name}</Tooltip>}
                            >
                              <a href="#!">
                                <img src={info} alt="info" className="img-fluid" />
                              </a>
                            </OverlayTrigger>
                          </div>
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
            <div className="py-3 px-3 bg-[#0d0e23] text-white rounded-sm m-4">
              <h6 className="mb-1">
                <strong>Keyboard Shortcuts</strong>
              </h6>
              <strong>Node and Line Delete</strong>

              <p className="mt-2">MAC: Delete</p>
              <p className="">Window: Backspace button</p>
            </div>
          </div>
        )}
        {menu === "head2" && (
          <>
            <div
              className="tab-pane show active"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="parameters-content">
                {new RegExp(`^Read File(\\s*\\(\\d+\\))?$`).test(activeNode) ||
                new RegExp(`^Write File(\\s*\\(\\d+\\))?$`).test(activeNode) ? (
                  <>
                    <h5>Modify {paramState.name ? paramState.name : "null"} Parameters</h5>

                    {paramState.fileFormat ? (
                      <>
                        <div className="nla-select-box-with-lbl">
                          <label htmlFor="Logverbosity">FileFormat</label>
                          <select className="form-select">
                            <option value={paramState.fileFormat}>{paramState.fileFormat}</option>
                          </select>
                        </div>
                      </>
                    ) : null}

                    <label htmlFor="file">{paramState.name === "Read" ? "UploadFile" : "Write File"}</label>
                    <div className="nla-select-box-with-lbl">
                      <input
                        type="file"
                        id="file"
                        className="form-control"
                        // accept=".csv"
                        accept=".csv"
                        // disabled={
                        //   datastructureReducer?.structure?.data?.event_id
                        //     ? false
                        //     : true
                        // }
                        onChange={(e) => setUploadFile(e.target.files)}
                      />
                      {clientCsvFileReducer.loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <label htmlFor="file">
                          <i className="fa-solid fa-paperclip"></i>
                        </label>
                      )}
                    </div>
                    <div className="mt-3">
                      {fileUploaded ? (
                        <p>
                          <strong>{uploadProjectFile[0]?.name}</strong> has been uploaded successfully.
                        </p>
                      ) : null}
                    </div>
                  </>
                ) : null}
                {new RegExp(`^DB Read(\\s*\\(\\d+\\))?$`).test(activeNode) ||
                new RegExp(`^DB Write(\\s*\\(\\d+\\))?$`).test(activeNode) ? (
                  <>
                    <div>
                      <hr></hr>
                      <h5>Internal data</h5>
                      <div className="nla-select-box-with-lbl">
                        <select
                          className="form-select"
                          value={internalSelectedDatabase}
                          disabled={datastructureReducer?.structure?.data?.event_id ? false : true}
                          onChange={(e) => {
                            setInternalSelectedDatabase(e.target.value);
                            setInternalDbConnectionConfirmModal(true);
                          }}
                        >
                          <option value="" disabled>
                            Select a database
                          </option>
                          {listOfDatabasesReducer?.databases?.map((database, index) => {
                            return (
                              <option value={database?.database} key={index}>
                                {database?.database}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div>
                      <hr></hr>
                      <h5>Connect Database</h5>
                      {datastructureReducer?.loading ? (
                        <>
                          <div>
                            <img src={loader} alt="" />
                          </div>
                        </>
                      ) : (
                        <div>
                          <div className="nla-select-box-with-lbl">
                            <select
                              className="form-select"
                              value={selectedDatabase}
                              onChange={(e) => setSelectedDatabase(e.target.value)}
                              disabled={databaseObserver}
                            >
                              <option value="" disabled>
                                Select a database
                              </option>
                              {databaseConfig
                                ? Object.keys(databaseConfig)
                                    .filter((key) => key !== "_id")
                                    .map((val, index) => {
                                      return (
                                        <option value={val} key={index}>
                                          {val}
                                        </option>
                                      );
                                    })
                                : null}
                            </select>
                          </div>
                          {selectedDatabase && (
                            <form>
                              {/* {databaseConfig[selectedDatabase].map((inputName) => (
                                <div key={inputName}>
                                  <div className="nla-select-box-with-lbl">
                                    <input
                                      type={inputName !== "password" ? "text" : "password"}
                                      id={inputName}
                                      name={inputName}
                                      value={formValues[inputName] || ""}
                                      onChange={handleInputChange}
                                      className="form-control"
                                      placeholder={`Enter Your ${inputName}`}
                                    />
                                  </div>
                                </div>
                              ))} */}
                              <div className="d-grid gap-2">
                                <Button onClick={handleDatabaseConnect}>
                                  {datastructureReducer.loading ? "Connecting..." : "Connect"}
                                </Button>
                              </div>
                            </form>
                          )}
                          {databaseObserver ? (
                            <div className="mt-3">
                              <p style={{ color: "#404040" }}>Database has been configured.</p>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </>
                ) : null}
                {new RegExp(`^Price(\\s*\\(\\d+\\))?$`).test(activeNode) ? (
                  <>
                    {/* <label htmlFor="send Mail">P-Value</label>
                    <div className="nla-select-box-with-lbl">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="1"
                        aria-describedby="searchOperators"
                      ></input>
                    </div>
                    <label htmlFor="send Mail">Train</label>
                    <div className="nla-select-box-with-lbl">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="1.5"
                        aria-describedby="searchOperators"
                      ></input>
                    </div>
                    <label htmlFor="send Mail">Test</label>
                    <div className="nla-select-box-with-lbl">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="True"
                        aria-describedby="searchOperators"
                      ></input>
                    </div>
                    <label htmlFor="send Mail">Validate</label>
                    <div className="nla-select-box-with-lbl">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="true"
                        aria-describedby="searchOperators"
                      ></input>
                    </div> */}
                    <label htmlFor="send Mail">Vif-Value</label>
                    <div className="nla-select-box-with-lbl">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="5"
                        aria-describedby="searchOperators"
                        value={vifValue}
                        onChange={(e) => setVifValue(e.target.value)}
                      ></input>
                    </div>
                    <label htmlFor="send Mail">Sig-Value</label>
                    <div className="nla-select-box-with-lbl">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0.05"
                        aria-describedby="searchOperators"
                        value={sigValue}
                        onChange={(e) => setSigValue(e.target.value)}
                      ></input>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </>
        )}
      </div>
      <ConnectionConfirm
        connectionConfirmModal={connectionConfirmModal}
        setConnectionConfirmModal={setConnectionConfirmModal}
      />
      <InternalDatabaseConnectionConfirm
        internalSelectedDatabase={internalSelectedDatabase}
        internalDbConnectionConfirmModal={internalDbConnectionConfirmModal}
        setInternalDbConnectionConfirmModal={setInternalDbConnectionConfirmModal}
      />
    </div>
  );
};

export default RightSideBarDesignStudio;

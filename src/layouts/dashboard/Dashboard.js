/* eslint-disable */
import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip, OverlayTrigger, Badge, Modal } from "react-bootstrap";
import moment from "moment";
import Tour from "reactour";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../css/style.css";
import list from "../../assets/images/ionic-ios-list.svg";
import feather from "../../assets/images/feather-info.svg";
import featherEye from "../../assets/images/feather-eye.svg";
import openPencil from "../../assets/images/open-pencil.svg";
import share from "../../assets/images/feather-share.svg";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Api from "../../services/Api";
import Snackbar from "@mui/material/Snackbar";
import copyIcon from "../../assets/newIcons/ionic-md-copy.svg";
import downloadIcon from "../../assets/newIcons/feather-download.svg";
import introImg from "../../assets/images/main-navigation-intro-image.png";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../store/index";
import { DateRangePicker } from "rsuite";
import axios from "axios";
import loader from "../../assets/images/loader.gif";
import Project from "./Project";
import CreateProject from "../../utils/dashboard/CreateProject";
import EditProject from "../../utils/dashboard/EditProject";
import AuditUserProjects from "../../utils/dashboard/AuditUserProjects";
import SidebarToggle from "../../components/sidebarToggle/SidebarToggle";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //User
  const authData = JSON.parse(localStorage.getItem("auth"));
  const userID = authData?.user_id;
  const user_id = authData?.user_id;
  const first_name = authData?.first_name;

  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("center");
  const [isLoading, setIsLoading] = useState(false);

  const [projectListFilter, setProjectListFilter] = useState("pin_project");

  const [modalShow, setModalShow] = useState(false);
  const [projectID, setProjectID] = useState("");
  const [projectCreatedAlert, setProjectCreatedAlert] = useState(false);
  const [projectPinAlert, setProjectPinAlert] = useState(false);
  const [pinAlertText, setPinAlertText] = useState("");
  const [maxPinLength, setMaxPinLength] = useState(false);
  const [searchEmptyChecker, setSearchEmptyChecker] = useState(false);
  // Project and Pagination
  const [projectsOrderByPin, setProjectsOrderByPin] = useState([]);

  //Pagination

  const [searchResultPage, setSearchResultPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [projectsLoading, setProjectsLoading] = useState(true);
  const [loadPagination, setLoadPagination] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilterPage, setCurrentFilterPage] = useState(1);
  const [orderByPinPage, setOrderByPinPage] = useState(1);

  const [load, setLoad] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [customTabPinnedProject, setCustomTabPinnedProject] = useState(true);
  const [customTabRecentProject, setCustomTabRecentProject] = useState(false);
  const [columnState, setColumnState] = useState("nla-col-4");
  const [showCreateModal, setShowCreateModal] = useState(false);
  //Search
  const [project_name, setSearchByProjectName] = useState("");
  const [project_date, setProjectDate] = useState("");
  const [searchByAuthor, setSearchByAuthor] = useState("");
  const [filteredPinDataByDate, setFilteredPinDataByDate] = useState("");
  const [filteredUnPinData, setFilteredUnPinData] = useState("");
  const [filteredData, setFilteredData] = useState("");

  const [showUniversalAlert, setShowUniversalAlert] = useState(false);
  const [universalAlertMsg, setUniversalAlertMsg] = useState("");

  const [userPreference, setUserPreference] = useState({
    user_id: 0,
    view: "",
    no_of_projects: null,
    no_of_columns: "",
  });
  const getUserPreferenceReducer = useSelector((state) => state.getUserPreferenceReducer);

  const handleShow = () => {
    setShowCreateModal(true);
  };

  React.useEffect(() => {
    dispatch(allActions.getUserPreferenceAction.getUserPreference(userID));
    dispatch(allActions.getAllCategoriesAction.getAllCategories());
    dispatch(allActions.getAllProductsAction.getAllProducts());
  }, []);
  React.useEffect(() => {
    if (getUserPreferenceReducer.success) {
      setUserPreference({
        user_id: getUserPreferenceReducer?.preference?.data?.user_id,
        view: getUserPreferenceReducer?.preference?.data?.view,
        no_of_projects: getUserPreferenceReducer?.preference?.data?.no_of_projects,
        no_of_columns: getUserPreferenceReducer?.preference?.data?.no_of_columns,
      });
      setLimit(getUserPreferenceReducer?.preference?.data?.no_of_projects);
      delete getUserPreferenceReducer.success;
    }
  }, [getUserPreferenceReducer]);
  React.useEffect(() => {
    if (userPreference.view === "list") {
      customTabHandlerRecentProjects();
    }
  }, [userPreference]);

  //Searching
  const customTabHandlerPinnedProjects = () => {
    dispatch(
      allActions.addUsersPreferenceAction.addUsersPreference({
        ...userPreference,
        view: "grid",
      })
    );
    setUserPreference({
      ...userPreference,
      view: "grid",
    });
    unsetSearchData();
    setCustomTabPinnedProject(true);
    setCustomTabRecentProject(false);
  };
  const customTabHandlerRecentProjects = async () => {
    setProjectsLoading(true);
    unsetSearchData();
    setCustomTabPinnedProject(false);
    setCustomTabRecentProject(true);

    try {
      const config = { headers: { Authorization: `Bearer ` + authData.token } };
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/project/list_view/all_projects/${user_id}/${projectListFilter}/?page=${orderByPinPage}&limit=${limit}`;
      let { data } = await axios.get(api, config);

      if (data) {
        setProjectsOrderByPin(data?.rows);
        setTotalPages(data.pagination.totalPages);
        setOrderByPinPage(data.pagination.page);
        setProjectsLoading(false);
      }
    } catch (error) {
      setProjectsLoading(false);
      console.log("Error", error);
    }
  };

  const columnHandler = (e) => {
    setColumnState(e.target.value);
    dispatch(
      allActions.addUsersPreferenceAction.addUsersPreference({
        ...userPreference,
        no_of_columns: e.target.value,
      })
    );

    setUserPreference({
      ...userPreference,
      no_of_columns: e.target.value,
    });
  };

  // <--------------------date Range Picker-------------------------->
  const [value, setValue] = React.useState();
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const handleChange = (value) => {
    setValue(value);
    setStartDate(value ? value[0].toISOString() : "");
    setEndDate(value ? value[1].toISOString() : "");
  };
  //Search
  const searchDataHandler = async () => {
    if (customTabPinnedProject === true) {
      if (project_name !== "" && start_date !== "" && end_date !== "" && searchByAuthor === "") {
        const res = await Api(
          "GET",
          `api/v1/project/search/${user_id}?page=${currentFilterPage}&limit=${limit}&project_name=${project_name}&start_date=${start_date}&end_date=${end_date}`
        );
        if (res.status === 200 && customTabPinnedProject === true) {
          setFilteredData(res.data.data.rows);
          setTotalPages(res.data.data.pagination.totalPages);
          setCurrentFilterPage(res.data.data.pagination.page);
          setFilterVisible(true);
        }
      } else if (project_name !== "" && start_date === "" && end_date === "" && searchByAuthor === "") {
        const res = await Api(
          "GET",
          `api/v1/project/search/${user_id}?page=${currentFilterPage}&limit=${limit}&project_name=${project_name}`
        );
        if (res.status === 200 && customTabPinnedProject === true) {
          setFilteredData(res.data.data.rows);
          setTotalPages(res.data.data.pagination.totalPages);
          setCurrentFilterPage(res.data.data.pagination.page);
          setFilterVisible(true);
        }
      } else if (start_date && end_date && !project_name && !searchByAuthor) {
        const res = await Api(
          "GET",
          `api/v1/project/search/${user_id}?page=${currentFilterPage}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`
        );
        if (res.status === 200 && customTabPinnedProject === true) {
          setFilteredData(res.data.data.rows);
          setTotalPages(res.data.data.pagination.totalPages);
          setCurrentFilterPage(res.data.data.pagination.page);
          setFilterVisible(true);
        }
      } else if (searchByAuthor && !start_date && !end_date && !project_name) {
        if (customTabPinnedProject === true) {
          setFilteredData(1);
          setFilterVisible(true);
        }
      } else if (searchByAuthor && project_name && start_date && end_date) {
        const res = await Api(
          "GET",
          `api/v1/project/search/${user_id}?page=${currentFilterPage}&limit=${limit}&searchByAuthor=${searchByAuthor}&project_name=${project_name}&start_date=${start_date}&end_date=${end_date}`
        );
        if (res.status === 200 && customTabPinnedProject === true) {
          setFilteredData(res.data.data.rows);
          setTotalPages(res.data.data.pagination.totalPages);
          setCurrentFilterPage(res.data.data.pagination.page);
          setFilterVisible(true);
        }
      } else if (searchByAuthor && !project_name && start_date && end_date) {
        const res = await Api(
          "GET",
          `api/v1/project/search/${user_id}?page=${currentFilterPage}&limit=${limit}&searchByAuthor=${searchByAuthor}&start_date=${start_date}&end_date=${end_date}`
        );

        if (res.status === 200 && customTabPinnedProject === true) {
          setFilteredData(res.data.data.rows);
          setTotalPages(res.data.data.pagination.totalPages);
          setCurrentFilterPage(res.data.data.pagination.page);
          setFilterVisible(true);
        }
      } else if (project_name === "" && project_date === "") {
        setSearchEmptyChecker(true);
        setTimeout(() => {
          setSearchEmptyChecker(false);
        }, 3000);
      } else {
        console.log("Invalid");
      }
    } else if (customTabRecentProject === true) {
      if (project_name !== "" && start_date !== "" && end_date !== "" && searchByAuthor === "") {
        // const res = await Api("POST", `api/project/search/?page=${currentFilterPage}&limit=${limit}`, apiData, config);
        const res = await Api(
          "GET",
          `api/v1/project/search/${user_id}?page=${currentFilterPage}&limit=${limit}&project_name=${project_name}&start_date=${start_date}&end_date=${end_date}`
        );

        if (res.status === 200 && customTabRecentProject === true) {
          setFilteredData(res.data.data.rows);
          setTotalPages(res.data.data.pagination.totalPages);
          setCurrentFilterPage(res.data.data.pagination.page);
          setFilterVisible(true);
        }
      } else if (project_name && !start_date && !end_date && !searchByAuthor) {
        const res = await Api(
          "GET",
          `api/v1/project/search/${user_id}?page=${currentFilterPage}&limit=${limit}&project_name=${project_name}`
        );
        if (res.status === 200 && customTabRecentProject === true) {
          setFilteredData(res.data.data.rows);
          setTotalPages(res.data.data.pagination.totalPages);
          setCurrentFilterPage(res.data.data.pagination.page);
          setFilterVisible(true);
        }
      } else if (start_date && end_date && !project_name && !searchByAuthor) {
        const res = await Api(
          "GET",
          `api/v1/project/search/${user_id}?page=${currentFilterPage}&limit=${limit}&start_date=${start_date}&end_date=${end_date}`
        );

        if (res.status === 200 && customTabRecentProject === true) {
          setFilteredData(res.data.data.rows);
          setTotalPages(res.data.data.pagination.totalPages);
          setCurrentFilterPage(res.data.data.pagination.page);
          setFilterVisible(true);
        }
      } else if (searchByAuthor && project_name && start_date && end_date) {
        const res = await Api(
          "GET",
          `api/v1/project/search/${user_id}?page=${currentFilterPage}&limit=${limit}&searchByAuthor=${searchByAuthor}&project_name=${project_name}&start_date=${start_date}&end_date=${end_date}`
        );

        if (res.status === 200 && customTabRecentProject === true) {
          setFilteredData(res.data.data.rows);
          setTotalPages(res.data.data.pagination.totalPages);
          setCurrentFilterPage(res.data.data.pagination.page);
          setFilterVisible(true);
        }
      } else if (searchByAuthor && !start_date && !end_date && !project_name) {
        if (customTabRecentProject === true) {
          setFilteredData(1);
          setFilterVisible(true);
        }
      } else if (project_name === "" && project_date === "") {
        setSearchEmptyChecker(true);
        setTimeout(() => {
          setSearchEmptyChecker(false);
        }, 3000);
      } else {
        console.log("Invalid");
      }
    }
  };

  //Pin or Unpin Project
  const PinUnPinHandler = async (project_id) => {
    if (filteredPinDataByDate?.length < 20 || project_id?.pin_project === 1) {
      setLoad(false);
      setShowUniversalAlert(true);
      setUniversalAlertMsg("Loading . . . .");
      try {
        const res = await Api("GET", `api/v1/project/pin-or-unpin/${project_id.id}`);
        if (res.status === 200) {
          setLoad(true);
          setShowUniversalAlert(false);
          setMaxPinLength(false)
          setPinAlertText(res.data.message);
          setProjectPinAlert(true);
          setTimeout(() => {
            setProjectPinAlert(false);
            setMaxPinLength(false)
          }, 3500);
        }
      } catch (error) {
        console.log("Error", error.response);
        setLoad(false);
      }
    } else {
      setMaxPinLength(true)
      setTimeout(() => {
        setMaxPinLength(false)
      }, 2000);
    }
  };
  // ---------------------------------------------------

  const scroll = () => {
    const getFilteredDiv = document.getElementById("searchedResults");
    if (filteredData) {
      getFilteredDiv.scrollIntoView({ behavior: "smooth" });
    }
  };
  const unsetSearchData = () => {
    setSearchByAuthor("");
    setSearchByProjectName("");
    setValue("");
    setFilteredData("");
    setFilterVisible(false);
    setCurrentPage(1);
    // setOrderByPinPage(1);
  };

  //Pagination for All Products --------------------------------
  const handleSearchPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentFilterPage(newPage);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleProjectListViewPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setOrderByPinPage(newPage);
    }
  };

  const renderPageNumbers = (currentPage, totalPages) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? "current" : ""} style={{ cursor: "pointer" }}>
          <a
            onClick={() =>
              filterVisible
                ? handleSearchPageChange(i)
                : customTabPinnedProject
                  ? handlePageChange(i)
                  : handleProjectListViewPageChange(i)
            }
            className="transition-all ease-in-out duration-300"
            href="#!"
          >
            {i}
          </a>
        </li>
      );
    }

    return pageNumbers;
  };

  //Main UseEffect
  useEffect(() => {
    if (filterVisible) {
      return;
    }
    setLoadPagination(false);
    setCurrentFilterPage(1);
    setOrderByPinPage(1);
    localStorage.removeItem("nodesFromDatabase");
    localStorage.removeItem("nodes_data");
    localStorage.removeItem("nodesData_from_database");
    localStorage.removeItem("notesFromDB");
    if (customTabPinnedProject === true) {
      setProjectsLoading(true);
      async function fetchProjects() {
        const { data } = await Api("GET", `api/v1/project/by-user/${userID}/?page=${currentPage}&limit=${limit}`);
        setFilteredPinDataByDate(data?.data?.pinnedProjects);
        setFilteredUnPinData(data?.data?.unPinnedProjects);
        setTotalPages(data.data.pagination.totalPages);
        setCurrentPage(data.data.pagination.page);
        setProjectsLoading(false);
        setLoad(false);
      }
      fetchProjects();
    }
    setLoad(false);

    setTimeout(() => {
      setLoadPagination(true);
    }, 2000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load, limit, currentPage, filterVisible, customTabPinnedProject, customTabRecentProject]);

  useEffect(() => {
    if (filterVisible) {
      // setCurrentPage(1);
      searchDataHandler();
    }
  }, [currentFilterPage]);

  useEffect(() => {
    // scroll();
  }, [load, scroll]);

  useEffect(() => {
    if (project_name !== "" || project_date !== "" || searchByAuthor !== "") {
      searchDataHandler();
    }
  }, [limit, currentFilterPage]);

  useEffect(() => {
    // setLoadPagination(false);
    if (filterVisible) {
      return;
    }
    if (customTabPinnedProject === false && filterVisible === false) {
      customTabHandlerRecentProjects();
    }
    // setTimeout(() => {
    //   setLoadPagination(true);
    // }, 2000);
  }, [limit, orderByPinPage, load, projectListFilter]);

  const handleEditProjectModal = (project_id) => {
    setProjectID(project_id);
    setModalShow(true);
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered id="createNewProject">
        <EditProject project_id={projectID} {...props} />
      </Modal>
    );
  }

  //Tour handler
  useEffect(() => {
    const tourHandler = async () => {
      const { data } = await Api("GET", `api/v1/user/get-user/${user_id}`);
      if (data) {
        if (data?.data[0]?.show_popup === 0) {
          setIsTourOpen(true);
        } else if (data[0]?.show_popup === 1) {
          setIsTourOpen(false);
        }
      }
    };
    tourHandler();
  }, []);

  //Pop up model open for once
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [currentStep, setStep] = useState();
  const steps = [
    {
      selector: "#leftSideBar",
      mutationObservables: [`[data-tour-id="mask-position-recompute"]`],
      content: () => (
        <>
          <div class="tooltip-wrapper-cb">
            <img height="150" src={introImg} class="img-fluid" alt="" />
            <h3 class="tooltip-title-cb">Main Navigation</h3>
            <p>
              User can navigate to the below set of screens:
              <br />
              <b>Home:</b> Dashboard, which has all the projects that have been created/shared. <br />{" "}
              <b>Design Studio:</b> To build new/alter existing models.
              <br />
            </p>
            <div class="custom-checkbox">
              <input
                type="checkbox"
                id="tootltip-show-box"
                name="tootltip-show-box"
                value="Show"
                onClick={tourHandler}
              />
              <label for="tootltip-show-box"> Don't show again</label>
            </div>
          </div>
        </>
      ),
      style: {
        position: "fixed",
        left: "15px",
      },
    },
    {
      selector: "#filter_box_wrapper",
      content: () => (
        <div class="tooltip-wrapper-cb">
          <img
            height="150"
            src={require("../../assets/images/model-search-intro-image.png")}
            class="img-fluid"
            alt=""
          />
          <h3 class="tooltip-title-cb">Model Search</h3>
          <p>User can quickly narrow down to the project using one or more of the filter functions listed below.</p>
          <div class="custom-checkbox">
            <input type="checkbox" id="tootltip-show-box" name="tootltip-show-box" value="Show" />
            <label for="tootltip-show-box"> Don't show again</label>
          </div>
        </div>
      ),
      // position: [160, 250],
      style: {
        position: "absolute",
        left: "0px",
        top: "20px",
        maxWidth: "340px",
        width: "100%",
        // webkitTransform: "none",
        // transform: "translate(128px,360px)",
      },
    },
    {
      selector: "#circleS",
      content: () => (
        <div class="tooltip-wrapper-cb">
          <img
            height="150"
            src={require("../../assets/images/new_project_create_image.png")}
            class="img-fluid"
            alt=""
          />
          <h3 class="tooltip-title-cb">Create New Model</h3>
          <p>
            To create a project use this button to fill up the project details form. Once the form is filled up, the
            project tile will be created in the dashboard.
          </p>
          <div class="custom-checkbox">
            <input type="checkbox" id="tootltip-show-box" name="tootltip-show-box" value="Show" />
            <label for="tootltip-show-box"> Don't show again</label>
          </div>
        </div>
      ),
      position: "-10px",
    },
  ];
  useEffect(() => {
    try {
      if (currentStep === 0) {
        const mask = document.getElementById("mask-main").getElementsByTagName("rect")[1];
        mask.style.rx = "0";
      }
      if (currentStep === 1) {
        const ab = document.getElementsByClassName("beJLEE");
        ab[0].style.position = "absolute";
        const mask = document.getElementById("mask-main").getElementsByTagName("rect")[1];
        mask.style.rx = "8";
      }
      if (currentStep === 2) {
        const ab = document.getElementsByClassName("beJLEE");
        ab[0].style.position = "absolute";
        const element = document.getElementsByClassName("sc-eCYdqJ");
        element[0].classList.add("step3");
        const mask = document.getElementById("mask-main").getElementsByTagName("rect")[1];
        mask.style.rx = "25";
      }
    } catch (e) {
      console.log("Issue");
    }
  }, [currentStep]);

  //Project filter in Project list view
  const filterHandler = async (filter) => {
    if (filter === "pin") {
      setProjectListFilter("pin_project");
    } else if (filter === "date") {
      setProjectListFilter("date_created");
    }
  };

  // ----------------Duplicate Project Handler-----------------------

  const duplicateProjectHandler = async (project_id) => {
    if (project_id) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ` + authData.token,
          },
        };

        const api = `${process.env.REACT_APP_Base_URL}/api/v1/project/duplicate/${project_id}`;
        await axios
          .get(api, config)
          .then(async function (res) {
            console.log("Project duplicate response: ", res);
            setLoad(true);
            setShowUniversalAlert(true);
            setUniversalAlertMsg("Project duplicated successfully");
            setTimeout(() => {
              setShowUniversalAlert(false);
            }, 3000);
          })
          .catch(function (res) {
            console.log("data from catch 1: ", res);
            if (res?.response?.data === "Project exists") {
              setShowUniversalAlert(true);
              setUniversalAlertMsg("Project name already exists");
              setTimeout(() => {
                setShowUniversalAlert(false);
              }, 3000);
            }
          });
      } catch (error) {
        console.log("Error from catch 2: ", error);
      }
    }
  };
  const fetchNodes = async (values) => {
    console.log(values);
    if (values.id) {
      setIsLoading(true);
      dispatch(allActions.getNodesAction.getNodesState(values.id));
      setTimeout(() => {
        navigate(`/design-studio/${values.id}/${values?.Models?.length > 0 ? values?.Models[0]?.id : 0}`);
        setIsLoading(false);
      }, 1500);
    }
  };
  const deleteProjectHandler = async (project__id) => {
    setShowUniversalAlert(true);
    setUniversalAlertMsg("Deleting project . . . . .");
    try {
      var res = await Api("DELETE", `api/v1/project/delete/${project__id}`);
      if (res.status === 200) {
        setShowUniversalAlert(false);
        setLoad(true);
        setShowUniversalAlert(true);
        setUniversalAlertMsg(res?.data?.message);
        setTimeout(() => {
          setShowUniversalAlert(false);
        }, 3000);
      }
    } catch (error) {
      console.log("Error", error.response);
    }
  };

  const [sidebarState, setSidebarState] = useState(false);

  const sidebarHandler = () => {
    setSidebarState(!sidebarState);
  };

  return (
    <div>
      <Header />
      {/* <Sidebar sidebarState={sidebarState} /> */}
      {/* <SidebarToggle sidebarState={sidebarState} sidebarHandler={sidebarHandler} /> */}
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        className="introjs-tooltip"
        onRequestClose={() => setIsTourOpen(false)}
        prevButton={"prev"}
        nextButton={"Next"}
        showNumber={false}
        maskSpace={0}
        showNavigationNumber={false}
        lastStepNextButton={"Done"}
        getCurrentStep={(curr) => setStep(curr)}
      />
      <div className="main-content-wrapper">
        <div className="dashboard_banner">
          <div className="banner_content">
            <h1>Welcome {first_name},</h1>
            <h2>To the Gazelle Home Screen</h2>
            <p>Make faster, more confident decisions.</p>
          </div>
          <div className="nla_tabbing">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className={userPreference?.view === "grid" ? `nav-link active` : `nav-link`}
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                  onClick={customTabHandlerPinnedProjects}
                >
                  <i className="fa-solid fa-layer-group"></i>
                </button>
                <button
                  className={userPreference?.view === "list" ? `nav-link active` : `nav-link`}
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                  onClick={() => {
                    dispatch(
                      allActions.addUsersPreferenceAction.addUsersPreference({
                        ...userPreference,
                        view: "list",
                      })
                    );
                    setUserPreference({
                      ...userPreference,
                      view: "list",
                    });
                    customTabHandlerRecentProjects();
                  }}
                >
                  <i className="fa-solid fa-list-ul"></i>
                </button>
              </div>
            </nav>
          </div>
        </div>

        <div className={`filter_box_wrapper shadow-md ${sidebarState ? "sidebarCollapse" : ""}`} id="filter_box_wrapper">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-5">
              <div className="nla_search">
                <img src={list} alt="list" className="img-fluid" />
                <input
                  type="search"
                  className="form-control mb-0 ms-3"
                  placeholder="Search by Project Name"
                  value={project_name}
                  onChange={(e) => setSearchByProjectName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="nla_search">
                <DateRangePicker
                  className=""
                  appearance="default"
                  placeholder="Search by Date Range"
                  style={{ width: 260 }}
                  value={value}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-lg-1 col-md-1">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary mb-0"
                onClick={() => searchDataHandler()}
              />
            </div>
            {/* <div className="col-lg-2 ms-auto">
              <div className="nla_tabbing">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className={userPreference?.view === "grid" ? `nav-link active` : `nav-link`}
                      id="nav-home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-home"
                      type="button"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                      onClick={customTabHandlerPinnedProjects}
                    >
                      <i className="fa-solid fa-layer-group"></i>
                    </button>
                    <button
                      className={userPreference?.view === "list" ? `nav-link active` : `nav-link`}
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                      onClick={() => {
                        dispatch(
                          allActions.addUsersPreferenceAction.addUsersPreference({
                            ...userPreference,
                            view: "list",
                          })
                        );
                        setUserPreference({
                          ...userPreference,
                          view: "list",
                        });
                        customTabHandlerRecentProjects();
                      }}
                    >
                      <i className="fa-solid fa-list-ul"></i>
                    </button>
                  </div>
                </nav>
              </div>
            </div> */}
          </div>
        </div>

        <div className="">
          {/* <!-- Grid and list view block --> */}
          {projectsLoading ? (
            <div
              className="mb-0 mt-0 text-center"
              style={{
                display: "flex",
                marginLeft: "12px",
                minWidth: "80vw",
                justifyContent: "center",
              }}
            >
              <img src={loader} alt="" />
            </div>
          ) : (
            <>
              <div className={`animate__animated animate__fadeInUp nla_grid_and_list_view_data_wrapper ${sidebarState ? "sidebarCollapse" : ""}`}>
                <div className="tab-content" id="nav-tabContent">
                  {/* <!-- Grid view content start --> */}

                  <div
                    className={userPreference.view === "grid" ? `tab-pane fade show active` : "tab-pane fade "}
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    {filterVisible === false ? (
                      <>
                        {/* Pinned Projects Title  */}
                        <div className="nla_view_top_title_and_add_new_block">
                          <div className="row align-items-center">
                            <div
                              className="col-lg-5"
                            // style={filteredPinDataByDate?.length === 0 ? { visibility: "hidden" } : null}
                            >
                              <p className="mb-0">
                                Pinned Projects
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 250 }}
                                  overlay={<Tooltip id="overlay-example">Pinned projects</Tooltip>}
                                >
                                  <a href="#!">
                                    <img src={feather} alt="" className="alertAligns" />
                                  </a>
                                </OverlayTrigger>
                              </p>
                            </div>
                            <div className="col-lg-7 text-end">
                              <div className="nla_add_new_project_btn" id="nla_add_new_project_btn">
                                <button onClick={handleShow}>
                                  <span className="btn-primary rounded-pill icon-btn "> + </span> Create New Project
                                </button>
                                {/* <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 250 }}
                                  overlay={<Tooltip id="overlay-example">Create new project</Tooltip>}
                                >
                                  <a href="#!">
                                    <img src={feather} alt="" className="alertAligns" />
                                  </a>
                                </OverlayTrigger> */}
                              </div>
                              <CreateProject
                                showCreateModal={showCreateModal}
                                setShowCreateModal={setShowCreateModal}
                                setLoad={setLoad}
                                authData={authData}
                                setShowUniversalAlert={setShowUniversalAlert}
                                setUniversalAlertMsg={setUniversalAlertMsg}
                                setProjectCreatedAlert={setProjectCreatedAlert}
                              />
                            </div>
                          </div>
                        </div>

                        <div className={`nla_grid_view_wrapper ${userPreference.no_of_columns}`}>
                          {filteredPinDataByDate?.length ? (
                            filteredPinDataByDate?.map((item, index) => (
                              <Project
                                elem={item}
                                key={index}
                                PinUnPinHandler={PinUnPinHandler}
                                duplicateProjectHandler={duplicateProjectHandler}
                                handleEditProjectModal={handleEditProjectModal}
                                deleteProjectHandler={deleteProjectHandler}
                                fetchNodes={fetchNodes}
                                setUniversalAlertMsg={setUniversalAlertMsg}
                                setShowUniversalAlert={setShowUniversalAlert}
                              />
                            ))
                          ) : (
                            <div
                              className="mb-0 mt-0 text-center"
                              style={{
                                display: "flex",
                                marginLeft: "12px",
                                minWidth: "80vw",
                                justifyContent: "center",
                              }}
                            >
                              <p className="muted text-center">
                                <small>No pinned project yet</small>
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Recent Projects */}
                        {filteredUnPinData === "" ? null : (
                          <>
                            <div className="nla_view_top_title_and_add_new_block">
                              <div className="row align-items-center">
                                <div className="col-lg-5">
                                  <p>
                                    Recently Created
                                    <OverlayTrigger
                                      placement="top"
                                      delay={{ show: 250, hide: 250 }}
                                      overlay={<Tooltip id="overlay-example">Recently created projects</Tooltip>}
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

                        <div className={`nla_grid_view_wrapper ${userPreference.no_of_columns}`}>
                          {filteredUnPinData.length ? (
                            filteredUnPinData?.map((item, index) => (
                              <Project
                                elem={item}
                                key={index}
                                PinUnPinHandler={PinUnPinHandler}
                                duplicateProjectHandler={duplicateProjectHandler}
                                handleEditProjectModal={handleEditProjectModal}
                                deleteProjectHandler={deleteProjectHandler}
                                fetchNodes={fetchNodes}
                                setUniversalAlertMsg={setUniversalAlertMsg}
                                setShowUniversalAlert={setShowUniversalAlert}
                              />
                            ))
                          ) : (
                            <div
                              className="mb-0 mt-0 text-center"
                              style={{
                                display: "flex",
                                marginLeft: "12px",
                                minWidth: "80vw",
                                justifyContent: "center",
                              }}
                            >
                              <p className="muted text-center">
                                <small>No recent project yet</small>
                              </p>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {filteredData !== "" ? (
                          <>
                            <div className="nla_view_top_title_and_add_new_block" id="searchedResults">
                              <div className="row align-items-center">
                                <div className="col-lg-5">
                                  <p className="mb-0">
                                    Searched Results
                                    <a href="#">
                                      <img src={feather} alt="" className="alertAligns" />
                                    </a>
                                  </p>
                                </div>
                                <div className="col-lg-7 text-end">
                                  <div className={`clearbtn`}>
                                    <button onClick={unsetSearchData}>Clear Search</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={`nla_grid_view_wrapper ${userPreference.no_of_columns}`}>
                              {filteredData?.length > 0 ? (
                                filteredData?.map((item, index) => (
                                  <Project
                                    elem={item}
                                    key={index}
                                    PinUnPinHandler={PinUnPinHandler}
                                    duplicateProjectHandler={duplicateProjectHandler}
                                    handleEditProjectModal={handleEditProjectModal}
                                    deleteProjectHandler={deleteProjectHandler}
                                    fetchNodes={fetchNodes}
                                  />
                                ))
                              ) : (
                                <p style={{ paddingLeft: "15px" }}>No search results found</p>
                              )}
                            </div>
                          </>
                        ) : (
                          <p style={{ paddingLeft: "15px" }}>No search results found</p>
                        )}
                      </>
                    )}
                  </div>
                  {/* <!-- Grid view content end -->
                    <!-- List view content start --> */}
                  {userPreference.view === "list" && filterVisible === false ? (
                    <>
                      <div
                        className={userPreference.view === "list" ? `tab-pane fade show active` : `tab-pane fade`}
                        id="nav-profile"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                      >
                        <div className="nla_view_top_title_and_add_new_block">
                          <div className="row align-items-center">
                            <div className="col-lg-7">
                              <p>Recently Created & Pinned Projects</p>
                            </div>

                            <div className="col-lg-5 wrapDiv">
                              <select
                                className="form-select sortByPin"
                                aria-label="Default select example"
                                // defaultValue={"value"}
                                onChange={(e) => filterHandler(e.target.value)}
                              >
                                <option value="pin">Sort by Pin</option>
                                <option value="date">Sort by Date</option>
                              </select>
                              <div className="nla_add_new_project_btn">
                                <button className="btn btn-primary px-4" onClick={handleShow}>
                                  + Create New Project
                                </button>
                                {/* <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 250 }}
                                  overlay={<Tooltip id="overlay-example">Create new project</Tooltip>}
                                >
                                  <a href="#!">
                                    <img src={feather} alt="" className="alertAligns" />
                                  </a>
                                </OverlayTrigger> */}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="nla_list_view_wrapper">
                          <div className="nla_list_view_header">
                            <div className="nla_table_th nla_modal">Projects</div>
                            <div className="nla_table_th nla_date">Created Date</div>
                            <div className="nla_table_th nla_date">Insights</div>
                            <div className="nla_table_th nla_date">Design Studio</div>
                            <div className="nla_table_th nla_action">Actions</div>
                          </div>
                          <div className="nla_list_view_body_content">
                            <ul>
                              {projectsOrderByPin !== ""
                                ? projectsOrderByPin?.map((elem, id) => (
                                  <li
                                    // className="active"
                                    key={id}
                                  >
                                    <div className="nla_modal">
                                      <i
                                        className="fa-solid fa-thumbtack"
                                        style={
                                          elem.pin_project === 0
                                            ? { color: "rgba(0, 0, 0, 0.23)" }
                                            : { color: "#0c0d25" }
                                        }
                                        onClick={() => PinUnPinHandler(elem)}
                                      ></i>
                                      {elem.project_name}
                                    </div>
                                    <div className="nla_date">
                                      <div>
                                        <p style={{ paddingLeft: "21px" }}>
                                          {
                                            moment(elem?.date_created).format("MM-DD-YYYY")
                                            // new Date(
                                            //   elem?.date_created
                                            // ).toLocaleDateString() + ""
                                          }
                                          {/* {elem?.date_created?.toLocaleString() + ""} */}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="nla_insights">
                                      Insights{" "}
                                      <Link to={`/new-insights/${elem?.id}/1`} className="d-inline-block">
                                        <img src={featherEye} alt="eye" />
                                      </Link>
                                    </div>
                                    <div className="nla_design_studio">
                                      Design Studio{" "}
                                      <a href="#!" onClick={() => fetchNodes(elem)} className="d-inline-block">
                                        <img src={openPencil} alt="Pencil" />{" "}
                                      </a>
                                    </div>
                                    <div className="nla_action">

                                      <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 250 }}
                                        overlay={<Tooltip id="overlay-example">Edit project</Tooltip>}
                                      >
                                        <a href="#!" onClick={() => handleEditProjectModal(elem?.id)} className="border rounded-full">
                                          {" "}
                                          <img src={openPencil} alt="Pencil" />{" "}
                                        </a>
                                      </OverlayTrigger>

                                      <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 250 }}
                                        overlay={<Tooltip id="overlay-example">Dublicate project</Tooltip>}
                                      >
                                        <a href="#!" onClick={() => duplicateProjectHandler(elem?.id)} className="border rounded-full">
                                          <img src={copyIcon} alt="copy Icon" />
                                        </a>
                                      </OverlayTrigger>

                                      <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 250 }}
                                        overlay={<Tooltip id="overlay-example">Delete project</Tooltip>}
                                      >
                                        <a href="#!" onClick={() => deleteProjectHandler(elem?.id)} className="border rounded-full text-primary">
                                          <i className="fa-solid fa-trash fa-sm"></i>
                                        </a>
                                      </OverlayTrigger>
                                    </div>
                                  </li>
                                ))
                                : ""}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : customTabRecentProject === true && filteredData !== "" ? (
                    <>
                      <div
                        className={customTabRecentProject === true ? `tab-pane fade show active` : "tab-pane fade "}
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                      >
                        {
                          <>
                            {filteredData !== "" ? (
                              <>
                                <div className="nla_view_top_title_and_add_new_block" id="searchedResults">
                                  <div className="row align-items-center">
                                    <div className="col-lg-5">
                                      <p className="mb-0">
                                        Searched Results in list view
                                        <a href="#!">
                                          <img src={feather} alt="" className="alertAligns" />
                                        </a>
                                      </p>
                                    </div>
                                    <div className="col-lg-7 text-end">
                                      <div className={`clearbtn`}>
                                        <button onClick={unsetSearchData}>Clear Search</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={
                                    userPreference.view === "list" ? `tab-pane fade show active` : `tab-pane fade`
                                  }
                                  id="nav-profile"
                                  role="tabpanel"
                                  aria-labelledby="nav-profile-tab"
                                >
                                  <div className="nla_list_view_wrapper">
                                    <div className="nla_list_view_header">
                                      <div className="nla_modal">Projects</div>
                                      <div className="nla_date">Created Date</div>
                                      <div className="nla_action">Actions</div>
                                    </div>
                                    <div className="nla_list_view_body_content">
                                      <ul>
                                        {filteredData !== ""
                                          ? filteredData?.map((elem, id) => (
                                            <li
                                              // className="active"
                                              key={id}
                                            >
                                              <div className="nla_modal">
                                                <i
                                                  className="fa-solid fa-thumbtack"
                                                  style={
                                                    elem.pin_project === 0
                                                      ? { color: "rgba(0, 0, 0, 0.23)" }
                                                      : { color: "#0c0d25" }
                                                  }
                                                  onClick={() => PinUnPinHandler(elem)}
                                                ></i>
                                                {elem.project_name}
                                              </div>
                                              <div className="nla_date">
                                                <p style={{ paddingLeft: "21px" }}>
                                                  {
                                                    moment(elem?.date_created).format("MM-DD-YYYY")
                                                    // new Date(
                                                    //   elem?.date_created
                                                    // ).toLocaleDateString() + ""
                                                  }
                                                  {/* {elem?.date_created?.toLocaleString() + ""} */}
                                                </p>
                                              </div>
                                              <div className="nla_action">
                                                <div>
                                                  Insights{" "}
                                                  <Link to={`/new-insights/${elem?.id}/1`}>
                                                    <img src={featherEye} alt="eye" />
                                                  </Link>
                                                </div>
                                                <div>
                                                  Design Studio{" "}
                                                  <a href="#!" onClick={() => fetchNodes(elem)}>
                                                    <img src={openPencil} alt="Pencil" />{" "}
                                                  </a>
                                                </div>
                                                <div>
                                                  Share{" "}
                                                  <a href="#!">
                                                    {" "}
                                                    <img src={share} alt="Share" />{" "}
                                                  </a>
                                                </div>
                                                <div>
                                                  Edit{" "}
                                                  <a href="#!" onClick={() => handleEditProjectModal(elem?.id)}>
                                                    {" "}
                                                    <img src={openPencil} alt="Pencil" />{" "}
                                                  </a>
                                                </div>
                                                <div>
                                                  Duplicate{" "}
                                                  <a href="#!" onClick={() => duplicateProjectHandler(elem?.id)}>
                                                    {/* <i className="fa-solid fa-copy"></i> */}
                                                    <img src={copyIcon} alt="copy Icon" />
                                                  </a>
                                                </div>
                                                <div>
                                                  Download{" "}
                                                  <a href="#!">
                                                    {/* <i className="fa-solid fa-download"></i> */}
                                                    <img src={downloadIcon} alt="" />
                                                  </a>
                                                </div>
                                                <div>
                                                  Delete{" "}
                                                  <a href="#!" onClick={() => deleteProjectHandler(elem?.id)}>
                                                    <i className="fa-solid fa-trash fa-sm"></i>
                                                  </a>
                                                </div>
                                              </div>
                                            </li>
                                          ))
                                          : ""}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <p style={{ paddingLeft: "15px" }}>No search results found</p>
                            )}
                          </>
                        }
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  <AuditUserProjects
                    handleEditProjectModal={handleEditProjectModal}
                    // modelsList={modelsList}
                    user_id={user_id}
                    columnState={userPreference.no_of_columns}
                    fetchNodes={fetchNodes}
                    duplicateProjectHandler={duplicateProjectHandler}
                    deleteProjectHandler={deleteProjectHandler}
                  />

                  {/* <!-- List view content end --> */}
                </div>
              </div>

              {/* <!-- Pagination Start --> */}
              {loadPagination && (
                <div className={`nla-pagination-and-all-results-wrapper ${sidebarState ? "sidebarCollapse" : ""}`}>
                  {filterVisible ? (
                    <>
                      <nav className={`pagination`} data-pagination>
                        <a
                          onClick={() => handleSearchPageChange(currentFilterPage - 1)}
                          style={{ cursor: "pointer" }}
                          className="first-arrow"
                          disabled={currentFilterPage === 1}
                        >
                          <i className="ion-chevron-left"></i>
                        </a>
                        <ul>{renderPageNumbers(currentFilterPage, totalPages)}</ul>
                        <a
                          onClick={() => handleSearchPageChange(currentFilterPage + 1)}
                          style={{ cursor: "pointer" }}
                          className="arrow"
                          disabled={currentFilterPage === totalPages}
                        >
                          <i className="ion-chevron-right"></i>
                        </a>
                      </nav>
                    </>
                  ) : customTabPinnedProject ? (
                    <nav className={`pagination`} data-pagination>
                      <a
                        onClick={() => handlePageChange(currentPage - 1)}
                        style={{ cursor: "pointer" }}
                        className="first-arrow"
                        disabled={currentPage === 1}
                      >
                        <i className="ion-chevron-left"></i>
                      </a>
                      <ul>{renderPageNumbers(currentPage, totalPages)}</ul>
                      <a
                        onClick={() => handlePageChange(currentPage + 1)}
                        style={{ cursor: "pointer" }}
                        className="arrow"
                        disabled={currentPage === totalPages}
                      >
                        <i className="ion-chevron-right"></i>
                      </a>
                    </nav>
                  ) : (
                    <nav className={`pagination`} data-pagination>
                      <a
                        onClick={() => handleProjectListViewPageChange(orderByPinPage - 1)}
                        style={{ cursor: "pointer" }}
                        className="first-arrow"
                        disabled={orderByPinPage === 1}
                      >
                        <i className="ion-chevron-left"></i>
                      </a>
                      <ul>{renderPageNumbers(orderByPinPage, totalPages)}</ul>
                      <a
                        onClick={() => handleProjectListViewPageChange(orderByPinPage + 1)}
                        style={{ cursor: "pointer" }}
                        className="arrow"
                        disabled={orderByPinPage === totalPages}
                      >
                        <i className="ion-chevron-right"></i>
                      </a>
                    </nav>
                  )}
                  {/* <!-- Pagination End --> */}

                  <div className="nla_result_show_block">
                    <div>
                      <label htmlFor="">Show</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        // defaultValue={"value"}
                        value={userPreference.no_of_projects}
                        onChange={(e) => {
                          setLimit(e.target.value);
                          setUserPreference({
                            ...userPreference,
                            no_of_projects: e.target.value,
                          });
                        }}
                      >
                        {/* <option value="5">5 Project</option> */}
                        <option value="10">10 Project</option>
                        <option value="15">15 Project</option>
                        <option value="20">20 Project</option>
                        <option value="25">25 Project</option>
                      </select>
                    </div>
                    {customTabPinnedProject && (
                      <div>
                        <label htmlFor="">Show</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          id="selectColumns"
                          onChange={columnHandler}
                          value={userPreference.no_of_columns}
                        >
                          <option value="nla-col-2">2 Column</option>
                          <option value="nla-col-3">3 Column</option>
                          <option value="nla-col-4" defaultValue={"nla-col-4"}>4 Column</option>
                          <option value="nla-col-5">5 Column</option>
                          {/* <option value="nla-col-6">6 Column</option> */}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} onEdit={() => setLoad(true)} />
      <Snackbar
        open={searchEmptyChecker}
        autoHideDuration={3000}
        key="searchEmptyChecker"
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Please fill at least one field
        </Alert>
      </Snackbar>
      <Snackbar
        open={projectCreatedAlert}
        autoHideDuration={3000}
        key="projectCreatedAlert"
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Project created successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={projectPinAlert}
        autoHideDuration={3000}
        key="projectPinAlert"
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {pinAlertText}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showUniversalAlert}
        autoHideDuration={3000}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert sx={{ width: "100%" }}>{universalAlertMsg}</Alert>
      </Snackbar>

      <Snackbar
        open={maxPinLength}
        autoHideDuration={3000}
        key="pinlengthalert"
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Maximum 20 Projects Can Be Pinned
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
};

export default Dashboard;

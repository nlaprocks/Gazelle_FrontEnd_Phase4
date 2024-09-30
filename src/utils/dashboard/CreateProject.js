import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Modal } from "react-bootstrap";
import "../../css/style.css";
import "../../css/createProject.css";
import createImg from "../../assets/images/new_project_create_image.png";
import projectDiagram from "../../assets/newIcons/awesome-project-diagram.svg";
import metroVersion from "../../assets/newIcons/metro-versions.svg";
import uploadIcon from "../../assets/newIcons/ionic-ios-images.svg";
import { Select } from "antd";
import { TreeSelect } from "antd";

const { Option } = Select;

export default function CreateProject({
  authData,
  setLoad,
  setShowUniversalAlert,
  setUniversalAlertMsg,
  setProjectCreatedAlert,
  showCreateModal,
  setShowCreateModal,
  isNewProjectFromStudio = false,
  project_name = "",
  setProjectNameCallback = () => { },
  addProjectID = () => { },
}) {

  const navigate = useNavigate();
  const userID = authData?.user_id;

  const [alertMsg, setAlertMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showCancelProject, setShowCancelProject] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [type, setType] = useState("");
  const [client, setClient] = useState("");
  const [product, setProduct] = useState("");
  const [version, setVersion] = useState();
  const [companyLogo, setCompanyLogo] = useState([]);
  const [companyLogoType, setCompanyLogoType] = useState("");

  const [logoList, setLogoList] = useState([]);
  const [selectedLogoFromList, setSelectedLogoFromList] = useState("");
  const [retailerBrandProducts, setRetailerBrandProducts] = useState([]);

  //  --------------------------------------- Dropdowns Start --------------------------------
  const [selectedRetailers, setSelectedRetailers] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const retailers = Object?.keys(retailerBrandProducts);
  const retailerOptions = Object.keys(retailerBrandProducts).map((retailer) => (
    <Option key={retailer} value={retailer}>
      {retailer}
    </Option>
  ));

  const brandOptionsSet = new Set(
    selectedRetailers.flatMap((retailer) =>
      retailerBrandProducts[retailer] ? Object.keys(retailerBrandProducts[retailer]) : []
    )
  );
  const uniqueBrandOptions = [...brandOptionsSet];

  const productOptionsSet = new Set(
    selectedBrands.flatMap((brand) =>
      retailerBrandProducts[selectedRetailers.find((retailer) => retailerBrandProducts[retailer][brand])]
        ? retailerBrandProducts[selectedRetailers.find((retailer) => retailerBrandProducts[retailer][brand])][brand]
        : []
    )
  );
  let uniqueProductOptions = [...productOptionsSet];

  const [isAllRetailerSelected, setIsAllRetailerSelected] = useState(false);
  const [isAllBrandSelected, setIsAllBrandSelected] = useState(false);
  const [isAllProductSelected, setIsAllProductSelected] = useState(false);

  const handleRetailerChange = (values) => {
    setSelectedBrands([]);
    setIsAllRetailerSelected(false);
    if (values && values.length && values.includes("all")) {
      if (values.length === retailers.length + 1) {
        setIsAllRetailerSelected(false);
        return setSelectedRetailers([]);
      }
      setIsAllRetailerSelected(true);
      return setSelectedRetailers([...retailers]);
    }
    if (values.length === retailers.length) {
      setIsAllRetailerSelected(true);
    }
    return setSelectedRetailers(values);
  };

  const handleBrandChange = (values) => {
    setSelectedProducts([]);
    setIsAllBrandSelected(false);
    if (values && values.length && values.includes("all")) {
      if (values.length === uniqueBrandOptions.length + 1) {
        setIsAllBrandSelected(false);
        return setSelectedBrands([]);
      }
      setIsAllBrandSelected(true);
      return setSelectedBrands([...uniqueBrandOptions]);
    }
    return setSelectedBrands(values);
  };

  const handleProductChange = (values) => {
    setIsAllProductSelected(false);
    if (values && values.length && values.includes("all")) {
      if (values.length === uniqueProductOptions.length + 1) {
        setIsAllProductSelected(false);
        return setSelectedProducts([]);
      }
      setIsAllProductSelected(true);
      return setSelectedProducts([...uniqueProductOptions]);
    }
    return setSelectedProducts(values);
  };

  //  --------------------------------------- Dropdowns End --------------------------------
  const handleShow = () => {
    setShowCreateModal(true);
    fetchLogoList();
  };
  const handleClose = () => {
    setShowCreateModal(false);
    setShowCancelProject(true);
    setSelectedRetailers([]);
    setSelectedBrands([]);
    uniqueProductOptions = [];
  };
  const handleCloseCancel = () => {
    setShowCreateModal(true);
    setShowCancelProject(false);
  };
  const handleCloseCancelClose = () => {
    setShowCreateModal(false);
    setShowCancelProject(false);
  };
  const companyLogoHandler = (e) => {
    setCompanyLogo(e.target.files);
    setCompanyLogoType(e.target.files[0]?.type);
    imageChecker(e.target.files[0]?.type);
  };
  const imageChecker = (props) => {
    if (companyLogo.length > 0) {
      const formData = new FormData();
      for (const file of companyLogo) formData.append("company_logo", file);
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (event) => {
        // const percentage = parseInt((event.loaded / event.total) * 100);
      };
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
          console.log("error"); // Handle error here
        }
        console.log("success"); // Handle success here
      };
      xhr.open("POST", "https://httpbin.org/post", true);
      xhr.send(formData);
    }
  };
  const fetchLogoList = async () => {
    const config = { headers: { Authorization: `Bearer ` + authData.token } };
    try {
      const api = `${process.env.REACT_APP_Base_URL}/api/v1/user/get-all-logos`;
      const response = await axios.get(api, config);
      if (response.status === 200) {
        const logos = response?.data?.data;
        setLogoList(logos);
      }
    } catch (error) {
      console.log("Fetch Logo List Error", error);
    }
  };
  const fetchRetailerBrandProduct = async () => {
    try {
      const api = `${process.env.REACT_APP_NGROK}/client-data/7/retailer-brand-product`;
      const response = await axios.get(api);
      if (response.status === 200) {
        setRetailerBrandProducts(response?.data?.data);
      }
    } catch (error) {
      console.log("Error in fetching retailers", error);
    }
  };
  const createProjectAPI = async (formData) => {
    try {
      setShowUniversalAlert(true);
      setUniversalAlertMsg("Creating your project. . . . ");
      const auth = JSON.parse(localStorage.getItem("auth"));
      const config = { headers: { Authorization: `Bearer ` + auth.token } };

      const api = `${process.env.REACT_APP_Base_URL}/api/v1/project/add`;
      let { data } = await axios
        .post(api, formData, config)
        .then(function (response) {
          console.log("response::: ", response);
          setLoad(true);
          setProjectName("");
          setType("");
          setClient("");
          setProduct("");
          setVersion("");
          setCompanyLogo([]);
          setSelectedLogoFromList("");
          setShowCreateModal(false);
          setShowUniversalAlert(false);
          setProjectCreatedAlert(true);
          setTimeout(() => {
            setProjectCreatedAlert(false);
            if (isNewProjectFromStudio) {
              setProjectNameCallback(projectName);
              addProjectID(response.data?.data?.Model?.project_id);
              navigate(`/design-studio/${response.data?.data?.Model?.project_id}/${response.data?.data?.Model?.id}`);
              window.location.reload();
            }
          }, 3000);
        })
        .catch(function (data) {
          if (data?.response?.data?.message === "Project exists") {
            setShowAlert(true);
            setAlertMsg("Project name already exists");
            setTimeout(() => {
              setShowAlert(false);
            }, 3000);
          }
        });
      if (data.status === 201) {
        setShowCreateModal(false);
      }
    } catch (error) {
      setShowUniversalAlert(false);
    }
  };
  const createProject = async (e) => {
    const retailers = [selectedRetailers];
    const brands = [selectedBrands];
    const products = [selectedProducts];
    setLoad(false);
    try {
      if (
        userID !== "" &&
        projectName !== "" &&
        // type !== "" &&
        // client !== "" &&
        // product !== "" &&
        //   companyLogo !== [] &&
        companyLogo.length !== 0 &&
        companyLogoType !== ""
      ) {
        const formData = new FormData();
        formData.append("user_id", userID);
        formData.append("project_name", projectName);
        formData.append("type_of_project", "type");
        formData.append("client_name", "client");
        formData.append("product_name", "product");
        formData.append("retailers", JSON.stringify([]));
        formData.append("brands", JSON.stringify([]));
        formData.append("products", JSON.stringify([]));
        formData.append("company_logo", companyLogo[0]);
        createProjectAPI(formData);
      } else if (
        userID !== "" &&
        projectName !== "" &&
        // type !== "" &&
        // client !== "" &&
        // product !== "" &&
        selectedLogoFromList !== "" &&
        companyLogo.length === 0
      ) {
        const formData = new FormData();
        formData.append("user_id", userID);
        formData.append("project_name", projectName);
        formData.append("type_of_project", "type");
        formData.append("client_name", "client");
        formData.append("product_name", "product");
        formData.append("retailers", JSON.stringify([]));
        formData.append("brands", JSON.stringify([]));
        formData.append("products", JSON.stringify([]));
        formData.append("logo_from_list", selectedLogoFromList);
        createProjectAPI(formData);
      } else {
        setShowAlert(true);
        setAlertMsg("Please fill all fields");
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        setShowUniversalAlert(false);
      }
    } catch (error) {
      alert("error");
    }

    if (projectName === "") {
      const projectNameInput = document.querySelector("#projectName");
      projectNameInput?.focus();
      if (projectNameInput) {
        projectNameInput.style.borderColor = "#eb3434";
      }
    }
    if (type === "") {
      const projectNameInput = document.querySelector("#exampleDataList");
      projectNameInput?.focus();
      if (projectNameInput) {
        projectNameInput.style.borderColor = "#eb3434";
      }
    }
    if (client === "") {

      const projectNameInput = document.querySelector("#selectClientt");
      projectNameInput?.focus();
      if (projectNameInput) {
        projectNameInput.style.borderColor = "#eb3434";
      }
    }
    if (product === "") {
      const projectNameInput = document.querySelector("#product");
      projectNameInput?.focus();
      if (projectNameInput) {
        projectNameInput.style.borderColor = "#eb3434";
      }

    }
    if (companyLogo.length === 0) {
      const projectNameInput = document.querySelector("#companyLogo");
      projectNameInput?.focus();
      if (projectNameInput) {
        projectNameInput.style.borderColor = "#eb3434";
        projectNameInput.style.border = "1px solid #eb3434";
      }

    }
    if (projectName !== "") {

      const projectNameInput = document.querySelector("#projectName");

      if (projectNameInput) {
        projectNameInput.style.borderColor = "#86b7fe";
      }
    }
    if (type !== "") {

      const projectNameInput = document.querySelector("#exampleDataList");

      if (projectNameInput) {
        projectNameInput.style.borderColor = "#86b7fe";
      }
    }
    if (client !== "") {
      const projectNameInput = document.querySelector("#selectClientt");

      if (projectNameInput) {
        projectNameInput.style.borderColor = "#86b7fe";
      }
    }
    if (product !== "") {

      const projectNameInput = document.querySelector("#product");

      if (projectNameInput) {
        projectNameInput.style.borderColor = "#86b7fe";
      }
    }
    if (companyLogo.length > 1) {
      const projectNameInput = document.querySelector("#companyLogo");

      if (projectNameInput) {
        projectNameInput.style.borderColor = "#86b7fe";
      }
    }

    // if (projectName === "") {
    //   document.querySelector("#projectName").focus();
    //   document.querySelector("#projectName").style.borderColor = "#eb3434";
    // }
    // if (type === "") {
    //   document.querySelector("#exampleDataList").focus();
    //   document.querySelector("#exampleDataList").style.borderColor = "#eb3434";
    // }
    // if (client === "") {
    //   document.querySelector("#selectClientt").focus();
    //   document.querySelector("#selectClientt").style.borderColor = "#eb3434";
    // }
    // if (product === "") {
    //   document.querySelector("#product").focus();
    //   document.querySelector("#product").style.borderColor = "#eb3434";
    // }
    // if (companyLogo.length === 0) {
    //   document.querySelector("#companyLogo").focus();
    //   document.querySelector("#companyLogo").style.border = "1px solid #eb3434";
    //   document.querySelector("#product").style.borderColor = "#eb3434";
    // }
    // if (projectName !== "") {
    //   document.querySelector("#projectName").style.borderColor = "#86b7fe";
    // }
    // if (type !== "") {
    //   document.querySelector("#exampleDataList").style.borderColor = "#86b7fe";
    // }
    // if (client !== "") {
    //   document.querySelector("#selectClientt").style.borderColor = "#86b7fe";
    // }
    // if (product !== "") {
    //   document.querySelector("#product").style.borderColor = "#86b7fe";
    // }
    // if (companyLogo.length > 1) {
    //   document.querySelector("#companyLogo").style.borderColor = "#86b7fe";
    // }
  };

  React.useEffect(() => {
    fetchLogoList();
    fetchRetailerBrandProduct();
  }, []);

  useEffect(() => {
    if (projectName !== "") {
      document.querySelector("#projectName").style.borderColor = "#86b7fe";
    }
    // if (type !== "") {
    //   document.querySelector("#exampleDataList").style.borderColor = "#86b7fe";
    // }
    // if (client !== "") {
    //   document.querySelector("#selectClientt").style.borderColor = "#86b7fe";
    // }
    // if (product !== "") {
    //   document.querySelector("#product").style.borderColor = "#86b7fe";
    // }
    if (companyLogo.length > 1) {
      document.querySelector("#companyLogo").style.borderColor = "#86b7fe";
    }
  }, [companyLogo]);

  const TreeSelectRetailerBrand = ({ data }) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const handleSelectAll = () => {
      setSelectedValues(allIds);
    };

    const handleUnselectAll = () => {
      setSelectedValues([]);
    };
    const allRetailers = Object.keys(data);

    const treeData = allRetailers.map((retailer) => ({
      title: retailer,
      value: retailer,
    }));

    const allIds = [...allRetailers];

    return (
      <TreeSelect
        allowClear={true}
        placeholder="Select Retailer/Brand"
        treeCheckable={true}
        showCheckedStrategy={TreeSelect.SHOW_PARENT}
        style={{ width: "100%" }}
        dropdownStyle={{ maxHeight: "300px" }}
        onChange={(values) => setSelectedValues(values)}
        value={selectedValues}
        maxTagCount={2}
        maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length} Retailers/Brands ...`}
        treeData={[
          {
            title: (
              <span
                onClick={selectedValues.length === allIds.length ? handleUnselectAll : handleSelectAll}
                style={{
                  display: "inline-block",
                  color: "#286FBE",
                  cursor: "pointer",
                }}
              >
                {selectedValues.length === allIds.length ? "Unselect all" : "Select all"}
              </span>
            ),
            value: "xxx",
            disableCheckbox: true,
            disabled: true,
          },
          ...treeData,
        ]}
      />
    );
  };

  return (
    <div>
      {/* <!-- Create new project Modal Start --> */}
      <Modal show={showCreateModal} id="createNewProject" onHide={handleClose} animation={true} centered>
        <Modal.Header>
          <Modal.Title>Create New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="nla_modal_banenr">
            <img src={createImg} alt="placeholder" className="img-fluid" />
          </div>
          {showAlert && (
            <>
              <Alert className="mb-2" variant="outlined" severity="error">
                {alertMsg}
              </Alert>
            </>
          )}
          <form method="post" encType="multipart/form-data">
            <div className="">
              <div className="nla_form_project_name position-relative nla_form_field_block">
                <img src={projectDiagram} alt="" />
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  placeholder="Enter Project Name*"
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              {/* Retailer */}
              {/* <div className="filter-accordion-left-wrapper">
                <div>
                  <i className="fa-solid fa-shopping-bag"></i>
                  <Select
                    showSearch
                    mode="multiple"
                    allowClear={true}
                    placeholder="Select Retailer"
                    onChange={handleRetailerChange}
                    style={{
                      width: "100%",
                    }}
                    className="filtered-accordion-ant-select"
                    maxTagCount="responsive"
                    filterSort={(optionA, optionB) =>
                      (optionA?.value ?? "").toLowerCase().localeCompare((optionB?.value ?? "").toLowerCase())
                    }
                    value={selectedRetailers}
                  >
                    <Select.Option key="all" value="all" className="text-primary">
                      {!isAllRetailerSelected ? "Select all" : "Unselect all"}
                    </Select.Option>
                    {retailerOptions}
                  </Select>
                </div>
              </div> */}
              {/* Brand */}
              {/* <div className="filter-accordion-left-wrapper">
                <div>
                  <i className="fa fa-store"></i>
                  <Select
                    showSearch
                    mode="multiple"
                    allowClear={true}
                    placeholder="Select Brand"
                    onChange={handleBrandChange}
                    disabled={!selectedRetailers || selectedRetailers.length === 0}
                    style={{
                      width: "100%",
                    }}
                    className="filtered-accordion-ant-select"
                    maxTagCount="responsive"
                    filterSort={(optionA, optionB) =>
                      (optionA?.value ?? "").toLowerCase().localeCompare((optionB?.value ?? "").toLowerCase())
                    }
                    value={selectedBrands}
                  >
                    <Select.Option key="all" value="all" className="text-primary">
                      {!isAllBrandSelected ? "Select all" : "Unselect all"}
                    </Select.Option>
                    {uniqueBrandOptions.map((brand) => (
                      <Option key={brand} value={brand}>
                        {brand}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div> */}
              {/* Product */}
              {/* <div className="filter-accordion-left-wrapper">
                <div>
                  <i className="fa-solid fa-cart-shopping"></i>
                  <Select
                    showSearch
                    mode="multiple"
                    allowClear={true}
                    placeholder="Select Product"
                    onChange={handleProductChange}
                    disabled={!selectedBrands || selectedBrands.length === 0}
                    style={{
                      width: "100%",
                    }}
                    className="filtered-accordion-ant-select"
                    maxTagCount="responsive"
                    filterSort={(optionA, optionB) =>
                      (optionA?.value ?? "").toLowerCase().localeCompare((optionB?.value ?? "").toLowerCase())
                    }
                    value={selectedProducts}
                  >
                    <Select.Option key="all" value="all" className="text-primary">
                      {!isAllProductSelected ? "Select all" : "Unselect all"}
                    </Select.Option>
                    {uniqueProductOptions.map((product, index) => (
                      <Option key={index} value={product}>
                        {product}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div> */}

              <div className="nla_form_version position-relative nla_form_field_block">
                <img src={metroVersion} alt="" />
                <input
                  type="number"
                  className="form-control"
                  id="version"
                  placeholder="Version 1"
                  onChange={(e) => setVersion(e.target.value)}
                  disabled
                // value="1"
                />
              </div>

              {!companyLogo?.length > 0 || logoList?.length === 0 ? (
                <div className="nla_form_select_logo position-relative nla_form_field_block">
                  <img src={uploadIcon} alt="" />
                  <select
                    className="form-select"
                    aria-label="Select Logo"
                    id="logo"
                    style={{ color: "#acb0b1" }}
                    onChange={(e) => setSelectedLogoFromList(e.target.value)}
                  >
                    <option selected value="">
                      Select Previous Logo
                    </option>
                    {logoList?.map((val, index) => (
                      <option value={val.company_logo} key={index}>
                        {val.company_logo.substring(48)}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                ""
              )}

              {selectedLogoFromList === "" && (
                <div className="nla_form_file_upload position-relative nla_form_field_block">
                  <img src={uploadIcon} alt="" />
                  {/* <label htmlFor="formFile">Upload Company Logo</label> */}
                  {companyLogo?.length > 0 ? (
                    <label htmlFor="formFile">{companyLogo[0].name}</label>
                  ) : (
                    <label htmlFor="formFile" id="companyLogo" style={{ color: "#acb0b1" }}>
                      Upload Company Logo*
                    </label>
                  )}
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    accept="image/png, image/jpeg"
                    // onChange={(e) => setCompanyLogo(e.target.files)}
                    onChange={companyLogoHandler}
                  />
                  {/* <ProgressBar now={progress} label={`${progress}%`} /> */}
                </div>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-outline-danger"
            data-bs-toggle="modal"
            data-bs-target="#cancelProject"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={createProject}>
            Create
          </button>
        </Modal.Footer>
      </Modal>
      {/* <!-- Create new project Modal End --> */}
      {/* <!-- Cancel Project Modal Start --> */}
      <Modal show={showCancelProject} onHide={handleClose} id="cancelProject" centered>
        <Modal.Header>
          <Modal.Title>Cancel Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="nla_modal_banenr">
            <img src={createImg} alt="placeholder" class="img-fluid" />
          </div>
          <div class="nla_modal_body_title text-center">
            <h5>Are you Sure?</h5>
            <p>Pressing yes will cancel the project</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target="#createNewProject"
            onClick={handleCloseCancel}
          >
            No
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleCloseCancelClose}>
            Yes
          </button>
        </Modal.Footer>
      </Modal>
      {/* <!-- Cancel Project Modal End --> */}
    </div>
  );
}

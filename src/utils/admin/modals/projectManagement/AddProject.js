import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../store/index";
import Spinner from "react-bootstrap/Spinner";

const AddProject = ({ showAddProject, setShowAddProject }) => {
  const dispatch = useDispatch();
  const [logo, setLogo] = React.useState();
  const [project, setProject] = React.useState({
    user_id: 0,
    project_name: "",
    type_of_project: "",
    client_name: "",
    product_name: "",
    company_logo: {},
    audit_user_id: null,
  });
  const getAllUserReducer = useSelector((state) => state.getAllUsersReducer);
  const getAllAuditUserReducer = useSelector(
    (state) => state.getAllAuditUserReducer
  );
  const getAllCategories = useSelector(
    (state) => state.getAllCategoriesReducer
  );
  const getAllProducts = useSelector((state) => state.getAllProductsReducer);
  const addProjectReducer = useSelector((state) => state.addProjectReducer);
  const handleClose = () => {
    setShowAddProject(false);
    setProject({
      user_id: 0,
      project_name: "",
      type_of_project: "",
      client_name: "",
      product_name: "",
      company_logo: {},
      audit_user_id: null,
    });
  };
  const addProject = () => {
    const formData = new FormData();
    formData.append("user_id", project.user_id);
    formData.append("project_name", project.project_name);
    formData.append("type_of_project", project.type_of_project);
    formData.append("client_name", project.client_name);
    formData.append("product_name", project.product_name);
    formData.append("company_logo", project.company_logo);
    formData.append("audit_user_id", project.audit_user_id);
    dispatch(allActions.addProjectAction.addProject(formData));
  };
  React.useEffect(() => {
    dispatch(allActions.getAllUsersAction.getAllUsers());
    dispatch(allActions.getAllAuditUserAction.getAllAuditUser());
    dispatch(allActions.getAllCategoriesAction.getAllCategories());
    dispatch(allActions.getAllProductsAction.getAllProducts());
  }, []);
  React.useEffect(() => {
    if (addProjectReducer.success) {
      dispatch(allActions.getAllProjectsAction.getAllProjects());
      handleClose();
      delete addProjectReducer.success;
    }
  }, [addProjectReducer]);
  return (
    <Modal show={showAddProject} onHide={handleClose} centered scrollable>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Add Project</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="nla_modal_banenr">
          <img
            src={require("../../../../assets/images/new_project_create_image.png")}
            alt="placeholder"
            className="img-fluid"
          />
        </div>
        <div className="nla-add-heading-block">
          <form>
            <div className="">
              <div className="nla_form_project_name position-relative nla_form_field_block">
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  placeholder="Enter Project Name*"
                  onChange={(e) =>
                    setProject({ ...project, project_name: e.target.value })
                  }
                />
              </div>
              <div className="nla_form_select_type position-relative nla_form_field_block">
                <select
                  className="form-select"
                  aria-label="Select Type"
                  id="exampleDataList"
                  required
                  onChange={(e) =>
                    setProject({ ...project, user_id: e.target.value })
                  }
                >
                  <option selected={true} disabled={true} value="">
                    Select User*
                  </option>
                  {getAllUserReducer?.users?.data?.map((val, index) => (
                    <option key={index} value={val.user_id}>
                      {val.client_first_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="nla_form_select_type position-relative nla_form_field_block">
                <select
                  className="form-select"
                  aria-label="Select Type"
                  id="exampleDataList"
                  required
                  onChange={(e) =>
                    setProject({ ...project, type_of_project: e.target.value })
                  }
                  value={project?.type_of_project}
                >
                  <option disabled={true} value="">
                    Select Project Type
                  </option>
                  <option value="Pricing">Pricing</option>
                  <option value="Optimization">Optimization</option>
                  <option value="Forecasting">Forecasting</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="nla_form_select_client position-relative nla_form_field_block">
                <select
                  className="form-select"
                  aria-label="Select Category"
                  id="selectClientt"
                  required
                  onChange={(e) =>
                    setProject({ ...project, client_name: e.target.value })
                  }
                  value={project.client_name}
                >
                  <option disabled={true} value="">
                    Select Category*
                  </option>
                  {getAllCategories?.categories?.data?.map((val, index) => (
                    <option key={index} value={val.category_name}>
                      {val.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="nla_form_select_product position-relative nla_form_field_block">
                <select
                  className="form-select"
                  aria-label="Select Product"
                  id="product"
                  required
                  onChange={(e) =>
                    setProject({ ...project, product_name: e.target.value })
                  }
                  value={project?.product_name}
                >
                  <option disabled={true} value="">
                    Select Product*
                  </option>
                  {getAllProducts?.products?.data?.map((val, index) => (
                    <option value={val.product_name} key={index}>
                      {val.product_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="nla_form_version position-relative nla_form_field_block">
                <input
                  type="number"
                  className="form-control"
                  id="version"
                  placeholder="Version 1"
                  // onChange={(e) => setVersion(e.target.value)}
                  disabled
                  // value="1"
                />
              </div>
              <div className="nla_form_select_type position-relative nla_form_field_block">
                <select
                  className="form-select"
                  aria-label="Select Audit User"
                  id="exampleDataList"
                  required
                  onChange={(e) =>
                    setProject({ ...project, audit_user_id: e.target.value })
                  }
                  // defaultValue={"Select Audit User"}
                >
                  <option selected={true} disabled={true} value="">
                    Select Audit User
                  </option>
                  {/* {getAllAuditUserReducer?.auditUser?.data?.map(
                    (val, index) => (
                      <option key={index} value={val.user_id}>
                        {val.client_first_name}
                      </option>
                    )
                  )} */}
                  {getAllUserReducer?.users?.data?.map((val, index) => (
                    <option key={index} value={val.user_id}>
                      {val.client_first_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="nla_form_file_upload position-relative nla_form_field_block">
                <label
                  htmlFor="formFile"
                  id="companyLogo"
                  style={{ color: "#acb0b1" }}
                >
                  {logo ? logo : ` Upload Company Logo*`}
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    setProject({ ...project, company_logo: e.target.files[0] });
                    setLogo(e.target.files[0].name);
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-outline-danger"
          data-bs-dismiss="modal"
          onClick={handleClose}
        >
          No
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => addProject()}
        >
          {addProjectReducer?.loading ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            "Add"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProject;

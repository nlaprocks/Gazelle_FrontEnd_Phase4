import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../store/index";
import Spinner from "react-bootstrap/Spinner";

const AddUserModal = ({ showAddUserModal, setShowAddUserModal }) => {
  const [user, setUser] = React.useState({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    role: "admin",
    password: "",
    confirm_password: "",
    client_logo: "logo",
    created_by: "admin",
  });
  const [logo, setLogo] = React.useState("");
  const handleClose = () => {
    setShowAddUserModal(false);
    setUser({
      email: "",
      first_name: "",
      last_name: "",
      address: "",
      phone_number: "",
      role: "admin",
      password: "",
      confirm_password: "",
      client_logo: {},
      created_by: "admin",
    });
    setLogo("");
  };
  const dispatch = useDispatch();
  const userDetailsReducer = useSelector((state) => state.addUserReducer);
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const addUser = () => {
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("address", user.address);
    formData.append("phone_number", user.phone_number);
    formData.append("role", user.role);
    formData.append("password", user.password);
    formData.append("confirm_password", user.confirm_password);
    formData.append("client_logo", user.client_logo);
    formData.append("created_by", "admin");
    if (user.password !== user.confirm_password) {
      alert("Password and confirm password do not match");
    } else {
      dispatch(allActions.addUserAction.addUser(formData));
    }
  };
  React.useEffect(() => {
    if (userDetailsReducer.success) {
      dispatch(allActions.getAllUsersAction.getAllUsers());
      handleClose();
      delete userDetailsReducer.success;
    }
  }, [userDetailsReducer]);
  return (
    <Modal show={showAddUserModal} onHide={handleClose} centered scrollable>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Add User</h5>
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
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="First Name*"
                name="first_name"
                value={user.first_name}
                onChange={changeHandler}
              />
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name*"
                name="last_name"
                value={user.last_name}
                onChange={changeHandler}
              />
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Email*"
                name="email"
                value={user.email}
                onChange={changeHandler}
              />
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                name="phone_number"
                value={user.phone_number}
                onChange={changeHandler}
              />
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                name="address"
                value={user.address}
                onChange={changeHandler}
              />
            </div>
            <div>
              <select
                className="form-select"
                name="role"
                onChange={changeHandler}
              >
                <option value="admin" data-badge="">
                  Admin
                </option>
                <option value="manager" data-badge="">
                  Manager
                </option>
                {/* <option value="audit" data-badge="">
                  Audit User
                </option> */}
                <option value="user" data-badge="">
                  User
                </option>
              </select>
            </div>
            <div className="nla_form_file_upload position-relative nla_form_field_block mb-3">
              <label
                htmlFor="formFile"
                id="companyLogo"
                style={{ color: "#acb0b1" }}
              >
                {logo !== "" ? logo.name : "Upload Logo*"}
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  setLogo(e.target.files[0]);
                  setUser({ ...user, client_logo: e.target.files[0] });
                }}
                // onChange={companyLogoHandler}
              />
            </div>
            <div>
              <input
                type="password"
                className="form-control"
                placeholder="Password*"
                name="password"
                value={user.password}
                onChange={changeHandler}
              />
            </div>
            <div>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password*"
                name="confirm_password"
                value={user.confirm_password}
                onChange={changeHandler}
              />
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
          onClick={() => addUser()}
        >
          {userDetailsReducer?.loading ? (
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

export default AddUserModal;

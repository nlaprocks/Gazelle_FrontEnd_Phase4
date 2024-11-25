import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import allActions from "../../../../store/index";
const UpdateUserModal = ({
  showUpdateUserModal,
  setShowUpdateUserModal,
  updateUser,
  setUpdateUser,
}) => {
  const path =
    updateUser?.client_logo !== null
      ? Object.keys(updateUser?.client_logo).length !== 0
        ? updateUser?.client_logo?.split(
            "https://storage.googleapis.com/nla_image_bucket/"
          )
        : null
      : null;
  const [logo, setLogo] = React.useState("");
  const dispatch = useDispatch();
  const userDetailsReducer = useSelector((state) => state.updateUserReducer);
  const handleClose = () => {
    setUpdateUser({
      email: "",
      first_name: "",
      last_name: "",
      address: "",
      phone_number: "",
      role: "",
      client_logo: {},
    });
    setLogo("");
    setShowUpdateUserModal(false);
  };
  const changeHandler = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };
  const updateUserAction = () => {
    const formData = new FormData();
    formData.append("email", updateUser.email);
    formData.append("first_name", updateUser.first_name);
    formData.append("last_name", updateUser.last_name);
    formData.append("address", updateUser.address);
    formData.append("phone_number", updateUser.phone_number);
    formData.append("role", updateUser.role);
    formData.append("client_logo", updateUser.client_logo);
    formData.append("password", updateUser.password);
    formData.append("confirm_password", updateUser.confirm_password);
    if (updateUser.password !== updateUser.confirm_password) {
      alert("Password and confirm password do not match");
    } else {
      dispatch(allActions.updateUserAction.updateUser(formData));
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
    <Modal show={showUpdateUserModal} onHide={handleClose} centered scrollable>
      <Modal.Header>
        <Modal.Title>
          <h5 className="modal-title">Update User</h5>
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
                value={updateUser.first_name}
                onChange={changeHandler}
              />
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name*"
                name="last_name"
                value={updateUser.last_name}
                onChange={changeHandler}
              />
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Email*"
                name="email"
                value={updateUser.email}
                onChange={changeHandler}
                disabled
              />
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                name="phone_number"
                value={updateUser.phone_number}
                onChange={changeHandler}
              />
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                name="address"
                value={updateUser.address}
                onChange={changeHandler}
              />
            </div>
            <div>
              <select
                className="form-select"
                name="role"
                onChange={changeHandler}
                defaultValue={updateUser.role}
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
                {updateUser?.client_logo !== null
                  ? Object.keys(updateUser?.client_logo).length !== 0
                    ? path[1]
                    : logo !== ""
                    ? logo?.name
                    : "Upload Logo*"
                  : "Upload Logo*"}
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  setLogo(e.target.files[0]);
                  setUpdateUser({
                    ...updateUser,
                    client_logo: e.target.files[0],
                  });
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
                value={updateUser.password}
                onChange={changeHandler}
              />
            </div>
            <div>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password*"
                name="confirm_password"
                value={updateUser.confirm_password}
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
          onClick={() => updateUserAction()}
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
            "Update"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateUserModal;
